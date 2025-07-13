/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Owner } from '../../users/interfaces/owner.interface'
import type { comments } from './comments.schema'

type CommentSchema = typeof comments.$inferSelect

export class Comment implements CommentSchema {
  id: number
  userId: number
  fileId: number
  content: string
  createdAt: Date
  modifiedAt: Date

  // extra properties
  author: Owner & { isAuthor: boolean }
  isFileOwner: boolean
}
