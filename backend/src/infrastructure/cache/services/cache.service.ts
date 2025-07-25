/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export abstract class Cache {
  abstract defaultTTL: number

  abstract infiniteExpiration: number

  abstract has(key: string): Promise<boolean>

  /*
    pattern must use '*' as wildcard
   */
  abstract keys(pattern: string): Promise<string[]>

  abstract get(key: string): Promise<any>

  abstract mget(keys: string[]): Promise<any[]>

  abstract set(key: string, data: any, ttl?: number): Promise<boolean>

  abstract del(key: string): Promise<boolean>

  abstract mdel(keys: string[]): Promise<boolean>

  abstract genSlugKey(...args: any[]): string

  abstract quit(): Promise<void>
}
