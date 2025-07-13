/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Transform, Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { CSRF_KEY, WS_KEY } from './constants/auth'

export class AuthTokenAccessConfig {
  @IsString()
  @IsNotEmpty()
  name = 'sync-in-access'

  @IsString()
  @IsNotEmpty()
  secret: string

  @IsString()
  @IsNotEmpty()
  expiration = '30m'

  @IsNotEmpty()
  @IsString()
  cookieMaxAge = '30m'
}

export class AuthTokenRefreshConfig {
  @IsString()
  @IsNotEmpty()
  name = 'sync-in-refresh'

  @IsString()
  @IsNotEmpty()
  secret: string

  @IsString()
  @IsNotEmpty()
  expiration = '4h'

  @IsNotEmpty()
  @IsString()
  cookieMaxAge = '4h'
}

export class AuthTokenCsrfConfig extends AuthTokenRefreshConfig {
  @IsString()
  @IsNotEmpty()
  override name: string = CSRF_KEY
}

export class AuthTokenWSConfig extends AuthTokenRefreshConfig {
  @IsString()
  @IsNotEmpty()
  override name: string = WS_KEY
}

export class AuthTokenConfig {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthTokenAccessConfig)
  access: AuthTokenAccessConfig

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthTokenRefreshConfig)
  refresh: AuthTokenRefreshConfig

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthTokenCsrfConfig)
  csrf: AuthTokenCsrfConfig

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthTokenWSConfig)
  ws: AuthTokenWSConfig
}

export class AuthMethodLdapConfig {
  @Transform(({ value }) => (Array.isArray(value) ? value.filter((v: string) => Boolean(v)) : value))
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  servers: string[]

  @IsString()
  @IsNotEmpty()
  baseDN: string

  @IsOptional()
  @IsString()
  filter?: string

  @IsString()
  @IsNotEmpty()
  @IsIn(['uid', 'mail'])
  loginAttribute = 'uid'
}

export class AuthConfig {
  @IsString()
  @IsIn(['mysql', 'ldap'])
  method: 'mysql' | 'ldap' = 'mysql'

  @IsString()
  @IsIn(['lax', 'strict'])
  sameSite: 'lax' | 'strict' = 'strict'

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthTokenConfig)
  token: AuthTokenConfig

  @ValidateIf((o: AuthConfig) => o.method === 'ldap')
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthMethodLdapConfig)
  ldap: AuthMethodLdapConfig
}
