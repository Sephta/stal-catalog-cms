const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './routes/docs.js',
  './routes/index.js',
  './routes/userRoute.js',
]

swaggerAutogen(outputFile, endpointsFiles)