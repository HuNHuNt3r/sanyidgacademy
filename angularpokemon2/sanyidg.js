angular.module('pokeApp', [])
    .filter('capitalize',function () {
      return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    })
    .controller('pokecontroller', function ($scope, $http) {
      $http.get('//pokeapi.co/api/v2/pokemon/?limit=151').success(function (res) {

        $scope.details = []
        res.results.forEach(function (pokemon, index) {
          pokemon["id"] = ++index;
        })
        $scope.pokemons = res.results;

        console.log($scope.pokemons)
      })

      $scope.getDetails = function (id) {
        $http.get('//pokeapi.co/api/v2/pokemon/' + id + '/').success(function (data) {
          console.log(data)
          $scope.details[id] = data;

        })
      };

      $scope.closeDetails = function (id) {
        $scope.details.splice(id, 1);
    }
    $scope.sortbyID = function()
    {
      $scope.pokemons.sort(function (a,b) {
        if(a.id < b.id)
          return -1;
        if(a.id > b.id)
          return 1;
        return 0;

      });
    }
    $scope.sortbyName = function () {
      $scope.pokemons.sort(function (a,b) {
        if(a.name < b.name)
          return -1;
        if(a.name > b.name)
          return 1;
        return 0;
      })
    }

    }
    );
