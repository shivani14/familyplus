angular.module('FamilyPlusApp').controller('loginController',['$scope','$location','$rootScope','$window','$http','$httpParamSerializer',function($scope,$location,$rootScope,$window,$http,$httpParamSerializer)
{

     $rootScope.formCheck = {};
// Validation for login
	$scope.flag=false;
     $scope.memberinfo ={};
  
     $rootScope.mailid = $scope.memberinfo.emailid;
     $scope.send = function()
     {
     	alert("called");
     	$http({
     		method:'post',
     		url:'http://10.12.42.58:3001/login',
     		data:$httpParamSerializer($scope.memberinfo),
     		headers:{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}

     	}).success(function(data)
     	{
     		$scope.user ={};
     		$scope.response = angular.fromJson(data);
     		$rootScope.name = $scope.response.firstname;
               $rootScope.lastname = $scope.response.lastname;
                         $rootScope.role = $scope.response.role;
                      	$rootScope.groupid = $scope.response.group_id;
                         $rootScope.mailid = $scope.response.mail_id;
                         $rootScope.gname = $scope.response.groupname;
                         $rootScope.phonno = $scope.response.phon_no;
                         $rootScope.member = $scope.response.member_id;
                         alert($rootScope.member);
                         console.log($scope.response);

     				$window.location.href="#/mainPage/home";
          }).error(function(data,status)
          {
          	$scope.flag=true;
          	if(status==404)
          	{
          		       	$scope.err = "please check username and paasword"
          	}
   
          })
         
    

     	
    
 

     		/*$window.location.href="#/mainPage/home";*/
     	
     }
    
     $scope.registrationpage = function()
          {
          	$scope.user={};
               $window.location.href="#/register";
          	
          	
          };
     

}]);