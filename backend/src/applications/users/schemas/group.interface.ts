/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { groups } from './groups.schema'

type GroupSchema = typeof groups.$inferSelect

export class Group implements GroupSchema {
  id: number
  name: string
  description: string
  type: number
  visibility: number
  parentId: number
  permissions: string
  createdAt: Date
  modifiedAt: Date
}
