/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Component, computed, Signal } from '@angular/core'
import { Router } from '@angular/router'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { L10nTranslateDirective } from 'angular-l10n'
import { TimeAgoPipe } from '../../../../common/pipes/time-ago.pipe'
import { TAB_MENU } from '../../../../layout/layout.interfaces'
import { LayoutService } from '../../../../layout/layout.service'
import { StoreService } from '../../../../store/store.service'
import { SPACES_PATH } from '../../../spaces/spaces.constants'
import { UserAvatarComponent } from '../../../users/components/utils/user-avatar.component'
import { CommentRecentModel } from '../../models/comment-recent.model'
import { CommentsService } from '../../services/comments.service'

@Component({
  selector: 'app-comments-recents-widget',
  imports: [L10nTranslateDirective, FaIconComponent, TimeAgoPipe, UserAvatarComponent],
  templateUrl: './comments-recents-widget.component.html'
})
export class CommentsRecentsWidgetComponent {
  private nbInitialComments = 10
  private nbComments = this.nbInitialComments
  protected moreElements = false
  protected comments: Signal<CommentRecentModel[]> = computed(() => this.store.commentsRecents().slice(0, this.nbComments))
  protected readonly icons = { faCommentDots, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faTrashAlt }

  constructor(
    private readonly router: Router,
    private readonly layout: LayoutService,
    private readonly store: StoreService,
    private readonly commentsService: CommentsService
  ) {
    this.load()
  }

  private load() {
    this.commentsService.loadRecents(this.nbComments)
  }

  switchMore() {
    if (this.moreElements) {
      this.moreElements = false
      this.nbComments = this.nbInitialComments
    } else {
      this.moreElements = true
      this.nbComments *= 5
    }
    this.load()
  }

  goToFile(c: CommentRecentModel) {
    this.router
      .navigate([SPACES_PATH.SPACES, ...c.file.path.split('/')], { queryParams: { select: c.file.name } })
      .then(() => this.layout.showRSideBarTab(TAB_MENU.COMMENTS, true))
  }
}
