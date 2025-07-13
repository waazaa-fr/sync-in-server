/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { FileProps } from '../../files/interfaces/file-props.interface'
import type { Owner } from '../../users/interfaces/owner.interface'
import type { SpaceRoot } from '../schemas/space-root.interface'

export class SpaceRootProps implements Partial<SpaceRoot> {
  id: number
  alias: string
  name: string
  permissions: string
  createdAt?: Date
  externalPath?: string
  owner?: Owner | any
  file: FileProps | any
}
