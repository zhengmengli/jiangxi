rootApp.controller('basicCtr',["$scope","$rootScope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$rootScope,$state,$http,$stateParams,httpService,commonHttpService,locals) {
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");	
	
	// 增加学段、年级、班级、学科
	var infoObj = {
		periodCode: '',
		gradeCode: '',
		classCode: '',
		subjectCode: '',
		classId:"",
		studentClassId:""
	};
	$scope.periodList1 = [
		{id:'1',name:"高中段"},
		{id:'2',name:"初中段"},
		{id:'3',name:"小学高年级"},
		{id:'4',name:"小学中年级"},
		{id:'5',name:"小学低年级"}
	]
	$scope.periodList2 = [
		{id:'1',name:"一年级"},
		{id:'2',name:"二年级"},
		{id:'3',name:"三年级"},
		{id:'4',name:"四年级"},
		{id:'5',name:"五年级"},
		{id:'6',name:"六年级"}
	]
	$scope.periodList3 = [
		{id:'1',name:"语文"},
		{id:'2',name:"数学"},
		{id:'3',name:"英语"},
		{id:'4',name:"政治"},
		{id:'5',name:"历史"},
		{id:'6',name:"地理"},
		{id:'7',name:"物理"},
		{id:'8',name:"化学"},
		{id:'9',name:"生物"}
	]
	$scope.periodList4 = [
		{id:'1',name:"(1)班"},
		{id:'2',name:"(2)班"},
		{id:'3',name:"(3)班"},
		{id:'4',name:"(4)班"},
		{id:'5',name:"(5)班"},
		{id:'6',name:"(6)班"},
		{id:'7',name:"(7)班"},
		{id:'8',name:"(8)班"},
		{id:'9',name:"(9)班"}
	]
    var district_code = "";
    var districtCode = ""
    var cityCode = ""
    var provinceCode =""
    var province_data = "";
    var city_data = "";
    var area_data = "";
	
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
			school:function(){
				return {
					appName:data1,
					districtCode:data2
				}	
			},	
			info:function(){
				return {
					connectingCode:data1
				}	
			},	
			updateInfo:function(){
				return {
					tel:data1,
					connectingCode:data2,
					name:data3,
					districtCode:data4,
					schoolCode:data5,
					teachClassList:data6
				}	
			},
		}

	}	
	
//	$scope.infoList = [infoObj];
	$scope.addInfo = function () {
		var obj = angular.copy(infoObj);;
		$scope.infoList.unshift(obj);
	};
	$scope.reduceInfo = function (index) {
		$scope.infoList.splice(index,1);
	};
	
	//完成
	$scope.finish = function(){
		if($.trim($scope.name)=="" || $.trim($scope.schoolInit)==""){
			layer.msg("请完善信息");
			return;
		}
        console.log($scope.infoList)
        var list={};
        list.tel = phoneName
        list.connectingCode = connectingCode
        list.name = $scope.name
        list.districtCode = districtCode
        list.provinceCode = provinceCode
        list.cityCode = cityCode
        console.log($scope.schoolInit)
        list.schoolCode = $scope.schoolInit
        console.log(list.schoolCode)
        console.log(list.name)
		$.ajax({
			type:"post",
			url:commonHttpService.http + "/jxsd/sys/updateInfo",
			async:true,
			contentType:"application/json",
			dataType:"json",
			data:JSON.stringify(list),
			success:function(data){
				console.log(data)
				if(data.status == "1"){
					layer.msg('个人信息修改成功');
					locals.set("name",$scope.name);
					$rootScope.namep = $scope.name
					setTimeout(function(){
						$state.go('app.workboard.main')
					},3000)

				}else if(data.status=="10"){
					layer.msg(data.info);
				}else{
					layer.msg("基本信息修改失败");
				}
			}
		});
	}
	
	function updateInfoFunc(data){
		console.log(data)
	}
	
	//关闭
	$scope.goBack = function(){
		$state.go('app.workboard.main')
	}
	
    //查询省联动
    $scope.selUp2 = function(){
    	$scope.showHide = false
    	$scope.showHide1 = false
    	$scope.selUpDailog2 = !$scope.selUpDailog2
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
    	districtCode = event.target.attributes[2].value;
    	for(var i=0;i<dataL;i++){
    		$scope["blueClicka"+i] = false
    	}
    	$scope["blueClicka"+value] = true 
    	$(".selUp2").html(province_data+","+city_data+","+area_data)
    	$scope.selUpDailog2 = false
    	$scope.showHide = false
    	$scope.showHide1 = false
    	commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",districtCode).school(),schoolFunc)
    	
    }

    
    //查询学校
   // $scope.schoolInit = "所属学校"
    $scope.selUp3 = function(){
    	// $scope.selUpDailog3 = !$scope.selUpDailog3;
    	if($scope.selUpDailog3){
    		commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",districtCode).school(),schoolFunc)
    	}
    	
    }    
    
    function schoolFunc(data){
    	console.log(data)
    	$scope.schoolInit = null;
    	$scope.schoolData = data.data   	
    }	
    
    //个人信息
    commonHttpService.httpRequest("post","/jxsd/sys/myInfo",httpData(connectingCode).info(),infoFunc)
//  debugger
    function infoFunc(data){
    	console.log(data)
    	$scope.name = data.data.name;
    	$(".selUp2").html(data.data.provinceName+","+data.data.cityName+","+data.data.districtName)
    	$scope.schoolData = [{name:data.data.schoolName,code:data.data.schoolCode}];
    	$scope.schoolInit = data.data.schoolCode
		districtCode = data.data.districtCode;
		$scope.infoList = [];
		if(data.data.classList.length==0){
			$scope.addInfo();
		}else{
			for(var i=0;i<data.data.classList.length;i++){
				var infoObj = {
					periodCode: data.data.classList[i].periodCode,
					gradeCode: data.data.classList[i].gradeCode,
					classCode: data.data.classList[i].classCode,
					subjectCode: data.data.classList[i].subjectCode,
					classId: data.data.classList[i].id,
					studentClassId: data.data.classList[i].studentClassId,
				};			
				var obj = angular.copy(infoObj);;
				$scope.infoList.unshift(obj);			
			}			
		}

    }
    
}])