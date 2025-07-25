/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { HttpStatus } from '@nestjs/common'
import path from 'node:path'
import { FileDBProps } from '../../files/interfaces/file-db-props.interface'
import { FileProps } from '../../files/interfaces/file-props.interface'
import { FileError } from '../../files/models/file-error'
import { isPathExists, isPathIsDir } from '../../files/utils/files'
import { UserModel } from '../../users/models/user.model'
import { CACHE_QUOTA_SPACE_PREFIX, CACHE_QUOTA_USER_PREFIX } from '../constants/cache'
import { SPACE_REPOSITORY } from '../constants/spaces'
import { SpaceEnv } from '../models/space-env.model'
import { SpaceModel } from '../models/space.model'

export async function validRealPath(rPath: string, onlyDir: boolean = true, mustExists: boolean = true, bPath?: string) {
  if (bPath && !rPath.startsWith(bPath)) {
    throw new FileError(HttpStatus.FORBIDDEN, 'Location is not allowed')
  }
  if (mustExists && !(await isPathExists(rPath))) {
    throw new FileError(HttpStatus.NOT_FOUND, 'Location not found')
  }
  if (onlyDir && !(await isPathIsDir(rPath))) {
    throw new FileError(HttpStatus.FORBIDDEN, 'Location is not a directory')
  }
}

export function realPathFromSpace(user: UserModel, space: SpaceEnv, withBasePath: true): string[]
export function realPathFromSpace(user: UserModel, space: SpaceEnv, withBasePath?: false): string
export function realPathFromSpace(user: UserModel, space: SpaceEnv, withBasePath: boolean = false): string | string[] {
  let bPath: string
  let fPath: string[]
  if (space.inPersonalSpace) {
    // personal user space (ignore root alias)
    bPath = UserModel.getRepositoryPath(user.login, space.inTrashRepository)
    fPath = space.paths
  } else if (space.root?.externalPath) {
    // external path from space or share
    bPath = space.root.externalPath
    if (space.inSharesRepository && space.root.file?.path) {
      // child share with an external path and file.id
      fPath = [...space.root.file.path.split('/'), ...space.paths]
    } else {
      fPath = space.paths
    }
  } else if (space.root.file?.path && space.root.owner?.login) {
    // space root linked to a file in a personal space
    bPath = path.join(UserModel.getRepositoryPath(space.root.owner.login, space.root.file.inTrash), space.root.file.path)
    fPath = space.paths
  } else if (space.root.file?.space?.id) {
    // share case
    if (space.root.file.root?.id) {
      // share linked to a file in a root space with an external path or directly to the root space
      bPath = path.join(space.root.file.root.externalPath, space.root.file.path || '')
    } else {
      // share linked to a file in a space
      bPath = path.join(SpaceModel.getRepositoryPath(space.root.file.space.alias, space.root.file.inTrash), space.root.file.path || '')
    }
    fPath = space.paths
  } else if (space.alias) {
    // space files (no root)
    bPath = SpaceModel.getRepositoryPath(space.alias, space.inTrashRepository)
    fPath = [space.root.alias, ...space.paths]
  } else {
    throw new FileError(HttpStatus.NOT_FOUND, 'Space root not found')
  }
  const rPath = path.join(bPath, ...fPath)
  return withBasePath ? [bPath, rPath] : rPath
}

export function realTrashPathFromSpace(user: UserModel, space: SpaceEnv) {
  if (space.inPersonalSpace) {
    // personal user space
    return UserModel.getTrashPath(user.login)
  } else if (space.root?.externalPath) {
    // external path from space or share
    if (space.root.file?.space?.alias) {
      // space case
      return SpaceModel.getTrashPath(space.root.file.space.alias)
    }
    // share case
    // todo: store the deleted files in the same path with .trash ?
    return null
  } else if (space.root?.file?.path && space.root.owner?.login) {
    // space root is linked to a file in a personal space
    return UserModel.getTrashPath(space.root.owner.login)
  } else if (space.root?.file?.space?.id) {
    // share linked to a space (with an external path or not)
    return SpaceModel.getTrashPath(space.root.file.space.alias)
  } else if (space.alias) {
    // space files (no root)
    return SpaceModel.getTrashPath(space.alias)
  } else {
    return null
  }
}

