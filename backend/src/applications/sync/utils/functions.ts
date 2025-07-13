/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import path from 'node:path'
import { SYNC_FILE_NAME_PREFIX } from '../constants/sync'

export function getTmpFilePath(rPath: string): string {
  return `${path.dirname(rPath)}/${SYNC_FILE_NAME_PREFIX}${path.basename(rPath)}`
}
