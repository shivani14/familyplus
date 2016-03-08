angular.module('FamilyPlusApp').controller('editProfileController',['$scope','$http','$httpParamSerializer',function($scope,$http,$httpParamSerializer)
{
		$scope.user ={};
		$scope.user.firstname = $scope.name;
		$scope.user.lastname = $scope.lastname;
		$scope.user.phonno = $scope.phonno;
		$scope.user.groupname = $scope.gname;
		$scope.user.mailid = $scope.mailid;
		$scope.flag = false;
		$scope.update = function()
		{
			$http({
				method:'post',
				url:'http://10.12.42.58:3001/editMember',
				data:$httpParamSerializer($scope.user),
				headers:{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}
			}).success(function(data)
			{
				if(data == true)
				{

				$scope.flag = true;
				$scope.message = "your profile has been updated";
				}

			}).error(function(err)
			{

					$scope.flag = false;
				$scope.message = "profile is not updated.please check your details.";

			});
			
		}
		
}]);