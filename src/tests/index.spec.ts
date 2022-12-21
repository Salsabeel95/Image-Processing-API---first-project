import supertest from 'supertest'
import app from '../index'
const request = supertest(app)

describe('Test /api/images endpoint responses', () => {
  describe('gets the api /api/images endpoint without filename', () => {
    it('expect response status be 400', async () => {
      const response = await request.get('/api/images')
      expect(response.status).toBe(400)
    })
    it('expect response to throw specific error', async () => {
      const response = await request.get('/api/images')
      expect(response.body.message).toContain('you must provide image name')
    })
  })
  describe('gets the api /api/images endpoint with filename=fjord but without width and height', () => {
    it('expect response status be 200', async () => {
      const response = await request.get('/api/images?filename=fjord')
      expect(response.status).toBe(200)
    })
  })
  describe('gets the api /api/images endpoint with filename=xx but without width and height', () => {
    it('expect response status be 404', async () => {
      const response = await request.get('/api/images?filename=xx')
      expect(response.status).toBe(404)
    })
    it('expect response to throw specific error', async () => {
      const response = await request.get('/api/images?filename=xx')
      expect(response.body.message).toContain(
        'image name must be one of the following:'
      )
    })
  })
})


