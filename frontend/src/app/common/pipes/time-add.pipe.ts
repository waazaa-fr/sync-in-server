/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'
import { dJs } from '../utils/time'

@Pipe({ name: 'amAdd' })
export class TimeAddPipe implements PipeTransform {
  transform(value: any, amount: any, unit?: any): any {
    if (typeof amount === 'undefined' || (typeof amount === 'number' && typeof unit === 'undefined')) {
      throw new Error('TimeAddPipe: missing required arguments')
    }
    return dJs(value).add(amount, unit)
  }
}
