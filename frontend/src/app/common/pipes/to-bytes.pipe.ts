/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'
import { convertBytesToText } from '../utils/functions'

@Pipe({ name: 'toBytes' })
export class ToBytesPipe implements PipeTransform {
  transform(bytes: number, precision = 0, zero = false): string {
    return convertBytesToText(bytes, precision, zero)
  }
}
