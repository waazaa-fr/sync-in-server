/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { filesRecents } from './files-recents.schema'

type FileRecentSchema = typeof filesRecents.$inferSelect

export class FileRecent implements FileRecentSchema {
  id: number
  ownerId: number
  spaceId: number
  shareId: number
  path: string
  name: string
  mime: string
  mtime: number
}
