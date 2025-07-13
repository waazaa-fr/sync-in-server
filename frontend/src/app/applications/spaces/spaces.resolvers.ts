/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, UrlSegment } from '@angular/router'
import { StoreService } from '../../store/store.service'

export const spacesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot): UrlSegment[] => {
  inject(StoreService).repository.set(route.data.repository)
  return route.url
}
