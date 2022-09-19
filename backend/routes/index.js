const employeeController = require('../controller');


const getAllEmployeeOpts = {
  schema : {
      response : {
        200 :{
          type : "array",
          items : {
            type : "object",
            properties : {
              employeeId : {type : 'string'},
              employeeName : {type : 'string'},
              employeeOrg : {type : 'string'},
              employeeLoc : {type : 'string'},
            }
          }
        }
      }
  }
}


/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options,done) {
  fastify.get('/employeezone/get-all-employees',getAllEmployeeOpts, function (req, reply) {
    fastify.mysql.query(
      'SELECT * FROM employees',
      function onResult(err, result) {
        reply.send(err || result)
      }
    )
  })

  fastify.post('/employeezone/delete-employee', function (req, reply) {
    fastify.mysql.query(
      'DELETE FROM employees WHERE employeeId=?', [req.body.employeeId],
      function onResult(err, result) {
        reply.send(err || result)
      }
    )
  })

  fastify.post('/employeezone/update-employee', function (req, reply) {
    fastify.mysql.query(
      'UPDATE employees SET employeeName = ? , employeeOrg=? , employeeLoc=? WHERE employeeId=?',
      [req.body.employeeName, req.body.employeeOrg, req.body.employeeLoc, req.body.employeeId],
      function onResult(err, result) {
        reply.send(err || result)
      }
    )
  })

  fastify.post('/employeezone/create-employee', function (req, reply) {
    fastify.mysql.query(
      'INSERT INTO employees (employeeName, employeeOrg, employeeLoc) VALUES (?,?,?)',
      [req.body.employeeName, req.body.employeeOrg, req.body.employeeLoc],
      function onResult(err, result) {
        reply.send(err || result)
      }
    )
  })

  done()
}

module.exports = routes