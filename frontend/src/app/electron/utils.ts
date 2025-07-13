/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SYNC_IN_SERVER_AGENT } from '@sync-in-server/backend/src/applications/sync/constants/sync'

export const electronAgentRegexp = new RegExp(`${SYNC_IN_SERVER_AGENT}`, 'i')

export function checkIfElectronApp(): boolean {
  return !!electronAgentRegexp.test(window.navigator.userAgent)
}
