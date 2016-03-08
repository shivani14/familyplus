angular.module('FamilyPlusApp').controller("changePasswordController",['$scope','$http','$httpParamSerializer',function($scope,$http,$httpParamSerializer)
{	

	$scope.member = {};
	$scope.member.mail_id = $scope.mailid;
	$scope.flag = false;
	$scope.flag1 = false;
	$scope.change = function()
	{
		$http({
			method:'post',
			url:'http://10.12.42.58:3001/changePassword',
			data:$httpParamSerializer($scope.member),
			headers:{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}

		}).success(function(data)
		{
			if(data == true)
			{
				$scope.flag = true;
				$scope.message = "password has been successfully changed";
				
			}

		}).error(function(status,data)
		{
		

					$scope.flag1 = true;
				$scope.message ="please make sure your old password is correct";
			}
		
		);
	}
	



}]);