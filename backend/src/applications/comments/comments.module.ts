/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsManager } from './services/comments-manager.service'
import { CommentsQueries } from './services/comments-queries.service'

@Module({
  controllers: [CommentsController],
  providers: [CommentsManager, CommentsQueries]
})
export class CommentsModule {}
