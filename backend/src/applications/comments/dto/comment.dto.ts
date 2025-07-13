/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateOrUpdateCommentDto {
  @IsNotEmpty()
  @IsInt()
  fileId: number

  @IsNotEmpty()
  @IsString()
  content: string

  @IsOptional()
  @IsInt()
  commentId?: number
}

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsInt()
  fileId: number

  @IsInt()
  commentId: number
}
