/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { SyncDiffGzipBodyInterceptor } from './interceptors/sync-diff-gzip-body.interceptor'
import { SyncClientsManager } from './services/sync-clients-manager.service'
import { SyncManager } from './services/sync-manager.service'
import { SyncPathsManager } from './services/sync-paths-manager.service'
import { SyncQueries } from './services/sync-queries.service'
import { SyncController } from './sync.controller'

@Module({
  controllers: [SyncController],
  providers: [SyncDiffGzipBodyInterceptor, SyncClientsManager, SyncQueries, SyncPathsManager, SyncManager]
})
export class SyncModule {}
