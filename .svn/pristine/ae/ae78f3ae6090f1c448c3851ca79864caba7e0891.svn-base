rootApp.controller('addLectureCtrlB', ["$scope", "$state", "$http", "$stateParams","locals","commonHttpService", function ($scope, $state, $http, $stateParams,locals,commonHttpService) {
	
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
	var districtCode = ""	
//	var params = {}
//	var params.teach = {}
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
    	if($(".selUp2")!="讲课老师学校所属区域" && $scope.name2!="讲课老师所属学校" && $scope.name3!="讲课老师姓名" && $scope.ktgcSay1!="学科" && $scope.ktgcSay2!="学段" && $scope.ktgcSay4!="年级" && $scope.ktgcSay3!="课型" && $("#test6").val()!="" && $("#test7").val()!="" && $("#test8").val()!=""){
    		var addSay = {
					phone:phoneName,
					appName:"jxsd",
					connectingCode:connectingCode,
					teach:{
						provinceCode:province_data,
					    cityCode:city_data,
						areaCode:area_data,
						periodCode:$scope.ktgcSay2,
						gradeCode:$scope.ktgcSay4,
						subjectCode:$scope.ktgcSay1,
						schoolCode:$scope.name2,
						lessonCode:$scope.ktgcSay3,
						teacherId:$scope.name3,
						teachTime:$("#test6").val(),
						startTime:$("#test6").val()+" "+$("#test7").val(),
						endTime:$("#test6").val()+" "+$("#test8").val(),
						title:'听课标题'			
					}
				} 
	    	$.ajax({
				type:"post",
				url:commonHttpService.http + "/jxsd/listen/insert",
				async:true,
				contentType:"application/json",
				dataType:"json",
				data:JSON.stringify(addSay),
				success:function(data){
					if(data.status=="1"){
			    		$state.go('app.cjzb.main1')
			    	}else{
			    		layer.msg("无法听课");
			    	}		
					$scope.imgqd = commonHttpService.http+data.data.qrcode
				}
			});			    				
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
    	if($(".selUp2")!="讲课老师学校所属区域" && $scope.name2!=null && $scope.ktgcSay1!="学科名称" && $scope.ktgcSay2!="执教学段" && $scope.ktgcSay4!="" && $scope.ktgcSay4!= null && $scope.ktgcSay3!="" && $scope.ktgcSay3!=null && $("#test6").val()!="" && $("#test7").val()!="" && $("#test8").val()!=""){	    	
    		console.log($('.classCheT option:selected').text())
    		var time1 = $('.classCheT option:selected').attr("dataId")
	    	var time2 = Date.parse(new Date())
	    	var time3 = Date.parse($("#test6").val()+" "+$("#test7").val())
	        startTime = Date.parse(new Date(time1))
	    	var newTime = Date.parse(new Date());
  			var oldTime = Date.parse($("#test6").val()+" "+$("#test8").val())
	    	var timeBooler = false
			var day11 = $("#test7").val().substring(0,2)
			var day12 = $("#test7").val().substring(3,5)
			var day21 = $("#test8").val().substring(0,2)
			var day22 = $("#test8").val().substring(3,5)
			var ksTime = $("#test7").val();
			startTime = Date.parse(new Date(ksTime))
			console.log(time3)
			if(day21>day11){
				timeBooler = true
			}else{
				if(day21==day11){
					if(day22>day12){
						timeBooler = true
					}else{
						var timeBooler = false
						layer.msg('结束时间应大于开始时间');
					}
				}else{
					var timeBooler = false
					layer.msg('结束时间应大于开始时间');
				}	
			}
  			if(timeBooler){
	    	var addSay = {
					phone:phoneName,
					appName:"jxsd",
					connectingCode:connectingCode,
					teach:{
						provinceCode:provinceCode,
					    cityCode:cityCode,
						areaCode:areaCode,
						periodCode:$scope.ktgcSay2,
						gradeCode:$scope.ktgcSay4,
						subjectCode:$scope.ktgcSay1,
						schoolCode:$scope.name2,
						lessonCode:$scope.ktgcSay3,
						teacherName:$scope.nameJK,
						teacherId:'0',
						teachTime:$("#test6").val(),
						startTime:$("#test6").val()+" "+$("#test7").val(),
						endTime:$("#test6").val()+" "+$("#test8").val(),
						title:'听课标题'			
					}
				} 
	    	
	    	console.log(time2);
	    	console.log(provinceCode+"省");
	    	console.log(cityCode+"市");
	    	console.log(areaCode+"区");
	    	console.log($scope.name2+"学校");
	    	console.log($scope.name3);
	    	console.log($scope.ktgcSay1+"学科");
	    	console.log($scope.ktgcSay2+"学段");
	    	console.log($scope.ktgcSay4+"年级");
	    	console.log($scope.ktgcSay3+"课型");
	    	console.log($scope.nameJK+"讲课老师");
	    	if(oldTime>newTime){
	    	$.ajax({
				type:"post",
				url:commonHttpService.http + "/jxsd/listen/insert",
				async:true,
				contentType:"application/json",
				dataType:"json",
				data:JSON.stringify(addSay),
				success:function(data){
					if(data.status=="1"){
						if(time2>time3){
						var listJson = {};
						listJson.value1 = $scope.ktgcSay3;//lessonCode
						listJson.value2 = $scope.ktgcSay2;//periodCode
						listJson.value3 = $scope.ktgcSay1;//subjectCode
						listJson.value4 = listenIdCode;//
						listJson.value5 = data.data.id;
						listJson.value6 =0;//teacherId
				    	//alert(JSON.stringify(listJson))
			    		$state.go('app.cjzb.main1',{test1:JSON.stringify(listJson)})
						}else{
							$state.go('app.ktgc.main', {type: 2});
						}
			    	}else{
			    		layer.msg("无法听课");
			    	}		
					$scope.imgqd = commonHttpService.http+data.data.qrcode
					console.log($scope.imgqd)
				}
			});
	    	}else{
	    		layer.msg("讲课结束时间必须大于当前时间")
	    	}
    		//commonHttpService.httpRequest("post","/jxsd/listen/insert",httpData(phoneName,"jxsd",connectingCode).buttonPost(),buttonPostFunc)
  			} 				
    	}else{
    		layer.msg('请完善所有信息');
    	}	    
    }   
    
    //获取学校老师信息
    $scope.listenerTeacher = function(){
    	var schoolCode = $scope.name2;
    	commonHttpService.httpRequest("post","/jxsd/sys/getTeacher",schoolCode,teacherFunc)
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
    
	
  //获取课型
	$scope.lessonType = function(data){
		console.log(data)
		if(data=="2"){
			if($scope.ktgcSay2 == "4"){
				$scope.ktgcSay4 = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]
			}else if($scope.ktgcSay2 == "3"){
				$scope.ktgcSay4 = null;
				$scope.classCheck = [
					{grade:"四年级",code:"4"},
					{grade:"五年级",code:"5"},
					{grade:"六年级",code:"6"}
				]				
			}else{
				$scope.ktgcSay4 = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]				
			}
		}
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.ktgcSay1,$scope.ktgcSay2).lessonType(),lessonTypeFunc)
	}
	
	function lessonTypeFunc(data){
		console.log(data)
		$scope.ktgcSay3 = null;
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
	layui.use('laydate', function(){
    	var laydate = layui.laydate;

		laydate.render({
	    	elem: '#test6',
	    	min: 0
	    });

	    laydate.render({
    	    elem: '#test7',
    	    type: 'time',
			format: 'HH:mm',
			done: function(value, date, endDate){
				
				$($(".laydate-time-list").children().eq(2)).hide()
				

				var strH = value.substring(0,2)
				var strM = value.substring(3,5)
				
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
				$("#test8").val(strH+":"+strM)
			}
	    });
	    laydate.render({
    	    elem: '#test8',
    	    type: 'time',
    	    min: $("#test7").val(),
			format: 'HH:mm'
	    });
    })      

}])