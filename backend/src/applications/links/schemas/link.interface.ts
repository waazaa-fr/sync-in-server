/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { links } from './links.schema'

type LinkSchema = typeof links.$inferSelect

export class Link implements LinkSchema {
  id: number
  uuid: string
  userId: number
  name: string
  email: string
  requireAuth: boolean
  nbAccess: number
  limitAccess: number
  expiresAt: Date
  createdAt: Date
}
