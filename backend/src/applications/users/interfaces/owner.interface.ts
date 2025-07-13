/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export interface Owner {
  id?: number
  login: string
  email: string
  fullName: string
  currentAccess?: Date
  createdAt?: Date
}
