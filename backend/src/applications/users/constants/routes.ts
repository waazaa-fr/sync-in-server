/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { ADMIN_ROUTE } from '../../admin/constants/routes'

export const USERS_ROUTE = {
  BASE: '/api/users',
  ME: 'me',
  LANGUAGE: 'language',
  PASSWORD: 'password',
  NOTIFICATION: 'notification',
  AVATAR: 'avatar',
  GROUPS: 'groups',
  USERS: 'users',
  GUESTS: 'guests',
  BROWSE: 'browse',
  GROUPS_LEAVE: 'leave'
} as const

export const API_USERS_ME = `${USERS_ROUTE.BASE}/${USERS_ROUTE.ME}`
export const API_USERS_MY_LANGUAGE = `${API_USERS_ME}/${USERS_ROUTE.LANGUAGE}`
export const API_USERS_MY_PASSWORD = `${API_USERS_ME}/${USERS_ROUTE.PASSWORD}`
export const API_USERS_MY_NOTIFICATION = `${API_USERS_ME}/${USERS_ROUTE.NOTIFICATION}`
export const API_USERS_MY_AVATAR = `${API_USERS_ME}/${USERS_ROUTE.AVATAR}`
export const API_USERS_MY_GROUPS = `${API_USERS_ME}/${USERS_ROUTE.GROUPS}`
export const API_USERS_MY_GROUPS_BROWSE = `${API_USERS_MY_GROUPS}/${USERS_ROUTE.BROWSE}`
export const API_USERS_MY_GROUPS_LEAVE = `${API_USERS_MY_GROUPS}/${USERS_ROUTE.GROUPS_LEAVE}`
export const API_USERS_MY_GUESTS = `${API_USERS_ME}/${USERS_ROUTE.GUESTS}`
export const API_USERS_AVATAR = `${USERS_ROUTE.BASE}/${USERS_ROUTE.AVATAR}`

export const ADMIN_USERS_ROUTE = {
  BASE: ADMIN_ROUTE.BASE,
  LIST: 'list',
  USERS: 'users',
  GUESTS: 'guests',
  GROUPS: 'groups',
  PGROUPS: 'personal_groups',
  MEMBERS: 'members',
  IMPERSONATE: 'impersonate',
  LOGOUT: 'logout',
  BROWSE: 'browse'
} as const
export const API_ADMIN_USERS = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.USERS}`
export const API_ADMIN_USERS_LIST = `${API_ADMIN_USERS}/${ADMIN_USERS_ROUTE.LIST}`
export const API_ADMIN_GUESTS = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.GUESTS}`
export const API_ADMIN_GUESTS_LIST = `${API_ADMIN_GUESTS}/${ADMIN_USERS_ROUTE.LIST}`
export const API_ADMIN_GROUPS = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.GROUPS}`
export const API_ADMIN_PGROUPS = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.PGROUPS}`
export const API_ADMIN_GROUPS_BROWSE = `${API_ADMIN_GROUPS}/${ADMIN_USERS_ROUTE.BROWSE}`
export const API_ADMIN_PERSONAL_GROUPS_BROWSE = `${API_ADMIN_PGROUPS}/${ADMIN_USERS_ROUTE.BROWSE}`
export const API_ADMIN_MEMBERS = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.MEMBERS}`
export const API_ADMIN_IMPERSONATE = `${ADMIN_USERS_ROUTE.BASE}/${ADMIN_USERS_ROUTE.IMPERSONATE}`
export const API_ADMIN_IMPERSONATE_LOGOUT = `${API_ADMIN_IMPERSONATE}/${ADMIN_USERS_ROUTE.LOGOUT}`
