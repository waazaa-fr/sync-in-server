/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Reflector } from '@nestjs/core'
import type { USER_PERMISSION } from '../constants/user'

export const UserHavePermission = Reflector.createDecorator<USER_PERMISSION | USER_PERMISSION[]>()
