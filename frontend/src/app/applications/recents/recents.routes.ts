/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Routes } from '@angular/router'
import { APP_PATH } from '../../app.constants'
import { RecentsComponent } from './components/recents.component'
import { RECENTS_PATH } from './recents.constants'

export const recentsRoutes: Routes = [
  { path: APP_PATH.BASE, pathMatch: 'full', redirectTo: RECENTS_PATH.BASE },
  { path: RECENTS_PATH.BASE, component: RecentsComponent }
]
