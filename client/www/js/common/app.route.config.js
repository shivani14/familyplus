angular.module('FamilyPlusApp', ['ionic']).config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url:'/login',
                templateUrl:'../js/login/login.template.html',
                controller:'loginController'
            }).state('register',{
                    url:'/register',
                    templateUrl:'../js/registration/register.template.html',
                    controller:'registerController'

            }).state('mainPage',{
                url:'/mainPage',
                templateUrl:'../js/mainPage/mainPage.template.html',
                controller:'mainPageController'
            
            }).state('mainPage.invite',{
                    url:"/invite",
                    views:{
                        'content':{
                            
                            templateUrl:'../js/invite/invite.template.html',
                            controller:'inviteController'
                        }
                    }
               
            }).
            state('mainPage.home',{
                url:"/home",
                views:{
                        'content':{
                            
                            templateUrl:'../js/checkin/checkinlist.template.html',
                            controller:'checkinlistController'
                        }
                    }
            }).
            state('mainPage.Details',{
                url:"/details",
                views:{
                    'content':{
                        templateUrl:'../js/detailed info/detailedPage.template.html',
                        controller:'memberinfoController'
                    }
                }
                
            }).state('mainPage.lastCheckin',{
                url:"/list",
                views:{
                    'content':{
                        templateUrl:'../js/checkin/lastCheckinList.template.html',
                        controller:'lastcheckinListController'
                    }
                }
            }).
            state('mainPage.changePass',{
                url:"/changePassword",
                views:{
                    'content':{
                        templateUrl:'../js/login/changePassword.template.html',
                        controller:'changePasswordController'
                    }
                }
            }).
            
            state('mainPage.search',{
                url:"/search",
                views:{
                    'content':{
                        templateUrl:'../js/search/search.template.html',
                        controller:'searchController'
                    }
                }
            }).state('mainPage.groupMember',{
                url:"/memberList",
                views:{
                    'content':{
                        templateUrl:'../js/profile/groupmemberList.template.html',
                        controller:'memberListController'
                    }
                }
            }).
            state('mainPage.editProfile',{
                url:"/editProfile",
                views:{
                    'content':{
                        templateUrl:'js/profile/editProfile.template.html',
                        controller:'editProfileController'
                    }
                }
            });
    
            

    }
    );