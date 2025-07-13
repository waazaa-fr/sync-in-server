/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { FilesIndexerMySQL } from './adapters/files-indexer-mysql.service'
import { FilesOnlyOfficeController } from './files-only-office.controller'
import { FilesTasksController } from './files-tasks.controller'
import { FilesController } from './files.controller'
import { FilesOnlyOfficeGuard } from './guards/files-only-office.guard'
import { FilesOnlyOfficeStrategy } from './guards/files-only-office.strategy'
import { FilesIndexer } from './models/files-indexer'
import { FilesContentManager } from './services/files-content-manager.service'
import { FilesLockManager } from './services/files-lock-manager.service'
import { FilesManager } from './services/files-manager.service'
import { FilesMethods } from './services/files-methods.service'
import { FilesOnlyOfficeManager } from './services/files-only-office-manager.service'
import { FilesParser } from './services/files-parser.service'
import { FilesQueries } from './services/files-queries.service'
import { FilesRecents } from './services/files-recents.service'
import { FilesScheduler } from './services/files-scheduler.service'
import { FilesSearchManager } from './services/files-search-manager.service'
import { FilesTasksManager } from './services/files-tasks-manager.service'

@Module({
  controllers: [FilesController, FilesTasksController, FilesOnlyOfficeController],
  providers: [
    FilesMethods,
    FilesManager,
    FilesQueries,
    FilesLockManager,
    FilesTasksManager,
    FilesScheduler,
    FilesRecents,
    FilesOnlyOfficeManager,
    FilesOnlyOfficeGuard,
    FilesOnlyOfficeStrategy,
    FilesParser,
    FilesContentManager,
    { provide: FilesIndexer, useClass: FilesIndexerMySQL },
    FilesSearchManager
  ],
  exports: [FilesManager, FilesQueries, FilesLockManager, FilesMethods, FilesRecents]
})
export class FilesModule {}
