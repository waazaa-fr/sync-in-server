/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export const APP_STORE_URL = 'https://updates.sync-in.org'
export const APP_STORE_DIRNAME = 'releases'
export const APP_STORE_MANIFEST_FILE = 'latest.json'

export enum APP_STORE_REPOSITORY {
  LOCAL = 'local',
  PUBLIC = 'public'
}

export enum APP_STORE_PLATFORM {
  WIN = 'win',
  MAC = 'mac',
  LINUX = 'linux',
  NODE = 'node'
}
