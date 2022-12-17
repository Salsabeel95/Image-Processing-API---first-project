import express from 'express'

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log(
    `image name=${req.query.filename} ,width=${req.query.width} ,height=${req.query.height}`
  )
  next()
}

export default logger
