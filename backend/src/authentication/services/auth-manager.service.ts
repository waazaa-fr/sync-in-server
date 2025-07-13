/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */
import { unsign, UnsignResult } from '@fastify/cookie'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'
import crypto from 'node:crypto'
import { HTTP_CSRF_IGNORED_METHODS } from '../../applications/applications.constants'
import { UserModel } from '../../applications/users/models/user.model'
import { convertHumanTimeToSeconds } from '../../common/functions'
import { currentTimeStamp } from '../../common/shared'
import { AuthConfig } from '../auth.config'
import { CSRF_ERROR, CSRF_KEY, TOKEN_PATHS, TOKEN_TYPES } from '../constants/auth'
import { LoginResponseDto } from '../dto/login-response.dto'
import { TokenResponseDto } from '../dto/token-response.dto'
import { JwtIdentityPayload, JwtPayload } from '../interfaces/jwt-payload.interface'
import { TOKEN_TYPE } from '../interfaces/token.interface'

@Injectable()
export class AuthManager {
  private readonly logger = new Logger(AuthManager.name)
  public readonly authConfig: AuthConfig

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {
    this.authConfig = this.config.get<AuthConfig>('auth')
  }

  async getTokens(user: UserModel, refresh = false): Promise<TokenResponseDto> {
    const currentTime = currentTimeStamp()
    if (refresh && user.exp < currentTime) {
      this.logger.error(`${this.getTokens.name} - token refresh has incorrect expiration : *${user.login}*`)
      throw new HttpException('Token has expired', HttpStatus.FORBIDDEN)
    }
    const accessExpiration = convertHumanTimeToSeconds(this.authConfig.token.access.expiration)
    const refreshExpiration = refresh ? user.exp - currentTime : convertHumanTimeToSeconds(this.authConfig.token.refresh.expiration)
    return {
      [TOKEN_TYPE.ACCESS]: await this.jwtSign(user, TOKEN_TYPE.ACCESS, accessExpiration),
      [TOKEN_TYPE.REFRESH]: await this.jwtSign(user, TOKEN_TYPE.REFRESH, refreshExpiration),
      [`${TOKEN_TYPE.ACCESS}_expiration`]: accessExpiration + currentTime,
      [`${TOKEN_TYPE.REFRESH}_expiration`]: refreshExpiration + currentTime
    }
  }

  async setCookies(user: UserModel, res: FastifyReply): Promise<LoginResponseDto> {
    const response = new LoginResponseDto(user)
    const currentTime = currentTimeStamp()
    const csrfToken: string = crypto.randomUUID()
    for (const type of TOKEN_TYPES) {
      const tokenExpiration = convertHumanTimeToSeconds(this.authConfig.token[type].expiration)
      const cookieValue: string = type === TOKEN_TYPE.CSRF ? csrfToken : await this.jwtSign(user, type, tokenExpiration, csrfToken)
      res.setCookie(this.authConfig.token[type].name, cookieValue, {
        signed: type === TOKEN_TYPE.CSRF,
        path: TOKEN_PATHS[type],
        maxAge: convertHumanTimeToSeconds(this.authConfig.token[type].cookieMaxAge),
        httpOnly: type !== TOKEN_TYPE.CSRF
      })
      if (type === TOKEN_TYPE.ACCESS || type === TOKEN_TYPE.REFRESH) {
        response.token[`${type}_expiration`] = tokenExpiration + currentTime
      }
    }
    return response
  }

