angular.module('FamilyPlusApp').controller('mapController',['$scope','mapFactory',function($scope,mapFactory)
{
	/*$window.addEventListener('load', $scope.load, true);*/
	
           
      		/*alert(window.cordova);*/
      	      			/*$scope.div = document.getElementById("map_canvas");
 alert($scope.div);*/
	 
 /*window.plugin.google.maps.Map.getMap($scope.div);*/


     
      		$scope.div = document.getElementById("map_canvas");
 alert($scope.div);
	 
 $scope.map = window.plugin.google.maps.Map.getMap($scope.div);
      	
 
$scope.map.setClickable(true);

	 	

                
     

}]);