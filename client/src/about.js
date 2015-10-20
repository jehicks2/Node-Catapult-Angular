'use strict';

angular.module('PokeNow')
  .controller('pokeInfo', ['$scope','$http', function($scope,$http) {
    $scope.message = "Welcome to PokeNow!";
    var searchTask; 
    // var pokeCount = 778;
    $scope.pokeAttrNames =[];


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

        //Get main Pokemon info, which will include point to name, type, and ability.
   			$http.get("http://pokeapi.co/api/v1/pokemon/" +$scope.search)
     			.success(function(data){
     				// console.log("Data:", data.name)
         //    console.log("img: ", data.resource_uri)
         //    console.log("data:nb", data.sprites)
            $scope.details = data;
            // console.log(data.abilities[0].resource_uri)
            // console.log(data.name)
                // console.log(data.height)
                // console.log(data.weight)
                // console.log(data.hp)
             for(var i = 0; i< data.types.length; i++){
             // console.log("types", data.types)
             $scope.types = data;
           }
            // for(var i = 0; i < data.abilities.length; i++){

            //   $scope.ability = data;

            // }

             //DESCRIPTIONS
             for(var i = 0; i<data.descriptions.length; i++){
           			 $http.get("http://pokeapi.co" +data.descriptions[0].resource_uri)
                  .success(function(data){
                    // for(var i = 0; i < pokeCount.length; i++){
                    //   if(data.des)
                    // console.log("data:", data.description)
                    $scope.des = data;
                  // }
                })
             }

              //ABILITY
              $http.get("http://pokeapi.co/" + data.abilities[0].resource_uri)
                .success(function(data){
                  // console.log(data.name)
                  $scope.ability = data;
                })

              //TYPES
              $http.get("http://pokeapi.co/" + data.types[0].resource_uri)
                .success(function(data){

                  // console.log("hehe",data.name)
                  $scope.type = data;
                })

              //SPRITES
             // console.log(data.descriptions[0].resource_uri)
              $http.get("http://pokeapi.co/" + data.sprites[0].resource_uri)
                .success(function(data){
                  // console.log("imguri: ", data.image)
                  // console.log("data:", data.image)
                  $scope.sprite = data;
              })
              $http.get('http://pokeapi.co/api/v1/pokedex/1/')
              .then(function(result){
                result.data.pokemon.forEach(function(poke){
                  // console.log(poke.resource_uri)
                  $http.get('http://pokeapi.co/' + poke.resource_uri)
                    .then(function(value) {
                      // console.log(value.data.name)
                      $scope.pokeAttrNames.push(value.data.name);
                    });
                });
              });  
              
            
          });


        

	   		$scope.update = function(data){
	   			$scope.search = data.name;
	   			$scope.change()
	   		};

	   		$scope.select = function(){
	   			this.setSelectionRange(0, this.value.length);
	   		}
   		}
   		
}]);

    	