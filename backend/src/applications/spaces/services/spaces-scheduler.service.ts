/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression, Timeout } from '@nestjs/schedule'
import { SpacesManager } from './spaces-manager.service'

@Injectable()
export class SpacesScheduler {
  private readonly logger = new Logger(SpacesScheduler.name)

  constructor(private readonly spacesManager: SpacesManager) {}

  @Timeout(60000)
  @Cron(CronExpression.EVERY_HOUR)
  async updatePersonalSpacesQuota() {
    this.logger.log(`${this.updatePersonalSpacesQuota.name} - START`)
    try {
      await this.spacesManager.updatePersonalSpacesQuota()
    } catch (e) {
      this.logger.error(`${this.updatePersonalSpacesQuota.name} - ${e}`)
    }
    this.logger.log(`${this.updatePersonalSpacesQuota.name} - END`)
  }

  @Timeout(60000)
  @Cron(CronExpression.EVERY_HOUR)
  async updateSpacesQuota() {
    this.logger.log(`${this.updateSpacesQuota.name} - START`)
    try {
      await this.spacesManager.updateSpacesQuota()
    } catch (e) {
      this.logger.error(`${this.updateSpacesQuota.name} - ${e}`)
    }
    this.logger.log(`${this.updateSpacesQuota.name} - END`)
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async deleteExpiredSpaces() {
    /* Removes spaces that have been disabled for more than 30 days */
    this.logger.log(`${this.deleteExpiredSpaces.name} - START`)
    try {
      await this.spacesManager.deleteExpiredSpaces()
    } catch (e) {
      this.logger.error(`${this.deleteExpiredSpaces.name} - ${e}`)
    }
    this.logger.log(`${this.deleteExpiredSpaces.name} - DONE`)
  }
}
