/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Socket } from 'socket.io'
import { JwtIdentityPayload } from '../../../authentication/interfaces/jwt-payload.interface'

export type AuthenticatedSocketIO = Socket & { user: JwtIdentityPayload }
