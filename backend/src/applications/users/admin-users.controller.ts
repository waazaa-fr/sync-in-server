/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Res, Search, UseGuards } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { LoginResponseDto } from '../../authentication/dto/login-response.dto'
import { GROUP_TYPE } from './constants/group'
import { ADMIN_USERS_ROUTE } from './constants/routes'
import { USER_ROLE } from './constants/user'
import { UserHaveRole } from './decorators/roles.decorator'
import { GetUser } from './decorators/user.decorator'
import { CreateOrUpdateGroupDto } from './dto/create-or-update-group.dto'
import { CreateUserDto, UpdateUserDto, UpdateUserFromGroupDto } from './dto/create-or-update-user.dto'
import { AdminDeleteUserDto } from './dto/delete-user.dto'
import { SearchMembersDto } from './dto/search-members.dto'
import { UserPasswordDto } from './dto/user-password.dto'
import { UserRolesGuard } from './guards/roles.guard'
import { AdminGroup } from './interfaces/admin-group.interface'
import { AdminUser } from './interfaces/admin-user.interface'
import { GroupBrowse } from './interfaces/group-browse.interface'
import { GuestUser } from './interfaces/guest-user.interface'
import { Member } from './interfaces/member.interface'
import { UserModel } from './models/user.model'
import { AdminUsersManager } from './services/admin-users-manager.service'

@Controller(ADMIN_USERS_ROUTE.BASE)
@UserHaveRole(USER_ROLE.ADMINISTRATOR)
@UseGuards(UserRolesGuard)
export class AdminUsersController {
  constructor(private readonly usersAdminManager: AdminUsersManager) {}

  @Get(`${ADMIN_USERS_ROUTE.USERS}/${ADMIN_USERS_ROUTE.LIST}`)
  listUsers(): Promise<AdminUser[]> {
    return this.usersAdminManager.listUsers()
  }

  @Get(`${ADMIN_USERS_ROUTE.USERS}/:id`)
  getUser(@Param('id', ParseIntPipe) userId: number): Promise<AdminUser> {
    return this.usersAdminManager.getUser(userId)
  }

  @Post(ADMIN_USERS_ROUTE.USERS)
  createUser(@Body() createUserDto: CreateUserDto): Promise<AdminUser> {
    return this.usersAdminManager.createUserOrGuest(
      createUserDto,
      typeof createUserDto?.role !== 'undefined' ? createUserDto.role : USER_ROLE.USER,
      true
    )
  }

