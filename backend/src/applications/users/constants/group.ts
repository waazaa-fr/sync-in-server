/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export enum GROUP_TYPE {
  USER,
  PERSONAL
}

export enum GROUP_VISIBILITY {
  VISIBLE, // default
  PRIVATE, // non-member users cannot see this group (default for personal group type)
  ISOLATED // hidden, its members cannot see it and cannot see each other
}
