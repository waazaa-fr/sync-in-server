/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { spacesMembers } from './spaces-members.schema'

type SpaceMembersSchema = typeof spacesMembers.$inferSelect

export class SpaceMembers implements SpaceMembersSchema {
  id: number
  role: number
  spaceId: number
  userId: number
  groupId: number
  linkId: number
  permissions: string
  createdAt: Date
  modifiedAt: Date
}
