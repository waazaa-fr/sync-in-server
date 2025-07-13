/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SyncUploadDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  checksum?: string

  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  mtime: number

  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  size: number
}
