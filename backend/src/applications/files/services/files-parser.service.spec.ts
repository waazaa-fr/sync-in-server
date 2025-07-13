/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { FilesParser } from './files-parser.service'

describe(FilesParser.name, () => {
  let service: FilesParser

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesParser, { provide: DB_TOKEN_PROVIDER, useValue: {} }]
    }).compile()

    service = module.get<FilesParser>(FilesParser)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
