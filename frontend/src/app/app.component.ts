/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Component, Inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FaConfig } from '@fortawesome/angular-fontawesome'
import { L10N_LOCALE, L10nLoader, L10nLocale } from 'angular-l10n'
import { defineLocale, enGbLocale, frLocale } from 'ngx-bootstrap/chronos'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { setTheme } from 'ngx-bootstrap/utils'
import { dJs } from './common/utils/time'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(
    @Inject(L10N_LOCALE) private locale: L10nLocale,
    private l10nLoader: L10nLoader,
    private bsLocaleService: BsLocaleService,
    faConfig: FaConfig
  ) {
    faConfig.fixedWidth = true
    setTheme('bs5')
    defineLocale('fr', frLocale)
    defineLocale('en', enGbLocale)
    this.l10nLoader.init().then(() => {
      dJs.locale(this.locale.language)
      this.bsLocaleService.use(this.locale.language)
    })
  }
}
