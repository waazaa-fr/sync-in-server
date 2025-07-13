/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export const allSpecialCharacters = new RegExp(/[!@#$%^&*()~`,.?":{}|<>_+-]/g)
export const quotaRegexp = new RegExp('\\s*(\\d+)\\s*(MB|GB|TB).*', 'i')
export const validHttpSchemaRegexp = /^https?:\/\//

export function escapeRegexp(input: string): string {
  return input.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}
