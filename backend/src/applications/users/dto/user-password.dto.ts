/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { USER_PASSWORD_MIN_LENGTH } from '../constants/user'

export class UserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(USER_PASSWORD_MIN_LENGTH)
  password: string
}
