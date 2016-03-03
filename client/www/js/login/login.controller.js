angular.module('FamilyPlusApp').controller('loginController',['$scope','$location','$rootScope','$window',function($scope,$location,$rootScope,$window)
{

     $rootScope.formCheck = {};
// Validation for login

     $scope.user ={};
  

     $scope.send = function()
     {
     		$scope.user={};
 

     		$window.location.href="#/mainPage/home";
     	
     }
    
     

}]);