rootApp.controller('addClassCtrl', ["$scope", "$state", "$http", "$stateParams","commonHttpService","locals", function ($scope, $state, $http, $stateParams,commonHttpService,locals) {
	var periodCode;
	var gradeCode = locals.get("gradeCode");
	var classCode;
	var subjectCode;
	var lessonCode;
	var teachTime;
	var teacherType;
	var startTime;
	var siteStyle;
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");
	var schoolCode = locals.get("schoolCode");
	var districtCode = locals.get("districtCode");
	$scope.infor = [];
	$scope.infor1 = [];
	$scope.infor2 = [];
	$scope.currSeatStyle={'name':'','src':'','id':''};
	console.log(schoolCode)
	console.log(districtCode)
	$scope.classCheck = [];
	var time = new Date();
	var timeY=time.getFullYear();
	var timeM=time.getMonth() + 1;
	var timeD=time.getDate();
	if(timeM<10){
		timeM = "0" + timeM.toString()
	}
	if(timeD<10){
		timeD = "0" + timeD.toString()
	}
	$scope.currenTime = timeY+"-"+timeM+"-"+timeD
	$scope.zwType = "1";
	$scope.zwCheck = function(){
		$scope.zwType = $scope.subjectType
	}
	
	//开始时间变化

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
			PeriodInfoList:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3
				}					
			},		
			GradeInfoList:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3
				}					
			},		
			classInfoList:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3,
					periodCode:data4,
					gradeCode:data5
				}					
			},		
			infor:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					//classCode:data4,
					periodCode:data4,
					gradeCode:data5
				}	
			}
		}
	}

	  function page(){
		    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectPeriodTeach",httpData(phoneName,connectingCode,"jxsd").PeriodInfoList(),periodInfoListCallback);
		    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectGradeTeach",httpData(phoneName,connectingCode,"jxsd").GradeInfoList(),gradeInfoListCallback)	
		}
	    page();
	
	//change事件班级选择
	$scope.changeClass = function(){
		var tmpId=$scope.myClassSelected.siteStyle;
		if(tmpId == null){
			$scope.currSeatStyle.name='暂无座位形式';
			$scope.currSeatStyle.src='img/new/zhanwu.png';
			$scope.currSeatStyle.id='7';
	    }
		if(tmpId == '1'){
			$scope.currSeatStyle.name='单人单桌式';
			$scope.currSeatStyle.src='img/new/desk1.png';
			$scope.currSeatStyle.id='1';
	    }
		if(tmpId == '2'){
			$scope.currSeatStyle.name='剧院式';
			$scope.currSeatStyle.src='img/new/desk2.png';
			$scope.currSeatStyle.id='2';
		      }
		if(tmpId == '3'){
			$scope.currSeatStyle.name='马蹄式';
			$scope.currSeatStyle.src='img/new/desk3.png';
			$scope.currSeatStyle.id='3';
		}
		if(tmpId == '4'){
			$scope.currSeatStyle.name='四方式';
			$scope.currSeatStyle.src='img/new/desk4.png';
			$scope.currSeatStyle.id='4';
		}
		if(tmpId == '5'){
			$scope.currSeatStyle.name='小组式';
			$scope.currSeatStyle.src='img/new/desk5.png';
			$scope.currSeatStyle.id='5';
		}
		if(tmpId == '6'){
			$scope.currSeatStyle.name='圆圈式';
			$scope.currSeatStyle.src='img/new/desk6.png';
			$scope.currSeatStyle.id='6';
		}
	
	}
	
	//page();
    function classInfoListCallback(data){
    	$scope.infor = data.data;
    	console.log(data.data);
		$scope.myClassSelected = $scope.infor[0];
		//if(data.data.length ==0){
		//	$scope.myClassSelected.classCode = '';
		//	return;
		//}
		if(data.data.length == 0||data.data[0].siteStyle == null){
			$scope.currSeatStyle.name='暂无座位形式';
			$scope.currSeatStyle.src='img/new/zhanwu.png';
			$scope.currSeatStyle.id='7';
			$scope.myClassSelected='';
			return;
	    }
		if(data.data[0].siteStyle == '1'){
			$scope.currSeatStyle.name='单人单桌式';
			$scope.currSeatStyle.src='img/new/desk1.png';
			$scope.currSeatStyle.id='1';
	    }
		if(data.data[0].siteStyle == '2'){
			$scope.currSeatStyle.name='剧院式';
			$scope.currSeatStyle.src='img/new/desk2.png';
			$scope.currSeatStyle.id='2';
		      }
		if(data.data[0].siteStyle == '3'){
			$scope.currSeatStyle.name='马蹄式';
			$scope.currSeatStyle.src='img/new/desk3.png';
			$scope.currSeatStyle.id='3';
		      }
		if(data.data[0].siteStyle == '4'){
			$scope.currSeatStyle.name='四方式';
			$scope.currSeatStyle.src='img/new/desk4.png';
			$scope.currSeatStyle.id='4';
		      }
		if(data.data[0].siteStyle == '5'){
			$scope.currSeatStyle.name='小组式';
			$scope.currSeatStyle.src='img/new/desk5.png';
			$scope.currSeatStyle.id='5';
		      }
		if(data.data[0].siteStyle == '6'){
			$scope.currSeatStyle.name='圆圈式';
			$scope.currSeatStyle.src='img/new/desk6.png';
			$scope.currSeatStyle.id='6';
		      }
		
    }
  
    function periodInfoListCallback(data){
    	console.log(data.data)
    	$scope.infor1 = data.data;
		$scope.myClassSelected1 = $scope.infor1[0];
		console.log($scope.myClassSelected1);
    }
    function gradeInfoListCallback(data){
    	console.log(data.data)
    	$scope.infor2 = data.data;
		$scope.myClassSelected2 = $scope.infor2[0];
		console.log($scope.myClassSelected2);
    }
	//获取课型
    $scope.lessonType = function(data){
		console.log(data)
//		if(data=="2"){
//			if($scope.ktgcSay2 == "4"){
//				$scope.classCheck = [
//					{grade:"一年级",code:"1"},
//					{grade:"二年级",code:"2"},
//					{grade:"三年级",code:"3"}
//				]
//			}else if($scope.ktgcSay2 == "3"){
//				$scope.classCheck = [
//					{grade:"四年级",code:"4"},
//					{grade:"五年级",code:"5"},
//					{grade:"六年级",code:"6"}
//				]				
//			}else{
//				$scope.classCheck = [
//					{grade:"一年级",code:"1"},
//					{grade:"二年级",code:"2"},
//					{grade:"三年级",code:"3"}
//				]				
//			}
//		}
		console.log($scope.ktgcSay1);
		console.log($scope.myClassSelected1.periodCode);
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.ktgcSay1,$scope.myClassSelected1.periodCode).lessonType(),lessonTypeFunc)
	}
    $scope.changePeriod = function(data){
		console.log(data)

		console.log($scope.ktgcSay1);
		console.log($scope.myClassSelected1.periodCode);
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.ktgcSay1,$scope.myClassSelected1.periodCode).lessonType(),lessonTypeFunc)
	}

	function lessonTypeFunc(data){
		console.log(data)
		$scope.ktgcSay3 = null;
		$scope.lessonList = data.data;
	}

	function addSayFunc(data){
		console.log(data)
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
    
    $scope.process = 1;
    $scope.seatList = [];
    $scope.seatList.length = 40;

    $scope.pre = function () {
        $scope.process-- ;
    }
    $scope.next = function () {
    	if($scope.process==1){
	    	if($.trim($scope.ktgcTitle)!="" && $.trim($scope.ktgcTitle)!=undefined && $scope.ktgcSay1!="学科名称" && $scope.myClassSelected1.periodCode!="执教学段" && $scope.ktgcSay3!="" &&$scope.ktgcSay3!=null && $scope.myClassSelected2.gradeCode!="" && $("#test6").val()!="" && $("#test7").val()!="" && $("#test8").val()!=""){
			//if(1==1){
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
		    		dataS.periodCode = $scope.myClassSelected1.periodCode
		    		dataS.gradeCode = $scope.myClassSelected2.gradeCode;
		    		dataS.classCode = $scope.ktgcSay5;
		    		dataS.subjectCode = $scope.ktgcSay1;
		    		dataS.schoolCode = schoolCode;
		    		dataS.areaCode = districtCode;
		    		dataS.teacherType = 0;
	  				//commonHttpService.httpRequest("post","/jxsd/baseInfo/selectClassStudentsByTeach",httpData(phoneName,"jxsd",connectingCode,$scope.ktgcSay5,$scope.ktgcSay2,$scope.ktgcSay4).infor(),inforFunc)
	    			$scope.process++ ;
					    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectClassInfo",httpData(phoneName,"jxsd",connectingCode, $scope.myClassSelected1.periodCode,$scope.myClassSelected2.gradeCode).infor(),classInfoListCallback)	
						
				}
				
	    	}else{
	    		layer.msg('请完善所有信息');
	    	}    		
    }else if($scope.process==2){				
  				var newTime = Date.parse(new Date());
  				var oldTime = Date.parse($("#test6").val()+" "+$("#test8").val())
  				if($scope.myClassSelected == ''){
  					classCode = '';
  				}
  				else{
  					classCode = $scope.myClassSelected.classCode;
  				}
  				//alert($scope.myClassSelected.classCode+"77777777777777");
				var addSay = {
					phone:phoneName,
					appName:"jxsd",
					connectingCode:connectingCode,
					teach:{
						periodCode:$scope.myClassSelected1.periodCode,
						gradeCode:$scope.myClassSelected2.gradeCode,
						classCode:classCode,
						subjectCode:$scope.ktgcSay1,
						lessonCode:$scope.ktgcSay3,
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
						female:$(".girlNum").val(),
					}
				} 
				
				var addSay1 = {};
				addSay1.teach = {};
				addSay1.teachClass = {};
				addSay1.phone = phoneName;
				addSay1.appName = "jxsd";
				addSay1.connectingCode = connectingCode;
				addSay1.teach.periodCode = $scope.myClassSelected1.periodCode;
				addSay1.teach.gradeCode = $scope.myClassSelected2.gradeCode;
			//	alert($scope.myClassSelected.classCode+"mmmmmmmmmmmm");
				addSay1.teach.classCode = $scope.myClassSelected.classCode;
				addSay1.teach.subjectCode = $scope.ktgcSay1;
				addSay1.teach.teachTime = $("#test6").val();
				addSay1.teach.teacherType = 0;
				addSay1.teach.startTime = $("#test7").val();
				addSay1.teach.endTime = $("#test8").val();
				addSay1.teach.title = $scope.ktgcTitle;
				addSay1.teachClass.siteStyleId = $scope.subjectType
				
				if(oldTime>newTime){
					$.ajax({
						type:"post",
						url:commonHttpService.http + "/jxsd/teach/insert",
						async:true,
						contentType:"application/json",
						dataType:"json",
						data:JSON.stringify(addSay),
						success:function(data){
							console.log(data)
							$state.go('app.ktgc.main', {type: 1});
							$scope.imgqd = commonHttpService.http+data.data.qrcode
							console.log($scope.imgqd)
							//$(".aimg").attr("src",commonHttpService.http+data.data.qrcode)
						}
					});
	    			console.log($scope.myClassSelected1.periodCode)
	    			$scope.process++ ;					
				}else{
					layer.msg("讲课结束时间必须大于当前时间")
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
			
			if(datainfo.students.total==null){
				$(".studentNum").val(0)
				$(".boyNum").val(0)
				$(".girlNum").val(0)
				$scope.subjectType = "1"
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
				var infoObj = {
					name: '',
					siteCode: '0',
				};    
			    $scope.seatList = [];
			    
			    for(var i=0;i<40;i++){
			    	$scope.seatList.push(infoObj);
			    }				
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