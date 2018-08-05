rootApp.service('httpService',["$http",function ($http) {
	var loginHttp={
		province:function(){
			
			  return $http.get('json/province.json')
		},
		school:function(){
			
			  return $http.get('json/school.json')
		},
		classN:function(){
			
			  return $http.get('json/class.json')
		}
	}
	
	
	return {
		loginHttp:loginHttp
	}
}])