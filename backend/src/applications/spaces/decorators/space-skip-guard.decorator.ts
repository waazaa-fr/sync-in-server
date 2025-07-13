/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SetMetadata } from '@nestjs/common'

export const SKIP_SPACE_GUARD = 'skipSpaceGuard'
export const SkipSpaceGuard = () => SetMetadata(SKIP_SPACE_GUARD, true)
