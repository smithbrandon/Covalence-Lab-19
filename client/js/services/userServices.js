angular.module('user.services',[]).service('UserService',['$http','$location','$rootScope',function($http, $location,$rootScope){
    var currentUser;
    this.isLoggedIn = function(){
        if(currentUser){
            return true;
        }else{
            return false;
        }
    }
    this.isAdmin = function(){
        if(currentUser && currentUser.role === 'admin'){
            return true;
        }else{
            return false;
        }
    }
    this.requireAdmin = function(){
        if(!this.isLoggedIn()){
                var current = $location.path();
                $location.replace().path('/login').search('dest', current);
        }else{
            if(!this.isAdmin()){
                $location.replace().path('/');
            }
        }
    }

    this.loginRedirect = function(){
        if(!this.isLoggedIn()){
            var current = $location.path();
            $location.replace().path('/login').search('dest',current);
        }
    }

    this.login = function(email, password){
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: { email: email, password: password }
            
        }).then(function(response){
            currentUser = response.data;
            $rootScope.navUser = response.data;
            return currentUser;
        }, function(err){
            console.log(err);
        })
    }

    this.logout = function(){
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function(){
            currentUser = undefined;
            $rootScope.navUser = undefined;
        })
    }

    this.me = function(){
        if (currentUser){
            return Promise.resolve(currentUser);
        }else{
            return $http({
                method: 'GET',
                url: '/api/users/me'
            }).then(function(response){
                currentUser = response.data;
                return currentUser;
            })
        }
    }
}]);