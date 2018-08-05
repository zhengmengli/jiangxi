rootApp.controller('cpbgCtr',["$scope","$state","$rootScope","$http","$stateParams","$location","$anchorScroll","cpbgService","httpService","commonHttpService","locals",function ($scope,$state,$rootScope,$http,$stateParams,$location,$anchorScroll,cpbgService,httpService,commonHttpService,locals) {

	var listenTeacherId = $stateParams.listenTeacherId;
	var teachId = $stateParams.teachId;
	var num = $stateParams.num;
	
	if(num=="1"){
		$scope.fontTotal = "听课"
		commonHttpService.httpRequest("post","/jxsd/teach/listenReport",httpData(teachId,phone,'jxsd',connectingCode,listenTeacherId).myListen(),litterScoreFunc);
	}else{
		$scope.fontTotal = "讲课"
		commonHttpService.httpRequest("post","/jxsd/teach/teachReport",httpData(teachId,phone,'jxsd',connectingCode).myTeach(),totalScoreFunc);
	}
	//报告分数myListen
	

	function totalScoreFunc(data){
		//console.log(data)
		if(data.data.totalScore==null || data.data.totalScore=="null"){
			$scope.cpbgTotalScore = 0
		}else{
			$scope.cpbgTotalScore = data.data.totalScore;
		}		
	}
	
	function litterScoreFunc(data){
		//console.log(data)
		if(data.data.totalScore==null || data.data.totalScore=="null"){
			$scope.cpbgTotalScore = 0
		}else{
			$scope.cpbgTotalScore = data.data.totalScore;
		}
		
	}
	
	
	//console.log(num)
	//console.log("yf"+listenTeacherId+"***"+teachId);
	
	var connectingCode = locals.get("connectingCode");
	var phone = locals.get("phone");
	

	
	
	$scope.myTeachData = function(){
		if(num=="1"){
			commonHttpService.httpRequest("post","/jxsd/teach/getMyTeachById",httpData(teachId,phone,'jxsd',connectingCode,listenTeacherId).myListen(),myTeachDataFunc);
		}else{
			commonHttpService.httpRequest("post","/jxsd/teach/getMyTeachById",httpData(teachId,phone,'jxsd',connectingCode).myTeach(),myTeachDataFunc);
		}
		
	}
	
	function myTeachDataFunc(data){
		//console.log(data)
	    $scope.teach = data.data.teach;
//	    $scope.teachListener = data.data.teachListener;
	    var teachListener = data.data.teachListener;
	    var listener =[];
	    if(teachListener==""||teachListener==null||teachListener==undefined){
	    	
	    }else{
		    for(var i=0;i<teachListener.length;i++){
		    	listener.push(teachListener[i].teacherName);
		    }

	    }
	    listener = JSON.stringify(listener);
	    listener = listener.replace("]","");
	    listener = listener.replace("[","");
	    listener = listener.replace(/"/g,"");
	    listener = listener.replace(/"/g,"");

	//    listener = listener.replace(""","");

	    $scope.teachListener = listener;
	    var startDate = $scope.teach.startTime;
	    
	    var val = Date.parse(startDate);
	    var startTime = new Date(val);
	    
	    var endDate = $scope.teach.endTime;
	    var val1 = Date.parse(endDate);
	    var endTime = new Date(val1);
	    
	    var total = endTime.getTime()-startTime.getTime();
	    var hour = total / (60*60*1000);
	    $scope.dataHour = hour +"小时";
	//    $scope hour = Math.floor();
	}
	
	$scope.onReturn = function(){
		$state.go("app.ktgc.main")
	}
	
	
	
	
	
	
	
	
	
	$scope.cpbgfourcycle = function(){
		if(num=="1"){
			commonHttpService.httpRequest("post","/jxsd/totalteachmark/shteachmarkb",httpData(teachId,listenTeacherId).cpbgfourcycle(),cpbgfourcycleFunc);
		}else{
			commonHttpService.httpRequest("post","/jxsd/totalteachmark/shteachmark",httpData(teachId,listenTeacherId).cpbgfourcycle(),cpbgfourcycleFunc);
		}
		
	}
	
	function cpbgfourcycleFunc(data){
		//console.log(data)
	    $scope.list1 = data.data; 
		if($scope.list1==null||$scope.list1==""||$scope.list1==undefined){
		}else{
			 var data = data.data
			 //console.log(data)
			 var score =[];
			 var name =[];
			 var time = [];
			 setTimeout(function(){
				 for(var i = 0;i<data.length;i++){
					 var score =[];
					 var name =[];
					 var time = [];
					var dataD = data[i];
					for(var j=0;j<dataD.indexList.length;j++){
				    	score.push(dataD.indexList[j].score);
				    	name.push(dataD.indexList[j].sh);
				    	time.push(dataD.indexList[j].timeSpan);	
					}
					name=["行","思","学","省"]
					//console.log(score)
					//console.log(time)
//					score=["24","45","13","6"]
//					time=["11","5","32","23"]

					echarts.init($(".echartst"+i).get(0)).setOption(cpbgService.pieEcharts(score,data[i].name,name,score));
					echarts.init($(".echartsd"+i).get(0)).setOption(cpbgService.pieEcharts1(score,data[i].name,name,time));
							
			    }
				 
				setTimeout(function(){
					html2canvas(content, {
				        onrendered: function(canvas) {
				        	//添加属性
				        	canvas.setAttribute('id','thecanvas');
				            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));            
				            $rootScope.img = canvas.toDataURL("image/png")
				            cavasImg = canvas.toDataURL("image/png")
				            cavasImg = cavasImg.split(",")[1]
							$.ajax({
								type:"post",
								url:commonHttpService.http+"/jxsd/fileUpload/upload",
								async:true,
								data:{
									connectingCode:connectingCode,
									imageString:cavasImg,
									teachId:teachId
								},
								dataType:"json",
								success:function(data){
									//console.log(data)
								}
							});
				        }
					});			
				},500)					 
			
			},300)
		}	
	}

	

	
	function httpData(data1,data2,data3,data4,data5){
		return httpDatad={
		   cpbgfivecycle:function(){
				return {
					teachId:data1,
					listenTeacherId:data2,
					classCode:data3
				}	
			},
			   evaluateReport:function(){
					return {
						teachId:data1,
						listenTeacherId:data2,
						classCode:data3
					}	
				},
			cpbgfourcycle:function(){
				return {
					teachId:data1,
					listenTeacherId:data2,
				}
			},
			cpbgn:function(){
				return {
					teachId:data1,
					listenTeacherId:data2,
					optionAttr:data3,
				}
			},
			myTeach:function(){
				return {
					teachId:data1,
					phone:data2,
					appName:data3,
					connectingCode:data4,
				}
			},
			myListen:function(){
				return {					
					teachId:data1,
					phone:data2,
					appName:data3,
					connectingCode:data4,
					listenTeacherId:data5
				}
			},
			rawdata:function(){
				return {
					teachId:data1,
					listenTeacherId:data2,
				}
			},
			canvasImg:function(){
				return {
					connectingCode:data1,
					imageString:data2,
					teachId:data3
				}
			}
		}

	}
	
	//获取行为测评的列表信息
	$scope.rawdata = function(){
		commonHttpService.httpRequest("post","/jxsd/totalteachmark/guance",httpData(teachId,listenTeacherId).rawdata(),rawdataFunc);
	}
	
	function rawdataFunc(data){
		//console.log(data)
	    $scope.navList = data['index'];
		$scope.barList1 = data['sumData'];
//		//console.log($scope.barList1[0][0].children)
		
//	    $scope.arrL =[1,2,1,4,5]
		$scope.barList11 = [
			{
				name1:"课堂导入",
				name2:{
					name21:"复习旧知",
					name22:"预习导入",
					name23:"悬念导入"
				},
				name3:{
					name31:"默读文本",
					name32:"观看课件",
					name33:"听讲",
					name34:"教师提问",
					name35:"回忆旧知",
				},
				name4:{
					name41:"默读能力",
					name42:"辅助行为",
					name43:"学生状态",
					name44:"课件选材",
					name45:"课件设计",
				},
				name5:{
					name51:"思维轨迹",
					name52:"语言艺术",
					name53:"讲解效果",
					name54:"思维轨迹",
					name55:"语言艺术",
					name56:"对话轮数",
					name57:"思维轨迹",
				},
				name6:{
					name61:"1分",
					name62:"0分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"2分",
					name67:"1分",
				}
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"字词讲解",
					name22:"层次划分",
					name23:"内容概括"
				},
				name3:{
					name31:"对比分析",
					name32:"辅助行为",
					name33:"演板",
					name34:"口头回答",
					name35:"演板",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"0分",
					name62:"0分",
					name63:"1分",
					name64:"1分",
					name65:"0分",
					name66:"2分",
					name67:"1分",
				}				
			},			
			{
				name1:"课堂导入",
				name2:{
					name21:"作品语言鉴赏",
					name22:"艺术手法鉴赏",
					name23:"角色形象解析"
				},
				name3:{
					name31:"讨论",
					name32:"学生回答",
					name33:"演板",
					name34:"鉴赏语言",
					name35:"鉴赏手法",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"1分",
					name62:"1分",
					name63:"0分",
					name64:"0分",
					name65:"1分",
					name66:"0分",
					name67:"1分",
				}				
			},						
			{
				name1:"课堂导入",
				name2:{
					name21:"思想感情剖析",
					name22:"社会意义剖析",
					name23:"--"
				},
				name3:{
					name31:"学生解读",
					name32:"--",
					name33:"--",
					name34:"介绍作者",
					name35:"--",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"-1分",
					name62:"0分",
					name63:"2分",
					name64:"-1分",
					name65:"1分",
					name66:"1分",
					name67:"--",
				}				
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"巩固提升",
					name22:"课堂测验",
					name23:"--"
				},
				name3:{
					name31:"学生作答",
					name32:"任务训练",
					name33:"教师理答",
					name34:"回顾",
					name35:"教师出示习题",
				},
				name4:{
					name41:"投入程度",
					name42:"速度",
					name43:"正确率",
					name44:"教师指导",
					name45:"正确率",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"-1分",
					name62:"1分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"2分",
					name67:"--",
				}				
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"设计水平",
					name22:"作业数量",
					name23:"设计水平"
				},
				name3:{
					name31:"--",
					name32:"--",
					name33:"--",
					name34:"--",
					name35:"--",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"1分",
					name62:"0分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"2分",
					name67:"1分",
				}				
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"课堂激励",
					name22:"课堂调控",
					name23:"课前调控"
				},
				name3:{
					name31:"方式",
					name32:"水平",
					name33:"预防",
					name34:"纠偏",
					name35:"反应",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"1分",
					name62:"0分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"2分",
					name67:"1分",
				}				
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"情境类型",
					name22:"借助手段",
					name23:"适切性"
				},
				name3:{
					name31:"--",
					name32:"--",
					name33:"--",
					name34:"--",
					name35:"--",
				},
				name4:{
					name41:"--",
					name42:"--",
					name43:"--",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"1分",
					name62:"0分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"2分",
					name67:"1分",
				}				
			},
			{
				name1:"课堂导入",
				name2:{
					name21:"教室环境",
					name22:"--",
					name23:"--"
				},
				name3:{
					name31:"卫生环境",
					name32:"信息与设备设施环境",
					name33:"文体意识",
					name34:"--",
					name35:"--",
				},
				name4:{
					name41:"空气",
					name42:"光线",
					name43:"噪音",
					name44:"--",
					name45:"--",
				},
				name5:{
					name51:"--",
					name52:"--",
					name53:"--",
					name54:"--",
					name55:"--",
					name56:"--",
					name57:"--",
				},
				name6:{
					name61:"1分",
					name62:"0分",
					name63:"1分",
					name64:"2分",
					name65:"2分",
					name66:"--",
					name67:"--",
				}				
			},
		]

		setTimeout(function(){
			html2canvas(content, {
		        onrendered: function(canvas) {
		        	//添加属性
		        	canvas.setAttribute('id','thecanvas');
		            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));
	//	            
		            $rootScope.img = canvas.toDataURL("image/png")
		            cavasImg = canvas.toDataURL("image/png")
	//	            //console.log(cavasImg)
		            cavasImg = cavasImg.split(",")[1]
	//	            commonHttpService.httpRequest("post","/jxsd/fileUpload/upload",httpData(connectingCode,cavasImg,teachId).canvasImg(),canvasImgFunc)
					$.ajax({
						type:"post",
						url:commonHttpService.http+"/jxsd/fileUpload/upload",
						async:true,
						data:{
							connectingCode:connectingCode,
							imageString:cavasImg,
							teachId:teachId
						},
						dataType:"json",
						success:function(data){
							//console.log(data)
						}
					});
		        }
			});			
		},500)	
		
	}
	
	
		
	/*生成canvas图形*/
	
	// 获取按钮id
	var btnSave2 = document.getElementById("toShare2");
	var btnSave3 = document.getElementById("toShare3");
	// 获取内容id
	var content = document.getElementById("cpbg");
	// 进行canvas生成
	

	btnSave2.onclick = function(){
//		html2canvas(content, {
//	        onrendered: function(canvas) {
//	        	canvas.setAttribute('id','thecanvas');	            
//	            $("#cpbgImg").attr("src",canvas.toDataURL("image/png")); 
//				setTimeout(function(){
//					$(".printImg").wordExport();
//				},300)
//	        }
//		});
		 // 将 id 为 content 的 div 渲染成 canvas
	    html2canvas(document.getElementById("content"), {
	        // 渲染完成时调用，获得 canvas
	        onrendered: function(canvas) {
	            // 从 canvas 提取图片数据
	            var imgData = canvas.toDataURL('image/jpeg');
	            var doc = new jsPDF("p", "mm", "a4");
	            doc.addImage(imgData, 'JPEG', 0, 0,210,297);
	            doc.save('content.pdf');
	        }
	    });
	}
	$(document).ready(function(){
		btnSave3.onclick = function(){
			window.print()
		}
//	    $("#cpbgImg").click(function(){
//	  	
//	  		$(".printImg").printArea();
//	  
//			
//	    });
//		$("#cpbgImg").click(function(event) {
//			$(".printImg").wordExport();
//		});
	})
	//分享这块
	$scope.shareMouse = function(index){
		var shareName;
		switch(index){
			case '1':
			shareName = '分享';
			break;
			case '2':
			shareName = '导出';
			break;
			case '3':
			shareName = '打印';
			break;
		}
		layer.tips(shareName, '.toShare'+(index), {
		  tips: [3, '#3595CC'],
		  time: 1000
		});		
	}
	
	var cavasImg = ""
	$('.toShare1').shareConfig({
		Shade : true, //是否显示遮罩层
		Event:'click', //触发事件
		Content : 'Share', //内容DIV ID
		Title : '我爱分享' ,//显示标题
		TeachId : teachId ,
		Base : cavasImg
		
	});	
	
	setTimeout(function(){
		html2canvas(content, {
	        onrendered: function(canvas) {
	        	//添加属性
	        	canvas.setAttribute('id','thecanvas');
	            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));
//	            
	            $rootScope.img = canvas.toDataURL("image/png")
	            cavasImg = canvas.toDataURL("image/png")
//	            //console.log(cavasImg)
	            cavasImg = cavasImg.split(",")[1]
//	            commonHttpService.httpRequest("post","/jxsd/fileUpload/upload",httpData(connectingCode,cavasImg,teachId).canvasImg(),canvasImgFunc)
				$.ajax({
					type:"post",
					url:commonHttpService.http+"/jxsd/fileUpload/upload",
					async:true,
					data:{
						connectingCode:connectingCode,
						imageString:cavasImg,
						teachId:teachId
					},
					dataType:"json",
					success:function(data){
						//console.log(data)
					}
				});
	        }
		});			
	},500)
	

	
