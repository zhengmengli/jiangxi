rootApp.controller('shareCtr',["$scope","$state","$rootScope","$http","$stateParams","$location","$anchorScroll","cpbgService","httpService","commonHttpService","locals",function ($scope,$state,$rootScope,$http,$stateParams,$location,$anchorScroll,cpbgService,httpService,commonHttpService,locals) {
	$(document).ready(function(){ 
		var num = location.href.indexOf("share")
		console.log(num)
		var str = location.href.substring(num,location.href.length)
		console.log(str)
		var num1 = str.indexOf("&");
		console.log(num1)
		if(num1>-1){
			str = str.substring(0,num1)
		}
		console.log(str)
		str = str.substring(str.indexOf("?"),str.length);
		console.log(str.substring(1,str.length))
		$.ajax({
			type:"get",
			url:commonHttpService.http+"/jxsd/teach/shareTeach?teachId="+str.substring(1,str.length),
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data.data.reportImage)
				$(".imga").attr("src",commonHttpService.http+data.data.reportImage)
			}
		});
		
//		
	});
}])