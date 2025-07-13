/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'
import { dJs } from '../utils/time'

@Pipe({ name: 'amDateFormat' })
export class TimeDateFormatPipe implements PipeTransform {
  transform(value: any, format = 'L HH:mm:ss'): string {
    if (!value) {
      return ''
    }
    return dJs(value).format(format)
  }
}
