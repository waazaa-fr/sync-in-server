/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { configuration } from '../../../configuration/config.environment'

@Injectable()
export class FilesOnlyOfficeGuard extends AuthGuard('filesOnlyOfficeToken') implements IAuthGuard {
  private readonly logger = new Logger(FilesOnlyOfficeGuard.name)

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!configuration.applications.files.onlyoffice.enabled) {
      this.logger.warn(`${this.canActivate.name} - feature not enabled`)
      throw new HttpException('Feature not enabled', HttpStatus.BAD_REQUEST)
    }
    return super.canActivate(ctx)
  }

  handleRequest<TUser = any>(err: any, user: any, info: Error, ctx: ExecutionContext, status?: any): TUser {
    const req = this.getRequest(ctx)
    req.raw.user = user?.login || 'unauthorized'
    if (info) {
      this.logger.warn(`<${req.raw.user}> <${req.ip}> ${info}`)
    }
    return super.handleRequest(err, user, info, ctx, status)
  }
}
