rootApp.controller('zbglCtr',["$scope","$state","$http","$stateParams","$location","$anchorScroll","$timeout","cpbgService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,$location,$anchorScroll,$timeout,cpbgService,commonHttpService,locals) {
	console.log(locals.get("connectingCode"))
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");
	$scope.optionSele = "1"
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12){
		return httpDatad={
			subject:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3
				}	
			},
			period:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					subjectCode:data4
				}	
			},
			lesson:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					subjectCode:data4,
					periodCode:data5
				}	
			},
			sign:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					evaluationSystemId:data4,
					indexType:"1"
				}	
			},
			insert:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data5,
					subjectCode:data4,
					lessonCode:data6,
					score:data7
				}	
			},
			lessonType:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					subjectCode:data4,
					periodCode:data5
				}	
			},
			findChild:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					fatherId:data4
				}	
			},
			detail1:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					fatherId:data4
				}	
			},
			add1:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data4,
					subjectCode:data5,
					lessonCode:data6,
					type:data7,
					name:data8,
					fatherId:data9,
					evaluationSystemId:data10
				}	
			},
			add2:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data4,
					subjectCode:data5,
					lessonCode:data6,
					type:data7,
					name:data8,
					fatherId:data9,
					evaluationSystemId:data10,
					sh:data11,
					wx:data12
				}	
			},
			add3:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data4,
					subjectCode:data5,
					lessonCode:data6,
					type:data7,
					options:data8,
					fatherId:data9,
					evaluationSystemId:data10,
					score:data10,
					radio:"0"
				}	
			},
			dele1:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					idString:data4
				}	
			},
			addDetail:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data4,
					subjectCode:data5,
					lessonCode:data6,
					type:data7,
					name:data8,
					id:data9,
					evaluationSystemId:data10
				}	
			},	
			addDetai2:function(){
				return {
					phone:data1,
					appName:data2,
					connectingCode:data3,
					periodCode:data4,
					subjectCode:data5,
					lessonCode:data6,
					type:data7,
					name:data8,
					id:data9,
					evaluationSystemId:data10,
					sh:data11,
					wx:data12
				}	
			},						
		}

	}	
	var dataType = "1"
	var deleId =""
	var periodCodeshh = ""
	var subjectCodeshh = ""
	var lessonCodeshh = ""
	var evaluationSystemId = ""
	var fatherId = ""
	var sh = "学"
	var wx = ""
	var sh1 = ""
	var wx1 = ""
	var zhibiaoId = ""
	//学科
	
	commonHttpService.httpRequest("post","/jxsd/evaluationSystem/getSubject",httpData(phoneName,"jxsd",connectingCode).subject(),subjectFunc)
	function subjectFunc(data){
		console.log(data)
		
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].type == "1") {
                $("#rootUL").append("<li data-name='" + data.data[i].code + "'><span data='" + data.data[i].type + "' dataCode='" + data.data[i].code + "' dataId='" + data.data[i].id + "'><i class=''></i> " + data.data[i].name + "</span></li>");
            } else {

            }
        }		
	}
	
	//学段
