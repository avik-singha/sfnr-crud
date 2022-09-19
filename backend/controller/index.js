const fastify = require('fastify');

module.exports={

    createEmployeeDetails : function(req, reply){
        fastify.mysql.query(
            'INSERT INTO employees (employeeName, employeeOrg, employeeLoc) VALUES (?,?,?)',
            [req.body.employeeName,req.body.employeeOrg,req.body.employeeLoc],
            function onResult (err, result) {
              reply.send(err || result)
            }
          )
    },

    getAllEmployeeDetails : function(req, reply){
        fastify.mysql.query(
            'SELECT * FROM employees',
            function onResult (err, result) {
              reply.send(err || result)
            }
          )
    },

    updateEmployeeDetails : function(req, reply){
        fastify.mysql.query(
            'UPDATE employees SET employeeName = ? , employeeOrg=? , employeeLoc=? WHERE employeeId=?',
            [req.body.employeeName, req.body.employeeOrg, req.body.employeeLoc, req.body.employeeId],
            function onResult (err, result) {
              reply.send(err || result)
            }
          )
    },

    deleteEmployeeDetails : function(req, reply){
        fastify.mysql.query(
            'DELETE FROM employees WHERE employeeId=?',[req.body.employeeId],
            function onResult (err, result) {
              reply.send(err || result)
            }
          )
    }
}