import express, { NextFunction } from 'express'

const logger = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  console.log(
    `image name=${req.query.filename} ,width=${req.query.width} ,height=${req.query.height}`
  )
  next()
}

export default logger
