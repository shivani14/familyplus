angular.module('FamilyPlusApp').controller('registerController',['$scope','$http','$httpParamSerializer','$window','$location',function($scope,$http, $httpParamSerializer,$window,$location)
{

	$scope.checked=false;
	$scope.user ={ };
	$scope.err = "";

	$scope.check = function()
	{
		if($scope.user.checked == false && $scope.user.groupname == undefined || $scope.user.groupname == "")
		{
			$scope.err ="field is required";
			console.log("--mydata--",$scope.err);
			return false;
		}
	
		else if($scope.user.checked==true && $scope.user.familyid == undefined || $scope.user.familyid == "")
		{
			$scope.err ="field is required";
			console.log("--mydata--",$scope.err);
			return false;
		}
		else
		{
			$scope.err ="";
			return true;
		}

	}


	$scope.send = function()
	{
		$http({
			method :'post',
			url : 'http://localhost:3001/insert',
			data :  $httpParamSerializer($scope.user),
			headers :{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'} 

		}).success(function(data)
		{

			
				if(data == true)
				{	
					$scope.user ={};
					$window.location.href =	"http://localhost:8100/#/login";
				}
			}
		).error(function(data,status)
		{
			if(status==406)
			{
				$scope.err = "username or mobileno already exist"
			}
			else if(status==500)
			{
				$scope.err = "group does not exist";
			}

		});
	/*	console.log($scope.user);*/

			}
	
}]);