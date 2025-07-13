/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Test, TestingModule } from '@nestjs/testing'
import { AuthManager } from '../../../authentication/services/auth-manager.service'
import { pngMimeType, svgMimeType } from '../../../common/image'
import { Cache } from '../../../infrastructure/cache/services/cache.service'
import { DB_TOKEN_PROVIDER } from '../../../infrastructure/database/constants'
import { fileName, isPathExists } from '../../files/utils/files'
import { USER_ROLE } from '../constants/user'
import { CreateUserDto } from '../dto/create-or-update-user.dto'
import { DeleteUserDto } from '../dto/delete-user.dto'
import { UserModel } from '../models/user.model'
import { generateUserTest } from '../utils/test'
import { AdminUsersManager } from './admin-users-manager.service'
import { AdminUsersQueries } from './admin-users-queries.service'
import { UsersManager } from './users-manager.service'
import { UsersQueries } from './users-queries.service'

describe(UsersManager.name, () => {
  let usersManager: UsersManager
  let adminUsersManager: AdminUsersManager
  let adminUsersQueries: AdminUsersQueries
  let usersQueriesService: UsersQueries
  let userTest: UserModel
  let deleteUserDto: DeleteUserDto

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUsersManager,
        AdminUsersQueries,
        UsersManager,
        UsersQueries,
        { provide: AuthManager, useValue: {} },
        { provide: DB_TOKEN_PROVIDER, useValue: {} },
        {
          provide: Cache,
          useValue: {}
        }
      ]
    }).compile()

    module.useLogger(['fatal'])
    usersManager = module.get<UsersManager>(UsersManager)
    adminUsersManager = module.get<AdminUsersManager>(AdminUsersManager)
    adminUsersQueries = module.get<AdminUsersQueries>(AdminUsersQueries)
    usersQueriesService = module.get<UsersQueries>(UsersQueries)
    // mocks
    userTest = new UserModel(generateUserTest(), false)
    deleteUserDto = { deleteSpace: true } satisfies DeleteUserDto
  })

  afterAll(async () => {
    // clean created user path
    await expect(adminUsersManager.deleteUserSpace(userTest.login)).resolves.not.toThrow()
  })

  it('should be defined', () => {
    expect(usersManager).toBeDefined()
    expect(adminUsersManager).toBeDefined()
    expect(usersQueriesService).toBeDefined()
    expect(userTest).toBeDefined()
  })

  it('should get the user with|without password', async () => {
    usersQueriesService.from = jest.fn().mockReturnValue(userTest)
    const findUserWithoutPwd: any = await usersManager.findUser(userTest.login, true)
    expect(findUserWithoutPwd).toBeInstanceOf(UserModel)
    expect(findUserWithoutPwd.password).toBeUndefined()
    const findUserWithPwd = await usersManager.findUser(userTest.login, false)
    expect(findUserWithPwd).toBeInstanceOf(UserModel)
    expect(findUserWithPwd.password).toBeDefined()
    expect(usersQueriesService.from).toHaveBeenCalledTimes(2)
    const me: any = await usersManager.me(userTest)
    // check the default value of the findUser function
    expect(me).toBeInstanceOf(Object)
    expect(me.user.password).toBeUndefined()
    expect(await usersManager.me(userTest)).toBeInstanceOf(Object)
    usersQueriesService.from = jest.fn().mockReturnValue(null)
    await expect(usersManager.me({ id: 0 } as UserModel)).rejects.toThrow()
    expect(usersQueriesService.from).toHaveBeenCalled()
  })

  it('should create the user paths', async () => {
    await expect(userTest.makePaths()).resolves.not.toThrow()
    expect(await isPathExists(userTest.filesPath)).toBe(true)
  })

  it('should get the default user avatar', async () => {
    usersQueriesService.from = jest.fn().mockReturnValueOnce(userTest)
    const [path, mime] = await usersManager.getAvatar(userTest.login)
    expect(fileName(path)).toBe('avatar.svg')
    expect(mime).toBe(svgMimeType)
  })

  it('should generate the user avatar', async () => {
    usersQueriesService.from = jest.fn().mockReturnValueOnce(null)
    await expect(usersManager.getAvatar('#', true)).rejects.toThrow('does not exist')
    usersQueriesService.from = jest.fn().mockReturnValue(userTest)
    expect(await usersManager.getAvatar(userTest.login, true)).toBeUndefined()
    const [path, mime] = await usersManager.getAvatar(userTest.login)
    expect(fileName(path)).toBe('avatar.png')
    expect(mime).toBe(pngMimeType)
  })

  it('should create user that does not exist', async () => {
    usersQueriesService.checkUserExists = jest.fn().mockReturnValue(undefined)
    usersQueriesService.createUserOrGuest = jest.fn().mockReturnValue(888)
    const user = await adminUsersManager.createUserOrGuest(userTest satisfies CreateUserDto, USER_ROLE.USER)
    expect(user).toBeInstanceOf(UserModel)
    expect(await isPathExists(user.filesPath)).toBe(true)
  })

  it('should not create an existing user', async () => {
    usersQueriesService.checkUserExists = jest
      .fn()
      .mockReturnValueOnce({ login: userTest.login, email: '' })
      .mockReturnValueOnce({ login: '', email: userTest.email })
      .mockReturnValueOnce(undefined)
    await expect(adminUsersManager.createUserOrGuest(userTest satisfies CreateUserDto, USER_ROLE.USER)).rejects.toThrow()
    await expect(adminUsersManager.createUserOrGuest(userTest satisfies CreateUserDto, USER_ROLE.USER)).rejects.toThrow()
    usersQueriesService.createUserOrGuest = jest.fn().mockImplementation(() => {
      throw new Error('testing')
    })
    await expect(adminUsersManager.createUserOrGuest(userTest satisfies CreateUserDto, USER_ROLE.USER)).rejects.toThrow()
  })

  it('should delete user', async () => {
    adminUsersQueries.deleteUser = jest.fn().mockReturnValue(true)
    await expect(adminUsersManager.deleteUserOrGuest(userTest.id, userTest.login, deleteUserDto)).resolves.not.toThrow()
    expect(await isPathExists(userTest.filesPath)).toBe(false)
  })

  it('should pass even if the user does not exist', async () => {
    adminUsersQueries.deleteUser = jest.fn().mockReturnValue(false)
    await expect(adminUsersManager.deleteUserOrGuest(userTest.id, userTest.login, deleteUserDto)).resolves.not.toThrow()
  })

  it('should throw an error on user creation', async () => {
    adminUsersQueries.deleteUser = jest.fn().mockImplementation(() => {
      throw new Error('testing')
    })
    await expect(adminUsersManager.deleteUserOrGuest(userTest.id, userTest.login, deleteUserDto)).rejects.toThrow()
  })
})