//	commonHttpService.httpRequest("post","/jxsd/evaluationSystem/getPeriod",httpData(phoneName,"jxsd",connectingCode,1).period(),periodFunc)
	


	$('.tree').on('click','span',function (e) {
		deleId = $(this).attr("dataId")
		var that = $(this)
		var spanList = $("span")
		for(var i=0;i<spanList.length;i++){
			$(spanList[i]).css({"background":"#fff","color":"#666"});
		}
		$(this).css({"background":"#0D62CA","color":"#fff"});
		
		if($(this).attr("data")==1){
			subjectCodeshh = $(this).attr("dataCode")
			$(".zbCenter").hide()
	    	$(".zbCenterLeft1").hide()
	    	$(".zbCenterLeft2").hide()
	    	$(".zbCenterLeft3").hide()
	    	$(".zbCenterLeft4").hide()
	    	$(".zbRight").hide()
			if(!$(this).parent().find(".twoTree")[0]){
				var code = $(this).attr("dataCode")
				commonHttpService.httpRequest("post","/jxsd/evaluationSystem/getPeriod",httpData(phoneName,"jxsd",connectingCode,code).period(),periodFunc)
				
				function periodFunc(data){
					console.log(data)
			    	var str = "";
			    	str = str + "<ul class='twoTree' style='display:block;'>"
			    	for (var i = 0; i < data.data.length; i++) {
			                   str = str + "<li data-name='" + data.data[i].code + "'>" +
			                    "<span data='" + data.data[i].type + "' dataCode='" + data.data[i].code + "' dataId='" + data.data[i].id + "'>" +
			                    "<i class=''></i> " +
			                    data.data[i].name +
			                    "</span>" +
			                    "</li>"    		
			    	}
			    	str = str + "</ul>";
					that.parent().append(str)
				}				
			}else{
				console.log($(this).parent().find(".twoTree").css("display"))
				if($(this).parent().find(".twoTree").css("display") == "block"){
					$(this).parent().find(".twoTree").css("display","none")
				}else{
					$(this).parent().find(".twoTree").css("display","block")
				}
			}			
		}else if($(this).attr("data")==2){
			periodCodeshh = $(this).attr("dataCode")
			$(".zbCenter").hide()
	    	$(".zbCenterLeft1").hide()
	    	$(".zbCenterLeft2").hide()
	    	$(".zbCenterLeft3").hide()
	    	$(".zbCenterLeft4").hide()
	    	$(".zbRight").hide()
			if(!$(this).parent().find(".threeTree")[0]){
				var code = $(this).attr("dataCode")
				var parentCode = $(this).parent().parent().parent().attr("data-name")
				commonHttpService.httpRequest("post","/jxsd/evaluationSystem/getLesson",httpData(phoneName,"jxsd",connectingCode,parentCode,code).lesson(),lessonFunc)
				function lessonFunc(data){
					console.log(data)
			    	var str = "";
			    	str = str + "<ul class='threeTree' style='display:block;'>"
			    	for (var i = 0; i < data.data.length; i++) {
			                   str = str + "<li data-name='" + data.data[i].code + "'>" +
			                    "<span data='" + data.data[i].type + "' dataCode='" + data.data[i].code + "' dataId='" + data.data[i].id + "'>" +
			                    "<i class=''></i> " +
			                    data.data[i].name +
			                    "</span>" +
			                    "</li>"    		
			    	}
			    	str = str + "</ul>" 
			    	that.parent().append(str)
			    	
				}
				
				
			}else{
				console.log($(this).parent().find(".threeTree").css("display"))
				if($(this).parent().find(".threeTree").css("display") == "block"){
					$(this).parent().find(".threeTree").css("display","none")
				}else{
					$(this).parent().find(".threeTree").css("display","block")
				}
			}			
		}else if($(this).attr("data")==3){
			lessonCodeshh = $(this).attr("dataCode")
			evaluationSystemId = $(this).attr("dataId")
			var id = $(this).attr("dataId")
			
			aad()
			$(".zbCenter").show()
	    	$(".zbCenterLeft1").show()
		    $(".zbRight").hide()
		    $(".zbCenterLeft3").hide()
		    $(".zbCenterLeft2").hide()
		    $(".zbCenterLeft4").hide()
		}
		
	})
	
	function aad(){
		commonHttpService.httpRequest("post","/jxsd/index/getIndexByEvaluationSystem",httpData(phoneName,"jxsd",connectingCode,evaluationSystemId).sign(),signFunc)
	}
	
	//第一级指标
	function signFunc(data){
		console.log(data)
		$scope.targetOne = data.data;
		
	}

	$scope.barList = [
		{name:"默读文本",time:"7分27秒",score:"5分"},
		{name:"观看课件",time:"7分27秒",score:"5分"},
		{name:"听讲",time:"7分27秒",score:"5分"},
		{name:"教师提问",time:"7分27秒",score:"5分"},
		{name:"回忆旧知",time:"7分27秒",score:"5分"},
		{name:"讨论",time:"7分27秒",score:"5分"},
		{name:"口头回答",time:"7分27秒",score:"5分"},
		{name:"演板",time:"7分27秒",score:"5分"},
		{name:"组织管理",time:"7分27秒",score:"5分"},
		{name:"综合评价",time:"7分27秒",score:"5分"}
	]
     
    $scope.showCheck = function (event,value){
    	console.log(event)
    	if(value){
    		$("#fiveCheck"+(this.$index+1)).parent().css("background","#1E70E9")
    		$("#fiveCheck"+(this.$index+1)).parent().find("img").show()
    		$("#fiveCheck"+(this.$index+1)).parent().find("label").css("color","#fff")
    	}else{
    		$("#fiveCheck"+(this.$index+1)).parent().css("background","#fff")
    		$("#fiveCheck"+(this.$index+1)).parent().find("img").hide()
    		$("#fiveCheck"+(this.$index+1)).parent().find("label").css("color","#838C95")
    	}
    	
    }
    $scope.showCheck1 = function (event,value){
		var fiveCheckt = $(".fiveCheckt")
		for(var i=0;i<fiveCheckt.length;i++){
			$(fiveCheckt[i]).css("background","#fff")
			$(fiveCheckt[i]).find("img").hide()
			$(fiveCheckt[i]).find("label").css("color","#838C95")
		}    	
    	if(value){

    		$("#fiveCheckt"+(this.$index+1)).parent().css("background","#1E70E9")
    		$("#fiveCheckt"+(this.$index+1)).parent().find("img").show()
    		$("#fiveCheckt"+(this.$index+1)).parent().find("label").css("color","#fff")
    	}else{
    		$("#fiveCheckt"+(this.$index+1)).parent().css("background","#fff")
    		$("#fiveCheckt"+(this.$index+1)).parent().find("img").hide()
    		$("#fiveCheckt"+(this.$index+1)).parent().find("label").css("color","#838C95")
    	}
    	
    }
