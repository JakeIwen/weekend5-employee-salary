var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/salaries';

router.get('/', function(req, res) {
  console.log('get salaries SQL query init');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM salaries ORDER BY id;', function(err, result) {
      done(); // close the connection.
      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  console.log(newEmployee);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'INSERT INTO salaries (first_name, last_name, id, title, salary) ' +
      'VALUES ($1, $2, $3, $4, $5)',
      [newEmployee.firstName, newEmployee.lastName, newEmployee.id, newEmployee.title, newEmployee.salary],
      function(err, result) {
        done();
        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

router.delete('/:id', function(req, res) {
  employeeID = req.params.id;

  console.log('employee id to delete: ', employeeID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM salaries WHERE id = $1',
      [employeeID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

router.put('/:id', function(req, res) {
  employeeID = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'UPDATE salaries SET active = NOT active' +
      ' WHERE id=$1', [employeeID],
      function(err, result) {
        done();
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});


module.exports = router;
