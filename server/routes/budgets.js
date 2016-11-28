var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/salaries';


router.get('/', function(req, res) {
  console.log('get budgets SQL query init');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM budgets ORDER BY id;', function(err, result) {
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
  var budget = req.body;
  console.log('adding new budget : $', budget.amount);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'INSERT INTO budgets (date, monthly_budget) ' +
      'VALUES ($1, $2)', [budget.date, budget.amount],
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
  budgetID = req.params.id;
  console.log('budget id to delete: ', budgetID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM budgets WHERE id = $1',
      [budgetID],
      function(err, result) {
        done();
        if(err) {res.sendStatus(500);}
        else {res.sendStatus(200);}
      });
    });
});

module.exports = router;
