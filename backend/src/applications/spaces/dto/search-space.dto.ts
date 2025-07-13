/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class SearchSpaceDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  search: string

  @IsOptional()
  @IsInt()
  limit?: number = 6

  @IsOptional()
  @IsBoolean()
  shareInsidePermission?: boolean
}