  @Put(`${ADMIN_USERS_ROUTE.USERS}/:id`)
  updateUser(@Param('id', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto): Promise<AdminUser> {
    return this.usersAdminManager.updateUserOrGuest(userId, updateUserDto)
  }

  @Delete(`${ADMIN_USERS_ROUTE.USERS}/:id`)
  deleteUser(@GetUser() admin: UserModel, @Param('id', ParseIntPipe) userId: number, @Body() adminDeleteUserDto: AdminDeleteUserDto): Promise<void> {
    return this.usersAdminManager.deleteUserFromAdmin(admin, userId, adminDeleteUserDto)
  }

  @Get(`${ADMIN_USERS_ROUTE.GUESTS}/${ADMIN_USERS_ROUTE.LIST}`)
  listGuests(): Promise<AdminUser[]> {
    return this.usersAdminManager.listGuests()
  }

  @Get(`${ADMIN_USERS_ROUTE.GUESTS}/:id`)
  getGuest(@Param('id', ParseIntPipe) guestId: number): Promise<AdminUser> {
    return this.usersAdminManager.getGuest(guestId)
  }

  @Post(ADMIN_USERS_ROUTE.GUESTS)
  createGuest(@GetUser() user: UserModel, @Body() createGuestDto: CreateUserDto): Promise<GuestUser> {
    return this.usersAdminManager.createGuest(user, createGuestDto)
  }

  @Put(`${ADMIN_USERS_ROUTE.GUESTS}/:id`)
  updateGuest(@Param('id', ParseIntPipe) guestId: number, @Body() updateGuestDto: UpdateUserDto): Promise<GuestUser> {
    return this.usersAdminManager.updateGuest(guestId, updateGuestDto)
  }

  @Delete(`${ADMIN_USERS_ROUTE.GUESTS}/:id`)
  deleteGuest(@Param('id', ParseIntPipe) guestId: number): Promise<void> {
    return this.usersAdminManager.deleteGuest(guestId)
  }

  @Search(ADMIN_USERS_ROUTE.MEMBERS)
  searchMembers(@Body() searchMembersDto: SearchMembersDto): Promise<Member[]> {
    return this.usersAdminManager.searchMembers(searchMembersDto)
  }

  @Get(`${ADMIN_USERS_ROUTE.GROUPS}/${ADMIN_USERS_ROUTE.BROWSE}/:name?`)
  browseGroups(@Param('name') name?: string): Promise<GroupBrowse> {
    return this.usersAdminManager.browseGroups(name)
  }

  @Get(`${ADMIN_USERS_ROUTE.PGROUPS}/${ADMIN_USERS_ROUTE.BROWSE}/:name?`)
  browsePersonalGroups(@Param('name') name?: string): Promise<GroupBrowse> {
    return this.usersAdminManager.browseGroups(name, GROUP_TYPE.PERSONAL)
  }

  @Get(`${ADMIN_USERS_ROUTE.GROUPS}/:id`)
  getGroup(@Param('id', ParseIntPipe) groupId: number): Promise<AdminGroup> {
    return this.usersAdminManager.getGroup(groupId)
  }

  @Post(`${ADMIN_USERS_ROUTE.GROUPS}`)
  createGroup(@Body() createGroupDto: CreateOrUpdateGroupDto): Promise<AdminGroup> {
    return this.usersAdminManager.createGroup(createGroupDto)
  }

  @Put(`${ADMIN_USERS_ROUTE.GROUPS}/:id`)
  updateGroup(@Param('id', ParseIntPipe) groupId: number, @Body() updateGroupDto: CreateOrUpdateGroupDto): Promise<AdminGroup> {
    return this.usersAdminManager.updateGroup(groupId, updateGroupDto)
  }

  @Delete(`${ADMIN_USERS_ROUTE.GROUPS}/:id`)
  deleteGroup(@Param('id', ParseIntPipe) groupId: number): Promise<void> {
    return this.usersAdminManager.deleteGroup(groupId)
  }

  @Patch(`${ADMIN_USERS_ROUTE.GROUPS}/:groupId/${ADMIN_USERS_ROUTE.USERS}`)
  addUsersToGroup(@Param('groupId', ParseIntPipe) groupId: number, @Body() userIds: number[]): Promise<void> {
    return this.usersAdminManager.addUsersToGroup(groupId, userIds)
  }

  @Delete(`${ADMIN_USERS_ROUTE.GROUPS}/:groupId/${ADMIN_USERS_ROUTE.USERS}/:userId`)
  removeUserFromGroup(@Param('groupId', ParseIntPipe) groupId: number, @Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this.usersAdminManager.removeUserFromGroup(groupId, userId)
  }

  @Patch(`${ADMIN_USERS_ROUTE.GROUPS}/:groupId/${ADMIN_USERS_ROUTE.USERS}/:userId`)
  updateUserFromGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserFromGroupDto: UpdateUserFromGroupDto
  ): Promise<void> {
    return this.usersAdminManager.updateUserFromGroup(groupId, userId, updateUserFromGroupDto)
  }

  @Post(`${ADMIN_USERS_ROUTE.IMPERSONATE}/:id`)
  impersonateUser(
    @GetUser() admin: UserModel,
    @Param('id', ParseIntPipe) userId: number,
    @Body() adminPasswordDto: UserPasswordDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<LoginResponseDto> {
    return this.usersAdminManager.impersonateUser(admin, userId, adminPasswordDto, res)
  }

  @Post(`${ADMIN_USERS_ROUTE.IMPERSONATE}/${ADMIN_USERS_ROUTE.LOGOUT}`)
  @UserHaveRole(USER_ROLE.GUEST)
  logOutImpersonateUser(@GetUser() user: UserModel, @Res({ passthrough: true }) res: FastifyReply): Promise<LoginResponseDto> {
    return this.usersAdminManager.logoutImpersonateUser(user, res)
  }
}
