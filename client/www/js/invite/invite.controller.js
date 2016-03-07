angular.module('FamilyPlusApp').controller('inviteController',['$scope','$http','$httpParamSerializer',function($scope,$http,$httpParamSerializer)
{
		$scope.user ={};
		$scope.flag=false;
		$scope.sendEmail = function()
		{
			$http({
				method:'post',
				url:'http://10.12.42.58:3001/invite',
				data:$httpParamSerializer($scope.user),
				headers :{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}

			}).success(function(data)
			{
				if(data)
				{
					$scope.message = "invite sent";
					$scope.flag=true;
				}

			}).error(function(data,status)
			{

			});

		}
}]);