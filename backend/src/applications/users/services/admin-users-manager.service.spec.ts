/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { AuthManager } from '../../../authentication/services/auth-manager.service'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { AdminUsersManager } from './admin-users-manager.service'
import { AdminUsersQueries } from './admin-users-queries.service'
import { UsersManager } from './users-manager.service'
import { UsersQueries } from './users-queries.service'

describe(AdminUsersManager.name, () => {
  let service: AdminUsersManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUsersManager,
        AdminUsersQueries,
        UsersQueries,
        { provide: AuthManager, useValue: {} },
        { provide: UsersManager, useValue: {} },
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        {
          provide: Cache,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<AdminUsersManager>(AdminUsersManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
