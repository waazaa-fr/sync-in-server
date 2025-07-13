/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IsEnum } from 'class-validator'
import { APP_STORE_REPOSITORY } from './constants/store'

export class AppStoreConfig {
  @IsEnum(APP_STORE_REPOSITORY)
  repository: APP_STORE_REPOSITORY = APP_STORE_REPOSITORY.PUBLIC
}
