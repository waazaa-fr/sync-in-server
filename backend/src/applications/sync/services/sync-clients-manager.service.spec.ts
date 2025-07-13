/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthMethod } from '../../../authentication/models/auth-method'
import { AuthManager } from '../../../authentication/services/auth-manager.service'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { UsersQueries } from '../../users/services/users-queries.service'
import { SyncClientsManager } from './sync-clients-manager.service'
import { SyncQueries } from './sync-queries.service'

describe(SyncClientsManager.name, () => {
  let service: SyncClientsManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncClientsManager,
        { provide: Cache, useValue: {} },
        { provide: HttpService, useValue: {} },
        { provide: SyncQueries, useValue: {} },
        { provide: UsersQueries, useValue: {} },
        { provide: AuthManager, useValue: {} },
        {
          provide: AuthMethod,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<SyncClientsManager>(SyncClientsManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
