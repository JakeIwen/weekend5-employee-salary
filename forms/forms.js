$(document).ready(function() {
    var tableRow = 0;
    var salaryArray = [];
    //listener for delete button
    $('#tableInfo').on('click', "#deleteEntry", removeFromDom);

    $('#einfo').on('submit', function(event) {
      event.preventDefault();
      // initialize a new variable as an empty object
      var values = {};
      // convert the form inputs into an array
      var fields = $('#einfo').serializeArray();
      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element) {
        values[element.name] = element.value;
      });
      $('#einfo').find('input[type=text]').val('');   // clear out inputs
      tableRow++;
      salaryArray[tableRow] = parseInt(values.eSalary); //add salary to array
      appendDom(values);
    });

     //remove the table row containing the unique class of the clicked button
    function removeFromDom() {
      var thisClass = $(this).attr("class");
      $('tr.' + thisClass).remove();
      //get index number of salary array from digits of class
      thisClass = thisClass.replace( /^\D+/g, ''); //remove all non-digits from classname
      var salIndex = parseInt(thisClass);
      //erase salary value of deleted employee from array
      salaryArray[salIndex] = 0;
      writeMonthlySalary();
    }

    function appendDom(empInfo) {
      //add new row to table with new employee data
      //provide unique row class for each table row
      var $el = $('#tableInfo').children().last();
      $el.append(
      '<tr class="person row' + tableRow + '"><td>' + empInfo.eFirstName + '</td>' +
      '<td>' + empInfo.eLastName + '</td>' +
      '<td>' + empInfo.eId + '</td>' +
      '<td>' + empInfo.eJob + '</td>' +
      '<td>' + empInfo.eSalary + '</td>' +
      '<td><button id="deleteEntry" class="row' + tableRow + '">Delete</button></td></tr>');
      writeMonthlySalary();
    }

    function writeMonthlySalary() {
      //quirky mini function that sums the values in the array
      var salarySum = salaryArray.reduce(function(a, b) {
        return a + b;
      }, 0);
      $('#monthlySalary').remove();
      $('#salaryTitle').append('<span id="monthlySalary">' + ' $' + salarySum/12 + '</span>');
    }

});
