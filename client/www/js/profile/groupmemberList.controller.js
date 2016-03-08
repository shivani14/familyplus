angular.module('FamilyPlusApp').controller('memberListController',['$scope','$http','$httpParamSerializer',function($scope,$http,$httpParamSerializer)
{
	$scope.info ={};
	$scope.info.group_id = $scope.groupid;
	$scope.info.role = $scope.name;
	$scope.info.mail_id = $scope.mailid;
	console.log($scope.info);

		$http({
			method:'post',
			url:'http://10.12.42.58:3001/info',
			data:$httpParamSerializer($scope.info),
			headers:{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}
		}).success(function(data)
		{
			$scope.info = {};
			if(data)
			{
				console.log('--data--','received');
				$scope.info = data;
				console.log('--data--',$scope.info);
				
			}
		}).error(function(err)
		{
			console.log(err);
		});
}]);