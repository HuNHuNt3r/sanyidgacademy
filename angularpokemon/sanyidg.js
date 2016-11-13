"use strict";

angular.module('pokeApp', [])
    .controller('pokecontroller', function ($scope, $http) {

    $scope.loading = true;
    $http.get('//pokeapi.co/api/v2/pokemon/?limit=151').then(function (response) {

        var result = response.data.results;

        $scope.details = [];
        result.forEach(function (pokemon) {
          pokemon["id"] = Number(getPokeID(pokemon))
        });

        $scope.pokemons = result;

    }).catch(function ( response ) {

        // handle the error somehow
        $scope.loadError = "Network error!";  //, response.status, response.data);
    }).finally(function() {

        // called no matter success or failure
        $scope.loading = false;
    });

    $scope.getDetails = function (id) {

        $http.get('//pokeapi.co/api/v2/pokemon/' + id + '/').success(function (data) {
          $scope.details[id] = data;
        });
    };

    $scope.closeDetails = function (id) {
        $scope.details.splice(id, 1);
    };


    $scope.filterPokemons = function (row) {

        var filterValue = $scope.searchFilter;
        var returnValue = true;

        if (filterValue !== undefined) {

            filterValue = filterValue.toString();

            var pokemonId = (row.id == null) ? '' : row.id.toString().toLowerCase();
            var pokemonName = (row.name == null) ? '' : row.name.toString().toLowerCase();

            returnValue =
            (
                (pokemonId === filterValue) ||
                (pokemonName.indexOf(filterValue) !== -1)
            );

        }
        return returnValue;

    };

    $scope.orderById = function () {
        $scope.orderBy = 'id';
    };

    $scope.orderByName = function () {
        $scope.orderBy = 'name';
    };

    function getPokeID(row)
    {
        return row.url.split('/')[ row.url.split('/').length-2]
    }

});
