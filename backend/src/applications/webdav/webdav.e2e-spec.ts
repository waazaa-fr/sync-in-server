/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { appBootstrap } from '../../app.bootstrap'
import { dbCloseConnection } from '../../infrastructure/database/utils'
import { XML_CONTENT_TYPE } from './constants/webdav'

const XML_VERSION_STR = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>'

describe('WebDAV (e2e)', () => {
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

  it('PROPFIND ALLPROP /webdav => 207', async () => {
    const res = await app.inject({
      method: 'PROPFIND',
      url: '/webdav',
      headers: { authorization: 'Basic am86cGFzc3dvcmQ=', 'content-type': XML_CONTENT_TYPE, Depth: '1' },
      body: `${XML_VERSION_STR}
       <propfind xmlns:D="DAV:">
         <allprop/>
       </propfind>`
    } as any)
    expect(res.statusCode).toEqual(207)
  })

  it('PROPFIND PROP /webdav => 207', async () => {
    const res = await app.inject({
      method: 'PROPFIND',
      url: '/webdav',
      headers: { authorization: 'Basic am86cGFzc3dvcmQ=', 'content-type': XML_CONTENT_TYPE, Depth: '1' },
      body: `${XML_VERSION_STR}
        <D:propfind xmlns:D="DAV:">
        <D:prop>
          <D:creationdate/>
          <D:displayname/>
          <D:getcontentlength/>
          <D:getcontenttype/>
          <D:getetag/>
          <D:getlastmodified/>
          <D:resourcetype/>
        </D:prop>
       </D:propfind>`
    } as any)
    expect(res.statusCode).toEqual(207)
  })
})
