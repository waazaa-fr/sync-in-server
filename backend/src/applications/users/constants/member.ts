/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export enum MEMBER_TYPE {
  USER = 'user',
  GUEST = 'guest',
  LINK = 'link',
  GROUP = 'group',
  PGROUP = 'personal group'
}

export const MEMBER_TYPE_REVERSE = {
  user: 'user',
  guest: 'guest',
  link: 'user',
  group: 'group',
  ['personal group']: 'personal group'
}
