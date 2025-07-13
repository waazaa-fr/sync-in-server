/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { ContextInterceptor } from '../../infrastructure/context/interceptors/context.interceptor'
import { ContextManager } from '../../infrastructure/context/services/context-manager.service'
import { SpacesManager } from '../spaces/services/spaces-manager.service'
import { FilesOnlyOfficeController } from './files-only-office.controller'
import { FilesMethods } from './services/files-methods.service'
import { FilesOnlyOfficeManager } from './services/files-only-office-manager.service'

describe(FilesOnlyOfficeController.name, () => {
  let controller: FilesOnlyOfficeController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesOnlyOfficeController],
      providers: [
        { provide: FilesOnlyOfficeManager, useValue: {} },
        { provide: FilesMethods, useValue: {} },
        { provide: SpacesManager, useValue: {} },
        ContextManager,
        ContextInterceptor
      ]
    }).compile()

    controller = module.get<FilesOnlyOfficeController>(FilesOnlyOfficeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
