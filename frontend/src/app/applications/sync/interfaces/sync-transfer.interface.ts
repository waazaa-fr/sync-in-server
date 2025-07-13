/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SYNC_TRANSFER_ACTION, SYNC_TRANSFER_SIDE } from '../constants/transfer'

export interface SyncTransfer {
  ok?: boolean
  name?: string
  side: SYNC_TRANSFER_SIDE
  action: keyof typeof SYNC_TRANSFER_ACTION
  file: string
  isDir: boolean
  fileDst?: string
  mime?: string
  error?: string
  syncPathId?: number
}
