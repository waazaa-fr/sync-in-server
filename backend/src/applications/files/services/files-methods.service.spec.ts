/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { SpacesManager } from '../../spaces/services/spaces-manager.service'
import { FilesManager } from './files-manager.service'
import { FilesMethods } from './files-methods.service'

describe(FilesMethods.name, () => {
  let filesMethods: FilesMethods

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        FilesMethods,
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        { provide: SpacesManager, useValue: {} },
        { provide: FilesManager, useValue: {} }
      ]
    }).compile()

    filesMethods = module.get<FilesMethods>(FilesMethods)
  })

  it('should be defined', () => {
    expect(filesMethods).toBeDefined()
  })
})
