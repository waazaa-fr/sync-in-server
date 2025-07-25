/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Location } from '@angular/common'
import { Component, OnDestroy } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { USER_ONLINE_STATUS_LIST } from '@sync-in-server/backend/src/applications/users/constants/user'
import { Subscription } from 'rxjs'
import { UserType } from '../../applications/users/interfaces/user.interface'
import { StoreService } from '../../store/store.service'
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component'
import { TAB_MENU } from '../layout.interfaces'
import { LayoutService } from '../layout.service'

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  imports: [BreadcrumbComponent, FaIconComponent]
})
export class NavBarComponent implements OnDestroy {
  private subscriptions: Subscription[] = []
  protected readonly allOnlineStatus = USER_ONLINE_STATUS_LIST
  protected readonly icons = { faAngleLeft, faAngleRight }
  protected user: UserType
  protected userAvatar: string = null

  constructor(
    private readonly location: Location,
    private readonly layout: LayoutService,
    private readonly store: StoreService
  ) {
    this.subscriptions.push(this.store.user.subscribe((user: UserType) => (this.user = user)))
    this.subscriptions.push(this.store.userAvatarUrl.subscribe((avatarUrl) => (this.userAvatar = avatarUrl)))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

  openSidebarUser() {
    this.layout.showRSideBarTab(TAB_MENU.PROFILE)
  }

  navigateTo(action: string) {
    if (action === 'back') {
      this.location.back()
    } else {
      this.location.forward()
    }
  }
}
