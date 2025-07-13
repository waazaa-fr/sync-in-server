/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { files } from './files.schema'

type FileSchema = typeof files.$inferSelect

export class File implements FileSchema {
  id: number
  ownerId: number
  spaceId: number
  spaceExternalRootId: number
  shareExternalId: number
  path: string
  name: string
  isDir: boolean
  inTrash: boolean
  mime: string
  size: number
  mtime: number
  ctime: number
}
