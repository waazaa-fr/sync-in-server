/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Config, defineConfig } from 'drizzle-kit'
import { configLoader } from '../../configuration/config.loader'
import { MIGRATIONS_PATH, SCHEMA_PATH } from './constants'

export default defineConfig({
  schema: SCHEMA_PATH,
  out: MIGRATIONS_PATH,
  strict: false,
  dialect: 'mysql',
  url: configLoader().mysql.url,
  tablesFilter: ['files_content_*']
} as Config)
