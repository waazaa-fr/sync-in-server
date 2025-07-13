/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FastifyAuthenticatedRequest } from '../../../authentication/interfaces/auth-request.interface'
import { SpaceEnv } from '../models/space-env.model'

export interface FastifySpaceRequest extends FastifyAuthenticatedRequest {
  space: SpaceEnv
}
