/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { GROUP_VISIBILITY } from '../constants/group'

export class UserCreateOrUpdateGroupDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : ''))
  name?: string

  @IsOptional()
  @IsString()
  description?: string
}

export class CreateOrUpdateGroupDto extends UserCreateOrUpdateGroupDto {
  @IsOptional()
  @IsEnum(GROUP_VISIBILITY)
  visibility?: GROUP_VISIBILITY

  @IsOptional()
  @IsString()
  permissions?: string

  @IsOptional()
  @IsInt()
  parentId?: number
}
