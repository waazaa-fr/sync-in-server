/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-strategy'

@Injectable()
export class AuthAnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  validate: undefined

  constructor() {
    super()
  }

  authenticate() {
    return this.success({ id: 0, login: 'anonymous' })
  }
}
