/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FilesOnlyOfficeGuard } from './files-only-office.guard'

describe(FilesOnlyOfficeGuard.name, () => {
  it('should be defined', () => {
    expect(new FilesOnlyOfficeGuard()).toBeDefined()
  })
})
