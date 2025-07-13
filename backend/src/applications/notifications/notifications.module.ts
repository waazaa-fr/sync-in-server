/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { NotificationsController } from './notifications.controller'
import { WebSocketNotifications } from './notifications.gateway'
import { NotificationsManager } from './services/notifications-manager.service'
import { NotificationsQueries } from './services/notifications-queries.service'

@Module({
  controllers: [NotificationsController],
  providers: [WebSocketNotifications, NotificationsManager, NotificationsQueries],
  exports: [NotificationsManager]
})
export class NotificationsModule {}
