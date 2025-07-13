/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { LoginResponseDto } from '../../../authentication/dto/login-response.dto'
import { TokenResponseDto } from '../../../authentication/dto/token-response.dto'

export class ClientAuthCookieDto extends LoginResponseDto {
  // send the new client token
  client_token_update?: string
}

export class ClientAuthTokenDto extends TokenResponseDto {
  // send the new client token
  client_token_update?: string
}
