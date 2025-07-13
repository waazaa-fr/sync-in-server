/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { spacesRoots } from './spaces-roots.schema'

type SpaceRootSchema = typeof spacesRoots.$inferSelect

export class SpaceRoot implements SpaceRootSchema {
  id: number
  alias: string
  name: string
  spaceId: number
  ownerId: number
  fileId: number
  externalPath: string
  permissions: string
  createdAt: Date
  modifiedAt: Date
}
