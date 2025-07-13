/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { AdminUsersManager } from '../../../applications/users/services/admin-users-manager.service'
import { UsersManager } from '../../../applications/users/services/users-manager.service'
import { AuthMethodLdapService } from './auth-method-ldap.service'

describe(AuthMethodLdapService.name, () => {
  let service: AuthMethodLdapService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMethodLdapService, { provide: UsersManager, useValue: {} }, { provide: AdminUsersManager, useValue: {} }]
    }).compile()

    service = module.get<AuthMethodLdapService>(AuthMethodLdapService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