  async refreshCookies(user: UserModel, res: FastifyReply): Promise<TokenResponseDto> {
    const response = {} as TokenResponseDto
    const currentTime = currentTimeStamp()
    let refreshTokenExpiration: number
    let refreshMaxAge: number
    // refresh cookie must have the `exp` attribute
    // reuse token expiration to make it final
    if (user.exp && user.exp > currentTime) {
      refreshTokenExpiration = user.exp - currentTime
      refreshMaxAge = refreshTokenExpiration
    } else {
      this.logger.error(`${this.refreshCookies.name} - token ${TOKEN_TYPE.REFRESH} has incorrect expiration : *${user.login}*`)
      throw new HttpException('Token has expired', HttpStatus.FORBIDDEN)
    }
    const csrfToken: string = crypto.randomUUID()
    for (const type of TOKEN_TYPES) {
      const tokenExpiration = type === TOKEN_TYPE.REFRESH ? refreshTokenExpiration : convertHumanTimeToSeconds(this.authConfig.token[type].expiration)
      const maxAge = type === TOKEN_TYPE.REFRESH ? refreshMaxAge : convertHumanTimeToSeconds(this.authConfig.token[type].cookieMaxAge)
      const cookieValue: string = type === TOKEN_TYPE.CSRF ? csrfToken : await this.jwtSign(user, type, tokenExpiration, csrfToken)
      res.setCookie(this.authConfig.token[type].name, cookieValue, {
        signed: type === TOKEN_TYPE.CSRF,
        path: TOKEN_PATHS[type],
        maxAge: maxAge,
        httpOnly: type !== TOKEN_TYPE.CSRF
      })
      if (type === TOKEN_TYPE.ACCESS || type === TOKEN_TYPE.REFRESH) {
        response[`${type}_expiration`] = tokenExpiration + currentTime
      }
    }
    return response
  }

  async clearCookies(res: FastifyReply) {
    for (const [type, path] of Object.entries(TOKEN_PATHS)) {
      res.clearCookie(this.authConfig.token[type].name, { path: path, httpOnly: type !== TOKEN_TYPE.CSRF })
    }
  }

  private jwtSign(user: UserModel, type: TOKEN_TYPE, expiration: number, csrfToken?: string): Promise<string> {
    return this.jwt.signAsync(
      {
        identity: {
          id: user.id,
          login: user.login,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          applications: user.applications,
          impersonatedFromId: user.impersonatedFromId || undefined,
          impersonatedClientId: user.impersonatedClientId || undefined,
          clientId: user.clientId || undefined
        } satisfies JwtIdentityPayload,
        ...((type === TOKEN_TYPE.ACCESS || type === TOKEN_TYPE.REFRESH) && { csrf: csrfToken })
      },
      {
        secret: this.authConfig.token[type].secret,
        expiresIn: expiration
      }
    )
  }

  csrfValidation(req: FastifyRequest, jwtPayload: JwtPayload, type: TOKEN_TYPE.ACCESS | TOKEN_TYPE.REFRESH): void {
    // ignore safe methods
    if (HTTP_CSRF_IGNORED_METHODS.has(req.method)) {
      return
    }

    // check csrf only for access & refresh cookies
    if (typeof req.cookies !== 'object' || req.cookies[this.authConfig.token[type].name] === undefined) {
      return
    }

    if (!jwtPayload.csrf) {
      this.logger.warn(`${this.csrfValidation.name} - ${CSRF_ERROR.MISSING_JWT}`)
      throw new HttpException(CSRF_ERROR.MISSING_JWT, HttpStatus.FORBIDDEN)
    }

    if (!req.headers[CSRF_KEY]) {
      this.logger.warn(`${this.csrfValidation.name} - ${CSRF_ERROR.MISSING_HEADERS}`)
      throw new HttpException(CSRF_ERROR.MISSING_HEADERS, HttpStatus.FORBIDDEN)
    }

    const csrfHeader: UnsignResult = unsign(req.headers[CSRF_KEY] as string, this.authConfig.token.csrf.secret)
    if (jwtPayload.csrf !== csrfHeader.value) {
      this.logger.warn(`${this.csrfValidation.name} - ${CSRF_ERROR.MISMATCH}`)
      throw new HttpException(CSRF_ERROR.MISMATCH, HttpStatus.FORBIDDEN)
    }
  }
}
