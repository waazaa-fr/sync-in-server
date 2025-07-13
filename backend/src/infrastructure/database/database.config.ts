/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator'
import { DB_CHARSET } from './constants'

export class MySQLConfig {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value.endsWith(`?charset=${DB_CHARSET}`) ? value : `${value}?charset=${DB_CHARSET}`))
  url: string

  @IsBoolean()
  logQueries: boolean = false
}
