var app = angular.module('angularBlog',['ngRoute','ngResource','user.services']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',{
                templateUrl: 'views/welcome.html',
                controller: 'mainCtrl'
            }).when('/compose',{
                templateUrl: 'views/composePost.html',
                controller: 'composeCtrl',
                requiresLogin: true
            }).when('/:id/update',{
                templateUrl: 'views/updatePost.html',
                controller: 'updateCtrl',
                requiresLogin: true,
                requiresAdmin: true
            }).when('/admin',{
                templateUrl: 'views/admin.html',
                controller: 'adminCtrl',
                requiresLogin: true,
                requiresAdmin: true
            }).when('/login',{
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            }).when('/:id',{
                templateUrl: 'views/post.html',
                controller: 'postCtrl'
            }).otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope','$location', 'UserService', function($rootScope, $location, UserService){
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute){
            if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()){
                event.preventDefault();
                UserService.loginRedirect();
            }else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()){
                event.preventDefault();
                $location.replace().path('/');
            }
        });
    }]);