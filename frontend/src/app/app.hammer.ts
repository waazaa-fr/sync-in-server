/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class AppHammerConfig extends HammerGestureConfig {
  override overrides = {
    pinch: { enable: false },
    swipe: { enable: false },
    pan: { enable: false },
    rotate: { enable: false },
    tap: { taps: 2, interval: 600 }
  } as any
}
