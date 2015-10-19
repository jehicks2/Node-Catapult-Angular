'use strict';

angular.module('PokeNow')
  .controller('pokeInfo', ['$scope','$http', function($scope,$http) {
    $scope.message = "Welcome to PokeNow!";
    var searchTask; 


   		if($scope.search === undefined){
   			$scope.search = Math.floor(Math.random(0,1)*200)
     		fetch()
   		}

   		$scope.change = function(){
   			if(searchTask){
   				clearTimeout(searchTask);
   			}
   			searchTask = setTimeout(fetch, 0);
   		};

   		function fetch (){

   			$http.get("http://pokeapi.co/api/v1/pokemon/" +$scope.search)
   			.success(function(data){
   				console.log("Data:", data.name)
   				$scope.details = data;
   			});
   			

	   		$scope.update = function(pokemon){
	   			$scope.search = pokemon.name;
	   			$scope.change()
	   		};

	   		$scope.select = function(){
	   			this.setSelectionRange(0, this.value.length);
	   		}
   		}
   		
}]);

    	