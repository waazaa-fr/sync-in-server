/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { Mailer } from '../../../infrastructure/mailer/mailer.service'
import { UsersManager } from '../../users/services/users-manager.service'
import { WebSocketNotifications } from '../notifications.gateway'
import { NotificationsManager } from './notifications-manager.service'
import { NotificationsQueries } from './notifications-queries.service'

describe(NotificationsManager.name, () => {
  let service: NotificationsManager

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsManager,
        { provide: UsersManager, useValue: {} },
        {
          provide: Mailer,
          useValue: {}
        },
        { provide: WebSocketNotifications, useValue: {} },
        { provide: NotificationsQueries, useValue: {} }
      ]
    }).compile()

    service = module.get<NotificationsManager>(NotificationsManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
