rootApp.controller('pjbgCtr1',["$scope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,httpService,commonHttpService,locals) {
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
		{name:"讲课老师",trImg:false,width:'10%'},
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
			commonHttpService.httpRequest("post","/jxsd/totallistenscore/myTeachscore",httpData($scope.errorPage,'5').pjbg(),pjDataFunc)			
		}else{
			var jsonData = JSON.parse($stateParams.teachId)		    
			commonHttpService.httpRequest("post","/jxsd/totallistenscore/myTeachscore",httpData($scope.errorPage,'5',jsonData.value1,jsonData.value2,jsonData.value3,jsonData.value4,jsonData.value5,jsonData.value6,jsonData.value7).pjbg(),pjDataFunc)
					
		}

	}
	
	 function pjDataFunc(data){
	    	console.log(data);
	    	$scope.tbodyList = data.data.list;
	    	for(var i=0;i<$scope.tbodyList.length;i++){
	    		console.log($scope.tbodyList[i].listenLs)
	    		var arrList=[]
	    		var arr = $scope.tbodyList[i].listenLs.split(",")
	    		var arr1 = $scope.tbodyList[i].listenTeacherId.toString().split(",")
	    		var arr2 = $scope.tbodyList[i].listenScore.toString().split(",")
	    		for(var j=0;j<arr.length;j++){
	    			arrList.push({name:arr[j],id:arr1[j],score:arr2[j]})
	    		}
	    		$scope.tbodyList[i].arr = arrList
	    	}
	    	console.log(arrList)
	    	console.log($scope.tbodyList)
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
	$scope.selUpDailogCheck3 = false
	$scope.selUpDailogCheck4 = false
	$scope.selUpDailogCheck5 = false
	$scope.selUpDailogCheck6 = false
	$scope.boxShow = function(event,value){
		if(event.target.nodeName=="TD" || event.target.nodeName=="SPAN"){
			if(value == 1){
				$scope.selUpDailog2 = !$scope.selUpDailog2
	//			console.log("$scope.selUpDailog"+(value+1))
	//			$scope.selUpDailog2 = 
				$scope.selUpDailog7 = false
				$scope.selUpDailog3 = false
				$scope.selUpDailog4 = false
				$scope.selUpDailog5 = false
				$scope.selUpDailogCheck1 = true
				$scope.selUpDailogCheck2 = false
				$scope.selUpDailogCheck3 = false
				$scope.selUpDailogCheck4 = false
				$scope.selUpDailogCheck5 = false
			}else if(value == 2){
				
				$scope.selUpDailog3 = !$scope.selUpDailog3
				$scope.selUpDailog2 = false
				$scope.selUpDailog7 = false
				$scope.selUpDailog4 = false
				$scope.selUpDailog5 = false
				$scope.selUpDailogCheck1 = false
				$scope.selUpDailogCheck2 = false
				$scope.selUpDailogCheck3 = true
				$scope.selUpDailogCheck4 = false
				$scope.selUpDailogCheck5 = false
			}else if(value == 3){
				
				$scope.selUpDailog4 = !$scope.selUpDailog4
				$scope.selUpDailog2 = false
				$scope.selUpDailog7 = false
				$scope.selUpDailog3 = false
				$scope.selUpDailog5 = false
				$scope.selUpDailogCheck1 = false
				$scope.selUpDailogCheck2 = false
				$scope.selUpDailogCheck3 = false
				$scope.selUpDailogCheck4 = true
				$scope.selUpDailogCheck5 = false
			}else if(value == 4){
				
				$scope.selUpDailog5 = !$scope.selUpDailog5
				$scope.selUpDailog2 = false
				$scope.selUpDailog7 = false
				$scope.selUpDailog3 = false
				$scope.selUpDailog4 = false
				$scope.selUpDailogCheck1 = false
				$scope.selUpDailogCheck2 = false
				$scope.selUpDailogCheck3 = false
				$scope.selUpDailogCheck4 = false
				$scope.selUpDailogCheck5 = true
			}else if(value == 6){
				
				$scope.selUpDailog7 = !$scope.selUpDailog7
				$scope.selUpDailog2 = false
				$scope.selUpDailog3 = false
				$scope.selUpDailog4 = false
				$scope.selUpDailog5 = false
				$scope.selUpDailogCheck1 = false
				$scope.selUpDailogCheck2 = true
				$scope.selUpDailogCheck3 = false
				$scope.selUpDailogCheck4 = false
				$scope.selUpDailogCheck5 = false
			}else{
				$scope.selUpDailog7 = false
				$scope.selUpDailog2 = false
				$scope.selUpDailog3 = false
				$scope.selUpDailog4 = false
				$scope.selUpDailog5 = false
				$scope.selUpDailogCheck1 = false
				$scope.selUpDailogCheck2 = false
				$scope.selUpDailogCheck3 = false
				$scope.selUpDailogCheck4 = false
				$scope.selUpDailogCheck5 = false
			}			
		}

	}
	
	$scope.mouseDailog = function(id){
//		console.log(id)
		layer.tips('查看报告', '.imgD'+(id+1), {
		  tips: [3, '#3595CC'],
		  time: 1000
		});
	}
	
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9){
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
					district_code:data2
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
					teachTime:data8,
					teachId:data9
				}	
			}
		}

	}
	
	$scope.errorPage = 1;
