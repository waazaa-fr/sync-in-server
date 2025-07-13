/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FileLock } from '../interfaces/file-lock.interface'

export class LockConflict extends Error {
  lock: FileLock

  constructor(lock: FileLock, message: string) {
    super(message)
    this.name = LockConflict.name
    this.lock = lock
  }
}
