/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { usersGroups } from './users-groups.schema'

type UserGroupSchema = typeof usersGroups.$inferSelect

export class UserGroup implements UserGroupSchema {
  userId: number
  groupId: number
  role: number
  createdAt: Date
}
