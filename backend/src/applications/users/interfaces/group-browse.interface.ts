/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { GROUP_TYPE } from '../constants/group'
import { USER_GROUP_ROLE } from '../constants/user'
import type { Member } from './member.interface'

export interface GroupBrowse {
  parentGroup: { id: number; name: string; type: GROUP_TYPE; role?: USER_GROUP_ROLE }
  members: Member[]
}
