app.service('SEOService', ['$rootScope',function($rootScope){

    this.setSEO = function(data){
        $rootScope.seo = {};
        for(var d in data){
            $rootScope.seo[d] = data[d];
        }
    }
}]);