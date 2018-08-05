rootApp.controller('attendClassCtrl', ["$scope", "$state", "$http", "$stateParams","$interval","commonHttpService","locals",function ($scope, $state, $http, $stateParams, $interval,commonHttpService,locals) {
    $scope.isShowSeat = false;
    $scope.isShowRecord = false;
    $scope.seatList = [];
    $scope.seatList.length = 40;
    $scope.trueCount = 0;
    $scope.questionCount = 0;
//  $scope.timerNt = 0;
    $scope.btnFinishText="完成测评"
    var id1 = "";
    var id2 = "";
    var id3 = "";
    var id4 = "";
    var ymd1 = "";
    var ymd2 = "";
    var ymd3 = "";
    var ymd4 = "";
	var connectingCode = locals.get("connectingCode");
	var phone = locals.get("phone");    
    console.log($stateParams.test1)
    
    var teachId = JSON.parse($stateParams.test1).value1;
    var classCode = JSON.parse($stateParams.test1).value2;
    var gradeCode = JSON.parse($stateParams.test1).value3;
    var periodCode = JSON.parse($stateParams.test1).value4;
    var listenTeacherId = JSON.parse($stateParams.test1).value5;
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8){
		return httpDatad={
			seat:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4
				}	
			},
			seat1:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4,
					fatherId:data5
				}	
			},
			mark:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4,
					id:data5
				}	
			},	
			//新一级指标
			rootIndex:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4,
				}	
			},
			getScore:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					teachId:data4,
					ids:data5
				}	
			},
			seatOn:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					classCode:data4,
					gradeCode:data5,
					periodCode:data6
				}	
			},
			questionNum:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					raiseHands:data4,
					rightCount:data5,
					wrongCount:data6,
					siteCode:data7,
					teachId:data8
				}	
			}
		}

	}	    
	
//	commonHttpService.httpRequest("post","/jxsd/mark/insertTeachMark",httpData(phone,"jxsd",connectingCode,"3548","57142").mark(),markFunc);
//	
//	function markFunc(data){
//		console.log(data)
//	}

	//新接口
//	commonHttpService.httpRequest("post","/jxsd/mark/insertTeachMark",httpData(phone,"jxsd",connectingCode,"3548").mark(),markFunc);


	//第一级
    commonHttpService.httpRequest("post","/jxsd/teach/selectRootTeachIndex",httpData(phone,"jxsd",connectingCode,teachId).rootIndex(),rootIndexFunc);
    
