/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Routes } from '@angular/router'
import { SpacesBrowserComponent } from './components/spaces-browser.component'
import { SpacesNavComponent } from './components/spaces-nav.component'
import { SPACES_PATH } from './spaces.constants'
import { spacesResolver } from './spaces.resolvers'

export const spacesRoutes: Routes = [
  {
    path: '',
    component: SpacesNavComponent,
    children: [
      {
        path: SPACES_PATH.SPACES,
        pathMatch: 'full',
        loadComponent: () => import('./components/spaces.component').then((c) => c.SpacesComponent),
        resolve: { routes: spacesResolver },
        data: { repository: SPACES_PATH.SPACES }
      },
      {
        path: SPACES_PATH.TRASH,
        pathMatch: 'full',
        loadComponent: () => import('./components/trash.component').then((c) => c.TrashComponent),
        resolve: { routes: spacesResolver },
        data: { repository: SPACES_PATH.TRASHES }
      },
      {
        path: SPACES_PATH.SHARED,
        pathMatch: 'full',
        loadComponent: () => import('../shares/components/shared.component').then((c) => c.SharedComponent),
        resolve: { routes: spacesResolver },
        data: { repository: SPACES_PATH.SHARED }
      },
      {
        path: SPACES_PATH.LINKS,
        pathMatch: 'full',
        loadComponent: () => import('../links/components/links.component').then((c) => c.LinksComponent),
        resolve: { routes: spacesResolver },
        data: { repository: SPACES_PATH.LINKS }
      },
      {
        path: SPACES_PATH.SPACES_FILES,
        children: [
          {
            path: '**',
            component: SpacesBrowserComponent,
            resolve: { routes: spacesResolver },
            data: { repository: SPACES_PATH.FILES }
          }
        ]
      },
      {
        path: SPACES_PATH.SPACES_SHARES,
        children: [
          {
            path: '**',
            component: SpacesBrowserComponent,
            resolve: { routes: spacesResolver },
            data: { repository: SPACES_PATH.SHARES }
          }
        ]
      },
      {
        path: SPACES_PATH.SPACES_TRASH,
        children: [
          {
            path: '**',
            component: SpacesBrowserComponent,
            resolve: { routes: spacesResolver },
            data: { repository: SPACES_PATH.TRASH }
          }
        ]
      }
    ]
  }
]
