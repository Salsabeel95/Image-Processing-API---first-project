import express from 'express'
import logger from '../../utilities/logger'
import {
  fileNameValidation,
  widthHeightValidation,
} from '../../utilities/validations'

const routes = express.Router()
routes.use([logger, fileNameValidation, widthHeightValidation])

const outputDirctory = 'thumb'

routes.get('/images', (req, res) => {
  const { filename, width = 200, height = 200 } = req.query
  const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
  res.status(200).sendFile(newImgName, { root: outputDirctory })
})

export default routes
