/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SetMetadata } from '@nestjs/common'

export const AUTH_TOKEN_SKIP = 'authTokenSkip'
export const AuthTokenSkip = () => SetMetadata(AUTH_TOKEN_SKIP, true)
