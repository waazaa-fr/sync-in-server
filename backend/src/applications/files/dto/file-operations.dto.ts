/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { ArrayMinSize, IsArray, IsBoolean, IsDefined, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { tarExtension, tarGzExtension } from '../constants/compress'

export class CopyMoveFileDto {
  @IsNotEmpty()
  @IsString()
  dstDirectory: string

  @IsOptional()
  @IsString()
  // renaming use case
  dstName?: string
}

export class DownloadFileDto {
  @IsNotEmpty()
  @IsUrl()
  url: string
}

export class MakeFileDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['file', 'directory'])
  type: 'file' | 'directory'
}

export class CompressFileDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsDefined()
  @IsBoolean()
  compressInDirectory: boolean

  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  files: { name: string; rootAlias: string; path?: string }[]

  @IsNotEmpty()
  @IsString()
  @IsIn([tarExtension, tarGzExtension])
  extension: typeof tarExtension | typeof tarGzExtension
}

export class SearchFilesDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : null))
  content: string

  @IsOptional()
  @IsBoolean()
  fullText?: boolean = false

  @IsOptional()
  @IsInt()
  limit?: number = 100
}
