/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { USER_GROUP_ROLE } from '@sync-in-server/backend/src/applications/users/constants/user'
import type { OwnerType } from './owner.interface'

export interface GroupType {
  id: number
  name: string
  role?: USER_GROUP_ROLE
  members: OwnerType[]
}
