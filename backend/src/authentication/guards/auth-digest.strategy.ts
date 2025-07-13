/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

// import { Injectable } from '@nestjs/common'
// import { PassportStrategy } from '@nestjs/passport'
// import { PinoLogger } from 'nestjs-pino'
// import { DigestStrategy, DigestStrategyOptions } from 'passport-http'
// import { SERVER_NAME } from '../../app.constants'
// import { AuthManager } from '../services/auth-manager.service'
//
// @Injectable()
// export class AuthDigestStrategy extends PassportStrategy(DigestStrategy, 'digest') {
//   constructor(
//     private authManager: AuthManager,
//     private readonly logger: PinoLogger
//   ) {
//     super({ realm: SERVER_NAME } satisfies DigestStrategyOptions)
//   }
//
//   validate(loginOrEmail: string) {
//     // return [loginOrEmail, { ha1: '4befe40c6af915eca11de84be07a1f21' }]
//     return [loginOrEmail, 'password']
//   }
// }
