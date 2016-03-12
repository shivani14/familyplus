angular.module('FamilyPlusApp').controller('checkinlistController',['$scope','$http',function($scope,$http)
{
	$scope.flag = false;
	$scope.sendData={};
	$scope.sendData.id = $scope.groupid;
	$scope.sendData.memberid = $scope.member;
	$http({
		method:'post',
		url:'http://10.12.42.58:3001/getlist',
		data:$scope.sendData,
		headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
	}).success(function(data)
	{
		$scope.finalData = {};
		$scope.finalData = data;

		
	}).error(function(status,data)
	{
		if(status = 403)
		{
			$scope.flag=true;
		}
		
	});
	
}]);