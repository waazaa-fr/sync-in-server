/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FastifyRequest } from 'fastify'
import { UserModel } from '../../applications/users/models/user.model'

export interface FastifyAuthenticatedRequest extends FastifyRequest {
  user: UserModel
}
