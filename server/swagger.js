const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './routes/docs.js',
  './routes/index.js',
  './routes/testRouteA.js',
  './routes/testRouteB.js',
]

swaggerAutogen(outputFile, endpointsFiles)