//	$('.toShare1').on("click",function(){
//		
//		html2canvas(content, {
//	        onrendered: function(canvas) {
//	        	//添加属性
//	        	canvas.setAttribute('id','thecanvas');
//	            
//	            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));
//	            //console.log(canvas.toDataURL("image/png"))
//	            $rootScope.img = canvas.toDataURL("image/png")
//	            $state.go("share")
//			}
//		});			
//	})
	
	
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

	$scope.showBg = "cpbgTabb1";
    $scope.show = function (id) {
    	//console.log(id)
    	var ids="cpbgTabb"+id
    	$scope.showBg = ids
        $location.hash(ids);
        $anchorScroll();
    }

	$scope.cpbgTabList = [
		{name:"总计得分",time:"7分27秒",score:"5分"},
		{name:"默读文本",time:"7分27秒",score:"5分"},
		{name:"听讲",time:"7分27秒",score:"5分"},
		{name:"教师提问",time:"7分27秒",score:"5分"},
		{name:"回忆旧知",time:"7分27秒",score:"5分"},
		{name:"讨论",time:"7分27秒",score:"5分"},
		{name:"口头回答",time:"7分27秒",score:"5分"},
		{name:"演板",time:"7分27秒",score:"5分"},
		{name:"组织管理",time:"7分27秒",score:"5分"},
		{name:"综合评价",time:"7分27秒",score:"5分"}
	]

	
	
	
	
	
