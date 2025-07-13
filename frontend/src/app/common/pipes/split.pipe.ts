/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
  transform(input: string, separator = ','): string[] {
    if (!input?.length) {
      return []
    }
    return input.split(separator)
  }
}
