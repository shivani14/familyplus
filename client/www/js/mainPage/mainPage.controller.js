angular.module('FamilyPlusApp').controller('mainPageController',['$scope','$location','$ionicPopover',function($scope,$location,$ionicPopover)
{
  /*

	var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Account Settings</h1> </ion-header-bar> <ion-content> <div class="list"><a class="item item-avatar" href="#/login"><h3>Signout</h3></a></div></ion-content></ion-popover-view>'*/


  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

	 $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
   $scope.closePopover = function() {
    $scope.popover.hide();
  };

    $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

	
}]);