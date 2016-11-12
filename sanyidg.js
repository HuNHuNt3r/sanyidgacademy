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

      $("#myTable").on("click", "tr td:first-child" ,function (data) {
        var SelectedRow = data.target.textContent;
        var $thisRow = $(data.target).parent();


        if($thisRow.hasClass('opened')) {
          $thisRow.removeClass('opened')
          $thisRow.next().remove();
          $thisRow[0].style.backgroundColor = 'white';
        }
        else {
          $thisRow[0].style.backgroundColor = '#EF9A9A';
          $thisRow.addClass("opened");
          $.ajax({
            type: 'GET',
            url: '//pokeapi.co/api/v2/pokemon/' + data.target.textContent + '/',
            success: function (res) {
              $thisRow.after(
                  '<tr style="display: none" class="newtr"><td><pair><key>ID:</key><value>' + res["id"] + '</value></pair>'
                  + '<br>' + '<pair><key>Height:</key><value>' + res["height"] + '</value></pair> '
                  + '<br>' + '<pair><key>Weight:</key><value>' + res['weight'] + '</value></pair>'
                  + '<br>' + '<pair><key>Order:</key><value>' + res['order'] + '</value></pair></td>'
                  + '<td></td><td></td> <td></td></tr>'
                  )
              $thisRow.next('.newtr').hide();
              $thisRow.next('.newtr').slideDown('slow', function () {
                
              })

            }
          })
        }
      })

    }
  })


























});

