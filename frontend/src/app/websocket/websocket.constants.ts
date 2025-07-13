/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { SocketIoConfig } from 'ngx-socket-io'

export const webSocketOptions: SocketIoConfig = {
  url: '',
  options: { autoConnect: false, reconnection: true, forceNew: false, transports: ['websocket'] }
}