/********************************************************************************************************************/
	//选择四环五星选项卡
	$scope.cpbgLineWidth = "0px"
		$scope.cpbgnav = "0";
		$scope.cpbgNav = function(e,num){
			$scope.cpbgnav = e;
			$scope.cpbgLineWidth=num*120+"px";
			if($scope.cpbgnav<100){
				$scope.cpbg(e);
			}
			else{
				$scope.cpbgfivecycle(e);
			}
		}
		
		
	//测评报告N段4环
	$scope.cpbg = function(optionAttr){
		if(num=="1"){
			$http.post(commonHttpService.http + "/jxsd/index/collect/report/getReport",httpData(teachId,listenTeacherId,optionAttr).cpbgn()).success(function(result) { 
				cpbgnFunc(result) 
			});
		}else{
			$http.post(commonHttpService.http + "/jxsd/index/collect/report/getReport",httpData(teachId,0,optionAttr).cpbgn()).success(function(result) { 
				cpbgnFunc(result) 
			});
		}
	}
	
	function cpbgnFunc(data){
		var echarts1 = document.getElementsByClassName("echarts1")[0];
		var echartsOp1 = echarts.init(echarts1);
		echartsOp1.clear();
	    $scope.list = data.data; 
		if($scope.list==null||$scope.list==""||$scope.list==undefined){
		}else{
			 var data = data.data;
			 var score =[];
			 var name =[];
			 var time = [];
			 for(var i = 0;i<data.length;i++){
		    	score.push(data[i].sumScore);
		    	name.push(data[i].indexName);
		    	time.push(data[i].spandTime);
		    }
		    
			echartsOp1.setOption(cpbgService.echartsOption1(score,name,time));
		}
		
		/*
		setTimeout(function(){
			html2canvas(content, {
		        onrendered: function(canvas) {
		        	//添加属性
		        	canvas.setAttribute('id','thecanvas');
		            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));
		            $rootScope.img = canvas.toDataURL("image/png")
		            cavasImg = canvas.toDataURL("image/png")
		            cavasImg = cavasImg.split(",")[1]
					$.ajax({
						type:"post",
						url:commonHttpService.http+"/jxsd/fileUpload/upload",
						async:true,
						data:{
							connectingCode:connectingCode,
							imageString:cavasImg,
							teachId:teachId
						},
						dataType:"json",
						success:function(data){
							
						}
					});
		        }
			});			
		},500)
		*/
	}
	
	
	//测评报告五星
	$scope.cpbgfivecycle = function(classCode){
		if(num=="1"){
			$http.post(commonHttpService.http + "/jxsd/index/gc/getWuXing",httpData(teachId,listenTeacherId,classCode).cpbgfivecycle()).success(function(result) { 
				cpbgfivecycleFuncPi(result) 
			});
		}else{
			$http.post(commonHttpService.http + "/jxsd/index/gc/getWuXing",httpData(teachId,0,classCode).cpbgfivecycle()).success(function(result) { 
				cpbgfivecycleFuncPi(result) 
			});
		}
	}
	
	/**
	 * 雷达图（不要了）
	 */
	function cpbgfivecycleFunc(data){
		var echarts1 = document.getElementsByClassName("echarts1")[0];
		 var echartsOp1 = echarts.init(echarts1);	
		 echartsOp1.clear();
	    $scope.list = data.data;
		if($scope.list==""||$scope.list==null||$scope.list==undefined){
		}else{
			 var data = data.data;
		     var score =[];
		     var name =[];
		     var wxArr =[];
		     var indicator=[];
		     for(var i = 0;i<data.length;i++){
		    	score.push(data[i].sumScore);
		    	name.push(data[i].avgScore);
		    	wxArr.push(data[i].indexName);
		    	var indicatorItem={
		    			name:data[i].indexName,
		    			max:20
		    	}
		    	indicator.push(indicatorItem)
		     }
		     echartsOp1.setOption(cpbgService.leidaEcharts(score,name,wxArr,indicator));
		}
		/*
		setTimeout(function(){
			html2canvas(content, {
		        onrendered: function(canvas) {
		        	//添加属性
		        	canvas.setAttribute('id','thecanvas');
		            $("#cpbgImg").attr("src",canvas.toDataURL("image/png"));
		            $rootScope.img = canvas.toDataURL("image/png")
		            cavasImg = canvas.toDataURL("image/png")
		            cavasImg = cavasImg.split(",")[1]
					$.ajax({
						type:"post",
						url:commonHttpService.http+"/jxsd/fileUpload/upload",
						async:true,
						data:{
							connectingCode:connectingCode,
							imageString:cavasImg,
							teachId:teachId
						},
						dataType:"json",
						success:function(data){
							//console.log(data)
						}
					});
		        }
			});			
		},500)	
		*/	
	}
	
	/**
	 * 测评报告五星饼图
	 */
	function cpbgfivecycleFuncPi(data){
		var echarts1 = document.getElementsByClassName("echarts1")[0];
		 var echartsOp1 = echarts.init(echarts1);	
		 echartsOp1.clear();
	    $scope.list = data.data;
		if($scope.list==""||$scope.list==null||$scope.list==undefined){
		}else{
			 var data = data.data;
		     var name =[];
		     var sumScoreData=[];
		     var avgScoreData=[];
		     for(var i = 0;i<data.length;i++){
		    	 name.push(data[i].indexName);
		    	var sumScore={
		    			value:data[i].sumScore,
		    			name:data[i].indexName
		    	}
		    	var avgScore={
		    			value:data[i].avgScore,
		    			name:data[i].indexName
		    	}
		    	sumScoreData.push(sumScore)
		    	avgScoreData.push(avgScore)
		     }
		     echartsOp1.setOption(cpbgService.pieEcharts(name,sumScoreData,avgScoreData));
		}	
	}
	
	/** *******************************************************评价报告********************************************************** */
	// 点击评价报告选项卡
	$scope.evaluateReportNav = function(e, num) {
		$scope.evaluateReportCode = e;
		$scope.cpbgLineWidth = num * 120 + "px";
		$scope.selectEvaluateReport(e);
	}
	//显示评价报告
	$scope.selectEvaluateReport = function(classCode){
		if(num=="1"){
			$http.post(commonHttpService.http + "/jxsd/index/pj/getPjReport",httpData(teachId,listenTeacherId,classCode).evaluateReport()).success(function(result) { 
				evaluateReportBar(result) 
			});
		}else{
			$http.post(commonHttpService.http + "/jxsd/index/pj/getPjReport",httpData(teachId,0,classCode).evaluateReport()).success(function(result) { 
				evaluateReportBar(result) 
			});
		}
	}
	/**
	 * 评价报告饼图
	 */
