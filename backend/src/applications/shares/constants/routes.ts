/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { APP_BASE_ROUTE } from '../../applications.constants'

export const SHARES_ROUTE = {
  BASE: `${APP_BASE_ROUTE}/shares`,
  LIST: 'list',
  CHILDREN: 'children',
  LINKS: 'links',
  LINKS_LIST: 'links/list',
  LINKS_UUID: 'links/uuid'
}

export const API_SHARES_LIST = `${SHARES_ROUTE.BASE}/${SHARES_ROUTE.LIST}`
export const API_SHARES_LINKS = `${SHARES_ROUTE.BASE}/${SHARES_ROUTE.LINKS}`
export const API_SHARES_LINKS_LIST = `${SHARES_ROUTE.BASE}/${SHARES_ROUTE.LINKS_LIST}`
export const API_SHARES_LINKS_UUID = `${SHARES_ROUTE.BASE}/${SHARES_ROUTE.LINKS_UUID}`
