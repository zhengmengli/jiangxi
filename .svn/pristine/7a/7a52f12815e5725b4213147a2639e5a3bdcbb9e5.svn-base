rootApp.controller('pjbgCtr',["$scope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,httpService,commonHttpService,locals) {
	var district_code = "";
	var province_data = "";
	var city_data = "";
	var area_data = "";
	
	console.log($stateParams.teachId)
	
	$scope.errorPage = 1
	$scope.errorPage1 = 1
	//thead列表
	$scope.theadList = [
		{name:"序号",trImg:false,width:"5%"},
		{name:"区域",trImg:false,width:'15%'},
		{name:"学校",trImg:false,width:'10%'},
		{name:"学科",trImg:false,width:'5%'},
		{name:"班级",trImg:false,width:'10%'},
		{name:"听课老师",trImg:false,width:'10%'},
//		{name:"听课老师",trImg:true,width:'10%'},
		{name:"讲课时间",trImg:false,width:'10%'},
		{name:"平均得分",trImg:false,width:'10%'},
		{name:"操作",trImg:false,width:'15%'}
	]

	//tbody列表
//	$scope.tbodyList = [
//		{name1:"1",name2:"1",name3:"1",name4:"1",name5:"1",name6:"1",name7:"1",name8:"1",name9:"1",name10:"1"},
//		{name1:"2",name2:"1",name3:"1",name4:"1",name5:"1",name6:"1",name7:"1",name8:"1",name9:"1",name10:"1"},
//		{name1:"3",name2:"1",name3:"1",name4:"1",name5:"1",name6:"1",name7:"1",name8:"1",name9:"1",name10:"1"},
//		{name1:"4",name2:"1",name3:"1",name4:"1",name5:"1",name6:"1",name7:"1",name8:"1",name9:"1",name10:"1"},
//		{name1:"5",name2:"1",name3:"1",name4:"1",name5:"1",name6:"1",name7:"1",name8:"1",name9:"1",name10:"1"}
//	]

	//注册获取code码
	$scope.pjData = function(){
		if($stateParams.teachId == null || $stateParams.teachId == ""){
			commonHttpService.httpRequest("post","/jxsd/totallistenscore/myListenscore",httpData($scope.errorPage,'5').pjbg(),pjDataFunc)			
		}else{
			var jsonData = JSON.parse($stateParams.teachId)		    
			commonHttpService.httpRequest("post","/jxsd/totallistenscore/myListenscore",httpData($scope.errorPage,'5',jsonData.value1,jsonData.value2,jsonData.value3,jsonData.value4,jsonData.value5,jsonData.value6,jsonData.value7,jsonData.value8).pjbg(),pjDataFunc)
					
		}

	}
	$scope.pjData()
	function pjDataFunc(data){
    	console.log(data);
    	$scope.tbodyList = data.data.list;
    	$scope.pageCountError = data.data.pages;
	}
	 
	 //讲课的分页
	 $scope.onPageError = function(){
    	console.log($scope.errorPage)
    	$scope.pjData()
	}    
	
	$scope.selUpDailog1 = false;
	$scope.selUpDailog2 = false
	$scope.selUpDailog3 = false
	$scope.selUpDailog4 = false
	$scope.selUpDailog5 = false
	$scope.selUpDailog6 = false
	$scope.selUpDailog7 = false
	$scope.selUpDailog8 = false
	$scope.selUpDailog9 = false
	$scope.selUpDailog10 = false
	
	$scope.selUpDailogCheck1 = false
	$scope.selUpDailogCheck2 = false
	$scope.boxShow = function(value){
		
		if(value == 1){
//			console.log("$scope.selUpDailog"+(value+1))
			$scope.selUpDailog2 = !$scope.selUpDailog2
			$scope.selUpDailog8 = false
			$scope.selUpDailogCheck1 = true
			$scope.selUpDailogCheck2 = false
		}else if(value == 7){
			
			$scope.selUpDailog8 = !$scope.selUpDailog8
			$scope.selUpDailog2 = false
			$scope.selUpDailogCheck1 = false
			$scope.selUpDailogCheck2 = true
		}else{
			$scope.selUpDailog8 = false
			$scope.selUpDailog2 = false
			$scope.selUpDailogCheck1 = false
			$scope.selUpDailogCheck2 = false
		}
	}
	
	$scope.mouseDailog = function(id){
//		console.log(id)
		layer.tips('查看报告', '.imgD'+(id+1), {
		  tips: [3, '#3595CC'],
		  time: 1000
		});
	}
	
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10){
		return httpDatad={
			province:function(){
				return {
					appName:data1
				}	
			},			
			city:function(){
				return {
					appName:data1,
					parent_code:data2
				}	
			},
			area:function(){
				return {
					appName:data1,
					parent_code:data2
				}	
			},
			pjbg:function(){
				return {
					pageNum:data1,
					pageSize:data2,
					areaCode:data3,
					schoolCode:data4,
					periodCode:data5,
					classCode:data6,
					teacherId:data7,
					listenTeacherId:data8,
					teachTime:data9,
					teachId:data10
				}	
			}
		}

	}
	
	$scope.errorPage = 1;
//	$scope.pageCountError = 6;
	
//	$(".pjbgFooter").height((window.screen.height-$(".pjbg table").height()-210)+"px")
	
	$scope.toCpbg = function(teachId,listenTeacherId,value3){
		console.log(teachId+"*****"+listenTeacherId);
		$state.go("app.ktgc.cpbg",{teachId:teachId,listenTeacherId:listenTeacherId,num:value3})
	}
	
	 //查询省联动
    $scope.selUp2 = function(){
    	$scope.showHide = false
    	$scope.showHide1 = false
    	$scope.provinceList = []
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getProvince",httpData("jxsd").province(),provinceFunc)
    }

	function provinceFunc(data){
		console.log(data)
	    $scope.provinceList = data.data; 
	    $scope.provinceLength = $scope.provinceList.length;
	    for(var i = 0;i<data.data.length;i++){
	    	$scope["blueClick"+i] = false
	    }		
	}
    //查找市
    $scope.showHide = false
    
    $scope.provinceClick = function(value,event){
    	province_data = event.target.innerText;
    	console.log(value)
	    $scope.showHide = true
    	$scope.boxTop = event.target.offsetParent.offsetTop
    	$scope.boxLeft = event.target.offsetParent.offsetLeft + 200
    	console.log(event)
    	var dataL = event.target.attributes[1].value;
    	var dataCode = event.target.attributes[2].value;
    	commonHttpService.httpRequest("post","/jxsd/baseInfo/getCity",httpData("jxsd",dataCode).city(),cityFunc)
    	
    	for(var i=0;i<dataL;i++){
    		$scope["blueClick"+i] = false
    	}
    	$scope["blueClick"+value] = true
    }
    
    function cityFunc(data){
    	console.log(data)
    	$scope.cityList = data.data;
	    $scope.cityLength = $scope.cityList.length;
	    for(var i = 0;i<data.data.length;i++){
	    	$scope["blueClickc"+i] = false
	    }
    }
    
    //查找区
    $scope.showHide1 = false
    
    $scope.cityClick = function(value,event){
    	city_data = event.target.innerText;
    	$scope.showHide1 = true
    	$scope.boxLeft1 = event.target.offsetParent.offsetLeft + 170
//  	console.log(event);
		var dataL = event.target.attributes[1].value;
    	var dataCode = event.target.attributes[2].value;
    	commonHttpService.httpRequest("post","/jxsd/baseInfo/getDistrict",httpData("jxsd",dataCode).area(),areaFunc)
    	for(var i=0;i<dataL;i++){
    		$scope["blueClickc"+i] = false
    	}
    	$scope["blueClickc"+value] = true    	
    }
    
    function areaFunc(data){
    	console.log(data)
    	$scope.areaList = data.data
    	$scope.areaLength = $scope.areaList.length
	    for(var i = 0;i<data.data.length;i++){
	    	$scope["blueClicka"+i] = false
	    }
    }    
    $scope.areaClick = function(value,event){
    	area_data = event.target.innerText;
		var dataL = event.target.attributes[1].value;
    	district_code = event.target.attributes[2].value;
    	for(var i=0;i<dataL;i++){
    		$scope["blueClicka"+i] = false
    	}
    	$scope["blueClicka"+value] = true 
    	$(".selUp2").html(province_data+","+city_data+","+area_data)
    	$scope.selUpDailog2 = false
    	$scope.showHide = false
    	$scope.showHide1 = false
    }
	
}])