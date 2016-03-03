angular.module('FamilyPlusApp').controller('inviteController',['$scope','$http','$httpParamSerializer',function($scope,$http,$httpParamSerializer)
{
		$scope.user ={};
		$scope.sendEmail = function()
		{
			$http({
				method:'post',
				url:'http://localhost:3002/',
				data:$httpParamSerializer($scope.user);
				headers :{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}

			}).success(function(err,data)
			{
				if(err)
				{

				}
				else
				{
					console.log("--data",data);
				}

			});

		}
}]);