/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { createCanvas, loadImage, PNGStream, registerFont } from 'canvas'
import fs from 'node:fs/promises'
import path from 'node:path'

registerFont(path.join(__dirname, 'fonts', 'avatar.ttf'), { family: 'Avatar' })

export const pngMimeType = 'image/png'
export const svgMimeType = 'image/svg+xml'

export async function generateThumbnail(filePath: string, size: number) {
  const image = await loadImage(filePath)
  let width = image.width
  let height = image.height

  // Calculate the new dimensions, maintaining the aspect ratio
  if (width > height) {
    if (width > size) {
      height *= size / width
      width = size
    }
  } else {
    if (height > size) {
      width *= size / height
      height = size
    }
  }
  // Set the canvas dimensions to the new dimensions
  const canvas = createCanvas(width, height)
  // Draw the resized image on the canvas
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  return canvas.createPNGStream({ compressionLevel: 0 })
}

export function generateAvatar(initials: string): PNGStream {
  const canvas = createCanvas(256, 256)
  const ctx = canvas.getContext('2d')
  const text = initials
  const { backgroundColor, foregroundColor } = randomColor()

  // Properties
  ctx.quality = 'best'

  // Draw background
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw text
  const height = 150
  ctx.font = `${height}px "Avatar"`
  ctx.fillStyle = foregroundColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2.1)

  return canvas.createPNGStream()
}

export async function convertImageToBase64(imgPath: string) {
  const base64String = await fs.readFile(imgPath, { encoding: 'base64' })
  return `data:image/png;base64,${base64String}`
}

function randomColor() {
  let color = ''
  while (color.length < 6) {
    /* sometimes the returned value does not have
     * the 6 digits needed, so we do it again until
     * it does
     */
    color = Math.floor(Math.random() * 16777215).toString(16)
  }
  const red = parseInt(color.substring(0, 2), 16)
  const green = parseInt(color.substring(2, 4), 16)
  const blue = parseInt(color.substring(4, 6), 16)
  const brightness = red * 0.299 + green * 0.587 + blue * 0.114

  return {
    backgroundColor: `#${color}`,
    foregroundColor: brightness > 180 ? '#000000' : '#ffffff'
  }
}
