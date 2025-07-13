/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export const RECENTS_PATH = {
  BASE: 'recents'
} as const

export const RECENTS_TITLE = 'Recents'

export const RECENTS_ICON: IconDefinition = faClock
