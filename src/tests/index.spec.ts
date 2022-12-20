// import express from 'express';
import supertest from 'supertest'
import app from '../index'
import { /*  resizeImg, */ doesImgNeedCache } from '../utilities/validations'
// import { NextFunction, Request, Response } from 'express'

const request = supertest(app)

describe('checking on middelware', () => {
  describe('testing cache process', () => {
    it('expect cache function to not return true if filename and dimensions are new', async () => {
      const isCahched = doesImgNeedCache('200', '200', 'fjord')
      expect(isCahched).toBeFalse()
    })
    it("expect a valid image to not been send in response if the name wasn't x", async () => {
      const res = await request.get('/api/images?filename=x')
      expect(res.type).not.toBe('image/jpeg')
    })
    //   it("not providing width or height",()=>{
    //   let mockReq: Request, mockRes: Response, mockNext: NextFunction
    //     // mockReq={
    //     //   query:{
    //     //     width:"200",
    //  filename:"fjord"
    //     //   }
    //     // }
    //     widthHeightValidation(mockReq,mockRes,mockNext)
    //     expect(mockRes.sendFile).toHaveBeenCalled()
    //     expect(resizeImg).toHaveBeenCalled()
    // })
  })
})
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
