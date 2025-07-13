/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { GROUP_TYPE, GROUP_VISIBILITY } from '../constants/group'
import type { Group } from '../schemas/group.interface'

export interface AdminGroup extends Omit<Group, 'parentId' | 'type'> {
  id: number
  name: string
  type: GROUP_TYPE
  description: string
  permissions: string
  visibility: GROUP_VISIBILITY
  createdAt: Date
  modifiedAt: Date
  parent: Pick<Group, 'id' | 'name'>
}
