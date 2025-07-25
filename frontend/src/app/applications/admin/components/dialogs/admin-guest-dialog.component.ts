/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { TitleCasePipe } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { USER_ROLE } from '@sync-in-server/backend/src/applications/users/constants/user'
import type { SearchMembersDto } from '@sync-in-server/backend/src/applications/users/dto/search-members.dto'
import { L10N_LOCALE, L10nLocale, L10nTranslateDirective, L10nTranslatePipe } from 'angular-l10n'
import { TabDirective, TabHeadingDirective, TabsetComponent } from 'ngx-bootstrap/tabs'
import { Observable } from 'rxjs'
import { InputPasswordComponent } from '../../../../common/components/input-password.component'
import { PasswordStrengthBarComponent } from '../../../../common/components/password-strength-bar.component'
import { AutofocusDirective } from '../../../../common/directives/auto-focus.directive'
import { TimeDateFormatPipe } from '../../../../common/pipes/time-date-format.pipe'
import { LayoutService } from '../../../../layout/layout.service'
import { UserGuestDialogComponent } from '../../../users/components/dialogs/user-guest-dialog.component'
import { UserSearchComponent } from '../../../users/components/utils/user-search.component'
import { GuestUserModel } from '../../../users/models/guest.model'
import { MemberModel } from '../../../users/models/member.model'
import { UserService } from '../../../users/user.service'
import { AdminService } from '../../admin.service'

@Component({
  selector: 'app-admin-guest-dialog',
  imports: [
    FaIconComponent,
    L10nTranslateDirective,
    TimeDateFormatPipe,
    ReactiveFormsModule,
    InputPasswordComponent,
    PasswordStrengthBarComponent,
    AutofocusDirective,
    AutofocusDirective,
    PasswordStrengthBarComponent,
    InputPasswordComponent,
    TimeDateFormatPipe,
    L10nTranslatePipe,
    TitleCasePipe,
    UserSearchComponent,
    TabsetComponent,
    TabDirective,
    TabHeadingDirective
  ],
  templateUrl: '../../../users/components/dialogs/user-guest-dialog.component.html'
})
export class AdminGuestDialogComponent extends UserGuestDialogComponent {
  constructor(
    @Inject(L10N_LOCALE) locale: L10nLocale,
    layout: LayoutService,
    userService: UserService,
    private readonly adminService: AdminService
  ) {
    super(locale, layout, userService)
  }

  override searchMembers(query: string): Observable<MemberModel[]> {
    const search: SearchMembersDto = {
      search: query,
      ignoreUserIds: this.guestForm.value.managers.map((m: MemberModel) => m.id),
      usersRole: USER_ROLE.USER,
      onlyUsers: true
    }
    return this.adminService.searchMembers(search)
  }

  override onSubmit() {
    this.submitted = true
    if (this.confirmDeletion) {
      // delete
      this.adminService.deleteUser(this.guest.id, null, true).subscribe({
        next: () => {
          this.guestChange.emit(['delete', this.guest])
          this.layout.sendNotification('success', 'Guest deleted', this.guest.login)
          this.layout.closeDialog()
        },
        error: (e: HttpErrorResponse) => this.onError(e)
      })
    } else if (!this.guest) {
      // create
      this.adminService.createUser(this.makeDto(true), true).subscribe({
        next: (g: GuestUserModel) => {
          this.guestChange.emit(['add', g])
          this.layout.sendNotification('success', 'Guest created', this.guestForm.value.login)
          this.layout.closeDialog()
        },
        error: (e: HttpErrorResponse) => this.onError(e)
      })
    } else {
      // update
      const updateDto = this.makeDto()
      if (!Object.keys(updateDto).length) {
        this.loading = false
        this.submitted = false
        return
      }
      this.adminService.updateUser(this.guest.id, updateDto, true).subscribe({
        next: (g: GuestUserModel) => {
          if (g) {
            this.guestChange.emit(['update', g])
          } else {
            this.guestChange.emit(['delete', this.guest])
          }
          this.layout.sendNotification('success', 'Guest updated', this.guestForm.value.login)
          this.layout.closeDialog()
        },
        error: (e: HttpErrorResponse) => this.onError(e)
      })
    }
  }
}
