/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { APP_BASE_ROUTE } from '../../applications.constants'

export const NOTIFICATIONS_ROUTE = {
  BASE: `${APP_BASE_ROUTE}/notifications`,
  UNREAD: 'unread'
} as const

export const API_NOTIFICATIONS = NOTIFICATIONS_ROUTE.BASE