//	function evaluateReportBar(data){
//		var echarts1 = document.getElementsByClassName("echarts1")[0];
//		 var echartsOp1 = echarts.init(echarts1);	
//		 echartsOp1.clear();
//	    $scope.list = data.data;
//		if($scope.list==""||$scope.list==null||$scope.list==undefined){
//		}else{
//			 var data = data.data;
//			 console.log(data);
//		     var name =[];
//		     var sumScoreData=[];
//		     var avgScoreData=[];
//		     var sumScoreTotal=0;
//		     var avgScoreTotal=0;
//		     for(var i = 0;i<data.length;i++){
//		    	 name.push(data[i].indexName);
//		    	var sumScore={
//		    			value:data[i].sumScore,
//		    			name:data[i].indexName
//		    	}
//		    	var avgScore={
//		    			value:data[i].avgScore,
//		    			name:data[i].indexName
//		    	}
//		    	sumScoreData.push(sumScore)
//		    	avgScoreData.push(avgScore)
//		    	sumScoreTotal+=data[i].sumScore;
//		    	avgScoreTotal+=data[i].avgScore;
//		     }
//		     
//		     var titleText="指标总分合计："+sumScoreTotal+"    指标平均分合计："+avgScoreTotal;
//		     echartsOp1.setOption(cpbgService.pieEcharts(name,sumScoreData,avgScoreData,titleText));
//		}	
//	}
	function evaluateReportBar(data){
		var echarts1 = document.getElementsByClassName("echarts1")[0];
		var echartsOp1 = echarts.init(echarts1);	
		echartsOp1.clear();
		 $scope.list = data.data;
		 if($scope.list==""||$scope.list==null||$scope.list==undefined){
		 }else{
			 var data = data.data;
			 var name =[];
			 var sumScoreData=[];
			 var avgScoreData=[];
		     var indicator=[];
			 for(var i = 0;i<data.length;i++){
				 name.push(data[i].indexName);
				 sumScoreData.push(data[i].sumScore);
				// avgScoreData.push(data[i].avgScore);
				 var indicatorItem={
			    			name:data[i].indexName,
			    			max:250000
			    	}
				 indicator.push(indicatorItem)
			 }
			 echartsOp1.setOption(cpbgService.leidaEcharts(sumScoreData,avgScoreData,name,indicator));
		 }
	}
	
	
}])

