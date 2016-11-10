$( document ).ready(function() {
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  var id = getUrlParameter('id');
  console.log(id)

  $.ajax({
    type: 'GET',
    url: 'http://pokeapi.co/api/v2/pokemon/' + id +'/',
    success: function (res) {

      $('#mycontainer').append(
           '<div class="row"> <div class="col-sm-offset-6 "> <span class="label label-info">ID:</span>' +res['id']+'         </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-6"> <span class="label label-info">Name:</span>   '+res['name']+'      </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-6"> <span class="label label-info">Height:</span> '+res['height']+'  </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-6"> <span class="label label-info">Weight:</span> '+res['weight']+'  </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-6"> <span class="label label-info">Order:</span>    '+res['order']+'    </div>  </div> '
      )
    }
  })

})

