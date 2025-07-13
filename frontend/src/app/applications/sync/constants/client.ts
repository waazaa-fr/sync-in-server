/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export enum CLIENT_SCHEDULER_STATE {
  DISABLED = 'disabled',
  ASYNC = 'async',
  SEQ = 'seq'
}

export enum CLIENT_APP_COUNTER {
  NOTIFICATIONS = 'notifications',
  TASKS = 'tasks',
  SYNCS = 'syncs'
}
