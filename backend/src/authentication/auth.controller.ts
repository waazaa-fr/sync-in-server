/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Controller, Post, Res, UseGuards } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { GetUser } from '../applications/users/decorators/user.decorator'
import { UserModel } from '../applications/users/models/user.model'
import { AUTH_ROUTE } from './constants/routes'
import { AuthTokenSkip } from './decorators/auth-token-skip.decorator'
import { LoginResponseDto } from './dto/login-response.dto'
import { TokenResponseDto } from './dto/token-response.dto'
import { AuthLocalGuard } from './guards/auth-local.guard'
import { AuthTokenRefreshGuard } from './guards/auth-token-refresh.guard'
import { AuthManager } from './services/auth-manager.service'

@Controller(AUTH_ROUTE.BASE)
@AuthTokenSkip()
export class AuthController {
  constructor(private readonly auth: AuthManager) {}

  @Post(AUTH_ROUTE.LOGIN)
  @UseGuards(AuthLocalGuard)
  login(@GetUser() user: UserModel, @Res({ passthrough: true }) res: FastifyReply): Promise<LoginResponseDto> {
    return this.auth.setCookies(user, res)
  }

  @Post(AUTH_ROUTE.LOGOUT)
  logout(@Res({ passthrough: true }) res: FastifyReply) {
    return this.auth.clearCookies(res)
  }

  @Post(AUTH_ROUTE.REFRESH)
  @UseGuards(AuthTokenRefreshGuard)
  refreshCookies(@GetUser() user: UserModel, @Res({ passthrough: true }) res: FastifyReply): Promise<TokenResponseDto> {
    return this.auth.refreshCookies(user, res)
  }

  @Post(AUTH_ROUTE.TOKEN)
  @UseGuards(AuthLocalGuard)
  token(@GetUser() user: UserModel): Promise<TokenResponseDto> {
    return this.auth.getTokens(user)
  }

  @Post(AUTH_ROUTE.TOKEN_REFRESH)
  @UseGuards(AuthTokenRefreshGuard)
  refreshToken(@GetUser() user: UserModel): Promise<TokenResponseDto> {
    return this.auth.getTokens(user, true)
  }
}
