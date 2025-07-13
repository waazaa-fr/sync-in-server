/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { TOKEN_TYPE } from '../interfaces/token.interface'
import { API_AUTH_REFRESH, API_AUTH_WS } from './routes'

export const CSRF_KEY = 'sync-in-csrf'
export const WS_KEY = 'sync-in-ws'

export const TOKEN_PATHS = { access: '/', refresh: API_AUTH_REFRESH, ws: API_AUTH_WS, csrf: '/' } as const
export const TOKEN_TYPES: TOKEN_TYPE[] = [TOKEN_TYPE.REFRESH, TOKEN_TYPE.ACCESS, TOKEN_TYPE.WS, TOKEN_TYPE.CSRF] as const

export const CSRF_ERROR = {
  MISSING_JWT: 'Missing CSRF in JWT',
  MISSING_HEADERS: 'Missing CSRF in headers',
  MISMATCH: 'CSRF mismatch'
} as const
