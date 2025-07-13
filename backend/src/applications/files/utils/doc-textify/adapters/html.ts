/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import fs from 'fs/promises'
import { compile } from 'html-to-text'

const htmlConverter = compile({ wordwrap: false, preserveNewlines: false })

export async function parseHtml(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, { encoding: 'utf8' })
  return htmlConverter(content)
}
