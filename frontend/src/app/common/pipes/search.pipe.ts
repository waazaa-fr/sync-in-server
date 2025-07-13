/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'
import { filterArray } from '../utils/functions'

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(collection: any[], search: string, field?: string): any[] {
    if (!collection?.length || !search) {
      return collection
    }
    return filterArray(search, collection, field)
  }
}
