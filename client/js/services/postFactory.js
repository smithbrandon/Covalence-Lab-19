app.factory('Posts',['$resource', function($resource){
    return $resource('/api/posts/:id',{id: '@id'},{
        'update': { method: 'PUT' }
    })
}])