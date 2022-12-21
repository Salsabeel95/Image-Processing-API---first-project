import express, { Router } from 'express'
import logger from '../../utilities/logger'
import {Response,Request} from 'express'

import {
  fileNameValidation,
  widthHeightValidation,
} from '../../utilities/validations'

const routes:Router = express.Router()
routes.use([logger, fileNameValidation, widthHeightValidation])

const outputDirctory = 'thumb'

routes.get('/images', (req:Request, res:Response) => {
  const { filename, width = 200, height = 200 } = req.query
  const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
  res.status(200).sendFile(newImgName, { root: outputDirctory })
})

export default routes
