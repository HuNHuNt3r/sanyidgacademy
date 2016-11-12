"use strict";

angular.module('pokeApp', [])
    .controller('pokecontroller', function ($scope, $http) {


    $http.get('//pokeapi.co/api/v2/pokemon/?limit=151').success(function (res) {

        $scope.details = [];
        res.results.forEach(function (pokemon) {
          pokemon["id"] = getPokeID(pokemon)
        });

        console.log(res.results);

        $scope.pokemons = res.results;
        let images = [];
        for (let i = 0; i < res.results.length; i++) {
          $http.get('//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + i + '.png')
              .success(function (item) {
                images.push(item);
              });
        }
        $scope.images = images;
    });

    $scope.getDetails = function (id) {

        $http.get('//pokeapi.co/api/v2/pokemon/' + id + '/').success(function (data) {
          $scope.details[id] = data;
        });
    };

    $scope.closeDetails = function (id) {
        $scope.details.splice(id, 1);
    };


    function getPokeID(row)
    {
        return row.url.split('/')[ row.url.split('/').length-2]
    }




});
