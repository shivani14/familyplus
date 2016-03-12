angular.module('FamilyPlusApp').controller('lastcheckinListController',['$scope','$ionicPopup','$http','memberFactory',function($scope,$ionicPopup,$http,memberFactory)
{
			$scope.flag = false;
			$scope.finaldata = [];
			$scope.data ={};
		$scope.data.id=$scope.member;
		alert($scope.data.id);
		$scope.getData = function()
		{
			$http({
				method:'post',
				url:'http://10.12.42.58:3001/getCheckinData',
				data:$scope.data,
				headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
			}).success(function(data)
			{
				$scope.memberData = {};
				$scope.memberData = data;
				$scope.finaldata = memberFactory.getdata($scope.memberData);
		
			}).error(function(status,data)
			{
				if(status == 403)
				{
					$scope.flag = true;
				}
			});
		}

		

			$scope.msg = [];
		$scope.show = function()
		{
			$scope.data.txt = "";
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
				alert($scope.mapdata.lat+" "+$scope.mapdata.lng);
				$scope.insert($scope.mapdata);

			});
			
		};

		$scope.insert = function(insertdata)
		{
			alert("insertdata:"+insertdata.activity+" "+insertdata.member+" "+insertdata.lat);
			$http({
				method:'post',
				url:'http://10.12.42.58:3001/checkin',
				data:insertdata,
				headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}

			}).success(function(data)
			{
				if(data)
				{
					$scope.modeldata = insertdata;
					/*$scope.request = {
  					'position': "GOOGLE"
					};
					window.plugin.google.maps.Geocoder.geocode($scope.request, function(results) 
					{	
						if(results.length)
  							{
  								alert("location found");

  							}else
  							{
  							     alert("not found");
  							}
					});*/
				}

			}).error(function(status,data)
			{
					alert("cant save data");
			});
		}
}]);