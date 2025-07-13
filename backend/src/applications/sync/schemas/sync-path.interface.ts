/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { SyncPathSettings } from '../interfaces/sync-path.interface'
import { syncPaths } from './sync-paths.schema'

type SyncPathSchema = typeof syncPaths.$inferSelect

export class SyncPath implements SyncPathSchema {
  id: number
  clientId: string
  ownerId: number
  spaceId: number
  spaceRootId: number
  shareId: number
  fileId: number
  settings: SyncPathSettings
  createdAt: Date
}
