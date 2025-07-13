/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Global, Module } from '@nestjs/common'
import { Mailer } from './mailer.service'

@Global()
@Module({
  providers: [Mailer],
  exports: [Mailer]
})
export class MailerModule {}
