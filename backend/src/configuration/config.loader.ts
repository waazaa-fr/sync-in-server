/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import * as yaml from 'js-yaml'
import fs from 'node:fs'
import path from 'node:path'
import { APP_LOGS_PATH, ENVIRONMENT_FILE_NAME, ENVIRONMENT_PATH } from './config.constants'

export function configLoader(): any {
  if (!fs.existsSync(APP_LOGS_PATH)) {
    fs.mkdirSync(APP_LOGS_PATH, { recursive: true })
  }
  for (const envPath of [path.join(__dirname, `../../../${ENVIRONMENT_PATH}`), `./${ENVIRONMENT_PATH}`, ENVIRONMENT_FILE_NAME]) {
    if (fs.existsSync(envPath) && fs.lstatSync(envPath).isFile()) {
      return yaml.load(fs.readFileSync(envPath, 'utf8'))
    }
  }
  throw new Error(`${ENVIRONMENT_FILE_NAME} not found`)
}
