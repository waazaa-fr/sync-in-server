/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { drizzle } from 'drizzle-orm/mysql2'
import { configLoader } from '../../../configuration/config.loader'
import * as schema from '../schema'

export async function getDB() {
  return drizzle(configLoader().mysql.url, { schema: { ...schema }, mode: 'default' })
}
