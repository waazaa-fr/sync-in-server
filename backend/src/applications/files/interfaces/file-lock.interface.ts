/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Owner } from '../../users/interfaces/owner.interface'
import { LOCK_DEPTH } from '../../webdav/constants/webdav'
import { WebDAVLock } from '../../webdav/interfaces/webdav.interface'

export interface FileLock {
  owner: Owner
  dbFilePath: string
  key: string
  depth: LOCK_DEPTH
  expiration: number
  davLock?: WebDAVLock
}
