app.controller('mainCtrl', ['$rootScope', '$scope', '$location', 'SEOService', 'UserService', function ($rootScope, $scope, $location, SEOService, UserService) {

    SEOService.setSEO({
        title: "Archer Blog",
        image: "",
        url: $location.url(),
        description: "A Blog about all things Archer the animated series."
    });
    console.log($rootScope.seo);
    checkUser();

    function checkUser(){
        UserService.me().then(function (user) {
            $rootScope.navUser = user;
        });
    }

    $scope.login = function () {
        $location.path('/login');
    }

    $scope.logout = function () {
        UserService.logout().then(function (currentUser) {
            $scope.navUser = undefined;
        });
    };

}]).controller('composeCtrl', ['$rootScope','$scope','UserService', 'Users', 'Cat', 'Posts', function ($rootScope, $scope,UserService, Users, Cat, Posts) {
    //User must be logged in doesn't matter what role.
    var userid;
    UserService.me().then(function(currentuser){
        userid = currentuser.id;
    });

    $scope.categories = Cat.query();

    $scope.save = function () {
        var post = new Posts({
            title: $scope.title,
            user: userid,
            category: $scope.categorySelect.id,
            contents: $scope.contents
        });
        console.log(post);
        post.$save(function (success) {
            window.location.replace('/');
        });
    }

}]).controller('postsCtrl', ['$scope', 'Posts', '$location', function ($scope, Posts, UserService, $location) {
    $scope.posts = Posts.query();

}]).controller('updateCtrl', ['$scope', 'Posts', '$routeParams', 'Cat', function ($scope, Posts, $routeParams, Cat) {
    //must be logged and post must belong to them or must be admin

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }




    $scope.del = function () {
        $scope.post.$delete(function (success) {
            window.location.replace('/');
        });
    };






    $scope.categories = Cat.query();
    var id = $routeParams.id;
    $scope.post = Posts.get({ id: id });
    $scope.updatePost = function () {
        $scope.post.title = $scope.title;
        $scope.post.content = $scope.contents;
        $scope.post.categoryid = $scope.categorySelect.id;
        $scope.post.$update(function (success) {
            window.location.replace('/' + id);
        });
    }

}]).controller('loginCtrl', ['$rootScope','$scope', '$location', 'UserService', function ($rootScope, $scope, $location, UserService) {

    $scope.login = function () {
        UserService.login($scope.login.email, $scope.login.password)
            .then(function (currentUser) {
                $scope.login = null;
                $rootScope.navUser = currentUser;
                console.log(currentUser);
                redirect();
            }, function (err) {
                console.log(err);
            })
    }
    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }
}]).controller('postCtrl', ['$scope', 'UserService', 'Posts', '$routeParams', function ($scope, UserService, Posts, $routeParams) {
    //must be logged in to see edit btn
    

    $scope.post = Posts.get({ id: $routeParams.id });

}]).controller('adminCtrl', ['$scope', 'Users', 'UserService', '$routeParams', function ($scope, Users, UserService, $routeParams) {
    //must be logged in and must be admin
    UserService.requireAdmin(function (success) {
        getUsers();
        $scope.addRecord = true;
    });



    function getUsers() {
        $scope.users = Users.query();
    }

    $scope.changeView = function (view) {
        if (view === 'edit') {
            $scope.addRecord = false;
        } else {
            $scope.addRecord = true;
            $scope.editUser = null;
        }
    }

    $scope.edit = function (user) {
        $scope.editUser = Users.get({ id: user.id });
    }

    $scope.updateUser = function () {
        $scope.editUser.$update(function (success) {
            getUsers();
            $scope.changeView('add');
        });
    }

    $scope.addUser = function () {
        if ($scope.editUser.password === $scope.editUser.passwordConfirm) {
            if (('' + $scope.editUser.firstname).length > 3 && ('' + $scope.editUser.lastname).length > 3 && ('' + $scope.editUser.email).length > 3 && ('' + $scope.editUser.password).length > 3) {
                var user = new Users($scope.editUser);
                user.$save(function (success) {
                    $scope.editUser = null;
                    getUsers();
                })
            } else {
                alert('Please fill out all fields completely');
            }
        } else {
            alert('Passwords do not match.  Please re-enter your passwords');
            $scope.editUser.password = '';
            $scope.editUser.passwordConfirm = '';
        }

    }

    $scope.deleteUser = function () {
        var conf = confirm("Are you sure you want to delete this User?")
        if (conf === true) {
            $scope.editUser.$delete(function (success) {
                getUsers();
                $scope.editUser = null;
            });
        }
    }





}]);
