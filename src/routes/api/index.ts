import express from 'express'
import logger from '../../utilities/logger'
import sharp from 'sharp'

const routes = express.Router()

const inputPath = 'full/'
const outputPath = 'thumb/'

routes.get('/images', logger, async (req, res) => {
  let width: number | undefined = req.query.width as unknown as number
  let height: number | undefined = req.query.height as unknown as number
  const filename: string = req.query.filename as string

  if (!req.query.width || !req.query.height) {
    width = height = 200
  } else if (isFinite(width) && isFinite(height)) {
    width = Number(width) > 1 ? Number(width) : -Number(width)
    height = Number(height) > 1 ? Number(height) : -Number(height)
  } else {
    res.status(401).send('you must provide number value for width and height')
  }
  if (!filename) {
    res.status(401).send('you must provide image name')
  } else {
    const inputFile = `${inputPath}${filename}.jpg`
    const outputFile = `${filename}_thumb-w${width}-h${height}.jpg`
    const resizedImg = await sharp(inputFile)
      .resize(width, height, { fit: 'contain' })
      .jpeg({ mozjpeg: true })
      .toFile(outputPath + outputFile)
    console.log(resizedImg)
    res.status(200).sendFile(outputFile, { root: outputPath })
  }
})

export default routes
