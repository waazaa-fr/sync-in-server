/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../models/user.model'

export const GetUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserModel => {
  return ctx.switchToHttp().getRequest().user
})
