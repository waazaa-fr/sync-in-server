/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { ContextManager } from '../../../infrastructure/context/services/context-manager.service'
import { FilesQueries } from '../../files/services/files-queries.service'
import { NotificationsManager } from '../../notifications/services/notifications-manager.service'
import { SpacesManager } from '../../spaces/services/spaces-manager.service'
import { UsersQueries } from '../../users/services/users-queries.service'
import { SyncPathsManager } from './sync-paths-manager.service'
import { SyncQueries } from './sync-queries.service'

describe(SyncPathsManager.name, () => {
  let service: SyncPathsManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncPathsManager,
        { provide: ContextManager, useValue: {} },
        { provide: SpacesManager, useValue: {} },
        { provide: UsersQueries, useValue: {} },
        { provide: FilesQueries, useValue: {} },
        { provide: NotificationsManager, useValue: {} },
        {
          provide: SyncQueries,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<SyncPathsManager>(SyncPathsManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
