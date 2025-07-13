/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FileContent } from '../schemas/file-content.interface'

export abstract class FilesIndexer {
  abstract indexesList(): Promise<string[]>

  abstract getIndexName(indexSuffix: string): string

  abstract existingIndexes(indexSuffixes: string[]): Promise<string[]>

  abstract createIndex(indexName: string): Promise<boolean>

  abstract dropIndex(indexName: string): Promise<boolean>

  abstract insertRecord(indexName: string, fc: FileContent): Promise<void>

  abstract searchRecords(indexNames: string[], search: string, limit: number): Promise<FileContent[]>

  abstract getRecordStats(indexName: string, path?: string): Promise<Map<number, { name: string; path: string; size: number }>>

  abstract deleteRecords(indexName: string, ids: number[]): Promise<void>

  abstract cleanIndexes(indexSuffixes: string[]): Promise<void>
}
