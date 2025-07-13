/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import * as yaml from 'js-yaml'
import fs from 'node:fs'
import path from 'node:path'
import { APP_RUN_PATH, ENVIRONMENT_FILE } from './config.constants'

export function configLoader(): any {
  if (!fs.existsSync(APP_RUN_PATH)) {
    fs.mkdirSync(APP_RUN_PATH, { recursive: true })
  }
  for (const envPath of [path.join(__dirname, `../../../${ENVIRONMENT_FILE}`), `./${ENVIRONMENT_FILE}`]) {
    if (fs.existsSync(envPath) && fs.lstatSync(envPath).isFile()) {
      return yaml.load(fs.readFileSync(envPath, 'utf8'))
    }
  }
  throw new Error(`${ENVIRONMENT_FILE} not found`)
}
