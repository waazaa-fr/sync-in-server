/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export enum AUTH_ROUTE {
  BASE = '/api/auth',
  LOGIN = 'login',
  LOGOUT = 'logout',
  REFRESH = 'refresh',
  TOKEN = 'token',
  TOKEN_REFRESH = `${AUTH_ROUTE.TOKEN}/refresh`,
  WS = 'socket.io'
}

export const API_AUTH_LOGIN = `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.LOGIN}`
export const API_AUTH_LOGOUT = `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.LOGOUT}`
export const API_AUTH_REFRESH = `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.REFRESH}`
export const API_AUTH_TOKEN = `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.TOKEN}`
export const API_AUTH_TOKEN_REFRESH = `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.TOKEN_REFRESH}`
export const API_AUTH_WS = `/${AUTH_ROUTE.WS}`
