/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export enum SYNC_PATH_ACTION {
  LIST = 'list',
  SYNC = 'sync',
  ADD = 'add',
  FLUSH = 'flush',
  SET = 'set',
  REMOVE = 'remove'
}

export enum SYNC_PATH_FILTER_TYPE {
  FILE = 'file',
  FOLDER = 'folder',
  EXPERT = 'expert',
  START = 'start',
  END = 'end',
  IN = 'in'
}
