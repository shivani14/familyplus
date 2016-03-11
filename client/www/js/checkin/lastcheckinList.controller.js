angular.module('FamilyPlusApp').controller('lastcheckinListController',['$scope','$ionicPopup','checkinFactory','getCheckinDataFactory',function($scope,$ionicPopup,checkinFactory,getCheckinDataFactory)
{
	
			$scope.data ={};
			$scope.ids = {};
			$scope.ids.member = $scope.member;
			$scope.ids.group_id = $scope.groupid;
			$scope.getData = {};
		$scope.getData = checkinFactory.getData($scope.ids);

		alert($scope.getData);

			$scope.msg = [];
		$scope.show = function()
		{

			var popup = $ionicPopup.show({
				template:'<input type="text" placeholder="share your feeeling" ng-model="data.txt">',
				title:"Check in",
				scope:$scope,
				buttons:[
						{text: 'cancel'},
						{
							text:'<b> Check-in </b>',
							type:'button-positive',
							onTap: function(e)
							{
								if(!$scope.data.txt)
								{
									return false;
								}
								else
								{
									return $scope.data.txt;
								}
							}
						}
				]
			});

			popup.then(function(res)
			{
				$scope.getlocation();
				
			});
		}

		$scope.getlocation = function()
		{
			$scope.getCheckinData ={};
			$scope.info = {};
			$scope.mapdata = {};
					$scope.mapdata.group_id = $scope.groupid;
			$scope.mapdata.activity = $scope.data.txt;
			$scope.mapdata.member = $scope.member;
			alert($scope.mapdata.group_id);
			$scope.map = window.plugin.google.maps.Map.getMap();
			alert($scope.map);
			$scope.map.getMyLocation(function(location)
			{
				$scope.mapdata.lat = location.latLng.lat;
				$scope.mapdata.time = new Date(location.time);
				$scope.mapdata.lng = location.latLng.lng;

				/*$scope.address = checkinFactory.getAddress($scope.mapdata.lat,$scope.mapdata.lng);*/
					$scope.getCheckinData = checkinFactory.add($scope.mapdata);
					alert($scope.getCheckinData.group_id+ " "+$scope.getCheckinData.activity);

					$scope.info = $scope.getCheckinData;
					
				});
			/*$scope.map =  checkinFactory.getmap();
			alert($scope.map);*/
		/*alert($scope.data.lat);*/

		/*	$scope.get = checkinFactory.getlocation();*/
		}
}]);