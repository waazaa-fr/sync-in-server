/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { JwtIdentityPayload } from '../../../authentication/interfaces/jwt-payload.interface'

export const GetWsUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): JwtIdentityPayload => {
  return ctx.switchToWs().getClient().user
})
