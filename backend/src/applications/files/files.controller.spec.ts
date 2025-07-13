/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../infrastructure/context/services/context-manager.service'
import { DB_TOKEN_PROVIDER } from '../../infrastructure/database/constants'
import { LinksQueries } from '../links/services/links-queries.service'
import { NotificationsManager } from '../notifications/services/notifications-manager.service'
import { SharesManager } from '../shares/services/shares-manager.service'
import { SharesQueries } from '../shares/services/shares-queries.service'
import { SpaceGuard } from '../spaces/guards/space.guard'
import { SpacesManager } from '../spaces/services/spaces-manager.service'
import { SpacesQueries } from '../spaces/services/spaces-queries.service'
import { UsersQueries } from '../users/services/users-queries.service'
import { FilesController } from './files.controller'
import { FilesIndexer } from './models/files-indexer'
import { FilesLockManager } from './services/files-lock-manager.service'
import { FilesManager } from './services/files-manager.service'
import { FilesMethods } from './services/files-methods.service'
import { FilesParser } from './services/files-parser.service'
import { FilesQueries } from './services/files-queries.service'
import { FilesRecents } from './services/files-recents.service'
import { FilesSearchManager } from './services/files-search-manager.service'
import { FilesTasksManager } from './services/files-tasks-manager.service'

describe(FilesController.name, () => {
  let filesController: FilesController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FilesController],
      providers: [
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        {
          provide: Cache,
          useValue: {}
        },
        {
          provide: NotificationsManager,
          useValue: {}
        },
        {
          provide: FilesIndexer,
          useValue: {}
        },
        ContextManager,
        SpaceGuard,
        SpacesManager,
        FilesMethods,
        FilesManager,
        FilesTasksManager,
        FilesLockManager,
        FilesQueries,
        SpacesQueries,
        SharesManager,
        LinksQueries,
        SharesQueries,
        UsersQueries,
        FilesRecents,
        FilesSearchManager,
        FilesParser
      ]
    }).compile()

    filesController = module.get<FilesController>(FilesController)
  })

  it('should be defined', () => {
    expect(filesController).toBeDefined()
  })
})
