// ESM
const Fastify = require('fastify');
const dbConnector = require('./util/database');
const employeeRoute = require('./routes');
    
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})
fastify.register(dbConnector) 

fastify.register(require('@fastify/swagger'),{  
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
      info: {
          title: 'Fastify API',
          description: 'Building a blazing fast REST API with Node.js, MySQL, Fastify and Swagger',
          version: '1.0.0'
      },
      externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
  }
})
fastify.register(employeeRoute)

fastify.ready(() => {
  console.log('fastify server is ready')
  fastify.swagger()
  })

fastify.listen({ port: 4000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
