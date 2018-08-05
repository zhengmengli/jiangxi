rootApp.controller('detailClassCtrl', ["$scope", "$state", "$http", "$stateParams","commonHttpService","locals", function ($scope, $state, $http, $stateParams,commonHttpService,locals) {
	var periodCode;
	var gradeCode;
	var classCode;
	var subjectCode;
	var lessonCode;
	var teachTime;
	var teacherType;
	var startTime;
	var connectingCode = locals.get("connectingCode");
	var schoolCode = locals.get("schoolCode");
	var districtCode = locals.get("districtCode");	
	
	var phoneName = locals.get("phone");
	$stateParams.test = JSON.parse($stateParams.test)
	console.log($stateParams.test)
//	$(".subjectName").find("option[title='"+$stateParams.test.value1+"']").attr("selected",true);
//	$(".periodName").find("option[title='"+$stateParams.test.value2+"']").attr("selected",true);
//	$(".lessonName").val($stateParams.test.value3)
//	$(".gradeName").find("option[title='"+$stateParams.test.value4+"']").attr("selected",true);
	$scope.subjectName = $stateParams.test.value1 
	$scope.periodName = $stateParams.test.value2
//	$scope.lessonName = $stateParams.test.value3
	$scope.gradeName = $stateParams.test.value4
	$scope.className = $stateParams.test.value5
	$scope.ktgcTitle = $stateParams.test.value6
	$scope.teachIdCheck = $stateParams.test.value9
	$scope.imgqd = commonHttpService.http + locals.get("qpcord")
	var time1 = $stateParams.test.value7.substring(0,10)
	var time2 = $stateParams.test.value7.substring(11,16)
	var time3 = $stateParams.test.value8.substring(11,16)
	$("#test6").val(time1)
	$("#test7").val(time2)
	$("#test8").val(time3)
	
	$scope.zwType = "1";
	$scope.zwCheck = function(){
		$scope.zwType = $scope.subjectType
	}
	
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
			infor:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					classCode:data4,
					periodCode:data5,
					gradeCode:data6
				}	
			}
		}
	}
	//获取课型
	commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,"","").lessonType(),lessonTypeFunc1)
	
	$scope.lessonType = function(){
		console.log(3)
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.subjectName,$scope.periodName).lessonType(),lessonTypeFunc2)
	}

	function lessonTypeFunc1(data){
		console.log(data)
		$scope.lessonList = data.data;
		$scope.lessonName = $stateParams.test.value3
	}

	function lessonTypeFunc2(data){
		console.log(data)
		$scope.lessonList = data.data;
//		if(data.data.length==0){
			$scope.lessonName = "执教课型"
//		}	
	}

	function addSayFunc(data){
		console.log(data)
	}
	
    layui.use('laydate', function(){
    	var laydate = layui.laydate;
//	  	laydate.render({
//	    	elem: '#test6',
//	    	type: 'time',
//	    	range: true
//	    });
		laydate.render({
	    	elem: '#test6',
	    	min: 0
	    });
//	    laydate.render({
//		    elem: '#test7',
//		    type: 'datetime'
//		 });
//		 laydate.render({
//		    elem: '#test8',
//		    type: 'datetime'
//		 });
	    laydate.render({
    	    elem: '#test7',
    	    type: 'time',
			format: 'HH:mm',
			done: function(value, date, endDate){
//			    console.log(value); //得到日期生成的值，如：2017-08-18
//			    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
//			    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
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
    
    $scope.process = 1;
    $scope.seatList = [];
    $scope.seatList.length = 40;

    $scope.pre = function () {
        $scope.process-- ;
    }
    $scope.next = function () {
    	console.log($scope.ktgcTitle)
    	if($scope.process==1){
	    	if($.trim($scope.ktgcTitle)!="" && $.trim($scope.ktgcTitle)!=undefined && $scope.subjectName!="学科名称" && $scope.periodName!="执教学段" && $scope.lessonName!="执教课型" && $scope.gradeName!="执教年级" && $scope.className!="执教班级" && $("#test6").val()!="" && $("#test7").val()!="" && $("#test8").val()!=""){
//	    		$scope.process++ ;
				var timeBooler = false
				var day11 = $("#test7").val().substring(0,2)
				var day12 = $("#test7").val().substring(3,5)
				var day21 = $("#test8").val().substring(0,2)
				var day22 = $("#test8").val().substring(3,5)
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
		    		var dataS = {};
					
		    		dataS.periodCode = $scope.periodName;
		    		dataS.gradeCode = $scope.gradeName;
		    		dataS.classCode = $scope.className;
		    		dataS.subjectCode = $scope.subjectName;
		    		dataS.schoolCode = schoolCode;
		    		dataS.areaCode = districtCode;
		    		dataS.teacherType = 0;
					
	
//					$.ajax({
//						type:"post",
//						url:commonHttpService.http + "/jxsd/teach/selectTeachStudentNum",
//						async:true,
//						contentType:"application/json",
//						dataType:"json",
//						data:JSON.stringify(dataS),
//						success:function(data){
//							console.log(data);
//							var datainfo = data.data;							
//							if(datainfo == null){
//								$(".studentNum").val("0")
//								$(".boyNum").val("0")
//								$(".girlNum").val("0")
//								$scope.studentNum = 0;
//								$scope.boyNum = 0;
//								$scope.girlNum = 0;								
//							}else{
//								$(".studentNum").val(datainfo.total)
//								$(".boyNum").val(datainfo.male)
//								$(".girlNum").val(datainfo.female)								
//								$scope.studentNum = datainfo.total;
//								$scope.boyNum = datainfo.male;
//								$scope.girlNum = datainfo.female;								
//							}
//						}
//					});
					commonHttpService.httpRequest("post","/jxsd/baseInfo/selectClassStudentsByTeach",httpData(phoneName,"jxsd",connectingCode,$scope.className,$scope.periodName,$scope.gradeName).infor(),inforFunc)					
					
	    			$scope.process++ ;
		    							
				}
	    	}else{
	    		layer.msg('请完善所有信息');
//	    		$scope.process++ ;
	    	}    		
    	}else if($scope.process==2){
    		if($.trim($scope.studentNum)!="" && $scope.studentNum!=undefined && $.trim($scope.boyNum)!="" && $scope.boyNum!=undefined && $.trim($scope.girlNum)!="" && $scope.girlNum!=undefined){
    			
				var addSay = {
					phone:phoneName,
					appName:"jxsd",
					connectingCode:connectingCode,
					teach:{
						periodCode:$scope.periodName,
						gradeCode:$scope.gradeName,
						classCode:$scope.className,
						subjectCode:$scope.subjectName,
						lessonCode:$scope.lessonName,
						id:$scope.teachIdCheck,
						teachTime:$("#test6").val(),
						teacherType:0,
						startTime:$("#test6").val()+" "+$("#test7").val(),
						endTime:$("#test6").val()+" "+$("#test8").val(),
						title:$scope.ktgcTitle			
					},
					teachClass:{
						siteStyleId:$scope.subjectType,
						total:$(".studentNum").val(),
						male:$(".boyNum").val(),
						female:$(".girlNum").val()						
					}
				} 
				var addSay1 = {};
				addSay1.teach = {};
				addSay1.teachClass = {};
				addSay1.phone = phoneName;
				addSay1.appName = "jxsd";
				addSay1.connectingCode = connectingCode;
				addSay1.teach.periodCode = $scope.ktgcSay2;
				addSay1.teach.gradeCode = $scope.ktgcSay4;
				addSay1.teach.classCode = $scope.ktgcSay5;
				addSay1.teach.subjectCode = $scope.ktgcSay1;
				addSay1.teach.teachTime = $("#test6").val();
				addSay1.teach.teacherType = 0;
				addSay1.teach.startTime = $("#test7").val();
				addSay1.teach.endTime = $("#test8").val();
				addSay1.teach.title = $scope.ktgcTitle;
				addSay1.teachClass.siteStyleId = $scope.subjectType

				$.ajax({
					type:"post",
					url:commonHttpService.http + "/jxsd/teach/update",
					async:true,
					contentType:"application/json",
					dataType:"json",
					data:JSON.stringify(addSay),
					success:function(data){
						console.log(data)
					}
				});
//  			commonHttpService.httpRequest1("post","/jxsd/teach/insert",addSay1,addSayFunc)
    			$scope.process++ ;
    			
    		}else{
    			layer.msg('请完善所有信息');
    		}
    	}
    }
    $scope.goBack = function () {
        history.go(-1);
    }
    $scope.finish = function () {
        $state.go('app.ktgc.main');
    }
    $scope.choseDate = function() {

    }

	function inforFunc(data){
		console.log(data)
		var datainfo = data.data;							
		if(JSON.stringify(datainfo) == "{}"){
			$(".studentNum").val("0")
			$(".boyNum").val("0")
			$(".girlNum").val("0")
			$scope.studentNum = 0;
			$scope.boyNum = 0;
			$scope.girlNum = 0;	
			$scope.subjectType = "1"
			$scope.subjectTypeName = "40单人式"
			$scope.zwType = $scope.subjectType			
		}else{
			$(".studentNum").val(datainfo.students.total)
			$(".boyNum").val(datainfo.students.male)
			$(".girlNum").val(datainfo.students.female)								
			$scope.studentNum = datainfo.students.total;
			$scope.boyNum = datainfo.students.male;
			$scope.girlNum = datainfo.students.female;	
			$scope.subjectType = datainfo.students.siteStyle.toString()
			$scope.zwType = $scope.subjectType
			if($scope.subjectType=="1"){
				$scope.subjectTypeName = "40单人式"
			}else if($scope.subjectType=="2"){
				$scope.subjectTypeName = "40四方式"
			}else if($scope.subjectType=="3"){
				$scope.subjectTypeName = "40马蹄式"
			}else if($scope.subjectType=="4"){
				$scope.subjectTypeName = "40剧院式"
			}else if($scope.subjectType=="5"){
				$scope.subjectTypeName = "40小组式"
			}else if($scope.subjectType=="6"){
				$scope.subjectTypeName = "40圆环式"
			}
			
			$scope.seatList = JSON.parse(datainfo.students.siteData);			
		}
	}
	var teachLayer;
	//分享讲课
	$scope.showShare = function(){
		teachLayer = layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 2,
		  area: ['640px', '590px'],
		  scrollbar: false,
		  shadeClose: true,
		  skin: 'layui-layer-lan',
		  content: $('.shareDailog')
		});	
			
	}
	
	$(".chslas").on("click",function(){
		layer.close(teachLayer)		
	})
	
	$(".shareImg1").on("click",function(){
		console.log(1)
		window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + $scope.imgqd + "&title=讲课分享", "newwindow");
	})
	
	$(".shareImg2").on("click",function(){
		console.log(2)
		window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title=讲课分享&url=' + $scope.imgqd + '', 'newwindow');
	})
	
	$(".shareImg3").on("click",function(){
        var param = {
            url: $scope.imgqd,
            title: "讲课分享",
            rnd: new Date().valueOf()
        };
        var temp = [];
        for (var p in param) {
            temp.push(p + '=' + encodeURIComponent(param[p] || ''))
        }
        window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
	})
}])