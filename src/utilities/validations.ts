import fs from "fs";
import sharp from 'sharp'
import path from "path";

const inputDirctory = 'full'
const outputDirctory = 'thumb'

export const fileNameValidation = (req: Record<string, any>, res: Record<string, any>, next: Function): void => {
    const { filename } = req.query
    if (!filename) {
        res.status(400).json({ "message": "you must provide image name" })
    } else {
        const images = fs.readdirSync(inputDirctory)
        const imagesAvailableNames = images.map(img => img.replace(".jpg", "")).join(" ,")
        if (images.includes(filename + '.jpg')) {
            next()
        } else {
            res.status(404).json({ "message": "image name must be one of the following: " + imagesAvailableNames })
        }
    }
}
 const doesImgNeedCache=  (width: number, height: number, filename: string): boolean => {
    const imagesAvailable= fs.readdirSync(outputDirctory)
    console.log('imagesAvailable: ', imagesAvailable);
    const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
    if (!imagesAvailable.includes(newImgName)) {
        return true
    }
    return false
}

const resizeImg = async (width: number, height: number, filename: string): Promise<sharp.OutputInfo> => {
    console.log('resize ...')
    const inputFile = path.join(inputDirctory, `${filename}.jpg`)
    const newImgName = `${filename}_thumb-w${width}-h${height}.jpg`
    const outputFile = path.join(outputDirctory, newImgName)
    return await sharp(inputFile)
        .resize({ width, height, fit: 'contain' })
        .jpeg({ mozjpeg: true })
        .toFile(outputFile)
}

export const widthHeightValidation = async (req: Record<string, any>, res: Record<string, any>, next: Function): Promise<void> => {
    let { width, height, filename } = req.query
    if (!height && !width) {
        // set height and width to default value 200
        console.log("set height and width to default value 200");
        width = height = req.query.width = req.query.height = 200
        doesImgNeedCache(width, height, filename)&& await resizeImg(width, height, filename)
        next()
    }
    else {
        if (height && width && isFinite(height) && +height > 0 && isFinite(width) && +width > 0) {
            // resize with width and height
            console.log('resize with width and height ')
            doesImgNeedCache(width, height, filename)&& await resizeImg(+width, +height, filename)
            next()
        }
        else {
            // only one of them provided
            if (height && isFinite(height) && height > 0) {
                // resize with height , width =200
                console.log('resize with height and width will be 200 ')
                width = req.query.width = 200
                doesImgNeedCache(width, height, filename)&& await resizeImg(width, +height, filename)
                next()
            } else if ((!isFinite(height) || height <= 0) && height) {
                res.status(400).json({ "message": "height must be a postive number greater than 0" })
            }
            else if (width && isFinite(width) && width > 0) {
                // resize with width , height =200
                console.log('resize with width and height will be 200 ')
                height = req.query.height = 200
                doesImgNeedCache(width, height, filename)&& await resizeImg(+width, height, filename)
                next()
            } else if (width && (!isFinite(width) || width <= 0)) {
                res.status(400).json({ "message": "width must be a postive number greater than 0" })
            }
        }
    }
}