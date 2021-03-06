rootApp.controller('addLectureCtrl', ["$scope", "$state", "$http", "$stateParams","locals","commonHttpService", function ($scope, $state, $http, $stateParams,locals,commonHttpService) {
	
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");  
	var listenIdCode = locals.get("listenIdCode");
	var time = new Date();
	var timeY=time.getFullYear();
	var timeM=time.getMonth() + 1;
	var timeD=time.getDate();
	var	provinceCode=""
	var	cityCode=""
	var	areaCode=""
	var schoolCode=""
    var districtCode = ""	
	if(timeM<10){
		timeM = "0" + timeM.toString()
	}
	if(timeD<10){
		timeD = "0" + timeD.toString()
	}
	$scope.currenTime = timeY+"-"+timeM+"-"+timeD    
    $scope.classCheck = [];

	function httpData(data1,data2,data3,data4,data5,data6,data7){
		return httpDatad={
			lessonType:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					subjectCode:data4,
					periodCode:data5
				}	
			},
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
			getTeacher:function(){
				return {
					appName:data1,
					code:data2
				}	
			},
			teachInfo:function(){
				return {
					connectingCode:data1,
					teacherId:data2,
					teachTime:data3
				}	
			},
			buttonPost:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4
				}	
			}
		}
	}

    $scope.goBack = function () {
        history.go(-1);
    }

    layui.use('laydate', function(){
    	var laydate = layui.laydate;
    	
		laydate.render({
	    	elem: '#test5',
	    	min: 0,
	    	value:$scope.currenTime,
	    	done: function(value, date, endDate){
			    console.log(value); //得到日期生成的值，如：2017-08-18
//			    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
//			    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
				if($scope.name3!="讲课老师姓名"){
					commonHttpService.httpRequest("post","/jxsd/teach/getTodayTeach",httpData(connectingCode,$scope.name3,value).teachInfo(),teachInfoFunc)
				}
	    	}
	    });

		 
	    laydate.render({
    	    elem: '#test9',
    	    type: 'time',
			format: 'HH:mm',
			done: function(value, date, endDate){
				var strH = value.substring(0,2)
				var strM = value.substring(3,5)
				console.log(strH)
				
				if(parseInt(strM)<15){
					strM = parseInt(strM) + 45
				}else{
					strM = parseInt(strM) + 45 -60
					strH = parseInt(strH) + 1
					if(strH<10){
						strH = "0" + strH.toString()
					}
					if(strM<10){
						strM = "0" + strM.toString()
					}
				}
				$("#test10").val(strH+":"+strM)
				console.log(strH+":"+strM)
				
			}
	    });
	    laydate.render({
    	    elem: '#test10',
    	    type: 'time',
    	    min: "09:00",
    	    format: 'HH:mm',
    	    btns: ['clear', 'confirm']
	    });
    })
    
    $scope.finish = function(){
    	if($(".selUp2")!="讲课老师学校所属区域" && $scope.name2!="讲课老师所属学校" && $scope.name3!="讲课老师姓名" && $scope.name4!="讲课日程"){
    		console.log(1)
    		commonHttpService.httpRequest("post","/jxsd/listen/scan",httpData(phoneName,"jxsd",connectingCode,$scope.name4).buttonPost(),buttonPostFunc)
    	}else{
    		layer.msg('请完善所有信息');
    	}
    	
    }
    
    function buttonPostFunc(data){
    	console.log(data)
    	if(data.status=="1"){
    		layer.msg(data.info);
    		$state.go("app.ktgc.main")
    	}else{
    		layer.msg("添加失败");
    	}
    	
    }
    
    var startTime = ""
    
    
    $scope.finish1 = function(){
    	console.log($scope.name2);
    	
    	if($(".selUp2")!="讲课老师学校所属区域" && $scope.name2!=null && $scope.name3!="讲课老师姓名" && $scope.name4!="讲课日程"){
	    	console.log($('.classCheT option:selected').text())
	    	var time1 = $('.classCheT option:selected').attr("dataId")
	    	var time2 = Date.parse(new Date())
	    	startTime = Date.parse(new Date(time1))
	        console.log(time1)
	    	console.log(startTime)
	    	console.log(time2)
	    //	if(time2>startTime){
				var listJson = {};
				debugger;
				listJson.value1 = $('.classCheT option:selected').attr("dataCode4");//lessonCode
				listJson.value2 = $('.classCheT option:selected').attr("dataCode3");//periodCode
				listJson.value3 = $('.classCheT option:selected').attr("dataCode5");//subjectCode
				listJson.value4 = listenIdCode;//
				listJson.value5 = $('.classCheT option:selected').val();
				listJson.value6 = $('.classCheT option:selected').attr("dataCode6");//teacherId

				commonHttpService.httpRequest("post","/jxsd/listen/scan",httpData(phoneName,"jxsd",connectingCode,$scope.name4).buttonPost(),function(data){
			    	console.log(data)
			    	debugger;
			    	if(data.status=="200"){
			    		if(time2>startTime){
			    		$state.go('app.cjzb.main1',{test1:JSON.stringify(listJson)})
			    		}else{
	    		layer.msg("时间未到");
	    		setTimeout(function(){
	    			$state.go('app.ktgc.main', {type: 2});
	    		},2000)
	    		
	    	}
			    	}else{
			    		layer.msg("无法听课");
			    	}					
				})
					
//	    	}else{
//	    		layer.msg("时间未到,无法听课");
//	    		setTimeout(function(){
//	    			$state.go('app.ktgc.main', {type: 2});
//	    		},2000)
//	    		
//	    	}
    	}else{
    		layer.msg('请完善所有信息');
    	}	    
    }   
    
    //获取学校老师信息
    $scope.listenerTeacher = function(){
        code = $scope.name2;
    	console.log(code)
    	commonHttpService.httpRequest("post","/jxsd/sys/getTeacher",httpData("jxsd",code).getTeacher(),teacherFunc)
    }
    
    function teacherFunc(data){
    	console.log(data)

    	$scope.teacherList = data.data;
    	if(data.data.length==1){
    		$scope.name4 = data.data[0].id
    	}    	
    }
    
    
    //信息展示
    $scope.getConet = function(data){
    	console.log($('.classCheT option:selected').text())
    }
    
	
	//获取年级
	$scope.lessonType = function(data){
		console.log(data)
		if(data=="2"){
			if($scope.name4 == "5"){
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"}
				]
			}else if($scope.name4 == "4"){
				$scope.classCheck = [
					{grade:"三年级",code:"3"},
					{grade:"四年级",code:"4"}
				]				
			}else if($scope.name4 == "3"){
				$scope.classCheck = [
					{grade:"五年级",code:"5"},
					{grade:"六年级",code:"6"}
				]				
			}else{
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]				
			}
		}
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.name7,$scope.name4).lessonType(),lessonTypeFunc)
	}
	function lessonTypeFunc(data){
		console.log(data)
		$scope.lessonList = data.data;
	}

	var province_data = ""
	var city_data = ""
	var area_data = ""
	var district_code = ""
	 //查询省联动
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
	    //滚动江西省
	    if($scope.selUpDailog2){
		    setTimeout(function(){
		    	document.getElementById('selUpDailogScroll1').scrollTop=450;
		    	$("div[dataId='360000']").click()
		    },300)	    	
	    }
	    
	}

    //查找市
    $scope.showHide = false
    
    $scope.provinceClick = function(value,event){
    	province_data = event.target.innerText;
    	console.log(value)
	    $scope.showHide = true
//  	$scope.boxTop = event.target.offsetParent.offsetTop
    	$scope.boxLeft = event.target.offsetParent.offsetLeft + 200
    	console.log(event)
    	var dataL = event.target.attributes[1].value;
    	var dataCode = event.target.attributes[2].value;
			provinceCode=event.target.attributes[2].value;
 	
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

		cityCode=event.target.attributes[2].value;
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

		areaCode=event.target.attributes[2].value;   	
    	for(var i=0;i<dataL;i++){
    		$scope["blueClicka"+i] = false
    	}
    	$scope["blueClicka"+value] = true 
    	$(".selUp2").html(province_data+"-"+city_data+"-"+area_data)
    	$scope.selUpDailog2 = false
    	$scope.showHide = false
    	$scope.showHide1 = false
    	console.log(province_data+"-"+city_data+"-"+area_data)
    	commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",districtCode).school(),schoolFunc)
    	console.log(districtCode)
    }
	
	//获取学校
	
	function schoolFunc(data){
		console.log(data)
		$scope.name2 = null;
		$scope.schoolData = data.data;
	}

	//查询讲课老师
	$scope.teachInfor = function(){
		commonHttpService.httpRequest("post","/jxsd/teach/getTodayTeach",httpData(connectingCode,$scope.name3,$("#test5").val()).teachInfo(),teachInfoFunc)
	}
	
	function teachInfoFunc(data){
		var nameData = [
			{id:"1",name:"语文"},
			{id:"2",name:"数学"},
			{id:"3",name:"英语"},
			{id:"4",name:"政治"},
			{id:"5",name:"历史"},
			{id:"6",name:"地理"},
			{id:"7",name:"物理"},
			{id:"8",name:"化学"},
			{id:"9",name:"生物"}
		]	

		console.log(data)
		$scope.infomationData = data.data
	}
	

}])