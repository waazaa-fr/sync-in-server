/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from '../../infrastructure/cache/services/cache.service'
import { FilesTasksController } from './files-tasks.controller'
import { FilesMethods } from './services/files-methods.service'
import { FilesTasksManager } from './services/files-tasks-manager.service'

describe(FilesTasksController.name, () => {
  let controller: FilesTasksController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesTasksController],
      providers: [
        {
          provide: Cache,
          useValue: {}
        },
        { provide: FilesMethods, useValue: {} },
        FilesTasksManager
      ]
    }).compile()

    controller = module.get<FilesTasksController>(FilesTasksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
