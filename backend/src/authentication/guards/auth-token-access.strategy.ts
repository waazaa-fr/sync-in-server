/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { PinoLogger } from 'nestjs-pino'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from '../../applications/users/models/user.model'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { TOKEN_TYPE } from '../interfaces/token.interface'
import { AuthManager } from '../services/auth-manager.service'

@Injectable()
export class AuthTokenAccessStrategy extends PassportStrategy(Strategy, 'tokenAccess') {
  private static accessCookieName: string

  constructor(
    private readonly authManager: AuthManager,
    private readonly logger: PinoLogger
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AuthTokenAccessStrategy.extractJWTFromCookie, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: authManager.authConfig.token.access.secret,
      ignoreExpiration: false,
      passReqToCallback: true
    })
    AuthTokenAccessStrategy.accessCookieName = authManager.authConfig.token.access.name
  }

  // not declared properly:  https://github.com/nestjs/passport/issues/929
  validate(req: FastifyRequest, jwtPayload: JwtPayload): UserModel {
    this.logger.assign({ user: jwtPayload.identity.login })
    this.authManager.csrfValidation(req, jwtPayload, TOKEN_TYPE.ACCESS)
    return new UserModel(jwtPayload.identity)
  }

  static extractJWTFromCookie(req: FastifyRequest): string | null {
    if (typeof req.cookies === 'object' && req.cookies[AuthTokenAccessStrategy.accessCookieName] !== undefined) {
      return req.cookies[AuthTokenAccessStrategy.accessCookieName]
    }
    return null
  }
}
