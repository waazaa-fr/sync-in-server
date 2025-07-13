/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { LINK_ERROR } from '@sync-in-server/backend/src/applications/links/constants/links'

export const LINKS_PATH = {
  LINKS: 'links',
  LINK: 'link',
  AUTH: 'auth'
}

export const LINK_ERROR_TRANSLATION = {
  [LINK_ERROR.NOT_FOUND]: 'The link was not found',
  [LINK_ERROR.DISABLED]: 'The link is disabled',
  [LINK_ERROR.EXPIRED]: 'The link is expired',
  [LINK_ERROR.EXCEEDED]: 'The maximum number of access allowed to the link is exceeded'
}
