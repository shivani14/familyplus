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
     			if(data)
     			{
     				$rootScope.name = data.firstname;
                         $rootScope.role = data.role;
                         $rootScope.inviteid = data.inviteid;

     				$window.location.href="#/mainPage/home";
                         
     	
     			}
     			else
     			{
     				$scope.err = data;
     			}

     			
     		}
     	});
         
    

     	
    
 

     		/*$window.location.href="#/mainPage/home";*/
     	
     }
    
     $scope.registrationpage = function()
          {
               $window.location.href="#/register";
          };
     

}]);