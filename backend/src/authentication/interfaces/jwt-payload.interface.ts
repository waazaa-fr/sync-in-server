/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export class JwtIdentityPayload {
  id: number
  login: string
  email: string
  fullName: string
  role: number
  applications: string[]
  impersonatedFromId?: number
  impersonatedClientId?: string
  clientId?: string
}

export class JwtPayload {
  identity: JwtIdentityPayload
  csrf?: string
  iat?: number
  exp: number
}