//	$(".zbCenterLeft").on("change",".oneCheck",function(){
//  		var gcCheckList = $(".gcCheck");
//  		for(var i=0;i<gcCheckList.length;i++){
//  			$(gcCheckList[i]).css("background","#fff")
//  			$(gcCheckList[i]).find("img").hide()
//  			$(gcCheckList[i]).find("label").css("color","#838C95")
//  		}
//  		$(this).parent().css("background","#1E70E9")
//  		$(this).parent().find("img").show()
//  		$(this).parent().find("label").css("color","#fff")
//  		$(".zbCenterLeft2").show()
//	})
	//第二级
	$(".zbCenterLeft").on("click",".oneCheckLabel",function(){
		    $(".zbRight").hide()
		    $(".zbCenterLeft3").hide()
		    $(".zbCenterLeft4").hide()
			fatherId = $(this).attr("dataId")
			zhibiaoId = $(this).attr("dataId")
			var id = $(this).attr("dataId")
    		var gcCheckList = $(".gcCheck");
    		for(var i=0;i<gcCheckList.length;i++){
    			$(gcCheckList[i]).css("background","#fff")
    			$(gcCheckList[i]).find("img").hide()
    			$(gcCheckList[i]).find("label").css("color","#838C95")
    		}
    		$(this).parent().css("background","#1E70E9")
    		$(this).parent().find("img").show()
    		$(this).parent().find("label").css("color","#fff")
    		aad1(id)
    		
	})
	
	function aad1(id){
		commonHttpService.httpRequest("post","/jxsd/index/getChildIndex",httpData(phoneName,"jxsd",connectingCode,id).findChild(),findChildFunc)
	}
	
		
	function findChildFunc(data){
		console.log(data)
		$scope.lessonList1 = data.data

//		if($scope.lessonList1.length>0){
			$(".zbCenterLeft2").show()
//		}
	}
	//第三级
	$(".zbCenterLeft").on("click",".twoCheckLabel",function(){
		    dataType = "2"
			
			$(".zbCenterLeft4").hide()
			fatherId = $(this).attr("dataId")
			zhibiaoId = $(this).attr("dataId")
			var id = $(this).attr("dataId")
    		var gcCheckList = $(".gcCheck1");
    		for(var i=0;i<gcCheckList.length;i++){
    			$(gcCheckList[i]).css("background","#fff")
    			$(gcCheckList[i]).find("img").hide()
    			$(gcCheckList[i]).find("label").css("color","#838C95")
    		}
    		$(this).parent().css("background","#1E70E9")
    		$(this).parent().find("img").show()
    		$(this).parent().find("label").css("color","#fff")
    		aad2(id)
	})
	
	function aad2(id){
		commonHttpService.httpRequest("post","/jxsd/index/getChildIndex",httpData(phoneName,"jxsd",connectingCode,id).findChild(),findChild2Func)
	}
	
	function findChild2Func(data){
		console.log(data)
		if(data.data.length == 0){
	
			$(".zbCenterLeft3").show()
			$(".zbRight").hide()
			$scope.lessonList2 = data.data

		}
		for(var i=0;i<data.data.length;i++){
			if((data.data[0].options =="" || data.data[0].options ==null) && data.data[0].name !=""){
				if(data.data.length>0){
					$(".zbCenterLeft3").show()
					$(".zbRight").hide()
					$scope.lessonList2 = data.data
				}
				console.log(2)
			}else if(data.data[0].options !="" && data.data[0].options !=null && data.data[0].options !=undefined){
				$(".zbRight").show()
				$(".zbCenterLeft3").hide()
				$scope.lessonList3 = data.data
				console.log(12)
			}
		}
	
	}

	//第四级
	$(".zbCenterLeft").on("click",".threeCheckLabel",function(){
//		console.log(this)
			dataType = "3"
			var id = $(this).attr("dataId")
			fatherId = $(this).attr("dataId")
			zhibiaoId = $(this).attr("dataId")
    		var gcCheckList = $(".gcCheck2");
    		for(var i=0;i<gcCheckList.length;i++){
    			$(gcCheckList[i]).css("background","#fff")
    			$(gcCheckList[i]).find("img").hide()
    			$(gcCheckList[i]).find("label").css("color","#838C95")
    		}
    		$(this).parent().css("background","#1E70E9")
    		$(this).parent().find("img").show()
    		$(this).parent().find("label").css("color","#fff")
    		commonHttpService.httpRequest("post","/jxsd/index/getChildIndex",httpData(phoneName,"jxsd",connectingCode,id).findChild(),findChild3Func)
	})
	
	function findChild3Func(data){
		console.log(data)
		$scope.lessonList3 = data.data
		$(".zbRight").show()
		for(var i=0;i<data.data.length;i++){
			if((data.data[0].options =="" || data.data[0].options ==null) && data.data[0].name !=""){
				if(data.data.length>0){
//					$(".zbCenterLeft4").show()
					$(".zbRight").show()
					$scope.lessonList4 = data.data
				}
				
				console.log(2)
			}else if(data.data[0].options !="" && data.data[0].options !=null && data.data[0].options !=undefined){
				$(".zbRight").show()
				$(".zbCenterLeft4").hide()
				$scope.lessonList3 = data.data
				console.log(12)
			}
		}		
//		if($scope.lessonList3.length>0){
//			$(".zbRight").show()
//		}		
	}
	
	
	$(".zbCenterLeft").on("click",".fouthCheckLabel",function(){
//		console.log(this)
			dataType = "4"
			var id = $(this).attr("dataId")
			fatherId = $(this).attr("dataId")
			zhibiaoId = $(this).attr("dataId")
    		var gcCheckList = $(".gcCheck4");
    		for(var i=0;i<gcCheckList.length;i++){
    			$(gcCheckList[i]).css("background","#fff")
    			$(gcCheckList[i]).find("img").hide()
    			$(gcCheckList[i]).find("label").css("color","#838C95")
    		}
    		$(this).parent().css("background","#1E70E9")
    		$(this).parent().find("img").show()
    		$(this).parent().find("label").css("color","#fff")
    		commonHttpService.httpRequest("post","/jxsd/index/getChildIndex",httpData(phoneName,"jxsd",connectingCode,id).findChild(),findChild4Func)
	})
	
	function findChild4Func(data){
		$scope.lessonList3 = data.data
		$(".zbRight").show()
	}
	
	var detaB;
	var detaA;
	var detaC;
	var detaD;
	var detaE;
	var detaG;
	//消除angluar和jq报错
	function init(){
		layui.use(['layer', 'form'], function(){
		  var layer = layui.layer
		  var form = layui.form;
			form.on('radio(rew)', function(data){
			  console.log(data.value); //被点击的radio的value值
			  sh = data.value
			}); 
			form.on('radio(rew2)', function(data){
			  console.log(data.value); //被点击的radio的value值
			  sh1 = data.value
			}); 			
			form.on('checkbox(rew1)', function(data){
			  console.log(data.value); //被点击的radio的value值
			  wx = data.value
			});	
			form.on('radio(rew3)', function(data){
			  console.log(data.value); //被点击的radio的value值
			  wx1 = data.value
			});	
			//修改指标二级
			$scope.detail = function(event,value1,value2,value3){
				$scope.gfds = value1
				$scope.value2 = value2
			    sh1 = value2
			    wx1 = value3
				console.log(value1)
				console.log(value2)
				console.log(value3)
				detaB = layer.open({
				  type: 1,
				  title: false,
				  closeBtn: 2,
				  area: ['640px', '590px'],
				  scrollbar: false,
				  shadeClose: true,
				  skin: 'layui-layer-lan',
				  content: $('#zbglDailog')
				});

				$("input[title='"+value2+"']").attr('checked','checked');
				$("input[title='"+value3+"']").attr('checked','checked');
				form.render()

				$scope.rightDd = function(){
					console.log(sh1)
					console.log(wx1)
					commonHttpService.httpRequest("post","/jxsd/index/updateByPrimaryKey",httpData(phoneName,"jxsd",connectingCode,periodCodeshh,subjectCodeshh,lessonCodeshh,"2",$scope.gfds,fatherId,evaluationSystemId,sh1,wx1).addDetai2(),reDetailFunc)
					layer.close(detaB);
				}
			}				
		});
		
		function reDetailFunc(data){
			console.log(data)
		}
//		//修改指标二级
//		$scope.detail = function(event,value1,value2,value3){
//			$scope.gfds = value1
//			$scope.value2 = value2
//
//			console.log(value1)
//			console.log(value2)
//			console.log(value3)
//			detaB = layer.open({
//			  type: 1,
//			  title: false,
//			  closeBtn: 2,
//			  area: ['640px', '590px'],
//			  scrollbar: false,
//			  shadeClose: true,
//			  skin: 'layui-layer-lan',
//			  content: $('#zbglDailog')
//			});
//			var selects = document.getElementsByName("sex");
//		    for (var i=0; i<selects.length; i++){
//		        if (selects[i].value==value2) {
//			    	selects[i].checked= true;
//			     	break;
//			    }
//			 }
//		    $("input[name='sex']").eq(3).attr("checked","checked");
//			$("input[title='"+value2+"']").attr('checked','checked');
//			$("input[title='主题聚焦']").attr('checked','checked');
//			form.render()
//
//			
//			$scope.rightDd = function(){
//				
//				layer.close(detaB);
//			}
//		}	
		
		
		
		//修改指标
		$scope.detail2 = function(event,value1){
			$scope.tmg = value1
			detaF = layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 2,
			  area: ['640px', '590px'],
			  scrollbar: false,
			  shadeClose: true,
			  skin: 'layui-layer-lan',
			  content: $('#zbglDailog4')
			});
		}	

		$scope.dcheckBtn = function(){
			console.log("111"+fatherId)
			console.log("222"+evaluationSystemId)
			commonHttpService.httpRequest("post","/jxsd/index/updateByPrimaryKey",httpData(phoneName,"jxsd",connectingCode,periodCodeshh,subjectCodeshh,lessonCodeshh,"1",$scope.tmg,fatherId,evaluationSystemId).addDetail(),click1Func)
			layer.close(detaF);
			
		}
		
		function click1Func(data){
			console.log(data)
			aad()
		}

		function add1Func(data){
			if(dataType == "1"){
				aad()
			}else if(dataType == "2"){
				aad2(zhibiaoId)
			}			
		}

		function add2Func(data){
			console.log(zhibiaoId)
			aad1(zhibiaoId)
			console.log(data)
		}		
		$scope.detailBtn2 = function(){
			layer.close(detaA);
			layer.close(detaB);
			layer.close(detaC);
			layer.close(detaD);
			layer.close(detaE);
			layer.close(detaF);
			layer.close(detaG);
		}

		$scope.detailBtn11 = function(){
			layer.close(detaA);
		}
		$scope.detailBtn22 = function(){
			layer.close(detaA);
		}
		//新增指标信息
		$scope.observeBtn1 = function(){
			commonHttpService.httpRequest("post","/jxsd/evaluationSystem/insert",httpData(phoneName,"jxsd",connectingCode,$scope.selectName1,$scope.selectName2,$scope.selectName3,$scope.objectName4).insert(),insertFunc)
		}
		$scope.observeBtn2 = function(){
			layer.close(detaC);
		}
		//新增指标
		$scope.addFuc = function(){
			detaA = layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 2,
			  area: ['520px', '450px'],
			  scrollbar: false,
			  shadeClose: true,
			  skin: 'layui-layer-lan',
			  content: $('#zbglDailog1')
			});
			//新增指标
			$scope.detailBtn1a = function(){
				console.log(sh)
				commonHttpService.httpRequest("post","/jxsd/index/insert",httpData(phoneName,"jxsd",connectingCode,periodCodeshh,subjectCodeshh,lessonCodeshh,"2",$scope.twoName,fatherId,evaluationSystemId,sh,wx).add2(),add2Func)
				layer.close(detaA);
			}			
			
		}
		
		
		
		$scope.addFuc2 = function(){
			detaE = layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 2,
			  area: ['520px', '450px'],
			  scrollbar: false,
			  shadeClose: true,
			  skin: 'layui-layer-lan',
			  content: $('#zbglDailog5')
			});
							
			//新增指标
			$scope.detailBtn1 = function(){
				
				commonHttpService.httpRequest("post","/jxsd/index/insert",httpData(phoneName,"jxsd",connectingCode,periodCodeshh,subjectCodeshh,lessonCodeshh,"1",$scope.oneName,fatherId,evaluationSystemId,).add1(),add1Func)
				layer.close(detaE);
			}			
		}		
			
			//新增选项
		
		$scope.addFuc1 = function(){
			detaD = layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 2,
			  area: ['520px', '450px'],
			  scrollbar: false,
			  shadeClose: true,
			  skin: 'layui-layer-lan',
			  content: $('#zbglDailog3')
			});
			
			$scope.detailBtnClose = function(){
				commonHttpService.httpRequest("post","/jxsd/index/insert",httpData(phoneName,"jxsd",connectingCode,periodCodeshh,subjectCodeshh,lessonCodeshh,"1",$scope.score,fatherId,evaluationSystemId,$scope.asgf).add3(),rightFunc)
				layer.close(detaD);
			}
		}		
		
		function rightFunc(data){
			console.log(data)
		}
		
		//新增观测体系
		$scope.addObserve = function(){
			console.log(4)
			detaC = layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 2,
			  area: ['520px', '450px'],
			  scrollbar: false,
			  shadeClose: true,
			  skin: 'layui-layer-lan',
			  content: $('#zbglDailog2')
			});			
		}
		
		function insertFunc(data){
			console.log(data)
			if(data.status=="1"){
				layer.msg('添加成功');
				layer.close(detaC);
			}else{
				layer.msg('添加失败，请正确选择');
			}
		}
    //右边编辑
    
	$scope.rightUpBtn = function(value1,value2){
		console.log(value1)
		console.log(value2)
		$scope.loas = value1
		$scope.loasScore = value2
		detaG = layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 2,
		  area: ['520px', '450px'],
		  scrollbar: false,
		  shadeClose: true,
		  skin: 'layui-layer-lan',
		  content: $('#zbglDailog6')
		});		
		$scope.detailBtnDeta = function(){
			console.log(2)
			layer.close(detaG);
		}		
	}
	
	
	
		
	}	
	$timeout(init, 0); 
	
	//获取课型
	$scope.lessonType = function(){
		console.log(3)
		commonHttpService.httpRequest("post","/jxsd/baseInfo/getLesson",httpData(phoneName,"jxsd",connectingCode,$scope.selectName1,$scope.selectName2).lessonType(),lessonTypeFunc)
	}

	function lessonTypeFunc(data){
		console.log(data)
		$scope.lessonList = data.data;
	}
	
	//测试新增指标
	$scope.checkMethod = function(){
		console.log($scope.optionSele)
	}
	
	$("input[name='optionSele']").on("change",function(){
	    var radio = document.getElementsByName("optionSele"); 
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) { 
				if(radio[i].value == "1"){
					$(".zbRadio2").show()
					$(".zbRadio1").hide()
				}else{
					$(".zbRadio1").show()
					$(".zbRadio2").hide()
				}
	        }  
	    } 

	})
	
	$("#asop").on("change","input[name='fiveCheck2']",function(){
		var fiveChecktList = $(".fiveCheckt")
		for(var i=0;i<fiveChecktList.length;i++){
			$(fiveChecktList[i]).css({"background":"#fff","color":"#666"})
			$(fiveChecktList[i]).find("label").css({"color":"#666"})
			$(fiveChecktList[i]).find("img").hide()
		}
		console.log(3)
	    var radio = document.getElementsByName("fiveCheck2"); 
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) { 
				$("#fiveCheckt"+radio[i].value).parent().css({"background":"rgb(30, 112, 233)","color":"#fff"})
	        	$("#fiveCheckt"+radio[i].value).parent().find("label").css({"color":"#fff"})
	        	$("#fiveCheckt"+radio[i].value).parent().find("img").show()
	        }
	    } 

	})
