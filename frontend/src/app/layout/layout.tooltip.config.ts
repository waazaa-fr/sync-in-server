/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { TooltipConfig } from 'ngx-bootstrap/tooltip'

export function getToolTipConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    adaptivePosition: false,
    triggers: 'hover',
    delay: 500
  })
}
