/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { FileSpace } from '../../files/interfaces/file-space.interface'
import type { LinkGuest } from '../../links/interfaces/link-guest.interface'
import type { Share } from '../schemas/share.interface'

export interface ShareLink extends Pick<Share, 'id' | 'name' | 'ownerId' | 'description'> {
  id: number
  ownerId: number
  name: string
  externalPath: string
  description: string
  parent: Pick<Share, 'id' | 'ownerId' | 'alias' | 'name'>
  file: FileSpace
  link: Omit<LinkGuest, 'userId'>
}