export function realPathFromRootFile(f: FileProps): string {
  // get realpath
  if (f.origin) {
    // share case (the order of the tests is important)
    if (f.origin.ownerLogin) {
      return path.join(UserModel.getRepositoryPath(f.origin.ownerLogin, f.inTrash), f.path)
    } else if (f.root.externalPath) {
      // in case of share child from a share with external path, child share should have an external path and a fileId (file path)
      return path.join(f.root.externalPath, f.path || '')
    } else if (f.origin.spaceRootExternalPath) {
      return path.join(f.origin.spaceRootExternalPath, f.path)
    } else if (f.origin.spaceAlias) {
      return path.join(SpaceModel.getRepositoryPath(f.origin.spaceAlias, f.inTrash), f.path)
    }
  } else {
    // space case
    if (f.root.owner.login) {
      return path.join(UserModel.getRepositoryPath(f.root.owner.login, f.inTrash), f.path)
    } else if (f.root.externalPath) {
      return f.root.externalPath
    }
  }
  return undefined
}

export function dbFileFromSpace(userId: number, space: SpaceEnv): FileDBProps {
  const dbFile: FileDBProps = {} as any
  dbFile.inTrash = space.repository === SPACE_REPOSITORY.TRASH
  if (space.inPersonalSpace) {
    // personal user space (ignore root alias)
    dbFile.ownerId = userId
    dbFile.path = path.join(...space.paths)
    dbFile.inTrash = space.inTrashRepository
  } else if (space.root?.externalPath) {
    // external path from space or share
    dbFile.spaceId = space.inSharesRepository ? null : space.id
    dbFile.spaceExternalRootId = space.inSharesRepository ? null : space.root.id
    if (space.inSharesRepository) {
      // in this case space.id is the share.id
      // if the `externalParentShareId` property is defined, it's an external child share that must use the parent id
      dbFile.shareExternalId = space.root?.externalParentShareId ? space.root.externalParentShareId : space.id
    } else {
      dbFile.shareExternalId = null
    }
    if (space.inSharesRepository && space.root.file?.path) {
      // child share with an external path and file.id
      dbFile.path = path.join(space.root.file.path, ...space.paths)
    } else {
      dbFile.path = path.join(...space.paths)
    }
  } else if (space.root.file?.path && space.root.owner?.login) {
    // space root linked to a file in a personal space
    dbFile.ownerId = space.root.owner.id
    dbFile.inTrash = space.root.file.inTrash
    dbFile.path = path.join(space.root.file.path, ...space.paths)
  } else if (space.root.file?.space?.id) {
    // share linked to a file in a space file or an external space root
    dbFile.spaceId = space.root.file.space.id
    dbFile.spaceExternalRootId = space.root.file.root?.id || null
    dbFile.shareExternalId = null
    if (space.root.file.id) {
      dbFile.inTrash = space.root.file.inTrash
    }
    dbFile.path = path.join(space.root.file.path || '', ...space.paths)
  } else if (space.id) {
    // space files (no root)
    dbFile.spaceId = space.id
    dbFile.spaceExternalRootId = null
    dbFile.path = path.join(space.root.alias, ...space.paths)
    dbFile.inTrash = space.inTrashRepository
  } else {
    throw new FileError(HttpStatus.NOT_FOUND, 'Space root not found')
  }
  return dbFile
}

export function quotaKeyFromSpace(userId: number, space: SpaceEnv) {
  if (space.inPersonalSpace) {
    // personal user space
    return `${CACHE_QUOTA_USER_PREFIX}-${userId}`
  } else if (space.root?.externalPath) {
    // external paths are managed by admin, set a quota on a root is not intended
    return null
  } else if (space.root.file?.path && space.root.owner?.login) {
    // space root is linked on a user file
    return `${CACHE_QUOTA_USER_PREFIX}-${space.root.owner.id}`
  } else if (space.root.file?.space?.id) {
    if (space.root.file.root?.id) {
      // share linked to a root space with an external path, set a quota on a root is not intended
      return null
    } else {
      return `${CACHE_QUOTA_SPACE_PREFIX}-${space.root.file.space.id}`
    }
  } else if (space.id) {
    return `${CACHE_QUOTA_SPACE_PREFIX}-${space.id}`
  } else {
    throw new FileError(HttpStatus.NOT_FOUND, 'Space root not found')
  }
}
