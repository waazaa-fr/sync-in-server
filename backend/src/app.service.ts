/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable, Logger } from '@nestjs/common'
import { setupPrimary } from '@socket.io/cluster-adapter'
import cluster, { Worker } from 'node:cluster'
import process from 'node:process'
import { configuration } from './configuration/config.environment'
import { SCHEDULER_ENV, SCHEDULER_STATE } from './infrastructure/scheduler/scheduler.constants'

@Injectable()
export class AppService {
  private static readonly logger = new Logger(AppService.name)
  static schedulerPID: number

  static clusterize(bootstrap: () => void) {
    if (cluster.isPrimary) {
      if (configuration.websocket.adapter === 'cluster') {
        // setup connections between the workers
        setupPrimary()
      }
      AppService.logger.log(`CPU cores : ${configuration.server.workers}`)
      AppService.logger.log(`Master server started on ${process.pid}`)
      for (let i = 0; i < configuration.server.workers; i++) {
        AppService.forkProcess(i === configuration.server.workers - 1)
      }
      cluster.on('exit', (worker: Worker, code: number, signal: string) => {
        AppService.logger.log(`Worker ${worker.process.pid} (code: ${code}, signal: ${signal}) died.`)
        if (configuration.server.restartOnFailure) {
          const isScheduler = worker.process.pid === AppService.schedulerPID
          AppService.logger.log(`Restarting ${isScheduler ? `(with Scheduler)` : ''}...`)
          AppService.forkProcess(isScheduler)
        }
      })
    } else {
      AppService.logger.log(`Cluster server started on ${process.pid}`)
      bootstrap()
    }
  }

  static forkProcess(isScheduler: boolean) {
    const w: Worker = cluster.fork({ [SCHEDULER_ENV]: isScheduler ? SCHEDULER_STATE.ENABLED : SCHEDULER_STATE.DISABLED })
    if (isScheduler) {
      AppService.schedulerPID = w.process.pid
      AppService.logger.log(`Scheduler enabled on Worker ${w.process.pid}`)
    }
  }
}
