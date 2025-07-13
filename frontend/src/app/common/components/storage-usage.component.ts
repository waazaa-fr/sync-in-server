/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Component, Input } from '@angular/core'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { ToBytesPipe } from '../pipes/to-bytes.pipe'

@Component({
  selector: 'app-storage-usage',
  imports: [ProgressbarModule, ToBytesPipe],
  template: `@if (item.storageQuota > 0) {
      <progressbar [max]="item.storageQuota" [value]="item.storageUsage" class="bg-black" [type]="null">
        <span class="ms-1 me-1">{{ item.storageUsage | toBytes: 2 : true }} / {{ item.storageQuota | toBytes }}</span>
      </progressbar>
    } @else {
      <progressbar [max]="item.storageUsage" [value]="item.storageUsage" class="bg-black" [type]="null">
        <span class="ms-1 me-1">{{ item.storageUsage | toBytes: 2 : true }}</span>
      </progressbar>
    }`
})
export class StorageUsageComponent {
  @Input() item: { storageUsage: number; storageQuota: number } & any = { storageUsage: 0, storageQuota: null }
}
