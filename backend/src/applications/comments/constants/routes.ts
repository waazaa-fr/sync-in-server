/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */
import { APP_BASE_ROUTE } from '../../applications.constants'

export const COMMENTS_ROUTE = {
  BASE: `${APP_BASE_ROUTE}/comments`,
  RECENTS: 'recents',
  SPACES: 'spaces'
}

export const API_COMMENTS_FROM_SPACE = `${COMMENTS_ROUTE.BASE}/${COMMENTS_ROUTE.SPACES}`
export const API_COMMENTS_RECENTS = `${COMMENTS_ROUTE.BASE}/${COMMENTS_ROUTE.RECENTS}`
