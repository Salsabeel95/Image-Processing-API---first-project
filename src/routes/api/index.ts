import express from 'express'
import logger from '../../utilities/logger'
const routes = express.Router()

routes.get('/images', logger, (req, res) => {
  res.send('image info has been received')
})

export default routes
