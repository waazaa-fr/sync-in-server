/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Logger } from '@nestjs/common'
import { Logger as DrizzleLogger } from 'drizzle-orm/logger.js'

export class DatabaseLogger extends Logger implements DrizzleLogger {
  logQuery(message: string, params: unknown[]) {
    super.verbose(`${message} | PARAMS: [${params}]`, 'DB')
  }
}
