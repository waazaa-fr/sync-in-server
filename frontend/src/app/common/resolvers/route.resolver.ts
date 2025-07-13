/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { ActivatedRouteSnapshot, ResolveFn, UrlSegment } from '@angular/router'

export const routeResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot): UrlSegment[] => {
  return route.url
}
