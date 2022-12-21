import express from 'express'
import {Response,Request} from 'express'
import routes from './routes/api'
const port = 5000

const app = express()

app.use('/api', routes)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

export default app
