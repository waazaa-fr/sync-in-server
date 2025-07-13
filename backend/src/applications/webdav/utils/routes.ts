/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { PATH_TO_SPACE_SEGMENTS } from '../../spaces/utils/routes'
import { WEBDAV_BASE_PATH, WEBDAV_SPACES } from '../constants/routes'

export function WEBDAV_PATH_TO_SPACE_SEGMENTS(path: string): string[] {
  const urlSegments = PATH_TO_SPACE_SEGMENTS(path)
  if (urlSegments[0] === WEBDAV_BASE_PATH) {
    urlSegments.shift()
  }
  const repository = urlSegments.shift()
  if (!(repository in WEBDAV_SPACES)) {
    throw new Error(`Repository not found : ${repository}`)
  }
  urlSegments.unshift(...WEBDAV_SPACES[repository].spaceRepository)
  return urlSegments
}
