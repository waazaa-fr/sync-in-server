/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { cache } from './mysql-cache.schema'

type MysqlCacheSchema = typeof cache.$inferSelect

export class MysqlCache implements MysqlCacheSchema {
  key: string
  value: any
  expiration: number
}
