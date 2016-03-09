// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('FamilyPlusApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
     $stateProvider
            .state('login', {
                url:'/login',
                templateUrl:'templates/login.template.html',
                controller:'loginController'
            }).state('register',{
                    url:'/register',
                    templateUrl:'templates/register.template.html',
                    controller:'registerController'

            }).state('mainPage',{
                url:'/mainPage',
                templateUrl:'templates/mainPage.template.html',
                controller:'mainPageController'
            
            }).state('mainPage.invite',{
                    url:"/invite",
                    views:{
                        'content':{
                            
                            templateUrl:'templates/invite.template.html',
                            controller:'inviteController'
                        }
                    }
               
            }).
            state('mainPage.getmap',{
                    url:"/map",
                    views:{
                        'content':{
                                templateUrl:'templates/map.template.html',
                                controller:'mapController'
                        }
                    }
               
            }).
            state('mainPage.home',{
                url:"/home",
                views:{
                        'content':{
                            
                            templateUrl:'templates/checkinlist.template.html',
                            controller:'checkinlistController'
                        }
                    }
            }).
            state('mainPage.Details',{
                url:"/details",
                views:{
                    'content':{
                        templateUrl:'templates/detailedPage.template.html',
                        controller:'memberinfoController'
                    }
                }
                
            }).state('mainPage.lastCheckin',{
                url:"/list",
                views:{
                    'content':{
                        templateUrl:'templates/lastCheckinList.template.html',
                        controller:'lastcheckinListController'
                    }
                }
            }).
            state('mainPage.changePass',{
                url:"/changePassword",
                views:{
                    'content':{
                        templateUrl:'templates/changePassword.template.html',
                        controller:'changePasswordController'
                    }
                }
            }).
            
            state('mainPage.search',{
                url:"/search",
                views:{
                    'content':{
                        templateUrl:'templates/search.template.html',
                        controller:'searchController'
                    }
                }
            }).state('mainPage.groupMember',{
                url:"/memberList",
                views:{
                    'content':{
                        templateUrl:'templates/groupmemberList.template.html',
                        controller:'memberListController'
                    }
                }
            }).
            state('mainPage.editProfile',{
                url:"/editProfile",
                views:{
                    'content':{
                        templateUrl:'templates/editProfile.template.html',
                        controller:'editProfileController'
                    }
                }
            });

             $urlRouterProvider.otherwise('/login');

});
