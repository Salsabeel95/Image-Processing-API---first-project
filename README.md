
# Image Processing API
Back-end node.js project for image manipulation needs resize from provided ones with optional dimensions to resize with. 


## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.
## Getting started: 
### 1.Clone this Repository
```
   git clone https://github.com/Salsabeel95/Image-Processing-API-first-project.git
   cd Image-Processing-API-first-project
```
### 2.Install project dependencies

```
  npm install
```
### 3.Build for production 

```
  npm run build
```
### 4.Start production enviroment

```
  npm start:js
```
   you should see this after starting project
```
  server started at localhost:5000
```
### 5.Test project

```
  npm test
```
### Start development enviroment

```
  npm start
```
### For linter

```
  npm run lint
```
### For formatter (prettier)

```
  npm run format
```
## API Reference

#### Request: Get resized image

Image with the filename will resize in the 'thumb' folder with 200 px width and height by default unless otherwise specified.  

```http
  GET /api/images?filename=${filename}&width=${width}&height=${height}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filename` | `string` | **Required**. Image name to be resize from 'full' images folder |
| `width` | `number` | **Optional (greater than 0)**. Image width to be resized with. It is 200 px as default value|
| `height` | `number` | **Optional (greater than 0)**. Image height to be resized with. It is 200 px as default value|

#### Response: Get resized image
Resized image will be send in the response after resizing process or caching if needed.

## Technology stack:
- [typescript](https://www.npmjs.com/package/typescript) : For development.
- [sharp](https://www.npmjs.com/package/sharp) : For resizing process.
- [express](https://www.npmjs.com/package/express) : For creating server.  
- [jasmine](https://www.npmjs.com/package/jasmine) : For unit testing.  
- [supertest](https://www.npmjs.com/package/supertest) : For unit testing HTTP .  
 - [Eslint](https://www.npmjs.com/package/eslint) : For improving code quality. 
 - [prettier](https://www.npmjs.com/package/prettier): For formating code.
 - [npm](https://www.npmjs.com): For dependencies managment