//  function rootIndexFunc(data){
//  	console.log(data)
//  }
    
    var seatNumChe = ""
    function rootIndexFunc(data){	
    	console.log(data)
    	$scope.jinDuD = data.data.list.length;
    	if(data.data.list==null || data.data.list=="" || data.data.list==undefined){
    		$(".caption1").hide()
    		$(".displayBtn").hide()
    		layer.msg("未生成测评报告！")
    	}else{
    		$scope.timerNt = data.data.markTotal
    		$scope.timerNg = data.data.total
    		$scope.list1 = data.data.list
    		$(".caption1").show()
    		$(".displayBtn").show()
    		
    	}

    	
    }
    
    function seatFunc1(data){
    	console.log(data)
    	$scope.list2 = data.data
    }
    
    //获取座位列表信息
    
    $scope.seatInfor = "";
    
    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectClassStudentsByTeach",httpData(phone,"jxsd",connectingCode,classCode,gradeCode,periodCode).seatOn(),seatOnFunc)	
    
    function seatOnFunc(data){
    	console.log(data)
//  	var seat = [{"name":"22","siteCode":"1"},{"name":"张三","siteCode":"1"},{"name":"李四","siteCode":"1"},{"name":"333","siteCode":"1"},{"name":"222","siteCode":"1"},{"name":"55","siteCode":"1"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"555","siteCode":"1"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"},{"name":"","siteCode":"0"}]
//  	$scope.seatList = JSON.parse(data.data.students.siteData)
		if(data.status=="1"){
			if(data.data.students.siteData==null){
				$(".seat-title").hide()
				$(".closeFont").show()
				$scope.seatInfor = "";			
				var infoObj = {
					name: '',
					siteCode: '0',
				};    
			    $scope.seatList = [];
			    
			    for(var i=0;i<40;i++){
			    	$scope.seatList.push(infoObj);
			    }				
			}else{
				$(".seat-title").show()
				$(".closeFont").hide()
				seatNumChe = data.data.students.siteStyle
				if(data.data.students.siteStyle=="1" || data.data.students.siteStyle==1){
					$scope.seatInfor = "1";
				}else if(data.data.students.siteStyle=="2" || data.data.students.siteStyle==2){
					$scope.seatInfor = "2";
				}
				$scope.seatList = JSON.parse(data.data.students.siteData)				
			}

		}else{
			$(".seat-title").hide()
			$(".closeFont").show()
			$scope.seatInfor = "";
//			layer.msg(data.info)
		}
		
    }
    
    $scope.curStudent = {
        index: -1,
        question: 'true'
    };
    $scope.quota = {
        list1: [{name: '默读课本',finish: true},{name: '观看课件',finish: true},{name: '教师提问',finish: false},{name: '回忆旧知',finish: false},{name: '讨论',finish: false},{name: '口头回答',finish: false},{name: '组织管理',finish: false}],
        list2: [{name: '对话式讲解',finish: false},{name: '独白式讲解',finish: false},{name: '引导式讲解',finish: false},{name: '学生状态',finish: false},{name: '辅助行为',finish: false}],
        list3: [{name: '思维轨迹',finish: false},{name: '语言艺术',finish: false},{name: '思维方式',finish: false}],
        list4: [{name: '思维轨迹',finish: false},{name: '语言艺术',finish: true},{name: '思维方式',finish: false}],
        list5: [{name: '思维混乱',finish: false},{name: '模糊不清',finish: false},{name: '基本清晰',finish: false},{name: '清晰准确',finish: false},{name: '富有创造性',finish: false}],
    };
    $scope.current = {
        quota1: '1000',
        quota2: '1000',
        quota3: '1000',
        quota4: '1000',
    };

    $scope.time = {
        left: 0,
        now: 0,
        width: '0%'
    };
    var timer = null;
    function getTime(start,end) {
        // var start1 = (new Date(start)).getTime();
        // var end1 = (new Date(end)).getTime();
        var now = new Date().getTime();
        var start1 = now - 1800000;
        var end1 = now + 2600000; 
        var totalTime = end1 - start1;
        $scope.time.left = end1 - now;
        $scope.time.now = now - start1;
        timer =  $interval(function () {
            $scope.time.left -= 1000;
            $scope.time.now += 1000;
            $scope.time.width = $scope.time.now/totalTime*100 + '%';
        },1000);
    }
    $scope.$on('$destroy',function () {
        $interval.cancel(timer);
    });
    $scope.checkEvaluate = function (item) {
//      item.finish = !item.finish;
		if(item.selected==0){
			item.selected=1
		}else{
			item.selected=0
		}

    };
    $(".evaluate-box").on("click",".evaluateActive",function(){
    	console.log(1234)
    	var evaluateActiveList = $(".evaluateActive")
    	for(var i=0;i<evaluateActiveList.length;i++){
    		$(evaluateActiveList[i]).removeClass("active")
    	}
        $(this).addClass("active")

    });
    $scope.chooseQuota = function (index,quota,value,id,datad) {
    	var liList = $(this).parent().parent().next().find("li")
//  	var liList = $(".quota-box li");
    	for(var i=0;i<liList.length;i++){
    		$(liList[i]).removeClass("active")
    	}
        $scope.current[quota] = index;
        if(quota=='quota1'){
        	locals.set("spa",datad)
        	id1 = id
        	var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds(); 
			ymd1 = year + '-' + month + '-' + day +' '+ hour+':'+minute+':'+second
			
        	commonHttpService.httpRequest("post","/jxsd/teach/selectChildTeachIndex",httpData(phone,"jxsd",connectingCode,teachId,value).seat1(),seatFunc1);
        	$(".caption2").show()
        	$(".caption3").hide()
        	$(".caption4").hide()
        	$(".caption5").hide()
        }else if(quota=='quota2'){
        	
        	id2 = id
        	var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();   
			ymd2 = year + '-' + month + '-' + day +' '+ hour+':'+minute+':'+second
			console.log(year + '-' + month + '-' + day +'- '+ hour+'-'+minute+'-'+second)
        	commonHttpService.httpRequest("post","/jxsd/teach/selectChildTeachIndex",httpData(phone,"jxsd",connectingCode,teachId,value).seat1(),seatFunc2);
        
        }else if(quota=='quota3'){
        	
	    	id3 = id
        	var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds(); 
			ymd3 = year + '-' + month + '-' + day +' '+ hour+':'+minute+':'+second
			console.log(year + '-' + month + '-' + day +'- '+ hour+'-'+minute+'-'+second)
        	commonHttpService.httpRequest("post","/jxsd/teach/selectChildTeachIndex",httpData(phone,"jxsd",connectingCode,teachId,value).seat1(),seatFunc3);
        
        
        }else if(quota=='quota4'){
        	$scope.ba = locals.get("spa")
//      	id4 =  id4 +","+ id
//      	var date = new Date();
//			var year = date.getFullYear();
//			var month = date.getMonth()+1;
//			var day = date.getDate();
//			var hour = date.getHours();
//			var minute = date.getMinutes();
//			var second = date.getSeconds();   
//			ymd4 = year + '-' + month + '-' + day +' '+ hour+':'+minute+':'+second
//			console.log(year + '-' + month + '-' + day +'- '+ hour+'-'+minute+'-'+second)
        	commonHttpService.httpRequest("post","/jxsd/teach/selectChildTeachIndex",httpData(phone,"jxsd",connectingCode,teachId,value).seat1(),seatFunc4);
        	$(".caption5").show()
        }
    };
    
    function seatFunc2(data){
    	console.log(data)
    	
    	if(data.data[0].options!=""){
    		$scope.ba = locals.get("spa")
    		$scope.list5 = data.data;
    		$(".caption3").hide()
    		$(".caption4").hide()
    		$(".caption5").show()
    		id3 = "";
    	}else{
    		$scope.list3 = data.data;
	    	$(".caption3").show()
	    	$(".caption4").hide()
	    	$(".caption5").hide()    		
    	}

    }
 
    function seatFunc3(data){
    	console.log(data)
    	if(data.data[0].options!=""){
    		$scope.ba = locals.get("spa")
		$scope.list5 = data.data;
		$(".caption4").hide()
		$(".caption5").show()    		
	}else{
    	$scope.list4 = data.data
    	$(".caption4").show()
    	$(".caption5").hide()    		
	}

    }     
    function seatFunc4(data){
    	console.log(data)
    	$scope.list5 = data.data    	
    }
    
    
    $scope.closeInfo = function(){
    	$state.go("app.ktgc.main")
    }
    
	//radio变化    
	$("input[name='getScoreDo']").on("change",function(){
		console.log($(this).val())
		if($(this).val()=="1"){
			$(".radioH1").show()
			$(".radioH2").hide()
			
		}else if($(this).val()=="2"){
			$(".radioH1").hide()
			$(".radioH2").show()
	    	var evaluateActiveList = $(".evaluateActive")
	    	for(var i=0;i<evaluateActiveList.length;i++){
	    		$(evaluateActiveList[i]).removeClass("active")
	    	}			
		}
	})    
    
    //切换座位表
    $scope.showSeat = function () {
        $scope.isShowSeat = true
    };
     $scope.showSeat1 = function () {
//      $scope.isShowSeat = false
		$state.go("app.ktgc.cpbg",{teachId:teachId,listenTeacherId:listenTeacherId,num:"1"})
		
    };   
    //完成测评
    $scope.finish = function () {
		if($scope.btnFinishText=="完成测评")
			{
			    $scope.btnFinishText="操作中……"
				commonHttpService.httpRequest("post","/jxsd/mark/submitTeachMark",httpData(phone,"jxsd",connectingCode,teachId).rootIndex(),finishFunc);
			}
    };
    
    function finishFunc(data){
    	console.log(data)
    	if(data.status=="1"){
    		layer.msg("完成测评");
//      $state.go('app.ktgc.main', {type: 1});    
    		$scope.btnFinishText="完成测评"
    	}    	
    }
    
    $scope.chooseStudent = function(index) {
    	console.log(index)
        $scope.curStudent.index = index;
        $scope.isShowRecord = true;
    };
    $scope.closeRecord = function () {
        $scope.isShowRecord = false;
        $scope.curStudent.index = -1;
        console.log($scope.curStudent);
        commonHttpService.httpRequest("post","/jxsd/teach/updateStudentStatus",httpData(phone,"jxsd",connectingCode,$scope.trueCount,$scope.questionCount,$scope.questionCount,seatNumChe,teachId).questionNum(),questionNumFunc)	
    };
    
    function questionNumFunc(data){
    	console.log(data)
    	layer.msg(data.info)
    }
    
    (function () {
        getTime('2017/12/22 15:10:00','2017/12/22 15:30:00');
    })();
    
    $scope.addTrue = function(){
    	$scope.trueCount++
    }
    
    $scope.reduceTrue = function(){
    	$scope.trueCount <=0 ? $scope.trueCount=0 : $scope.trueCount--
    }
    $scope.addQuestion = function(){
    	$scope.questionCount++
    }
    
    $scope.reduceQuestion = function(){
    	$scope.questionCount <=0 ? $scope.questionCount=0 : $scope.questionCount--
    }
    
    //打分机制
    $scope.getScore = function(value){
    	console.log($("input[name='getScoreDo']:checked").val())
    	var ids = ""
    		if($("input[name='getScoreDo']:checked").val()=="1"){
				var listq = $(".radioH1 .active")
				for(var i=0;i<listq.length;i++){
					if(id4==""){
						id4 =  id4 + $(listq[i]).attr("dataId")
					}else{
						id4 =  id4 +","+ $(listq[i]).attr("dataId")
					}
					
				}    			
    		}else{
				var listq = $(".radioH2 .active")
				for(var i=0;i<listq.length;i++){
					if(id4==""){
						id4 =  id4 + $(listq[i]).attr("dataId")
					}else{
						id4 =  id4 +","+ $(listq[i]).attr("dataId")
					}
					
				}    			
    		}

        	
        	var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();   
			ymd4 = year + '-' + month + '-' + day +' '+ hour+':'+minute+':'+second
    	if(id3!=""){
    		ids = id1+"t"+ymd1+";"+id2+"t"+ymd2+";"+id3+"t"+ymd3+";"+id4+"t"+ymd4
    	}else{
    		ids = id1+"t"+ymd1+";"+id2+"t"+ymd2+";"+id4+"t"+ymd4
    	}
    	console.log(ids)
//  	commonHttpService.httpRequest("post","/jxsd/mark/insert",httpData(phone,"jxsd",connectingCode,teachId,ids).getScore(),getScoreFunc);
		$.ajax({
			type:"post",
			url:commonHttpService.http + "/jxsd/mark/insert",
			async:true,
			dataType:"json",
			data:httpData(phone,"jxsd",connectingCode,teachId,ids).getScore(),  
			success:getScoreFunc
		})
	    function getScoreFunc(data){
	    	
	    	console.log(data)
	    	if(data.status=="1"){
	    		$scope.timerNt = $scope.timerNt+1
	    		$(".inNum"+value).html(parseInt($(".inNum"+value).html())+1)
	    		id4 = ""
	    		layer.msg('提交成功');
	    	}
	    }    
    }
    

    
    //查询学生讲座
    
 }])
 rootApp.filter("time",[function(){
    return function(tm){
        if (!tm) {
            return;
        }
        var count = tm/1000;
        var minute = parseInt(count/60) < 10 ? '0' + parseInt(count/60) : parseInt(count/60);
        var second = parseInt(count%60) < 10 ? '0' + parseInt(count%60) : parseInt(count%60);
        var result = minute + ':' + second;
        return result;
    };
}])