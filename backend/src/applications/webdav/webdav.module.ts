/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Module } from '@nestjs/common'
import { WebDAVProtocolGuard } from './guards/webdav-protocol.guard'
import { WebDAVMethods } from './services/webdav-methods.service'
import { WebDAVSpaces } from './services/webdav-spaces.service'
import { WebDAVController } from './webdav.controller'

@Module({
  controllers: [WebDAVController],
  providers: [WebDAVProtocolGuard, WebDAVMethods, WebDAVSpaces]
})
export class WebDAVModule {}
