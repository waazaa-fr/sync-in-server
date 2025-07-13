/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { ShareMembers } from '../../shares/schemas/share-members.interface'
import type { User } from '../../users/schemas/user.interface'
import type { Link } from '../schemas/link.interface'

export type LinkGuest = Link &
  Pick<User, 'language' | 'isActive' | 'currentIp' | 'lastIp' | 'currentAccess' | 'lastAccess' | 'createdAt'> &
  Pick<ShareMembers, 'permissions'>

export type LinkAsUser = Link & { user: Omit<User, 'password'> }
