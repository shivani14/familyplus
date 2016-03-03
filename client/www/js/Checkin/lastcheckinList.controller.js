angular.module('FamilyPlusApp').controller('lastcheckinListController',['$scope','$ionicPopup',function($scope,$ionicPopup)
{

		$scope.show = function()
		{

			$scope.data ={};
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
				console.log("tapped",res);
			});
		}
}]);