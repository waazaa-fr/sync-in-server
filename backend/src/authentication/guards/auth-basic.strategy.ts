/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { FastifyRequest } from 'fastify'
import { PinoLogger } from 'nestjs-pino'
import { BasicStrategy } from 'passport-http'
import { SERVER_NAME } from '../../app.constants'
import { UserModel } from '../../applications/users/models/user.model'
import { Cache } from '../../infrastructure/cache/services/cache.service'
import { AuthMethod } from '../models/auth-method'

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  static readonly CACHE_TTL = 900

  constructor(
    private readonly authMethod: AuthMethod,
    private readonly cache: Cache,
    private readonly logger: PinoLogger
  ) {
    super({ passReqToCallback: true, realm: SERVER_NAME })
  }

  // not declared properly:  https://github.com/nestjs/passport/issues/929
  async validate(req: FastifyRequest, loginOrEmail: string, password: string): Promise<Omit<UserModel, 'password'> | null> {
    this.logger.assign({ user: loginOrEmail })
    const authBasicUser = `auth-webdav-${req.headers['authorization'].split(' ').at(-1).toLowerCase()}`
    const userFromCache: any = await this.cache.get(authBasicUser)
    if (userFromCache === null) {
      // not authorized
      return null
    }
    if (userFromCache !== undefined) {
      // cached
      return plainToInstance(UserModel, userFromCache)
    }
    const userFromDB: UserModel = await this.authMethod.validateUser(loginOrEmail, password, req.ip)
    if (userFromDB !== null) {
      userFromDB.removePassword()
    }
    const userToCache: Record<string, any> | null = userFromDB ? instanceToPlain(userFromDB, { excludePrefixes: ['_'] }) : null
    this.cache.set(authBasicUser, userToCache, AuthBasicStrategy.CACHE_TTL).catch((e: Error) => this.logger.error(`${this.validate.name} - ${e}`))
    return userFromDB
  }
}
