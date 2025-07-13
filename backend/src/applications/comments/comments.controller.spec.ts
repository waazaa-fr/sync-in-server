/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../infrastructure/context/services/context-manager.service'
import { DB_TOKEN_PROVIDER } from '../../infrastructure/database/constants'
import { FilesQueries } from '../files/services/files-queries.service'
import { LinksQueries } from '../links/services/links-queries.service'
import { NotificationsManager } from '../notifications/services/notifications-manager.service'
import { SharesManager } from '../shares/services/shares-manager.service'
import { SharesQueries } from '../shares/services/shares-queries.service'
import { SpacesManager } from '../spaces/services/spaces-manager.service'
import { SpacesQueries } from '../spaces/services/spaces-queries.service'
import { UsersQueries } from '../users/services/users-queries.service'
import { CommentsController } from './comments.controller'
import { CommentsManager } from './services/comments-manager.service'
import { CommentsQueries } from './services/comments-queries.service'

describe(CommentsController.name, () => {
  let controller: CommentsController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        { provide: NotificationsManager, useValue: {} },
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        { provide: Cache, useValue: {} },
        ContextManager,
        CommentsManager,
        CommentsQueries,
        SpacesManager,
        SpacesQueries,
        FilesQueries,
        SharesManager,
        SharesQueries,
        UsersQueries,
        LinksQueries
      ]
    }).compile()

    controller = module.get<CommentsController>(CommentsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
