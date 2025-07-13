/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { Owner } from '../../users/interfaces/owner.interface'

export interface CommentRecent {
  id: number
  content: string
  modifiedAt: Date
  author: Owner
  file: { name: string; path: string; mime: string; inTrash: number; fromSpace: number; fromShare: number }
}
