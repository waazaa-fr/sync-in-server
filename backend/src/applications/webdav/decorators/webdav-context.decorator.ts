/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { applyDecorators, SetMetadata, UseFilters, UseGuards } from '@nestjs/common'
import { AuthBasicGuard } from '../../../authentication/guards/auth-basic.guard'
import { WebDAVExceptionsFilter } from '../filters/webdav.filter'
import { WebDAVProtocolGuard } from '../guards/webdav-protocol.guard'

export const WEB_DAV_CONTEXT = 'WebDAVContext'
export const WebDAVContext = () => SetMetadata(WEB_DAV_CONTEXT, true)
export const WebDAVEnvironment = () => {
  return applyDecorators(WebDAVContext(), UseGuards(AuthBasicGuard, WebDAVProtocolGuard), UseFilters(WebDAVExceptionsFilter))
}
