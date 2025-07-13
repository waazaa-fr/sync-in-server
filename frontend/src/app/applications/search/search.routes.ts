/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Routes } from '@angular/router'
import { SearchComponent } from './components/search.component'
import { SEARCH_PATH } from './search.constants'

export const searchRoutes: Routes = [{ path: SEARCH_PATH.BASE, component: SearchComponent }]
