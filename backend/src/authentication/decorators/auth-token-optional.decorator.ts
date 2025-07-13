/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthTokenSkip } from './auth-token-skip.decorator'

export const AuthTokenOptional = () => {
  // skip global auth access guard and apply guards successively to context
  return applyDecorators(AuthTokenSkip(), UseGuards(AuthGuard(['tokenAccess', 'anonymous'])))
}
