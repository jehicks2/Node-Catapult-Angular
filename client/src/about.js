'use strict';

angular.module('PokeNow')
  .controller('pokeInfo', ['$scope','$http', function($scope,$http) {
    $scope.message = "Welcome to PokeNow!";
    var searchTask; 
    var pokeCount = 778;


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
            console.log("img: ", data.resource_uri)
            console.log("data:nb", data.sprites)
            $scope.details = data;
             for(var i = 0; i< data.types.length; i++){
             console.log("types", data.types[i])
             $scope.types = data;
           }
             for(var i = 0; i<data.descriptions.length; i++){
           			 $http.get("http://pokeapi.co" +data.descriptions[0].resource_uri)
                  .success(function(data){
                    // for(var i = 0; i < pokeCount.length; i++){
                    //   if(data.des)
                    console.log("data:", data.description)
                    $scope.des = data;
                  // }
                })
             }
             console.log(data.descriptions[0].resource_uri)
              $http.get("http://pokeapi.co/" + data.sprites[0].resource_uri)
                .success(function(data){
                  console.log("imguri: ", data.image)
                  $scope.sprite = data;
                
              })
            
          });


        //   $http.get("http://pokeapi.co/api/v1/description/" +$scope.search)
        //   .success(function(data){
        //     // for(var i = 0; i < pokeCount.length; i++){
        //     //   if(data.des)
        //     console.log("data:", data.description)
        //     $scope.des = data;
        //   // }
        // })
        

	   		$scope.update = function(pokemon){
	   			$scope.search = pokemon.name;
	   			$scope.change()
	   		};

	   		$scope.select = function(){
	   			this.setSelectionRange(0, this.value.length);
	   		}
   		}
   		
}]);

    	