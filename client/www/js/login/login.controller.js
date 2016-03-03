angular.module('FamilyPlusApp').controller('loginController',['$scope','$location','$rootScope','$window','$http','$httpParamSerializer',function($scope,$location,$rootScope,$window,$http,$httpParamSerializer)
{

     $rootScope.formCheck = {};
// Validation for login

     $scope.memberinfo ={};
  

     $scope.send = function()
     {
     	
     	$http({
     		method:'post',
     		url:'http://localhost:3001/login',
     		data:$httpParamSerializer($scope.memberinfo),
     		headers:{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}

     	}).success(function(data)
     	{
     		if(data.err)
     		{
     			console.log(data.err);
     		}else
     		{
     			if(data == "shivani")
     			{
     				$rootScope.name = data;
     				$window.location.href="#/mainPage/home";
     	
     			}
     			else
     			{
     				$scope.err = data;
     			}

     			console.log(data);
     		}
     	})
    

     	
    
 

     		/*$window.location.href="#/mainPage/home";*/
     	
     }
    
     

}]);