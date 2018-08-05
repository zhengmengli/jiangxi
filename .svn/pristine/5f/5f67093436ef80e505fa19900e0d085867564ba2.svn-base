
(function (window, angular) {
    'use strict';
    var jcfModule = angular.module("service.module", []);
    jcfModule.factory("jcfHttp", ["$rootScope","$http", "$q", "jdhPath", "$location", "$state", function ($rootScope,$http, $q, jdhPath, $location, $state) {
        // 需要处理的请求URL
        function _Post(url, formData) {
            var deferred = $q.defer();
            var needTracker = true;
            var reqUrl =  jdhPath.finalRoot + url;
            var resp = $http.post(reqUrl, formData, needTracker?{tracker: $rootScope.loadingTracker}:{});
            resp.then(function (data, status, headers, config) {
                    /*todo:*/
                    deferred.resolve(data.data);
                },
                function (data, status, headers, config) {
                    deferred.reject({Code: status, Message: "出错了，请重试！"});
                });
            return deferred.promise;
        }

        function _Get(url, param) {
            var deferred = $q.defer();
            var needTracker = true;
            var reqUrl =  jdhPath.finalRoot + url;
            var httpConfig = {params:param,tracker:$rootScope.loadingTracker};
            httpConfig.tracker = needTracker ? $rootScope.loadingTracker : false;
            var resp = $http.get(reqUrl, httpConfig).then( function(data, status, headers, config){
                    deferred.resolve(data.data);
            },
            function(data, status, headers, config){
                deferred.reject({Code: data.status, Message: "出错了，请重试！"});
            });
           return deferred.promise;
        }
        return {
            Post: _Post,
            Get: _Get
        }
    }]);
})(window, window.angular);
