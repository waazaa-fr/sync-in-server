/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform } from 'class-transformer'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class SearchMembersDto {
  @IsString()
  @Transform(({ value }) => (value ? value.trim().toLowerCase() : ''))
  search: string

  @IsOptional()
  @IsInt({ each: true })
  ignoreUserIds?: number[]

  @IsOptional()
  @IsInt({ each: true })
  ignoreGroupIds?: number[]

  @IsOptional()
  @IsBoolean()
  onlyUsers?: boolean = false

  @IsOptional()
  @IsBoolean()
  onlyGroups?: boolean = false

  @IsOptional()
  @IsBoolean()
  excludePersonalGroups?: boolean = false

  @IsOptional()
  @IsInt()
  usersRole?: number

  @IsOptional()
  @IsBoolean()
  withPermissions?: boolean = false
}
