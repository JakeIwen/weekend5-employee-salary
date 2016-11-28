var myApp = angular.module("myApp", []);

myApp.controller("SalaryController", ["$http", function($http) {
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
          self.totalSalary += empData[i].salary/12;
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
    console.log('employee object id for update: ', id);
    console.log('update employee: ', self.changeStatus);
    $http.put('/salaries/' + id)
      .then(function(response) {
        console.log('UPDATE finished. Get salaries again.');
        getSalaries();
      });
  }
  self.deleteEmployee = function(employeeObj) {
    var id = employeeObj.id;
    console.log('employee object id for delete: ', id);
    console.log('delete employee: ', self.deleteEmployee);
    $http.delete('/salaries/' + id)
      .then(function(response) {
        console.log('DELETE finished. Get salaries again.');
        getSalaries();
      });
  }


  //
  // // tied to DOM thru self object

  //
  // self.clickMe = function(employeeObj) {
  //   console.log(employeeObj);
  // }
  //

  // self.updateEmployee = function(employeeObj) {
  //   var id = employeeObj.id;
  //   console.log('update employee: ', employeeObj);
  //   console.log('self.employee:', self.employee);
  //   $http.put('/salaries/' + id, employeeObj)
  //     .then(function(response) {
  //       console.log('UPDATE finished. Get salaries again.');
  //       getSalaries();
  //     });
  // }

}]);

myApp.filter('unique', function() {

 return function (arr, field) {
   var o = {}, i, l = arr.length, r = [];
   for(i=0; i<l;i+=1) {
     o[arr[i][field]] = arr[i];
   }
   for(i in o) {
     r.push(o[i]);
   }
   return r;
 };
})
