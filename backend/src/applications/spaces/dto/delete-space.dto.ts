/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsBoolean, IsOptional } from 'class-validator'

export class DeleteSpaceDto {
  @IsOptional()
  @IsBoolean()
  deleteNow: boolean
}
