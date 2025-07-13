/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export const LINK_ERROR = {
  UNAUTHORIZED: 'unauthorized',
  DISABLED: 'disabled',
  EXCEEDED: 'exceeded',
  EXPIRED: 'expired',
  NOT_FOUND: 'not found'
} as const

export enum LINK_TYPE {
  SPACE = 'space',
  SHARE = 'share'
}
