/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { appBootstrap } from './app.bootstrap'
import { dbCloseConnection } from './infrastructure/database/utils'

describe('AppStaticFiles (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    app = await appBootstrap()
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await dbCloseConnection(app)
    await app.close()
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })

  it('GET / => 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.statusCode).toEqual(200)
  })
})
