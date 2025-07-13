/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Reflector } from '@nestjs/core'
import { USER_ROLE } from '../constants/user'

export const UserHaveRole = Reflector.createDecorator<USER_ROLE>()
