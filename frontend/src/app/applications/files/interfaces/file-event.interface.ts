/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FileTaskStatus } from '@sync-in-server/backend/src/applications/files/models/file-task'

export interface FileEvent {
  filePath: string
  fileName?: string
  fileDstPath?: string
  reload?: boolean
  delete?: boolean
  focus?: boolean
  archiveId?: string
  // special case on move task, the src is removed, the dst is added
  reloadFocusOnDst?: boolean
  status?: FileTaskStatus
}
