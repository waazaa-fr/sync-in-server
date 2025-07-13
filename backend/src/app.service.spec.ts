/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Logger } from '@nestjs/common'
import cluster from 'node:cluster'
import { AppService } from './app.service'
import { configuration } from './configuration/config.environment'

describe(AppService.name, () => {
  let appService: AppService

  beforeAll(async () => {
    appService = new AppService()
    Logger.overrideLogger(['fatal'])
  })

  it('should be defined', () => {
    expect(appService).toBeDefined()
  })

  it('should clusterize', () => {
    configuration.server.restartOnFailure = true
    const callBack = jest.fn().mockReturnValue({ process: { pid: 1 } })
    cluster.fork = jest.fn(() => callBack())
    const spyExit = jest.spyOn(cluster, 'on')
    expect(() => AppService.clusterize(callBack)).not.toThrow()
    expect(callBack).toHaveBeenCalledTimes(configuration.server.workers)
    expect(cluster.fork).toHaveBeenCalledTimes(configuration.server.workers)
    callBack.mockClear()
    AppService.schedulerPID = 1
    cluster.emit('exit', { process: { pid: 1 } }, 1, 1)
    AppService.schedulerPID = 0
    cluster.emit('exit', { process: { pid: 1 } }, 1, 1)
    expect(spyExit).toHaveBeenCalled()
    expect(callBack).toHaveBeenCalledTimes(2)
    jest.replaceProperty(cluster, 'isPrimary', false)
    callBack.mockClear()
    expect(() => AppService.clusterize(callBack)).not.toThrow()
    expect(callBack).toHaveBeenCalledTimes(1)
    spyExit.mockClear()
  })
})
