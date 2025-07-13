/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { FilesLockManager } from './files-lock-manager.service'

describe(FilesLockManager.name, () => {
  let module: TestingModule
  let filesLockManager: FilesLockManager

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [FilesLockManager, { provide: DB_TOKEN_PROVIDER, useValue: {} }, { provide: Cache, useValue: {} }]
    }).compile()

    filesLockManager = module.get<FilesLockManager>(FilesLockManager)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(filesLockManager).toBeDefined()
  })
})
