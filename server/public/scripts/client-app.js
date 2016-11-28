var app = angular.module('myApp', ['ngRoute']);
var budgetNow = 0;

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'SalaryController',
      controllerAs: 'salaries'
    })
    .when('/budgets', {
      templateUrl: '/views/templates/budgets.html',
      controller: 'BudgetController',
      controllerAs: 'budgets'
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

app.factory('Fact', ["$http", function($http){
  console.log('factory init');
  var currentBudget = 0;
  function getBudget() {
    console.log('fact, gettting budgets');
    return $http.get('/budgets')
      .then(function(response) {
        var budgets = response.data;
        currentBudget = budgets[budgets.length - 1].monthly_budget;
        console.log('Fact currentbudget:', currentBudget);
      });
  }
  return{
    getBudget: function() {return getBudget();},
    currentBudget: function() {return currentBudget;}
  };

}]);

app.controller("SalaryController", ["$http", "Fact", function($http, Fact) {
  var self = this;
  self.newBudget = {};
  self.salaries = [];

  getSalaries();

  Fact.getBudget()
  .then( function(data) {
    self.currentBudget = Fact.currentBudget();
    console.log('latest budget: ', self.currentBudget);
  });

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
        compareBudget();
      });
  }

  function compareBudget() {
    if(self.totalSalary > self.currentBudget) {
      self.budgetMsg = 'We are over budget!'
    } else {
      self.budgetMsg = 'We are within the budget'
    }
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

app.controller("BudgetController", ["$http", "Fact", function($http, Fact) {
  var self = this;
  self.newBudget = {};
  self.salaries = [];
  self.currentBudget = {};

  getBudgets();

  function getBudgets() {
    console.log('getBudgets init');
    $http.get('/budgets')
      .then(function(response) {
        console.log('budgets get:', response.data);
        self.data = response.data;
        var budgets = response.data;
        Fact.getBudget()
        .then( function(data) {
          self.currentBudget = Fact.currentBudget();
          console.log('latest budget: ', self.currentBudget);
        });
      });
  }

  self.addBudget = function() {
    self.currentBudget = self.newBudget.monthly_budget;
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
