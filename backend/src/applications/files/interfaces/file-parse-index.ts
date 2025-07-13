/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export type FileParseType = 'user' | 'space' | 'share'

export interface FileParseContext {
  realPath: string
  pathPrefix: string
  isDir: boolean
}

export interface FileIndexContext {
  indexSuffix: string
  pathPrefix: string
  regexBasePath: RegExp
  db: Map<number, { name: string; path: string; size: number }>
  fs: Set<number>
}
