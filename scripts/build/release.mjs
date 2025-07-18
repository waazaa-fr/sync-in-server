#!/usr/bin/env node
/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extraFiles = ['LICENSE', 'README.md']
const environmentFiles = ['environment.dist.min.yaml', 'environment.dist.yaml']
const environmentDir = 'environment'

const rootDir = path.resolve(__dirname, '../..')

const rootPKGPath = path.join(rootDir, 'package.json')
const backendPKGPath = path.join(rootDir, 'backend', 'package.json')
const distDirName = 'dist'
const distDir = path.join(rootDir, distDirName)
const distPKGPath = path.join(distDir, 'package.json')

if (!fs.existsSync(distDir)) {
  console.error('The dist/ folder does not exist. Have you run the build ?')
  process.exit(1)
}

const [rootPkgRaw, backendPkgRaw] = await Promise.all([fs.promises.readFile(rootPKGPath, 'utf8'), fs.promises.readFile(backendPKGPath, 'utf8')])
const rootPkg = JSON.parse(rootPkgRaw)
const backendPkg = JSON.parse(backendPkgRaw)

const releasePKG = {
  name: '@sync-in/server',
  version: rootPkg.version,
  description: rootPkg.description,
  author: rootPkg.author,
  license: rootPkg.license,
  homepage: rootPkg.homepage,
  repository: rootPkg.repository,
  bugs: rootPkg.bugs,
  os: ['!win32'],
  keywords: rootPkg.keywords,
  bin: {
    'sync-in-server': 'server/main.js'
  },
  scripts: {
    init_env: 'cp node_modules/@sync-in/server/environment/environment.dist.min.yaml environment.yaml'
  },
  dependencies: backendPkg.dependencies,
  optionalDependencies: backendPkg.optionalDependencies
}

try {
  await fs.promises.writeFile(distPKGPath, JSON.stringify(releasePKG, null, 2))
  console.log(`✅ ${path.relative(rootDir, distPKGPath)} generated successfully !`)
} catch (e) {
  console.error(`❌ ${path.relative(rootDir, distPKGPath)} not generated : ${e} !`)
  process.exit(1)
}

for (const f of extraFiles) {
  try {
    await fs.promises.copyFile(path.join(rootDir, f), path.join(distDir, f))
    console.log(`✅ ${distDirName}/${f} copied successfully !`)
  } catch (e) {
    console.log(`❌ ${distDirName}/${f} not copied : ${e}`)
    process.exit(1)
  }
}

const templatesPath = path.join(distDir, environmentDir)
await fs.promises.mkdir(templatesPath, { recursive: true })
for (const t of environmentFiles) {
  try {
    await fs.promises.copyFile(path.join(rootDir, environmentDir, t), path.join(templatesPath, t))
    console.log(`✅ ${distDirName}/${environmentDir}/${t} copied successfully !`)
  } catch (e) {
    console.log(`❌ ${distDirName}/${environmentDir}/${t} not copied : ${e}`)
  }
}
