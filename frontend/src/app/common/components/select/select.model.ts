/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export class SelectItem {
  id: string
  name: string
  description: string

  constructor(source: any) {
    if (typeof source === 'string') {
      this.id = this.name = source
      this.description = ''
    }
    if (typeof source === 'object') {
      this.id = source.id || source.name
      this.name = source.name
      this.description = source.description || ''
    }
  }
}
