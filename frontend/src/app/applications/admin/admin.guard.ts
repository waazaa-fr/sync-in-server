/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */
import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { UserService } from '../users/user.service'

export const adminGuard: CanActivateFn = (): boolean => {
  return inject(UserService).user.isAdmin
}
