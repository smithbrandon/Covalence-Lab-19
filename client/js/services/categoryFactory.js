app.factory('Cat',['$resource',function($resource){
    return $resource('/api/categories');
}])