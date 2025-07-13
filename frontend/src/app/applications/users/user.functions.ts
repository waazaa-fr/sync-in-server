/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { API_USERS_AVATAR } from '@sync-in-server/backend/src/applications/users/constants/routes'

export function userAvatarUrl(login: string) {
  return `${API_USERS_AVATAR}/${login}`
}

export function myAvatarUrl() {
  return `${userAvatarUrl('me')}?random=${Math.floor(Math.random() * 1000)}`
}
