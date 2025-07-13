/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export interface SpaceLink {
  share?: { name: string; alias: string; hasParent: boolean; isDir: boolean; mime: string }
  space?: { name: string; alias: string }
  owner?: { login?: string; fullName: string; avatar?: string }
}
