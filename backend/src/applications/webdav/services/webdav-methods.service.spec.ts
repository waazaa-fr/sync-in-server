/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { FilesLockManager } from '../../files/services/files-lock-manager.service'
import { FilesManager } from '../../files/services/files-manager.service'
import { WebDAVMethods } from './webdav-methods.service'
import { WebDAVSpaces } from './webdav-spaces.service'

describe(WebDAVMethods.name, () => {
  let service: WebDAVMethods

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebDAVMethods,
        { provide: WebDAVSpaces, useValue: {} },
        {
          provide: FilesManager,
          useValue: {}
        },
        { provide: FilesLockManager, useValue: {} }
      ]
    }).compile()

    service = module.get<WebDAVMethods>(WebDAVMethods)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
