/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SERVER_NAME } from '../../../app.constants'
import { ACTION } from '../../../common/constants'
import { capitalizeString } from '../../../common/shared'
import { fileName } from '../../files/utils/files'
import { UserModel } from '../../users/models/user.model'
import { translateObject } from '../i18n'
import { NotificationContent } from '../interfaces/notification-properties.interface'
import { defaultFooter, mailAuthor, mailEventOnElement, mailItalicContent, mailTemplate } from './templates'
import { urlFromLink, urlFromSpace, urlFromSpaceFile, urlFromSync } from './urls'

export function commentMail(
  language: string,
  notification: NotificationContent,
  options: {
    content: string
    currentUrl: string
    author: UserModel
  }
): [string, string] {
  const tr = translateObject(language, {
    title: 'Comment',
    defaultFooter: defaultFooter,
    footer: 'You receive this notification if you are the owner of the file or if you have also commented on this file',
    urlText: 'Access it from',
    event: notification.event
  })

  const content = `${mailAuthor(options.author)}${mailEventOnElement(tr.event, notification.element)}${mailItalicContent(options.content)}`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${urlFromSpaceFile(options.currentUrl, notification)}">${SERVER_NAME}</a><br>${tr.footer}<br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(notification.element)}`, mailTemplate(content, footer)]
}

export function spaceMail(
  language: string,
  notification: NotificationContent,
  options: {
    currentUrl: string
    action: ACTION
  }
): [string, string] {
  const tr = translateObject(language, {
    title: 'Space',
    defaultFooter: defaultFooter,
    urlText: options.action === ACTION.ADD ? 'Access it from' : 'Access your spaces from',
    event: notification.event
  })

  const spaceUrl = urlFromSpace(options.currentUrl, options.action === ACTION.ADD ? notification.element : undefined)

  const content = `${mailEventOnElement(tr.event, notification.element)}`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${spaceUrl}">${SERVER_NAME}</a><br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(notification.element)}`, mailTemplate(content, footer)]
}

export function spaceRootMail(
  language: string,
  notification: NotificationContent,
  options: {
    currentUrl: string
    author: UserModel
    action: ACTION
  }
): [string, string] {
  const tr = translateObject(language, {
    title: 'Space',
    defaultFooter: defaultFooter,
    urlText: options.action === ACTION.ADD ? 'Access it from' : 'Access this space from',
    event: notification.event,
    originEvent: options.action === ACTION.ADD ? 'to the space' : 'from the space'
  })

  const spaceName = fileName(notification.url)
  const spaceRootUrl =
    options.action === ACTION.ADD ? urlFromSpaceFile(options.currentUrl, notification) : urlFromSpace(options.currentUrl, spaceName)

  const content = `${mailAuthor(options.author)}${mailEventOnElement(tr.event, notification.element)}&nbsp;${tr.originEvent}&nbsp;<b>${spaceName}</b>`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${spaceRootUrl}">${SERVER_NAME}</a><br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(spaceName)}`, mailTemplate(content, footer)]
}

export function shareMail(
  language: string,
  notification: NotificationContent,
  options: {
    currentUrl: string
    author: UserModel
    action: ACTION
  }
): [string, string] {
  const tr = translateObject(language, {
    title: 'Share',
    defaultFooter: defaultFooter,
    urlText: options.action === ACTION.ADD ? 'Access it from' : 'Access your shares from',
    event: notification.event
  })

  const content = `${options.author ? mailAuthor(options.author) : ''}${mailEventOnElement(tr.event, notification.element)}`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${urlFromSpaceFile(options.currentUrl, notification)}">${SERVER_NAME}</a><br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(notification.element)}`, mailTemplate(content, footer)]
}

export function linkMail(
  language: string,
  notification: NotificationContent,
  options: {
    currentUrl: string
    author: UserModel
    action: ACTION
    linkUUID: string
  }
): [string, string] {
  const tr = translateObject(language, {
    title: options.action === ACTION.ADD ? 'Share' : 'Space',
    defaultFooter: defaultFooter,
    urlText: 'Access it from',
    event: notification.event
  })

  const content = `${options.author ? mailAuthor(options.author) : ''}${mailEventOnElement(tr.event, notification.element)}`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${urlFromLink(options.currentUrl, options.linkUUID)}">${SERVER_NAME}</a><br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(notification.element)}`, mailTemplate(content, footer)]
}

export function syncMail(
  language: string,
  notification: NotificationContent,
  options: {
    currentUrl: string
    action: ACTION
  }
): [string, string] {
  const tr = translateObject(language, {
    title: 'Sync',
    defaultFooter: defaultFooter,
    urlText: options.action === ACTION.ADD ? 'Access it from' : 'Access your syncs from',
    event: notification.event
  })

  const syncUrl = urlFromSync(options.currentUrl)

  const content = `${mailEventOnElement(tr.event, notification.element)}`

  const footer = `<br>${tr.urlText}&nbsp;<a href="${syncUrl}">${SERVER_NAME}</a><br>${tr.defaultFooter}`

  return [`${tr.title}: ${capitalizeString(notification.element)}`, mailTemplate(content, footer)]
}
