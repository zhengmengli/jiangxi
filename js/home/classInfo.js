rootApp.controller('classInfoCtr',["$scope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,httpService,commonHttpService,locals) {
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");
	var periodCode;
	var gradeCode;
	var classCode;
	var total;
	var male;
	var female;
	var siteStyle;
	var id;

	$scope.infor = [];
	$scope.currSeatStyle={'name':'','src':'','id':''};
	$scope.show="none";
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11){
		return httpDatad={			
			classInfoList:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3
				}					
			},			
			updateClassInfo:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3,
					id:$scope.myClassSelected.id,
					periodCode:$scope.myClassSelected.periodCode,
					gradeCode:$scope.myClassSelected.gradeCode,
					classCode:$scope.myClassSelected.classCode,
					total:$scope.myClassSelected.total,
					male:$scope.myClassSelected.male,
					female:$scope.myClassSelected.female,
					//siteStyle:$scope.myClassSelected.siteStyle
					siteStyle:$scope.currSeatStyle.id
				}					
			},		
			insertClassInfo:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3,
					periodCode:periodCode,
					gradeCode:gradeCode,
					classCode:classCode,
					total:total,
					male:male,
					female:female,
					siteStyle:$scope.currSeatStyle.id
				}					
			},		
			delClassInfo:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3,
					id:$scope.myClassSelected.id
				}
			}
		}
	}		    
	function page(){
	    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectClassInfo",httpData(phoneName,connectingCode,"jxsd").classInfoList(),classInfoListCallback)	
	}

	page();
	$("#editSeat>div").click(function(){
		$("#editSeat>div").css("borderColor","#F0F1F1");
		$(this).css("borderColor","#1E70E9");
	})
	$("#addSeat>div").click(function(){
		$("#addSeat>div").css("borderColor","#F0F1F1");
		$(this).css("borderColor","#1E70E9");
	})
    function classInfoListCallback(data){
    	console.log(data.data)
    	$scope.infor = data.data;
		$scope.myClassSelected = $scope.infor[0];
		if(data.data.length == 0||data.data[0].siteStyle == null){
			$scope.currSeatStyle.name='暂无座位形式';
			$scope.currSeatStyle.src='img/new/zhanwu.png';
			$scope.currSeatStyle.id='8';			
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
		if(data.data[0].siteStyle == '7'){
			$scope.currSeatStyle.name='其他';
			$scope.currSeatStyle.src='img/new/desk7.png';
			$scope.currSeatStyle.id='7';
		      }
		
    }

	$scope.updSeatStyle= function(id){
		if(id == '1'){
			$scope.currSeatStyle.name='单人单桌式';
			$scope.currSeatStyle.src='img/new/desk1.png';
			$scope.currSeatStyle.id='1';
	    }
		if(id == '2'){
			$scope.currSeatStyle.name='剧院式';
			$scope.currSeatStyle.src='img/new/desk2.png';
			$scope.currSeatStyle.id='2';
		      }
		if(id == '3'){
			$scope.currSeatStyle.name='马蹄式';
			$scope.currSeatStyle.src='img/new/desk3.png';
			$scope.currSeatStyle.id='3';
		      }
		if(id == '4'){
			$scope.currSeatStyle.name='四方式';
			$scope.currSeatStyle.src='img/new/desk4.png';
			$scope.currSeatStyle.id='4';
		      }
		if(id == '5'){
			$scope.currSeatStyle.name='小组式';
			$scope.currSeatStyle.src='img/new/desk5.png';
			$scope.currSeatStyle.id='5';
		      }
		if(id == '6'){
			$scope.currSeatStyle.name='圆圈式';
			$scope.currSeatStyle.src='img/new/desk6.png';
			$scope.currSeatStyle.id='6';
		      }
		if(id == '7'){
			$scope.currSeatStyle.name='其他';
			$scope.currSeatStyle.src='img/new/desk7.png';
			$scope.currSeatStyle.id='7';
		      }
	}
	
	$scope.addSeatStyle= function(id){
		if(id == '1'){
			$scope.currSeatStyle.name='单人单桌式';
			$scope.currSeatStyle.src='img/new/desk1.png';
			$scope.currSeatStyle.id='1';
	    }
		if(id == '2'){
			$scope.currSeatStyle.name='剧院式';
			$scope.currSeatStyle.src='img/new/desk2.png';
			$scope.currSeatStyle.id='2';
		      }
		if(id == '3'){
			$scope.currSeatStyle.name='马蹄式';
			$scope.currSeatStyle.src='img/new/desk3.png';
			$scope.currSeatStyle.id='3';
		      }
		if(id == '4'){
			$scope.currSeatStyle.name='四方式';
			$scope.currSeatStyle.src='img/new/desk4.png';
			$scope.currSeatStyle.id='4';
		      }
		if(id == '5'){
			$scope.currSeatStyle.name='小组式';
			$scope.currSeatStyle.src='img/new/desk5.png';
			$scope.currSeatStyle.id='5';
		      }
		if(id == '6'){
			$scope.currSeatStyle.name='圆圈式';
			$scope.currSeatStyle.src='img/new/desk6.png';
			$scope.currSeatStyle.id='6';
		      }
		if(id == '7'){
			$scope.currSeatStyle.name='其他';
			$scope.currSeatStyle.src='img/new/desk7.png';
			$scope.currSeatStyle.id='7';
		      }
	}
	
	$scope.closeDetailBtn = function () {
		
		if($scope.myClassSelected == undefined){
			layer.msg('暂无班级信息，请先新增');
		}
		if($.trim($scope.myClassSelected.periodCode) != '' && $.trim($scope.myClassSelected.gradeCode) != '' && $.trim($scope.myClassSelected.classCode) != '' && $.trim($scope.myClassSelected.total) != '' && $.trim($scope.myClassSelected.male) != '' && $.trim($scope.myClassSelected.female) != '' && $scope.currSeatStyle.id != '')
			{
			commonHttpService.httpRequest("post","/jxsd/baseInfo/updateClassInfo",httpData(phoneName,connectingCode,"jxsd").updateClassInfo(),updateclassInfoCallback)	
			layer.close(detaB);
			location.reload();
			//$scope.show="none";
			}
		else {
			layer.msg('请完善所有信息');
		}
		
	}
	function updateclassInfoCallback(data){
		console.log(data)
		if(data.status == '1'){
			layer.msg("编辑成功")		
			}
		else{
			layer.msg("编辑失败")
		}
		location.reload();
		
	}
	
	$scope.closeaddDetailBtn = function () {
		//alert($scope.myClassNew+"99999")
//		if($scope.myClassNew == undefined){
//			periodCode = null;
//			gradeCode = null;
//			classCode = null;
//			total = null;
//			male = null;
//			female = null;
//			//siteStyle = '';
//		}
//		else{
//			periodCode = $scope.myClassNew.periodCode;
//			gradeCode = $scope.myClassNew.gradeCode;
//			classCode = $scope.myClassNew.classCode;
//			total = $scope.myClassNew.total;
//			male = $scope.myClassNew.male;
//			female = $scope.myClassNew.female;
//		//	siteStyle = $scope.currSeatStyle.id;
//		}
		if($scope.myClassNew != undefined && $scope.currSeatStyle != 0){
		if($.trim($scope.myClassNew.periodCode) != '' && $.trim($scope.myClassNew.gradeCode) != '' && $.trim($scope.myClassNew.classCode) != '' && $.trim($scope.myClassNew.total) != '' && $.trim($scope.myClassNew.male) != '' && $.trim($scope.myClassNew.female) != '' && $scope.currSeatStyle.id != '')
		  {
			periodCode = $scope.myClassNew.periodCode;
			gradeCode = $scope.myClassNew.gradeCode;
			console.log(gradeCode);
			classCode = $scope.myClassNew.classCode;
			total = $scope.myClassNew.total;
			male = $scope.myClassNew.male;
     		female = $scope.myClassNew.female;
			siteStyle:$scope.currSeatStyle.id
		commonHttpService.httpRequest("post","/jxsd/baseInfo/insertClassInfo",httpData(phoneName,connectingCode,"jxsd").insertClassInfo(),addclassInfoCallback);
		layer.close(detaC);
		//$scope.show="none";
		//location.reload();
		}
		else {
			layer.msg('请完善所有信息');
		  }
		}
		else {
			layer.msg('请完善所有信息');
		}
	}
	function addclassInfoCallback(data){
		if(data.status == '1'){
			layer.msg("添加成功")		
			}
		else{
			layer.msg("编辑失败")
		}
		location.reload();
	}
	
	
	$scope.delClass = function(data){
		var vm=layer.confirm('删除该班级信息？', {
		    btn: ['确定','取消'],
		    skin: 'layui-layer-lan',//按钮
		}, function(){
			if($scope.myClassSelected == undefined){
				layer.msg('暂无班级信息，请先新增');
			}
			commonHttpService.httpRequest("post","/jxsd/baseInfo/deleteClassInfo",httpData(phoneName,connectingCode,"jxsd").delClassInfo(),delClassInfoCallBack)		  
			layer.close(vm)
		}, function(){
			layer.close(vm)
		});		
	}
	
	function delClassInfoCallBack(data){
		console.log(data)
		location.reload();
	}
	//change事件班级选择
	$scope.changeClass = function(){
		var tmpId=$scope.myClassSelected.siteStyle;
		if(tmpId == null){
			$scope.currSeatStyle.name='暂无座位形式';
			$scope.currSeatStyle.src='img/new/zhanwu.png';
			$scope.currSeatStyle.id='8';
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
		if(tmpId == '7'){
			$scope.currSeatStyle.name='其他';
			$scope.currSeatStyle.src='img/new/desk7.png';
			$scope.currSeatStyle.id='7';
		}
	
	}
	
	
	//关闭
	$scope.goBack = function(){
		$state.go('app.workboard.main')
	}

	function infoFunc(data){
		console.log(data)
		
		$scope.infor = data.data.classList;
	}
	
	//提交信息
	function selectClass1Func(data){
		console.log(data)
		if(data.status=="1"){
			layer.msg(data.info);
			setTimeout(function(){
				$state.go('app.workboard.main')						
			},3000)			
		}
	}

	$scope.nameCheck = function(event){
		console.log(event)
	}
	
	//新增功能男生人数
	$scope.maleNumNew = function(){
		//alert($scope.myClassNew.total+"111111111111")
		if($scope.myClassNew.total== ""){
			$scope.myClassNew.female = $scope.myClassNew.total;
		}else{
			if($scope.myClassNew.total == undefined || $scope.myClassNew.total == ""){
				if($scope.myClassNew.female!=undefined){
					$scope.myClassNew.total = parseInt($scope.myClassNew.female) + parseInt($scope.myClassNew.male);
				}				
			}else{
				if(parseInt($scope.myClassNew.male) > parseInt($scope.myClassNew.total)){
					$scope.myClassNew.female = 0
				}else{
					$scope.myClassNew.female = $scope.myClassNew.total - $scope.myClassNew.male;
				}			
			}
		
		}
	}
	//总数
	$scope.allNumNew = function(){
		if($scope.myClassNew.male == undefined || $scope.myClassNew.male == "" || typeof($scope.myClassNew.male) == "undefined"){
			if($scope.myClassNew.female == undefined || $scope.myClassNew.female == ""){
				
			}else{
				if(parseInt($scope.myClassNew.female) > parseInt($scope.myClassNew.total)){
					
				}else{
					$scope.myClassNew.male = parseInt($scope.myClassNew.total) - parseInt($scope.myClassNew.female);
				}
			}
		}else {
			if(parseInt($scope.myClassNew.male) > parseInt($scope.myClassNew.total)){
				$scope.myClassNew.female = 0
			}else{
				$scope.myClassNew.female = parseInt($scope.myClassNew.total) - parseInt($scope.myClassNew.male);
			}			
		}
	}
	//女生人数
	
	$scope.femaleNumNew = function(){
		if($scope.myClassNew.male == undefined || $scope.myClassNew.male == "" || typeof($scope.myClassNew.male) == "undefined"){
			if($scope.myClassNew.total == undefined || $scope.myClassNew.total == ""){
				
			}else{
				if(parseInt($scope.myClassNew.female) > parseInt($scope.myClassNew.total)){
					
				}else{
					$scope.myClassNew.male = parseInt($scope.myClassNew.total) - parseInt($scope.myClassNew.female);
				}
			}
		}else {
			$scope.myClassNew.total = parseInt($scope.myClassNew.female) + parseInt($scope.myClassNew.male); 
			
		}
	}
	
	//新增功能男生人数
	$scope.maleNum = function(){
		//alert($scope.myClassSelected.total+"111111111111")
		if($scope.myClassSelected.total== ""){
			$scope.myClassSelected.female = $scope.myClassSelected.total;
		}else{
			if($scope.myClassSelected.total == undefined || $scope.myClassSelected.total == ""){
				if($scope.myClassSelected.female!=undefined){
					$scope.myClassSelected.total = parseInt($scope.myClassSelected.female) + parseInt($scope.myClassSelected.male);
				}				
			}else{
				if(parseInt($scope.myClassSelected.male) > parseInt($scope.myClassSelected.total)){
					$scope.myClassSelected.female = 0
				}else{
					$scope.myClassSelected.female = $scope.myClassSelected.total - $scope.myClassSelected.male;
				}			
			}
		
		}
	}
	//总数
	$scope.allNum = function(){
		if($scope.myClassSelected.male == undefined || $scope.myClassSelected.male == "" || typeof($scope.myClassSelected.male) == "undefined"){
			if($scope.myClassSelected.female == undefined || $scope.myClassSelected.female == ""){
				
			}else{
				if(parseInt($scope.myClassSelected.female) > parseInt($scope.myClassSelected.total)){
					
				}else{
					$scope.myClassSelected.male = parseInt($scope.myClassSelected.total) - parseInt($scope.myClassSelected.female);
				}
			}
		}else {
			if(parseInt($scope.myClassSelected.male) > parseInt($scope.myClassSelected.total)){
				$scope.myClassSelected.female = 0
			}else{
				$scope.myClassSelected.female = parseInt($scope.myClassSelected.total) - parseInt($scope.myClassSelected.male);
			}			
		}
	}
	//女生人数
	
	$scope.femaleNum = function(){
		if($scope.myClassSelected.male == undefined || $scope.myClassSelected.male == "" || typeof($scope.myClassSelected.male) == "undefined"){
			if($scope.myClassSelected.total == undefined || $scope.myClassSelected.total == ""){
				
			}else{
				if(parseInt($scope.myClassSelected.female) > parseInt($scope.myClassSelected.total)){
					
				}else{
					$scope.myClassSelected.male = parseInt($scope.myClassSelected.total) - parseInt($scope.myClassSelected.female);
				}
			}
		}else {
			$scope.myClassSelected.total = parseInt($scope.myClassSelected.female) + parseInt($scope.myClassSelected.male); 
			
		}
	}
	//新增加功能
	var detaB;
	$scope.editClass = function(){
		if($scope.myClassSelected == undefined){
			layer.msg('暂无班级信息，请先新增');
		}
		//$scope.show="block";		
		if($scope.myClassSelected.periodCode == "4"){
			//$scope.myClassSelected.gradeCode = null;
			$scope.classCheck = [
				{grade:"一年级",code:"1"},
				{grade:"二年级",code:"2"},
				{grade:"三年级",code:"3"}
			]
		}else if($scope.myClassSelected.periodCode == "3"){
			//$scope.myClassSelected.gradeCode = null;
			$scope.classCheck = [
				{grade:"四年级",code:"4"},
				{grade:"五年级",code:"5"},
				{grade:"六年级",code:"6"}
			]				
		}else{
			//$scope.myClassSelected.gradeCode = null;
			$scope.classCheck = [
				{grade:"一年级",code:"1"},
				{grade:"二年级",code:"2"},
				{grade:"三年级",code:"3"}
			]				
		}
		
		detaB = layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 2,
		    area: ['750px', '520px'],
		    scrollbar: false,
		    shadeClose: false,
		    skin: 'layui-layer-lan',
		    content: $('#zbglDailog'),
		    end: function () {
		    	location.reload();		    
		    }
		});		
	}
	var detaC
	$scope.addClass = function(){
		$scope.currSeatStyle.id = '';
		//$scope.show="block";
		detaC = layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 2,
		   	area: ['750px', '520px'],
		    scrollbar: false,
		    shadeClose: false,
		    skin: 'layui-layer-lan',
		    content: $('#zbglDailogadd'),
		    end: function () {
		    	location.reload();		    
		    }
		});		
	}
	 //获取课型
	$scope.lessonType = function(data){
		console.log(data)
		if(data=="2"){
			if($scope.myClassNew.periodCode == "4"){
				$scope.myClassNew.gradeCode = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]
			}else if($scope.myClassNew.periodCode == "3"){
				$scope.myClassNew.gradeCode = null;
				$scope.classCheck = [
					{grade:"四年级",code:"4"},
					{grade:"五年级",code:"5"},
					{grade:"六年级",code:"6"}
				]				
			}else{
				$scope.myClassNew.gradeCode = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]				
			}
		}
		if(data=="1"){
			if($scope.myClassSelected.periodCode == "4"){
				$scope.myClassSelected.gradeCode = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]
			}else if($scope.myClassSelected.periodCode == "3"){
				$scope.myClassSelected.gradeCode = null;
				$scope.classCheck = [
					{grade:"四年级",code:"4"},
					{grade:"五年级",code:"5"},
					{grade:"六年级",code:"6"}
				]				
			}else{
				$scope.myClassSelected.gradeCode = null;
				$scope.classCheck = [
					{grade:"一年级",code:"1"},
					{grade:"二年级",code:"2"},
					{grade:"三年级",code:"3"}
				]				
			}
		}
	}

	
}])