/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { SpacesBrowser } from '../../spaces/services/spaces-browser.service'
import { SpacesManager } from '../../spaces/services/spaces-manager.service'
import { WebDAVSpaces } from './webdav-spaces.service'

describe(WebDAVSpaces.name, () => {
  let service: WebDAVSpaces

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: SpacesBrowser, useValue: {} },
        {
          provide: SpacesManager,
          useValue: {}
        },
        WebDAVSpaces
      ]
    }).compile()

    service = module.get<WebDAVSpaces>(WebDAVSpaces)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
