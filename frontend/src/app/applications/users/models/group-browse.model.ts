/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { GroupBrowse } from '@sync-in-server/backend/src/applications/users/interfaces/group-browse.interface'
import { MemberModel } from './member.model'

export class GroupBrowseModel implements GroupBrowse {
  parentGroup: GroupBrowse['parentGroup']
  members: MemberModel[]

  constructor(browse: GroupBrowse) {
    this.parentGroup = browse.parentGroup
    this.members = browse.members.map((m) => new MemberModel(m))
  }
}
