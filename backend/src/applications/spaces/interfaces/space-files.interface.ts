/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { FileProps } from '../../files/interfaces/file-props.interface'

export interface SpaceFiles {
  files: FileProps[]
  hasRoots: boolean
  permissions: string
}
