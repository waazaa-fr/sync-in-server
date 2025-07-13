/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthManager } from '../../authentication/services/auth-manager.service'
import { Cache } from '../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../infrastructure/context/services/context-manager.service'
import { DB_TOKEN_PROVIDER } from '../../infrastructure/database/constants'
import { FilesLockManager } from '../files/services/files-lock-manager.service'
import { FilesManager } from '../files/services/files-manager.service'
import { FilesQueries } from '../files/services/files-queries.service'
import { NotificationsManager } from '../notifications/services/notifications-manager.service'
import { SharesManager } from '../shares/services/shares-manager.service'
import { SharesQueries } from '../shares/services/shares-queries.service'
import { SpacesManager } from '../spaces/services/spaces-manager.service'
import { SpacesQueries } from '../spaces/services/spaces-queries.service'
import { AdminUsersManager } from '../users/services/admin-users-manager.service'
import { AdminUsersQueries } from '../users/services/admin-users-queries.service'
import { UsersManager } from '../users/services/users-manager.service'
import { UsersQueries } from '../users/services/users-queries.service'
import { LinksController } from './links.controller'
import { LinksManager } from './services/links-manager.service'
import { LinksQueries } from './services/links-queries.service'

describe(LinksController.name, () => {
  let controller: LinksController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        {
          provide: Cache,
          useValue: {}
        },
        { provide: ContextManager, useValue: {} },
        {
          provide: NotificationsManager,
          useValue: {}
        },
        { provide: HttpService, useValue: {} },
        { provide: FilesLockManager, useValue: {} },
        ConfigService,
        JwtService,
        AuthManager,
        LinksManager,
        LinksQueries,
        UsersManager,
        UsersQueries,
        AdminUsersManager,
        AdminUsersQueries,
        SpacesManager,
        SpacesQueries,
        FilesManager,
        FilesQueries,
        SharesManager,
        SharesQueries
      ]
    }).compile()

    controller = module.get<LinksController>(LinksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
