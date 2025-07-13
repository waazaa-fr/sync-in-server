/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { MySql2Database } from 'drizzle-orm/mysql2'
import * as schema from '../schema'

export type DBSchema = MySql2Database<typeof schema>
