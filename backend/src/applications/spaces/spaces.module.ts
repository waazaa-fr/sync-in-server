/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { SpaceGuard } from './guards/space.guard'
import { SpacesBrowser } from './services/spaces-browser.service'
import { SpacesManager } from './services/spaces-manager.service'
import { SpacesQueries } from './services/spaces-queries.service'
import { SpacesScheduler } from './services/spaces-scheduler.service'
import { SpacesController } from './spaces.controller'

@Module({
  controllers: [SpacesController],
  providers: [SpaceGuard, SpacesManager, SpacesBrowser, SpacesQueries, SpacesScheduler],
  exports: [SpaceGuard, SpacesManager, SpacesBrowser, SpacesQueries]
})
export class SpacesModule {}
