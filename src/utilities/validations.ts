import fs from 'fs'
import sharp from 'sharp'
import path from 'path'
import { NextFunction, Request, Response } from 'express'

const inputDirctory = 'full'
const outputDirctory = 'thumb'

const makeOutputDirctoryIfNeeded = async (): Promise<void> => {
  const imagesDir = path.join(__dirname, '..', '..', outputDirctory)
  if (!fs.existsSync(imagesDir)) {
    await fs.promises.mkdir(imagesDir)
  }
}
export const fileNameValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { filename } = req.query
  if (!filename) {
    res.status(400).json({ message: 'you must provide image name' })
  } else {
    makeOutputDirctoryIfNeeded()
    const images = fs.readdirSync(inputDirctory)
    const imagesAvailableNames = images
      .map((img) => img.replace('.jpg', ''))
      .join(' ,')
    if (images.includes(filename + '.jpg')) {
      next()
    } else {
      res.status(404).json({
        message:
          'image name must be one of the following: ' + imagesAvailableNames,
      })
    }
  }
}
export const doesImgNeedCache = (
  width: string,
  height: string,
  filename: string
): boolean => {
  const imagesAvailable = fs.readdirSync(outputDirctory)
  // console.log('imagesAvailable: ', imagesAvailable);
  const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
  return !imagesAvailable.includes(newImgName) ? true : false
}

export const resizeImg = async (
  width: number,
  height: number,
  filename: string
): Promise<void> => {
  console.log(`resize with w=${width} h=${height} ...`)
  const inputFile = path.join(inputDirctory, `${filename}.jpg`)
  const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
  const outputFile = path.join(outputDirctory, newImgName)
  await sharp(inputFile)
    .resize({ width, height, fit: 'contain' })
    .jpeg({ mozjpeg: true })
    .toFile(outputFile)
}

export const widthHeightValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { width = 200, height = 200, filename } = req.query

  if (
    height &&
    width &&
    isFinite(height as unknown as number) &&
    +height > 0 &&
    isFinite(width as unknown as number) &&
    +width > 0
  ) {
    // provided valid width or height or both
    console.log('provided valid width or height or both')
    doesImgNeedCache(
      width as unknown as string,
      height as unknown as string,
      filename as unknown as string
    ) && (await resizeImg(+width, +height, filename as unknown as string))
    next()
  } else {
    // only one of them provided
    if (
      ((!isFinite(height as unknown as number) || height <= 0) && height) ||
      (width && (!isFinite(width as unknown as number) || width <= 0))
    ) {
      // provided invalid width or height or both
      console.log('provided invalid width or height or both')
      res
        .status(400)
        .json({ message: 'dimensions must be a postive number greater than 0' })
    } else {
      // provided valid width or height
      console.log('provided valid width or height ')
      doesImgNeedCache(
        width as unknown as string,
        height as unknown as string,
        filename as unknown as string
      ) && (await resizeImg(+width, +height, filename as unknown as string))
      next()
    }
  }
}
