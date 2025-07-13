/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, IsUUID } from 'class-validator'
import { SyncClientInfo } from '../interfaces/sync-client.interface'

export class SyncClientRegistrationDto {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  info: SyncClientInfo
}
