/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { fileURLToPath } from 'url'
import path from 'node:path'
import fs from 'node:fs/promises'
import constants from 'node:constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const codeMirrorNodeModules = path.join(__dirname, '..', '..', 'node_modules', 'codemirror', 'mode')
const codeMirrorAssetsDirectory = path.join(__dirname, '..', 'src', 'assets', 'codemirror')
const codeMirrorAssetsMode = path.join(codeMirrorAssetsDirectory, 'mode')

async function checkPath(path) {
  try {
    await fs.access(path, constants.R_OK | constants.W_OK)
    return true
  } catch {
    return false
  }
}

export async function checkCodeMirror() {
  if (!(await checkPath(codeMirrorNodeModules))) {
    console.error(`codemirror - unable to find ${codeMirrorNodeModules}`)
    return
  }
  await fs.rm(codeMirrorAssetsDirectory, { recursive: true, force: true })
  await fs.mkdir(codeMirrorAssetsMode, { recursive: true })
  console.log(`codemirror - copy ${codeMirrorNodeModules} -> ${codeMirrorAssetsMode}`)
  await fs.cp(codeMirrorNodeModules, codeMirrorAssetsMode, {recursive: true})
  console.log('codemirror - assets update is done')
}