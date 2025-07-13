/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SyncClientInfo } from '../interfaces/sync-client.interface'
import type { syncClients } from './sync-clients.schema'

type SyncClientSchema = typeof syncClients.$inferSelect

export class SyncClient implements SyncClientSchema {
  id: string
  ownerId: number
  token: string
  tokenExpiration: number
  info: SyncClientInfo
  enabled: boolean
  currentIp: string
  lastIp: string
  currentAccess: Date
  lastAccess: Date
  createdAt: Date
}
