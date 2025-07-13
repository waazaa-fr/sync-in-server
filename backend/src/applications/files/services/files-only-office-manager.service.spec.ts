/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { HttpService } from '@nestjs/axios'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../../infrastructure/context/services/context-manager.service'
import { UsersManager } from '../../users/services/users-manager.service'
import { FilesLockManager } from './files-lock-manager.service'
import { FilesOnlyOfficeManager } from './files-only-office-manager.service'
import { FilesQueries } from './files-queries.service'

describe(FilesOnlyOfficeManager.name, () => {
  let service: FilesOnlyOfficeManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesOnlyOfficeManager,
        ContextManager,
        { provide: HttpService, useValue: {} },
        {
          provide: Cache,
          useValue: {}
        },
        { provide: JwtService, useValue: {} },
        { provide: UsersManager, useValue: {} },
        { provide: FilesLockManager, useValue: {} },
        { provide: FilesQueries, useValue: {} }
      ]
    }).compile()

    service = module.get<FilesOnlyOfficeManager>(FilesOnlyOfficeManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
