/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { FastifyRequest } from 'fastify'
import { PinoLogger } from 'nestjs-pino'
import { Strategy } from 'passport-local'
import type { UserModel } from '../../applications/users/models/user.model'
import { AuthMethod } from '../models/auth-method'

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy, 'local') implements Strategy {
  constructor(
    private readonly authMethod: AuthMethod,
    private readonly logger: PinoLogger
  ) {
    super({ usernameField: 'login', passwordField: 'password', passReqToCallback: true })
  }

  // not declared properly:  https://github.com/nestjs/passport/issues/929
  async validate(req: FastifyRequest, loginOrEmail: string, password: string): Promise<UserModel> {
    this.logger.assign({ user: loginOrEmail })
    const user: UserModel = await this.authMethod.validateUser(loginOrEmail, password, req.ip)
    if (user) {
      user.removePassword()
      return user
    }
    throw new UnauthorizedException('Wrong login or password')
  }
}
