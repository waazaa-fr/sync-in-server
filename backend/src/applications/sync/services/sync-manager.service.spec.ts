/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { FilesManager } from '../../files/services/files-manager.service'
import { SpacesManager } from '../../spaces/services/spaces-manager.service'
import { SyncManager } from './sync-manager.service'
import { SyncQueries } from './sync-queries.service'

describe(SyncManager.name, () => {
  let service: SyncManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncManager,
        { provide: SpacesManager, useValue: {} },
        { provide: FilesManager, useValue: {} },
        {
          provide: SyncQueries,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<SyncManager>(SyncManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
