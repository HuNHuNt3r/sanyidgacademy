$( document ).ready(function() {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getPokeID(row)
  {
    return row.url.split('/')[ row.url.split('/').length-2]
  }

  $.ajax({
    type: 'GET',
    url: '//pokeapi.co/api/v2/pokemon/?limit=151',
    success: function (res) {
      let images = [];
      for(let i = 0 ; i < res.results.length; i++)
      {
        $.ajax({
          type : 'GET',
          url :  '//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + i + '.png',
          success: function (item) {
            images.push(item);
          }
        })
      }

      var oTable = $('#myTable').DataTable({
        data: res.results,
        pageLength: 50,
        columns: [
          {title: 'ID',"search": false, "render": function (data, type, row) {

            return getPokeID(row);
           }
          },
          {data: "name", title: "Name", "render": function (data,type,row) {
            return '<a href="' + "details.html" + "?id=" + getPokeID(row) +'">'+capitalizeFirstLetter(row["name"])+ '</a>';
            }
          },
          //{data: "url", title: "url"}
          {
            "data": "url", title: "Url"  ,"search": false, "render": function (data, type, row) {

              return '<a href="' + data + '">'+row["name"]+'</a>';
            }
          },
          {data: "picture", title: "Picture","search": false, "render": function (data, type, row) {

              return '<img src="//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                      getPokeID(row)
                      +'.png" />';
            }
          },
        ]
      });

      $("#myTable thead input[type='text']").on('keyup change', function () {
        oTable
            .column($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
      });

      $("#myTable thead input[type='checkbox']").on('click', function () {
        if (this.checked) {
          oTable
              .column($(this).parent().index() + ':visible')
              .search('true')
              .draw();
        } else {
          oTable
              .column($(this).parent().index() + ':visible')
              .search('')
              .draw();
        }
      });


    }
  })


























});

