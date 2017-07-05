(function($, Handlebars) {
  $( document ).ready(function() {

    var source   = $("#cart-item-template").html(),    template = Handlebars.compile(source),
        elCart = $('#cart'),
        jsonResponse = {};

    var compileHTML = function(jsonData) {
      var generatedHtml    = template(jsonData);
      elCart.html(generatedHtml);
    }

    var filterResults = function() {
      var val = $(this).val(),
          filteredResults = {};

      if(val !== 'All') {
        filteredResults.arr = jsonResponse.arr.filter( function(item) {
          return item.size.indexOf(val) > -1;
        });
      }
      else {
        filteredResults.arr = jsonResponse.arr;
      }
      
      debugger;
      compileHTML(filteredResults);
    }

    var handleError = function(errorObj) {
      console.error('Error fetching data from service: ' + errorObj);
    }

    // this would get replaced by actual 
    // services' url, as it is available
    var serviceURL = 'scripts/mock.json';
    
    $.ajax({
      url: serviceURL
    })
    .done( function(jsonData) {
      var jsonArr = {};
      jsonArr.arr = jsonData;
      jsonResponse = jsonArr;
      compileHTML(jsonArr);
    })
    .fail( handleError );

    $('#cartHeaderFilter').on('change', filterResults);

  });
})($, Handlebars);