/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { usersAndGroups } from './usersgroups'

async function main() {
  await usersAndGroups()
  console.log(`${usersAndGroups.name} Seed done`)
}

if (require.main === module) {
  main().then(() => console.log('All seeds done'))
}
