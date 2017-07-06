app.factory('Users',['$resource', function($resource){
    return $resource('/api/users/:id');
}])