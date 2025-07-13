/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { sharesMembers } from './shares-members.schema'

type ShareMembersSchema = typeof sharesMembers.$inferSelect

export class ShareMembers implements ShareMembersSchema {
  id: number
  shareId: number
  userId: number
  groupId: number
  linkId: number
  permissions: string
  createdAt: Date
  modifiedAt: Date
}
