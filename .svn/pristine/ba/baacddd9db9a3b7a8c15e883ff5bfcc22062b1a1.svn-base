rootApp.service('commonHttpService',["$http","jdhPath",function ($http,jdhPath) {
	var currentdate = new Date()
	return{
		http:jdhPath.finalIp,
		httpRequest:function (method,url,params,callback){
		    $http({
		        method: method,
		        url: jdhPath.finalIp+url,//http://192.168.100.68:9090
		        params:params
		    }).success(callback).error(function (data) {
		        console.log("获取数据失败");
		        layer.msg("获取数据失败")
		    });   	   
		},
		httpRequest1:function (method,url,params,callback){
		    $http({
		        method: method,
		        url: jdhPath.finalIp+url,
		        params:params
		    }).success(callback).error(function (data) {
		        console.log("获取数据失败");
		        layer.msg("获取数据失败")
		    });   	   
		},
		httpRequest2:function (method,url,params,callback){
		    $http({
		        method: method,
		        url: jdhPath.finalIp+url,
		        params:params,
	         	headers : {
         		        "x-version": "h5-v1.0.0",
//     					 "x-timestamp": currentdate,
                        'Content-Type' : "application/json"  //angularjs设置文件上传的content-type修改方式
                }
		    }).success(callback).error(function (data) {
		        console.log("获取数据失败");
		        layer.msg("获取数据失败")
		    });   	   
		}
	}
}])

rootApp.factory('locals', ['$window', function ($window) {
    return {        //存储单个属性
        set: function (key, value) {
            $window.localStorage[key] = value;
        },        //读取单个属性
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);//将对象以字符串保存
        },        //读取对象
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');//获取字符串并解析成对象
        }

    }
}]);