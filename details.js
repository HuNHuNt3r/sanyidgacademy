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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getPokeID(row)
  {
    return row.url.split('/')[ row.url.split('/').length-2]
  }

  var id = getUrlParameter('id');


  $.ajax({
    type: 'GET',
    url: '//pokeapi.co/api/v2/pokemon/' + id +'/',
    success: function (res) {



      $('#mycontainer').append(
          '<div class="row">'
          + '<div class="col-sm-offset-1 col-sm-2" id="myimg" > <img src="//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +res['id'] +'.png" /> </div>'
          + '<div class="col-sm-9">'
          + '<div class="row"> <div class="col-sm-offset-1 col-sm-2 "><span class="label label-info">ID:</span>     </div>  <div class="col-sm-offset-1 col-sm-2">'+res['id']+'      </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-1 col-sm-2"> <span class="label label-info">Name:</span>   </div>  <div class="col-sm-offset-1 col-sm-2">'+capitalizeFirstLetter(res['name'])+'    </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-1 col-sm-2"> <span class="label label-info">Height:</span> </div>  <div class="col-sm-offset-1 col-sm-2">'+res['height']+'  </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-1 col-sm-2"> <span class="label label-info">Weight:</span> </div>  <div class="col-sm-offset-1 col-sm-2">'+res['weight']+'  </div>  </div> '
          + '<div class="row"><div class="col-sm-offset-1 col-sm-2"> <span class="label label-info">Order:</span>  </div>  <div class="col-sm-offset-1 col-sm-2">'+res['order']+'   </div>  </div> '
          + '</div> </div>'
      )

    }
  })

})