//	$scope.deleObserve = function(){
//		commonHttpService.httpRequest("post","/jxsd/index/deleteByPrimaryKey",httpData(phoneName,"jxsd",connectingCode,deleId).dele1(),dele1Func)
//	}
	
	function dele1Func(data){
		console.log(data)
		if(data.status == "1"){
			window.location.reload()
		}
	}
	
    //获取radio选中的事
	function getValue(name){  
	    var radio = document.getElementsByName(name); 
	    var str = ""
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) { 
        		str = str + $(radio[i]).attr("dataId") + ","
	        }  
	    } 
	    str = str.substr(0,str.length-1)
	    if(name=="oneCheck"){
	    	
	    }else if(name=="twoCheck"){
	    	
	    }else if(name=="threeCheck"){
	    	
	    }else if(name=="fouthCheck"){
	    	
	    }
		commonHttpService.httpRequest("post","/jxsd/index/disableByPrimaryKey",httpData(phoneName,"jxsd",connectingCode,str).dele1(),dele1Func)	    
	}  
	
	//删除指标
	$scope.zhibiaoDele1 = function(event){
		getValue("oneCheck")

	}
	$scope.zhibiaoDele2 = function(event){
		getValue("twoCheck")

	}
	$scope.zhibiaoDele3 = function(event){
		getValue("threeCheck")

	}	
	$scope.zhibiaoDele4 = function(event){
		getValue("fouthCheck")

	}	
	
	
	function dele1Func(data){
		console.log(data)
		aad()
	}

	$scope.refursh = function(){
		window.location.reload()
	}


