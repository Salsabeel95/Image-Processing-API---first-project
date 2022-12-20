import fs from 'fs'
import path from 'path'
import { mkdir, rm, copyFile } from 'fs/promises'

const outputDirctory = 'thumb'
const imagesDirInDist = path.join(__dirname, '..', outputDirctory)
const imagesDirInSrc = path.join(__dirname, '..', '..', outputDirctory)

async function setupDirctoryInDist(distPath: string, srcPath: string) {
  fs.existsSync(distPath) && (await rm(distPath, { recursive: true }))
  !fs.existsSync(distPath) && (await mkdir(distPath))
  fs.existsSync(distPath) &&
    fs.readdirSync(srcPath).forEach(async (file) => {
      await copyFile(path.join(srcPath, file), path.join(imagesDirInDist, file))
      console.log(file)
    })
}
try {
  setupDirctoryInDist(imagesDirInDist, imagesDirInSrc)
} catch (error) {
  console.log('error: ', error)
}
