/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { USER_ONLINE_STATUS } from '../constants/user'

export interface UserOnline {
  id: number
  login: string
  email: string
  fullName: string
  onlineStatus: USER_ONLINE_STATUS
}

export interface EventUpdateOnlineStatus {
  userId: number
  status: USER_ONLINE_STATUS
}

export interface EventChangeOnlineStatus {
  status: USER_ONLINE_STATUS
  store: boolean
}
