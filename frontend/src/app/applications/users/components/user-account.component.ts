/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Component, Inject, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faCopy, faKey } from '@fortawesome/free-solid-svg-icons'
import {
  USER_NOTIFICATION_TEXT,
  USER_ONLINE_STATUS_LIST,
  USER_PASSWORD_MIN_LENGTH
} from '@sync-in-server/backend/src/applications/users/constants/user'
import { WEBDAV_BASE_PATH } from '@sync-in-server/backend/src/applications/webdav/constants/routes'
import { L10N_LOCALE, L10nLocale, L10nTranslateDirective, L10nTranslatePipe } from 'angular-l10n'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { ClipboardService } from 'ngx-clipboard'
import { Subscription } from 'rxjs'
import { InputPasswordComponent } from '../../../common/components/input-password.component'
import { PasswordStrengthBarComponent } from '../../../common/components/password-strength-bar.component'
import { StorageUsageComponent } from '../../../common/components/storage-usage.component'
import { AutoResizeDirective } from '../../../common/directives/auto-resize.directive'
import { CapitalizePipe } from '../../../common/pipes/capitalize.pipe'
import { TimeAgoPipe } from '../../../common/pipes/time-ago.pipe'
import { TimeDateFormatPipe } from '../../../common/pipes/time-date-format.pipe'
import { LayoutService } from '../../../layout/layout.service'
import { StoreService } from '../../../store/store.service'
import { UserType } from '../interfaces/user.interface'
import { USER_ICON, USER_LANGUAGE_AUTO, USER_PATH, USER_TITLE } from '../user.constants'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-account',
  imports: [
    AutoResizeDirective,
    FormsModule,
    CapitalizePipe,
    L10nTranslatePipe,
    TimeDateFormatPipe,
    TimeAgoPipe,
    ProgressbarModule,
    PasswordStrengthBarComponent,
    L10nTranslateDirective,
    FaIconComponent,
    StorageUsageComponent,
    InputPasswordComponent
  ],
  templateUrl: 'user-account.component.html'
})
export class UserAccountComponent implements OnDestroy {
  private subscriptions: Subscription[] = []
  protected readonly allNotifications = Object.values(USER_NOTIFICATION_TEXT)
  protected readonly allOnlineStatus = USER_ONLINE_STATUS_LIST
  protected readonly passwordMinLength = USER_PASSWORD_MIN_LENGTH
  protected readonly icons = { faCopy, faKey }
  protected user: UserType
  protected userAvatar: string = null
  protected webdavUrl = `${window.location.origin}/${WEBDAV_BASE_PATH}`
  protected languages = this.layout.getLanguages(true)
  // password
  protected oldPassword: string
  protected newPassword: string

  constructor(
    @Inject(L10N_LOCALE) protected readonly locale: L10nLocale,
    private readonly store: StoreService,
    private readonly layout: LayoutService,
    private readonly userService: UserService,
    private readonly clipBoardService: ClipboardService
  ) {
    this.subscriptions.push(this.store.user.subscribe((user: UserType) => (this.user = user)))
    this.subscriptions.push(this.store.userAvatarUrl.subscribe((avatarUrl) => (this.userAvatar = avatarUrl)))
    this.layout.setBreadcrumbIcon(USER_ICON.ACCOUNT)
    this.layout.setBreadcrumbNav({
      url: `/${USER_PATH.BASE}/${USER_PATH.ACCOUNT}/${USER_TITLE.ACCOUNT}`,
      splicing: 2,
      translating: true,
      sameLink: true
    })
  }

  get language() {
    return this.user?.language || USER_LANGUAGE_AUTO
  }

  set language(value: string) {
    if (value === USER_LANGUAGE_AUTO) value = null
    this.userService.changeLanguage({ language: value }).subscribe({
      next: () => this.updateLanguage(value),
      error: () => this.layout.sendNotification('error', 'Configuration', 'Unable to update language')
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

  setOnlineStatus(status: number) {
    this.userService.changeOnlineStatus(status)
  }

  genAvatar() {
    this.userService.genAvatar()
  }

  uploadAvatar(ev: any) {
    this.userService.uploadAvatar(ev.target.files[0])
  }

  submitPassword() {
    if (!this.oldPassword) {
      this.layout.sendNotification('error', 'Configuration', 'Current password missing !')
      return
    }
    if (!this.newPassword) {
      this.layout.sendNotification('error', 'Configuration', 'New password missing !')
      return
    }
    if (this.newPassword.length < USER_PASSWORD_MIN_LENGTH) {
      this.layout.sendNotification('warning', 'Configuration', 'New password must have 8 characters minimum')
      return
    }
    this.userService.changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword }).subscribe({
      next: () => this.goodCurrentPassword(),
      error: () => this.badCurrentPassword()
    })
  }

  updateNotification(status: number) {
    this.userService.changeNotification({ notification: status }).subscribe({
      next: () => {
        this.user.notification = status
        this.layout.sendNotification('info', 'Configuration', 'Notification preference updated')
      },
      error: () => this.layout.sendNotification('error', 'Configuration', 'Unable to update notification preference')
    })
  }

  private updateLanguage(language: string) {
    this.user.language = language
    this.layout.setLanguage(language)
    this.layout.sendNotification('info', 'Configuration', 'Language updated')
  }

  private badCurrentPassword() {
    this.oldPassword = ''
    this.layout.sendNotification('warning', 'Configuration', 'Current password does not match')
  }

  private goodCurrentPassword() {
    this.oldPassword = ''
    this.newPassword = ''
    this.layout.sendNotification('info', 'Configuration', 'Password has been updated')
  }

  clipBoardLink() {
    this.clipBoardService.copyFromContent(this.webdavUrl)
    this.layout.sendNotification('info', 'Link copied', this.webdavUrl)
  }
}
