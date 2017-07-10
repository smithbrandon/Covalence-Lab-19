var app = angular.module('angularBlog',['ngRoute','ngResource','user.services']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',{
                templateUrl: 'views/welcome.html',
                controller: 'mainCtrl'
            }).when('/compose',{
                templateUrl: 'views/composePost.html',
                controller: 'composeCtrl'
            }).when('/:id/update',{
                templateUrl: 'views/updatePost.html',
                controller: 'updateCtrl'
            }).when('/admin',{
                templateUrl: 'views/admin.html',
                controller: 'adminCtrl'
            }).when('/login',{
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            }).when('/:id',{
                templateUrl: 'views/post.html',
                controller: 'postCtrl'
            }).otherwise({redirectTo: '/'});
    }]);