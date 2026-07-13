import { imageSize } from 'image-size'
import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

export function getImageDimensions(src: string): { width: number; height: number } | null {
  // Not a local /public asset (e.g. a remote/CDN image) - nothing to read.
  if (!src.startsWith('/')) return null

  const file = fs.readFileSync(path.join(PUBLIC_DIR, src))
  const { width, height } = imageSize(file)
  if (!width || !height) {
    throw new Error(`Could not determine dimensions for image "${src}".`)
  }
  return { width, height }
}