//$(function () {
//      	
//
//  var json =
//      [{
//          "name": "语文",
//          "code":"ZKCH",
//          "icon": "1",
//          "child": [
//              {
//                  "name": "高中",
//                  "icon": "2",
//                  "code":"GZZKCH",
//                  "parentCode": "ZKCH",
//                  "child": [
//                      {
//                          "name": "古诗",
//                          "code":"GZZKCHTQFH",
//                          "icon": "",
//                          "parentCode": "GZZKCH",
//                          "child": []
//                      },
//                      {
//                          "name": "古文",
//                          "code":"GZZKCHTQFH111",
//                          "icon": "",
//                          "parentCode": "GZZKCH",
//                          "child": []
//                      }
//                  ]
//              },
//              {
//                  "name": "初中",
//                  "icon": "2",
//                  "code":"BJZKCH",
//                  "parentCode": "ZKCH",
//                  "child": [
//                      {
//                          "name": "古文",
//                          "code":"BJZKCHZCFH",
//                          "icon": "",
//                          "parentCode": "BJZKCH",
//                          "child": []
//                      }
//                  ]
//              }
//          ]
//      }, {
//          "name": "数学",
//          "code":"ZKKJ",
//          "icon": "1",
//          "child": [
//              {
//                  "name": "几何",
//                  "code":"GZZKKJ",
//                  "icon": "2",
//                  "parentCode": "ZKKJ",
//                  "child": [
//                      {
//                          "name": "三角形",
//                          "code":"GZTHZKKJ",
//                          "icon": "",
//                          "parentCode": "GZZKKJ",
//                          "child": []
//                      }
//                  ]
//              }
//          ]
//      },{
//          "name": "英语",
//          "code":"ZKKJ",
//          "icon": "1",
//          "child": [
//             
//          ]
//      }
//      ];
//
//		
//		    function tree(data) {
//		        for (var i = 0; i < data.length; i++) {
//		            var data2 = data[i];
//		            if (data[i].icon == "1") {
//		                $("#rootUL").append("<li data-name='" + data[i].code + "'><span><i class='" + data[i].icon + "'></i> " + data[i].name + "</span></li>");
//		            } else {
//		                var children = $("li[data-name='" + data[i].parentCode + "']").children("ul");
//		                if (children.length == 0) {
//		                    $("li[data-name='" + data[i].parentCode + "']").append("<ul></ul>")
//		                }
//		                $("li[data-name='" + data[i].parentCode + "'] > ul").append(
//		                    "<li data-name='" + data[i].code + "'>" +
//		                    "<span>" +
//		                    "<i class='" + data[i].icon + "'></i> " +
//		                    data[i].name +
//		                    "</span>" +
//		                    "</li>")
//		            }
//		            for (var j = 0; j < data[i].child.length; j++) {
//		                var child = data[i].child[j];
//		                var children = $("li[data-name='" + child.parentCode + "']").children("ul");
//		                if (children.length == 0) {
//		                    $("li[data-name='" + child.parentCode + "']").append("<ul></ul>")
//		                }
//		                $("li[data-name='" + child.parentCode + "'] > ul").append(
//		                    "<li data-name='" + child.code + "'>" +
//		                    "<span>" +
//		                    "<i class='" + child.icon + "'></i> " +
//		                    child.name +
//		                    "</span>" +
//		                    "</li>")
//		                var child2 = data[i].child[j].child;
//		                tree(child2)
//		            }
//		            tree(data[i]);
//		        }
//		
//		    }
//		
//		    tree(json)       	
//      	
//          $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '关闭');
//          
//          
//          $('span').on('click', function (e) {
//	            var spaList = $("span")
//	            for(var i=0;i<spaList.length;i++){
//	            	$(spaList[i]).css({"background":"#fff","color":"#000"})
//	            }
//	            $(this).css({"background":"#1E70E9","color":"#fff"})
//          	
//          	if($(this).parent().attr("class")=="parent_li" ){
//          		
//
//					
//					if($(this).find(" > i").hasClass("1")){
//						$(".1").addClass("treeBg1").removeClass("treeBg11")
//					}
//          		
//	            	if($(this).attr("title")=="展开"){
//	            		console.log(1)
//	            		$(this).css({"background":"#1E70E9","color":"#fff"})
//	            		if($(this).find("i").hasClass("2")){
//	            			$(this).find("i").addClass('treeBg22').removeClass('treeBg2').removeClass('treeBg1')
//	            			$(this).parent().parent().parent().find(" > span").find("i").removeClass('treeBg11').addClass('treeBg1')
//	            		}else{
//	            			$(this).find("i").addClass('treeBg11').removeClass('treeBg1')
//	            			$(this).parent().find(" > ul > li > span > i").addClass('treeBg2').removeClass('treeBg22')
//	            		}
//	            	}else{
//	            		console.log(2)
//	            		$(this).css({"background":"#fff","color":"#000"})
//	            		if($(this).find("i").hasClass("2")){
//	            			$(this).find("i").addClass('treeBg2').removeClass('treeBg11').removeClass('treeBg22')
//	            			$(this).parent().parent().parent().find(" > span").find("i").removeClass('treeBg11').addClass('treeBg1')
//	            		}else{
//	            			$(this).find("i").addClass('treeBg1').removeClass('treeBg11')
//	            			$(this).parent().find(" > ul > li > span > i").addClass('treeBg2').removeClass('treeBg22')
//	            		}
//	            	}
//	            	
//	            	
//	            	
//	            	
//	
//	                var children = $(this).parent('li.parent_li').find(' > ul > li');
//	                if (children.is(":visible")) {
//	                    children.hide('fast');
//	                    $(this).attr('title', '展开')
//	                } else {
//	                    children.show('fast');
//	                    $(this).attr('title', '关闭')
//	                }  
//          		$(".zbCenter").hide()
//          		$(".zbCenterLeft1").hide()
//          		$(".zbCenterLeft2").hide()
//          		$(".zbCenterLeft3").hide()
//          		$(".zbCenterLeft4").hide()
//          		$(".zbRight").hide()
//          	}else{
//          		var lastList = $(this).parent().parent().children().find(" > span");
//          		for(var i=0;i<lastList.length;i++){
//          			$(lastList[i]).css({"background":"#fff","color":"#000"})
//          		}
//          		console.log("23ss")
//          		
//          		if($(this).find(" > i").hasClass("1")){
////          			console.log(4)
//          			$(this).find("i").addClass("treeBg11").remove("treeBg1")
//          		}else{
//          			
//          		}
//          		$(this).css({"background":"#1E70E9","color":"#fff"})
//          		$(".zbCenter").show()
//          		$(".zbCenterLeft1").show()
//          	}
//
//              e.stopPropagation();
//          });
//          var liList = $("span")
//          for(var i=0;i<liList.length;i++){
//          	if(($(liList[i]).find("i").attr("class")=="" || $(liList[i]).find("i").attr("class")==null || $(liList[i]).find("i").attr("class")==undefined) || $(liList[i]).parent().attr("class")!="parent_li"){
//          		
//          	}else{
//          		liList[i].click()
//          	}
//          	
//          }
//          var bg1 = $("#rootUL>li>span>i");
//          for(var i=0;i<bg1.length;i++){
//          	$(bg1[i]).addClass('treeBg1')
//          }
//          var bg2 = $("#rootUL>li>ul>li>span>i");
//          for(var i=0;i<bg2.length;i++){
//          	
//          	$(bg2[i]).addClass('treeBg2')
//          }
//});
}])