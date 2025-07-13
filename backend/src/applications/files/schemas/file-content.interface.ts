/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export interface FileContent {
  id: number
  path: string
  name: string
  mime: string
  size: number
  mtime: number
  // used for inserts
  content?: string
  // used for search
  matches?: string[]
  // used for search
  score?: number
}
