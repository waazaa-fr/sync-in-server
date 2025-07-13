/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Global, Module } from '@nestjs/common'
import { ContextInterceptor } from './interceptors/context.interceptor'
import { ContextManager } from './services/context-manager.service'

@Global()
@Module({
  providers: [ContextManager, ContextInterceptor],
  exports: [ContextManager, ContextInterceptor]
})
export class ContextModule {}
