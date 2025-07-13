/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class WebSocketConfig {
  @IsString()
  @IsNotEmpty()
  @IsIn(['redis', 'cluster'])
  adapter: 'redis' | 'cluster' = 'cluster'

  @ValidateIf((o: WebSocketConfig) => o.adapter === 'redis')
  @IsString()
  @IsNotEmpty()
  // requires optional dependency: @socket.io/redis-adapter
  redis: string = 'redis://127.0.0.1:6379'

  @IsString()
  @IsNotEmpty()
  corsOrigin: string = '*'
}
