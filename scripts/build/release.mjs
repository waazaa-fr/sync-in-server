#!/usr/bin/env node
/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extraFiles = ['LICENSE']
const environmentFiles = ['environment.dist.min.yaml', 'environment.dist.yaml']
const environmentDir = 'environment'
const releaseName = 'sync-in-server'

const rootDir = path.resolve(__dirname, '../..')

const rootPKGPath = path.join(rootDir, 'package.json')
const backendPKGPath = path.join(rootDir, 'backend', 'package.json')
const distDirName = 'dist'
const distDir = path.join(rootDir, distDirName)
const releaseDir = path.join(rootDir, releaseName)
const distPKGPath = path.join(distDir, 'package.json')

if (!fs.existsSync(distDir)) {
  console.error('The dist/ folder does not exist. Have you run the build ?')
  process.exit(1)
}

if (fs.existsSync(releaseDir)) {
  try {
    await fs.promises.rm(releaseDir, { recursive: true, force: true })
    console.log(`✅ dir removed : ${releaseName}`)
  } catch (e) {
    console.error(`❌ unable to remove dir ${releaseName} : ${e}`)
  }
}

const [rootPkgRaw, backendPkgRaw] = await Promise.all([fs.promises.readFile(rootPKGPath, 'utf8'), fs.promises.readFile(backendPKGPath, 'utf8')])
const rootPkg = JSON.parse(rootPkgRaw)
const backendPkg = JSON.parse(backendPkgRaw)

const releasePKG = {
  name: rootPkg.name,
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
    init_env: 'cp environment/environment.dist.min.yaml environment.yaml'
  },
  dependencies: backendPkg.dependencies,
  optionalDependencies: backendPkg.optionalDependencies
}

try {
  await fs.promises.writeFile(distPKGPath, JSON.stringify(releasePKG, null, 2))
  console.log(`✅ ${path.relative(rootDir, distPKGPath)} generated`)
} catch (e) {
  console.error(`❌ ${path.relative(rootDir, distPKGPath)} not generated : ${e} !`)
  process.exit(1)
}

for (const f of extraFiles) {
  try {
    await fs.promises.copyFile(path.join(rootDir, f), path.join(distDir, f))
    console.log(`✅ ${distDirName}/${f} copied`)
  } catch (e) {
    console.error(`❌ ${distDirName}/${f} not copied : ${e}`)
    process.exit(1)
  }
}

const templatesPath = path.join(distDir, environmentDir)
await fs.promises.mkdir(templatesPath, { recursive: true })
for (const t of environmentFiles) {
  try {
    await fs.promises.copyFile(path.join(rootDir, environmentDir, t), path.join(templatesPath, t))
    console.log(`✅ ${distDirName}/${environmentDir}/${t} copied`)
  } catch (e) {
    console.error(`❌ ${distDirName}/${environmentDir}/${t} not copied : ${e}`)
    process.exit(1)
  }
}

try {
  await fs.promises.rename(distDir, releaseDir)
  console.log(`✅ ${distDirName} renamed to ${releaseName}`)
} catch (e) {
  console.error(`❌ ${distDirName} not renamed to ${releaseName} : ${e}`)
  process.exit(1)
}

try {
  await Promise.all([
    exec(`cd ${rootDir} && zip -r ${releaseName}.zip ${releaseName}`),
    exec(`cd ${rootDir} && tar -czf ${releaseName}.tar.gz ${releaseName}`)
  ])
  console.log(`✅ ${releaseName}.zip & ${releaseName}.tar.gz created`)
} catch (e) {
  console.error(`❌ ${releaseName} was not archived : ${e}`)
  process.exit(1)
}
