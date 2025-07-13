/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import path from 'node:path'
import process from 'node:process'

export const IS_PROD_ENV: boolean = process.env['NODE_ENV'] === 'production'
export const IS_TEST_ENV: boolean = process.env['NODE_ENV'] === 'test'
export const ENVIRONMENT_FILE = 'environment/environment.yaml'
export const STATIC_PATH = path.resolve(path.join(__dirname, IS_TEST_ENV ? '../../../dist/static' : '../../static'))
export const STATIC_ASSETS_PATH = path.join(STATIC_PATH, 'assets')
export const APP_RUN_PATH = path.join(__dirname, '../../run')
