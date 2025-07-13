/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { exportConfiguration } from '../../../configuration/config.environment'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { ContextManager } from '../../../infrastructure/context/services/context-manager.service'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { FilesConfig } from '../../files/files.config'
import { FileError } from '../../files/models/file-error'
import { FilesQueries } from '../../files/services/files-queries.service'
import { dirName, removeFiles } from '../../files/utils/files'
import { LinksQueries } from '../../links/services/links-queries.service'
import { NotificationsManager } from '../../notifications/services/notifications-manager.service'
import { SharesManager } from '../../shares/services/shares-manager.service'
import { SharesQueries } from '../../shares/services/shares-queries.service'
import { UserModel } from '../../users/models/user.model'
import { UsersQueries } from '../../users/services/users-queries.service'
import { generateUserTest } from '../../users/utils/test'
import { SPACE_ALIAS, SPACE_ALL_OPERATIONS, SPACE_OPERATION, SPACE_PERMS_SEP, SPACE_REPOSITORY } from '../constants/spaces'
import { SpaceEnv } from '../models/space-env.model'
import { SpaceModel } from '../models/space.model'
import { validRealPath } from '../utils/paths'
import { SpacesManager } from './spaces-manager.service'
import { SpacesQueries } from './spaces-queries.service'

describe(SpacesManager.name, () => {
  let filesConfig: FilesConfig
  let spacesManager: SpacesManager
  let spacesQueries: SpacesQueries
  let userTest: UserModel
  const spaceAlias = 'project'
  const tmpDir = os.tmpdir()

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [await ConfigModule.forRoot({ load: [exportConfiguration], isGlobal: true })],
      providers: [
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        {
          provide: Cache,
          useValue: { get: () => null }
        },
        { provide: ContextManager, useValue: {} },
        {
          provide: NotificationsManager,
          useValue: {}
        },
        SpacesManager,
        SpacesQueries,
        UsersQueries,
        SharesManager,
        SharesQueries,
        FilesQueries,
        LinksQueries
      ]
    }).compile()

    module.useLogger(['fatal'])
    filesConfig = module.get<ConfigService>(ConfigService).get('applications.files')
    spacesManager = module.get<SpacesManager>(SpacesManager)
    spacesQueries = module.get<SpacesQueries>(SpacesQueries)
    spacesManager['setQuotaExceeded'] = jest.fn()
    userTest = new UserModel(generateUserTest())
    // todo: validate shares, permissions
  })

  afterAll(async () => {
    await removeFiles(userTest.homePath)
    await removeFiles(SpaceModel.getHomePath(spaceAlias))
  })

  it('should be defined', () => {
    expect(filesConfig).toBeDefined()
    expect(spacesManager).toBeDefined()
    expect(userTest).toBeDefined()
  })

  it('should validate the permissions on personal & shares space', async () => {
    const personalSpace = await spacesManager.spaceEnv(userTest, ['files', SPACE_ALIAS.PERSONAL])
    expect(personalSpace.envPermissions).toBe(
      Object.values(SPACE_OPERATION)
        .filter((p) => p !== SPACE_OPERATION.DELETE)
        .join(SPACE_PERMS_SEP)
    )
    const sharesSpace = await spacesManager.spaceEnv(userTest, ['shares'])
    expect(sharesSpace.envPermissions).toBe('')
  })

  it("should validate (or not) the user's personal space (files & trash repositories)", async () => {
    for (const repository of [SPACE_REPOSITORY.FILES, SPACE_REPOSITORY.TRASH]) {
      const spaceEnv = await spacesManager.spaceEnv(userTest, [repository, SPACE_ALIAS.PERSONAL, 'foo', 'bar'])
      expect(spaceEnv.envPermissions).toBe(SPACE_ALL_OPERATIONS)
      await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).rejects.toThrow()
      const repoPath = UserModel.getRepositoryPath(userTest.login, spaceEnv.inTrashRepository)
      await fs.mkdir(path.join(repoPath, 'foo', 'bar'), { recursive: true })
      await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).resolves.toBeUndefined()
      await removeFiles(path.join(repoPath, 'foo', 'bar'))
      try {
        await validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)
      } catch (e) {
        expect(e).toBeInstanceOf(FileError)
      }
    }
  })

  it(`should validate (or not) the space : ${spaceAlias} (files & trash repositories)`, async () => {
    const permissions: Partial<SpaceEnv> = {
      id: 1,
      alias: spaceAlias,
      name: spaceAlias,
      enabled: true,
      permissions: 'a:d:m:so',
      role: 0
    }
    spacesQueries.permissions = jest.fn().mockReturnValue(permissions)
    for (const repository of [SPACE_REPOSITORY.FILES, SPACE_REPOSITORY.TRASH]) {
      const spaceEnv = await spacesManager.spaceEnv(userTest, [repository, spaceAlias, 'foo', 'bar'])
      await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).rejects.toThrow()
      const repoPath = SpaceModel.getRepositoryPath(spaceAlias, spaceEnv.inTrashRepository)
      await fs.mkdir(path.join(repoPath, spaceEnv.root.alias, ...spaceEnv.paths), { recursive: true })
      await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).resolves.toBeUndefined()
      await removeFiles(path.join(repoPath, spaceEnv.root.alias, ...spaceEnv.paths))
    }
  })

  it(`should validate (or not) the space : ${spaceAlias} with a root (an external dir)`, async () => {
    const permissions: Partial<SpaceEnv> = {
      id: 0,
      alias: spaceAlias,
      name: spaceAlias,
      permissions: SPACE_ALL_OPERATIONS,
      root: { id: 1, alias: 'foo', name: 'foo', externalPath: tmpDir, permissions: SPACE_ALL_OPERATIONS }
    }
    spacesQueries.permissions = jest.fn().mockReturnValueOnce(permissions)
    const spaceEnv = await spacesManager.spaceEnv(userTest, [SPACE_REPOSITORY.FILES, spaceAlias, 'foo', 'bar'])
    const rootPath = path.join(tmpDir, ...spaceEnv.paths)
    await fs.mkdir(rootPath, { recursive: true })
    await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).resolves.toBeUndefined()
    await removeFiles(rootPath)
    await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).rejects.toThrow()
  })

  it(`should validate (or not) the space : ${spaceAlias} with a root (a file/directory from user)`, async () => {
    const permissions: Partial<SpaceEnv> = {
      id: 0,
      alias: spaceAlias,
      name: spaceAlias,
      permissions: SPACE_ALL_OPERATIONS,
      root: {
        id: 1,
        alias: 'document',
        name: 'document',
        file: { id: 0, path: '/foo', inTrash: false },
        owner: { id: 0, login: userTest.login },
        permissions: SPACE_ALL_OPERATIONS
      }
    }
    spacesQueries.permissions = jest.fn().mockReturnValueOnce(permissions)
    const spaceEnv = await spacesManager.spaceEnv(userTest, [SPACE_REPOSITORY.FILES, spaceAlias, 'document', 'bar'])
    await fs.mkdir(path.join(UserModel.getFilesPath(userTest.login), 'foo', 'bar'), { recursive: true })
    await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).resolves.toBeUndefined()
    await removeFiles(path.join(UserModel.getFilesPath(userTest.login), 'foo', 'bar'))
    await expect(validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)).rejects.toThrow()
    delete spaceEnv.root.file.path
    try {
      await validRealPath(spaceEnv.realPath, true, true, spaceEnv.realBasePath)
    } catch (e) {
      expect(e).toBeInstanceOf(FileError)
    }
  })

  it('should not pass the path validation (validRealPath)', async () => {
    const testPath = path.join(tmpDir, 'foo', 'bar')
    await expect(validRealPath(testPath, true, true, '/dev')).rejects.toThrow()
    await fs.mkdir(dirName(testPath), { recursive: true })
    await fs.writeFile(path.join(tmpDir, 'foo', 'bar'), '')
    await expect(validRealPath(testPath, true, true, dirName(testPath))).rejects.toThrow()
    await removeFiles(dirName(testPath))
  })
})
