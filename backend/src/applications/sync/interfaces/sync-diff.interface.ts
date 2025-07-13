/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

// use FSTAT positions for stats array
import { F_SPECIAL_STAT } from '../constants/sync'

export type SyncFileStats = [boolean, number, number, number, string | null]

export type SyncFileSpecialStats = [F_SPECIAL_STAT, string | boolean]
