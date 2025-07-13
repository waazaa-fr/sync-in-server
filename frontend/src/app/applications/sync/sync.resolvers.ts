/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { SyncService } from './services/sync.service'

export const syncPathsResolver: ResolveFn<any> = (): Promise<void> => {
  return inject(SyncService).refreshPaths()
}
