/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { SpaceEnv } from '../models/space-env.model'

export const GetSpace = createParamDecorator((_data: unknown, ctx: ExecutionContext): SpaceEnv => {
  return ctx.switchToHttp().getRequest().space
})
