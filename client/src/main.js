'use strict';

angular.module('PokeNow')
  .controller('MainCtrl', ['$scope', function($scope) {
  	$scope.welcome = 'Welcome Trainers!';
  	$scope.buttonText = 'Search for Pokemon';
  }]);
