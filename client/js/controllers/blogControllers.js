app.controller('composeCtrl', ['$scope', 'Users', 'Cat', 'Posts', function ($scope, Users, Cat, Posts) {
    $scope.users = Users.query();
    $scope.categories = Cat.query();

    $scope.save = function () {
        var post = new Posts({
            title: $scope.title,
            user: $scope.userSelect.id,
            category: $scope.categorySelect.id,
            contents: $scope.contents
        });
        post.$save(function (success) {
            window.location.replace('/');
        });
    }

}]).controller('postsCtrl', ['$scope', 'Posts', 'UserService', '$location', function ($scope, Posts, UserService, $location) {
    $scope.posts = Posts.query();
    UserService.me().then(function () {
        redirect();
    })

    $('#modal').modal();

    $scope.login = function () {
        UserService.login($scope.email, $scope.password)
            .then(function () {
                $('#modal').modal("hide");
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
}]).controller('updateCtrl', ['$scope', 'Posts', '$routeParams', 'Cat', function ($scope, Posts, $routeParams, Cat) {
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

}]).controller('postCtrl', ['$scope', 'Posts', '$routeParams', function ($scope, Posts, $routeParams) {
    $scope.post = Posts.get({ id: $routeParams.id });
    $scope.del = function () {
        $scope.post.$delete(function (success) {
            window.location.replace('/');
        });
    };
}]);
