import express from 'express'
import logger from '../../utilities/logger'
import sharp from 'sharp'
import path from "path";
import {  fileNameValidation, widthHeightValidation } from '../../utilities/validations';

const routes = express.Router()
routes.use([logger, fileNameValidation, widthHeightValidation])
// const inputDirctory = 'full'
const outputDirctory = 'thumb'



routes.get('/images', (req, res) => {
  const { filename, width, height } = req.query
  const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
  res.status(200).sendFile(newImgName, { root: outputDirctory })
})

export default routes


/* 
 
  // let width: number | undefined = req.query.width as unknown as number
  // let height: number | undefined = req.query.height as unknown as number
  const {filename,width,height} = req.query 

  // if (!req.query.width || !req.query.height) {
  //   width = height = 200
  // } else if (isFinite(width) && isFinite(height)) {
  //   width = Number(width) > 1 ? Number(width) : -Number(width)
  //   height = Number(height) > 1 ? Number(height) : -Number(height)
  // } else {
  //   res.status(401).send('you must provide number value for width and height')
  // }
  // if (!filename) {
  //   res.status(401).send('you must provide image name')
  // } else {
    const newImgName= `${filename}_thumb-w${width}-h${height}.jpg`
    res.status(200).sendFile( newImgName, { root: outputDirctory })
  // }
 */