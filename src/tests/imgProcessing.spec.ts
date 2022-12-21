import supertest from 'supertest'
import app from '../index'
import { resizeImg, doesImgNeedCache } from '../utilities/validations'
import fs from 'fs'

const outputDirctory = 'thumb'
const request = supertest(app)

describe('checking on middelware', () => {
  describe('testing cache process', () => {
    it('expect cache function to not return true if filename and dimensions are new', async () => {
      const isCahched = doesImgNeedCache('200', '200', 'fjord')
      expect(isCahched).toBeFalse()
    })
    it("expect a valid image to not been send in response if the name was invalid", async () => {
      const res = await request.get('/api/images?filename=x')
      expect(res.type).not.toBe('image/jpeg')
    })
    describe('testing image process', () => {
      it("expect image to be resized to (200 , 200) and save to 'thumb' folder when not providing width or height", () => {
        const w = 200,
          h = 200,
          imgName = 'fjord'
        resizeImg(w, h, imgName)
        const imagesAvailable = fs.readdirSync(outputDirctory)
        const newImgName = `${imgName}_thumb-w${w}-h${h}.jpg`
        const isImgInThumb = imagesAvailable.includes(newImgName) ? true : false
        expect(isImgInThumb).toBeTrue()
      })
      it("expect image to be not resized and not save to 'thumb' folder with invalid width and height ", async () => {
        const w = 0,
          h = -1,
          imgName = 'fjord'
        await request.get(
          '/api/images?filename=' + imgName + '&width=' + w + '&height=' + h
        )
        const imagesAvailable = fs.readdirSync(outputDirctory)
        const newImgName = `${imgName}_thumb-w${w}-h${h}.jpg`
        const isImgInThumb = imagesAvailable.includes(newImgName) ? true : false
        expect(isImgInThumb).toBeFalse()
      })
    })
  })
})

/* it("expect image to be not resized and not save to 'thumb' folder with invalid width and height ", async () => {
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
  }) */