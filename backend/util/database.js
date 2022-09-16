// ESM
const fastifyPlugin =require('fastify-plugin');
const fastifyMysql =require('@fastify/mysql');

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMysql,{
    connectionString: 'mysql://root:password@localhost:3306/dummydb'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)