//	$scope.pageCountError = 6;
	
//	$(".pjbgFooter").height((window.screen.height-$(".pjbg table").height()-210)+"px")
	
	
	//显示听课老师列表
	$scope.toCpbg = function(index,teachId,listenTeacherId){
		if($(".selUpDailogCheckt"+index).css("display")=="block"){
			$(".selUpDailogCheckt"+index).hide()
			return false
		}			
		var listr = $(".selUpDailogCheck");
		for(var i=0;i<listr.length;i++){
			$(listr[i]).hide()
		}
	
		$(".selUpDailogCheckt"+index).show()

//		$scope["selUpDailogCheckt"+index] = !$scope["selUpDailogCheckt"+index]
		console.log(teachId+"*****"+listenTeacherId);
		$scope.comeIn = function(value1,value2,value3){
			$state.go("app.ktgc.cpbg",{teachId:value1,listenTeacherId:value2,num:value3})			
		}

	}
	
	var province_data = ""
	var city_data = ""
	var area_data = ""
	var district_code = ""
	 //查询省联动
	$scope.provinceList = []
	commonHttpService.httpRequest("post","/jxsd/baseInfo/getProvince",httpData("jxsd").province(),provinceFunc)


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
    	$(".tdSpan1").html(province_data+"-"+city_data+"-"+area_data)
    	$scope.selUpDailog2 = false
    	$scope.showHide = false
    	$scope.showHide1 = false
    	console.log(province_data+"-"+city_data+"-"+area_data)
    	commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",district_code).school(),schoolFunc)
    }
	
	//获取学校
	
	function schoolFunc(data){
		console.log(data)
		$scope.schoolData = data.data;
	}
	
	//关闭
	$scope.btnClick6 = function(event,value){
		console.log(event)
		$scope.selUpDailog7 = false;
		$(".tdSpan"+value).text(event.target.innerHTML)
	}
	
	$scope.btnClick3 = function(event,value){
		console.log(event)
		$scope.selUpDailog3 = false;
		$(".tdSpan"+value).text(event.target.innerHTML)
	}
	$scope.btnClick4 = function(event,value){
		console.log(event)
		$scope.selUpDailog4 = false;
		$(".tdSpan"+value).text(event.target.innerHTML)
	}
	$scope.btnClick5 = function(event,value){
		console.log(event)
		$scope.selUpDailog5 = false;
		$(".tdSpan"+value).text(event.target.innerHTML)
	}	
	//	学科
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
}])