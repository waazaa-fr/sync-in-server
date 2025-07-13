/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { FileProps } from './file-props.interface'

export interface FileTree extends Pick<FileProps, 'id' | 'name' | 'path' | 'isDir' | 'mime'> {
  hasChildren: boolean
  inShare: boolean
  enabled: boolean
  permissions: string
  quotaIsExceeded: boolean
}
