/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { SharesQueries } from '../../shares/services/shares-queries.service'
import { SpacesQueries } from '../../spaces/services/spaces-queries.service'
import { FilesIndexer } from '../models/files-indexer'
import { FilesParser } from './files-parser.service'
import { FilesSearchManager } from './files-search-manager.service'

describe(FilesSearchManager.name, () => {
  let service: FilesSearchManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesSearchManager,
        { provide: FilesIndexer, useValue: {} },
        { provide: FilesParser, useValue: {} },
        {
          provide: SpacesQueries,
          useValue: {}
        },
        { provide: SharesQueries, useValue: {} }
      ]
    }).compile()

    service = module.get<FilesSearchManager>(FilesSearchManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
