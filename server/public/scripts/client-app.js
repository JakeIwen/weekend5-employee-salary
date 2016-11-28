var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'SalaryController',
      controllerAs: 'salaries'
    })
    .when('/budgets' ,{
      templateUrl: '/views/templates/budgets.html',
      controller: 'BudgetController',
      controllerAs: 'budgets'
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);

app.controller("BudgetController", ["$http", function($http) {
  var self = this;
  self.newBudget = {};
  self.salaries = [];
  getBudgets();

  // read only
  function getBudgets() {
    console.log('getBudgets init');
    $http.get('/budgets')
      .then(function(response) {
        console.log(response.data);
        self.data = response.data;
    });
  }

  self.addBudget = function() {
    self.newBudget.date = new Date();
    console.log('new budget: ', self.newBudget);
    $http.post('/budgets', self.newBudget)
      .then(function(response) {
        console.log('POST finished. Get budgets again.');
        getBudgets();
      });
  }

  self.deleteBudget = function(budgetObj) {
    var id = budgetObj.id;
    console.log('budget object id for delete: ', id);
    console.log('delete budget: ', self.deleteBudget);
    $http.delete('/budgets/' + id)
      .then(function(response) {
        console.log('DELETE finished. Get budgets again.');
        getBudgets();
      });
  }

}]);



app.controller("SalaryController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.salaries = [];

  getSalaries();

  // read only
  function getSalaries() {
    console.log('getSalaries init');
    $http.get('/salaries')
      .then(function(response) {
        console.log(response.data);
        var empData = response.data;
        self.totalSalary = 0;
        for (var i = 0; i < empData.length; i++) {
          if(empData[i].active == true) {
            self.totalSalary += empData[i].salary/12;
          }
        }
      self.data = response.data;
    });
  }

  self.addEmployee = function() {
    console.log('new employee: ', self.newEmp);
    $http.post('/salaries', self.newEmp)
      .then(function(response) {
        console.log('POST finished. Get salaries again.');
        getSalaries();
      });
  }

  self.changeStatus = function(employeeObj) {
    var id = employeeObj.id;
    console.log('budget object id for update: ', id);
    console.log('update budget: ', self.changeStatus);
    $http.put('/salaries/' + id)
      .then(function(response) {
        console.log('UPDATE finished. Get salaries again.');
        getSalaries();
      });
  }
  self.deleteEmployee = function(employeeObj) {
    var id = employeeObj.id;
    console.log('budget object id for delete: ', id);
    console.log('delete budget: ', self.deleteEmployee);
    $http.delete('/salaries/' + id)
      .then(function(response) {
        console.log('DELETE finished. Get salaries again.');
        getSalaries();
      });
  }

}]);
