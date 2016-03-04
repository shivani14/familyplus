angular.module('FamilyPlusApp', ['ionic']).config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url:'/login',
                templateUrl:'../www/js/login/login.template.html',
                controller:'loginController'
            }).state('register',{
                    url:'/register',
                    templateUrl:'../www/js/registration/register.template.html',
                    controller:'registerController'

            }).state('mainPage',{
                url:'/mainPage',
                templateUrl:'../www/js/mainPage/mainPage.template.html',
                controller:'mainPageController'
            
            }).state('mainPage.invite',{
                    url:"/invite",
                    views:{
                        'content':{
                            
                            templateUrl:'../www/js/invite/invite.template.html',
                            controller:'inviteController'
                        }
                    }
               
            }).
            state('mainPage.home',{
                url:"/home",
                views:{
                        'content':{
                            
                            templateUrl:'../www/js/checkins/checkinlist.template.html',
                            controller:'checkinlistController'
                        }
                    }
            }).
            state('mainPage.Details',{
                url:"/details",
                views:{
                    'content':{
                        templateUrl:'../www/js/detailedinfo/detailedPage.template.html',
                        controller:'memberinfoController'
                    }
                }
                
            }).state('mainPage.lastCheckin',{
                url:"/list",
                views:{
                    'content':{
                        templateUrl:'../www/js/checkins/lastCheckinList.template.html',
                        controller:'lastcheckinListController'
                    }
                }
            }).
            state('mainPage.changePass',{
                url:"/changePassword",
                views:{
                    'content':{
                        templateUrl:'../www/js/login/changePassword.template.html',
                        controller:'changePasswordController'
                    }
                }
            }).
            
            state('mainPage.search',{
                url:"/search",
                views:{
                    'content':{
                        templateUrl:'../www/js/search/search.template.html',
                        controller:'searchController'
                    }
                }
            }).state('mainPage.groupMember',{
                url:"/memberList",
                views:{
                    'content':{
                        templateUrl:'../www/js/profile/groupmemberList.template.html',
                        controller:'memberListController'
                    }
                }
            }).
            state('mainPage.editProfile',{
                url:"/editProfile",
                views:{
                    'content':{
                        templateUrl:'../www/js/profile/editProfile.template.html',
                        controller:'editProfileController'
                    }
                }
            });
    
            

    }
    );