/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../../infrastructure/context/services/context-manager.service'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { FilesQueries } from '../../files/services/files-queries.service'
import { NotificationsManager } from '../../notifications/services/notifications-manager.service'
import { SharesQueries } from '../../shares/services/shares-queries.service'
import { SpacesQueries } from '../../spaces/services/spaces-queries.service'
import { CommentsManager } from './comments-manager.service'
import { CommentsQueries } from './comments-queries.service'

describe(CommentsManager.name, () => {
  let service: CommentsManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DB_TOKEN_PROVIDER,
          useValue: {}
        },
        { provide: Cache, useValue: {} },
        { provide: NotificationsManager, useValue: {} },
        ContextManager,
        CommentsManager,
        CommentsQueries,
        FilesQueries,
        SpacesQueries,
        SharesQueries
      ]
    }).compile()

    service = module.get<CommentsManager>(CommentsManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
