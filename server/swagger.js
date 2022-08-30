const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './routes/oauthRoutes.js',
  './routes/userRoutes.js',
]

swaggerAutogen(outputFile, endpointsFiles)
