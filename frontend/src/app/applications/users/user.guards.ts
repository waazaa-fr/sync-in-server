/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { UserService } from './user.service'

export const noUserLinkGuard: CanActivateFn = (): boolean => {
  return !inject(UserService).user.isLink
}

export const onlyUserGuard: CanActivateFn = (): boolean => {
  return inject(UserService).user.isUser
}
