﻿rootApp.controller('ktgcCtrl', ["$scope", "$state", "$http", "$stateParams","commonHttpService","locals", function ($scope, $state, $http, $stateParams,commonHttpService,locals) {
    var connectingCode = locals.get("connectingCode");
    var phoneName = locals.get("phone");
    $scope.http1 = commonHttpService.http;
    var teacherList;
    $scope.show="none";
    $scope.errorPage = 1;
    $scope.errorPage1 = 1;
    $scope.nameSearch2 = "";
    $scope.nameSearch1 = "";
    function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9){
        return httpDatad={
            teaching:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    pageNum:data4,
                    pageSize:"6",
                    timeFrom:data5,
                    timeTo:data6,
                    keyword:data7
                }
            },
        	PeriodInfoList:function(){
				return {
					phone:data1,
					connectingCode:data2,
					appName:data3
				}					
			},		
            teachingSearch:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    pageNum:data4,
                    pageSize:"6",
                    timeFrom:data5,
                    timeTo:data6,
                    keyword:data7
                }
            },
            listen:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    pageNum:data4,
                    pageSize:"6",
                    timeFrom:data5,
                    timeTo:data6,
                    keyword:data7
                }
            },
            listenSearch:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    pageNum:data4,
                    pageSize:"6",
                    timeFrom:data5,
                    timeTo:data6,
                    keyword:data7
                }
            },
            deleTeaching:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    teachId:data4
                }
            },
            deleListenParam:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    id:data4
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
            },
            toBg:function(){
                return {
                    phone:data1,
                    appName:data2,
                    connectingCode:data3,
                    teachId:data4
                }
            }
        }

    }

    //查询我的讲课
    function page(){
    	commonHttpService.httpRequest("post","/jxsd/teach/myTeachList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage,$("#test1").val(),$("#test2").val(),$scope.nameSearch1).teaching(),teachingFunc)
    	//commonHttpService.httpRequest("post","/jxsd/teach/myTeachList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage).teaching(),teachingFunc)
    }
    page()



    function teachingFunc(data){
        $scope.myTeachTotal = data.data.total
        var currentTime = new Date(data.info).getTime()
        var arrTime = []
        var redCheck = []
        $scope.teachList = data.data.list;
        for(var i=0;i<$scope.teachList.length;i++){

            if($scope.teachList[i].teach.subjectName=="语文"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/yuwen.png"
            }else if($scope.teachList[i].teach.subjectName=="数学"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/shuxue.png"
            }else if($scope.teachList[i].teach.subjectName=="英语"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/yingyu.png"
            }else if($scope.teachList[i].teach.subjectName=="政治"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/zhengzhi.png"
            }else if($scope.teachList[i].teach.subjectName=="历史"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/lishi.png"
            }else if($scope.teachList[i].teach.subjectName=="地理"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/dili.png"
            }else if($scope.teachList[i].teach.subjectName=="物理"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/wuli.png"
            }else if($scope.teachList[i].teach.subjectName=="化学"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/huaxue.png"
            }else if($scope.teachList[i].teach.subjectName=="生物"){
                $scope.teachList[i].teach.subjectImg = "img/ktgc/shengwu.png"
            }
            var day =new Date($scope.teachList[i].teach.startTime).getTime() - currentTime
            var day1 =new Date($scope.teachList[i].teach.endTime).getTime() - currentTime
            if(day>0){
                var days=Math.floor(day/(24*3600*1000))
                $scope.teachList[i].teach.redCheck="未开始"
                $scope.teachList[i].teach.checkLectureNum="1"
                $scope.teachList[i].teach.checkLecture="编辑讲课"
                $scope.teachList[i].teach.red="red"
                $scope.teachList[i].teach.match="距离上课"
                //计算出小时数

                var leave1=day%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))
                //计算相差分钟数
                var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))
                //计算相差秒数
                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000)
//			    console.log(days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                $scope.teachList[i].teach.time=days+"天 "+hours+":"+minutes
            }else{
                if(day1>=0){
                    $scope.teachList[i].teach.redCheck="进行中"
                    $scope.teachList[i].teach.checkLectureNum="3"
                    $scope.teachList[i].teach.checkLecture="正在讲课"
                    $scope.teachList[i].teach.red="blue"
                    $scope.teachList[i].teach.match="距离下课"
                    var days=Math.floor(day1/(24*3600*1000))
                    var leave1=day1%(24*3600*1000)    //计算天数后剩余的毫秒数
                    var hours=Math.floor(leave1/(3600*1000))
                    //计算相差分钟数
                    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                    var minutes=Math.floor(leave2/(60*1000))
                    //计算相差秒数
                    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                    var seconds=Math.round(leave3/1000)
                    console.log(days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                    $scope.teachList[i].teach.time=days+"天 "+hours+":"+minutes

                }else{
                    $scope.teachList[i].teach.redCheck="已结束"
                    $scope.teachList[i].teach.checkLectureNum="2"
                    $scope.teachList[i].teach.checkLecture="观测报告"
                    $scope.teachList[i].teach.red="hui"
                    $scope.teachList[i].teach.match=""
                }
            }

        }
        $scope.pageCountError = data.data.pages;

    }

    //讲课的分页
    $scope.onPageError = function(){
        console.log($scope.errorPage)
        page()
    }

    //查询我的听课
    function page1(){
    	commonHttpService.httpRequest("post","/jxsd/listen/myListenList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage1,$("#test3").val(),$("#test4").val(),$scope.nameSearch2).listen(),listenFunc)

    	// commonHttpService.httpRequest("post","/jxsd/listen/myListenList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage1).listen(),listenFunc)
    }
    page1()

    function listenFunc(data){

      //  debugger;
        $scope.myListenTotal = data.data.total
        var currentTime = new Date().getTime()
        var arrTime=[]

        $scope.listenList = data.data.list;
        for(var i=0;i<$scope.listenList.length;i++){

            if($scope.listenList[i].subjectName=="语文"){
                $scope.listenList[i].subjectImg = "img/ktgc/yuwen.png"
            }else if($scope.listenList[i].subjectName=="数学"){
                $scope.listenList[i].subjectImg = "img/ktgc/shuxue.png"
            }else if($scope.listenList[i].subjectName=="英语"){
                $scope.listenList[i].subjectImg = "img/ktgc/yingyu.png"
            }else if($scope.listenList[i].subjectName=="政治"){
                $scope.listenList[i].subjectImg = "img/ktgc/zhengzhi.png"
            }else if($scope.listenList[i].subjectName=="历史"){
                $scope.listenList[i].subjectImg = "img/ktgc/lishi.png"
            }else if($scope.listenList[i].subjectName=="地理"){
                $scope.listenList[i].subjectImg = "img/ktgc/dili.png"
            }else if($scope.listenList[i].subjectName=="物理"){
                $scope.listenList[i].subjectImg = "img/ktgc/wuli.png"
            }else if($scope.listenList[i].subjectName=="化学"){
                $scope.listenList[i].subjectImg = "img/ktgc/huaxue.png"
            }else if($scope.listenList[i].subjectName=="生物"){
                $scope.listenList[i].subjectImg = "img/ktgc/shengwu.png"
            }

            //结束状态
            if($scope.listenList[i].statusFlag==1){
                $scope.listenList[i].redCheck="已结束";
                $scope.listenList[i].checkLectureNum="2";
                $scope.listenList[i].checkLecture="观测报告";
                $scope.listenList[i].red="hui";
                $scope.listenList[i].match="";
                continue;
            }


            var day =new Date($scope.listenList[i].startTime).getTime() - currentTime
            var day1 =new Date($scope.listenList[i].endTime).getTime() - currentTime
            if(day>0){
                $scope.listenList[i].redCheck="未开始"
                $scope.listenList[i].checkLectureNum="1"
                $scope.listenList[i].checkLecture="编辑听课"
                $scope.listenList[i].red="red"
                $scope.listenList[i].match="距离下课"

                var days=Math.floor(day/(24*3600*1000))

                //计算出小时数
                var leave1=day%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))
                //计算相差分钟数
                var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))
                //计算相差秒数
                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000)
                console.log(days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                $scope.listenList[i].time=days+"天 "+hours+":"+minutes
            }else{
                if(day1>=0){
                    $scope.listenList[i].redCheck="进行中"
                    $scope.listenList[i].checkLectureNum="3"
                    $scope.listenList[i].checkLecture="开始听课"
                    $scope.listenList[i].red="blue"
                    $scope.listenList[i].match="距离下课"

                    var days=Math.floor(day1/(24*3600*1000))
                    var leave1=day1%(24*3600*1000)    //计算天数后剩余的毫秒数
                    var hours=Math.floor(leave1/(3600*1000))
                    //计算相差分钟数
                    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                    var minutes=Math.floor(leave2/(60*1000))
                    //计算相差秒数
                    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                    var seconds=Math.round(leave3/1000)
                    console.log(days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                    $scope.listenList[i].time=days+"天 "+hours+":"+minutes
                }else {
                    $scope.listenList[i].redCheck="已结束";
                    $scope.listenList[i].checkLectureNum="2";
                    $scope.listenList[i].checkLecture="观测报告";
                    $scope.listenList[i].red="hui";
                    $scope.listenList[i].match="";
                }
            }

        }
//  	console.log($scope.listenList)
        $scope.pageCountError1 = data.data.pages;
    }
    //讲课的分页
    $scope.onPageError1 = function(){
        console.log($scope.errorPage1)
        page1()
    }

    $scope.curTab = parseInt($stateParams.tkjk)|| parseInt($stateParams.type)|| 1;
    $scope.date = {
        start: '',
        end: ''
    };
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#test1',
            type: 'datetime'
        });
        laydate.render({
            elem: '#test2',
            type: 'datetime'
        });
        laydate.render({
            elem: '#test3',
            type: 'datetime'
        });
        laydate.render({
            elem: '#test4',
            type: 'datetime'
        });

    })

    //图片列表
//	$scope.imgList = [
//		{name:"序号",trImg:false,width:"5%"},
//		{name:"区域",trImg:true,width:'15%'},
//		{name:"学校",trImg:true,width:'10%'},
//		{name:"学科",trImg:true,width:'5%'},
//		{name:"班级",trImg:true,width:'10%'},
//		{name:"讲课老师",trImg:true,width:'10%'},
//		{name:"听课老师",trImg:true,width:'10%'},
//		{name:"讲课时间",trImg:true,width:'10%'}
//	]



    $scope.mouseDailog = function(id,id1,value){

        layer.tips(value,'.imgB'+(id.toString()+id1.toString()), {
            tips: [3, '#3595CC'],
            time: 1000
        });
    }

    // $scope.mouseUp = function(id,value){

    //     layer.tips(value,'.fontB'+(id.toString()), {
    //         tips: [3, '#3595CC'],
    //         time: 1000
    //     });
    // }

    // $scope.mouseUp1 = function(id,value){

    //     layer.tips(value,'.fontA'+(id.toString()), {
    //         tips: [3, '#3595CC'],
    //         time: 1000
    //     });
    // }

    $scope.showBox = '1'

    //切换二维码听课
    $scope.codeCheck1 = function($event,value){
        $event.stopPropagation();
        $scope.showBox ='2'
        $(".classLearnz"+value).hide()
        $(".classLearntz"+value).show()
    }
    //切换二维码讲课
    $scope.codeCheck = function($event,value){
        $event.stopPropagation();
        $scope.showBox ='2'
        $(".classLearn"+value).hide()
        $(".classLearnt"+value).show()
    }
    //关闭二维码讲课
    $scope.closeShare1 = function(value){
        $scope.showBox ='1'
        $(".classLearn"+value).show()
        $(".classLearnt"+value).hide()
    }
    //关闭二维码听课
    $scope.closeShare2 = function(value){
        $scope.showBox ='1'
        $(".classLearnz"+value).show()
        $(".classLearntz"+value).hide()
    }
    //点击其他区域
    $scope.otherClick = "1"

    $scope.detailClick = function(num,value){

        if($(".apo"+value)[0].style.display=="block"){

        }else{
            if(num == 1){
//	  			console.log($(".tians"+value).html())
                if($(".tians"+value).html()=="进行中"){
                    return false
                }else{

                    $(".apt"+value).hide()
                    $(".apo"+value).show()
                }
            }else{
                $(".apt"+value).hide()
                $(".apo"+value).show()
            }
        }
    }

    $scope.outDetailClick = function(value){
        $(".apt"+value).show()
        $(".apo"+value).hide()
    }

    $scope.detailClick1 = function(value){
        $(".apt"+value).hide()
        $(".apo"+value).show()
    }

    var teachTheList={};
    //去听课或者开始讲课等
    $scope.toListen = function($event,value1,value2,value3,value4,value5,value6,value7,value8,value9,value10){

        teachTheList.value1 = value1
        teachTheList.value2 = value2
        teachTheList.value3 = value3
        teachTheList.value4 = value4
        teachTheList.value5 = value5
        teachTheList.value6 = value6
        teachTheList.value7 = value7
        teachTheList.value8 = value8
        teachTheList.value9 = value9
//		teachTheList.value10 = value10
//		console.log(value1)
//		console.log(value2)
//		console.log(value3)
//		console.log(value4)
//		console.log(value5)
//		console.log($event)
        if($event.target.innerHTML=="开始讲课"){
//			console.log(444)
            layer.msg('暂时还没开通，敬请期待');
        }else if($event.target.innerHTML=="编辑讲课"){
//			console.log($event.target.attributes[2].nodeValue)
            locals.set("qpcord",$event.target.attributes[2].nodeValue);
            $state.go('app.ktgc.detailclass',{test:JSON.stringify(teachTheList)});
        }else if($event.target.innerHTML=="听课"){
            layer.msg('暂时还没开通，敬请期待');
        }else if($event.target.innerHTML=="开始听课"){
//			layer.msg('暂时还没开通，敬请期待');
            var listJson = {};
            listJson.value1 = value1;
            listJson.value2 = value2;
            listJson.value3 = value3;
            listJson.value4 = value4;
            listJson.value5 = value5;
	        listJson.value6 = value6;
    
		$state.go('app.cjzb.main1',{test1:JSON.stringify(listJson)})
           // $state.go('app.cjzb.main1',{test1:listjj})
        }else{
            layer.msg('暂时还没开通，敬请期待');
        }
    }

    $('#datetimepicker').datetimepicker({
        format: 'Y-m-d',
        timepicker: false
    });
    $.datetimepicker.setLocale('ch');
    $scope.changeTab = function (index) {

        $scope.curTab = index;
    }

//  $scope.showShare = function (data1,data2,data3,data4) {
//  	$scope.imgF = data1
//  	$scope.schoolName = data2
//  	$scope.teacherName = data3
//  	$scope.teachTime = data4
//      $('#myModal').modal({
//          keyboard: true
//      })
//  }
    $scope.closeShare = function () {
        $('#myModal').modal('hide');
    }
    $scope.addClass = function () {
	    commonHttpService.httpRequest("post","/jxsd/baseInfo/selectPeriodTeach",httpData(phoneName,connectingCode,"jxsd").PeriodInfoList(),periodInfoListCallback);
    }
    function periodInfoListCallback(data){
    	console.log(data.data)
    	if(data.data.length != 0){
    		 $state.go('app.ktgc.addclass');
    	}
    	else{
    		 layer.msg("没有年级班级信息，请先去班级信息中增加");
    	}
    }
    var detaT
    $scope.addLecture = function () {
       // $state.go('app.ktgc.addlecture');
		detaT = layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 2,
		    area: ['550px', '400px'],
		    scrollbar: false,
		    shadeClose: false,
		    skin: 'layui-layer-lan',
		    content: $('#zbglDailogfs'),
		    end: function () {
		    	location.reload();		    
		    }
		});		
    }
    
    $scope.listenStyle = function(id){
    	if(id == '1'){
    		$state.go('app.ktgc.addlecture');
    		layer.close(detaT);
    	}
    	if(id == '2'){
    		$state.go('app.ktgc.addlectureTwo');
    		layer.close(detaT);
    	}
    }

    var teachTheList1={};
    $scope.startClass = function (value,value1,value2,value3,value4,value5,value6,value7) {
    	
        commonHttpService.httpRequest("post","/jxsd/teach/teachReport",httpData(phoneName,"jxsd",connectingCode,value7).toBg(),toBgFunc)
//		teachTheList1.value1 = value1
//		teachTheList1.value2 = value2
//		teachTheList1.value3 = value3
//		teachTheList1.value4 = value4
//		teachTheList1.value5 = value5
//		teachTheList1.value6 = value6
//		teachTheList1.value7 = value7
//      $state.go('app.pjbg1.main',{teachId:JSON.stringify(teachTheList1)});

        function toBgFunc(data){
            console.log(data)
            if(data.data.listenReports.length=="0" || data.data.listenReports.length==0){
                layer.msg("没有报告信息")
            }else{
                $scope.totalS = data.data;
                $scope.teachListenData = data.data.listenReports;
                if($(".selUpDailogCheckt"+value).css("display")=="block"){
                    $(".selUpDailogCheckt"+value).hide()
                    return false
                }
                var listr = $(".selUpDailogCheck");
                for(var i=0;i<listr.length;i++){
                    $(listr[i]).hide()
                }

                $(".selUpDailogCheckt"+value).show()
            }

        }
    }

/**
 * 显示评价报告列表弹窗
 */
 $scope.evaluateReport = function (value,value1,value2,value3,value4,value5,value6,value7) {	
        commonHttpService.httpRequest("post","/jxsd/teach/teachReport",httpData(phoneName,"jxsd",connectingCode,value7).toBg(),toBgFunc)
        function toBgFunc(data){
            console.log(data)
            if(data.data.listenReports.length=="0" || data.data.listenReports.length==0){
                layer.msg("没有报告信息")
            }else{
                $scope.totalS = data.data;
                $scope.teachListenData = data.data.listenReports;
                if($(".evaluateReport"+value).css("display")=="block"){
                    $(".evaluateReport"+value).hide()
                    return false
                }
                var listr = $(".selUpDailogCheck");
                for(var i=0;i<listr.length;i++){
                    $(listr[i]).hide()
                }

                $(".evaluateReport"+value).show()
            }
        }
    }

    /**
     * 跳转到观测报告页面
     */
    $scope.comeIn = function(value1,value2,value3){
        $state.go("app.ktgc.cpbg",{teachId:value1,listenTeacherId:value2,num:value3})
    }
    
    /**
     * 跳转到评价报告页面
     */
    $scope.evaluateReportNav = function(value1,value2,value3){
        $state.go("app.ktgc.evaluateReport",{teachId:value1,listenTeacherId:value2,num:value3})
    }
    
    
    //删除讲课信息
    $scope.deleteach = function(data){
        var vm=layer.confirm('删除讲课？', {
            btn: ['确定','取消'],
            skin: 'layui-layer-lan',//按钮
        }, function(){
            console.log(data)
            commonHttpService.httpRequest("post","/jxsd/teach/deleteTeach",httpData(phoneName,"jxsd",connectingCode,data).deleTeaching(),deleTeachingFunc)
            layer.close(vm)
        }, function(){
            layer.close(vm)
        });
//		console.log(data)
//		commonHttpService.httpRequest("post","/jxsd/teach/deleteTeach",httpData(phoneName,"jxsd",connectingCode,data).deleTeaching(),deleTeachingFunc)
    }

    function deleTeachingFunc(data){
        console.log(data)
        page()
    }

    $scope.deleListen = function(data){
        var vm1=layer.confirm('删除听课？', {
            btn: ['确定','取消'],
            skin: 'layui-layer-lan',//按钮
        }, function(){
            commonHttpService.httpRequest("post","/jxsd/listen/deleteListen",httpData(phoneName,"jxsd",connectingCode,data).deleListenParam(),deleListenFunc)
            layer.close(vm1)
        }, function(){
            layer.close(vm1)
        });
    }

    function deleListenFunc(data){
        console.log(data)
        page1()
    }

    var teacherList = {}

    $scope.lecssonTo = function(value1,value2,value3,value4,value5,value6,value7,value8){
        teacherList.value1 = value1;
        teacherList.value2 = value2;
        teacherList.value3 = value3;
        teacherList.value4 = value4;
        teacherList.value5 = value5;
        teacherList.value6 = value6;
        teacherList.value7 = value7;
        teacherList.value8 = value8;
        console.log(teacherList)
        $state.go("app.pjbg.main",{teachId:JSON.stringify(teacherList)})
    }

    //讲课搜索功能
    $scope.showSearchBox = function(){
        $(".searchBox").show();
        var searchName = locals.get("searchName");
        console.log(searchName)
        if(searchName==undefined || searchName =="" || searchName==null){

        }else{
            $scope.searchData = searchName.split(",").reverse().slice(0,10);
        }


//  	setTimeout(function(){
//  		$(".searchBox").hide();
//  	},5000)
    }

    if(document.addEventListener){
        document.addEventListener("click",function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if($(target).hasClass("search") || $(target).hasClass("search1")){

            }else{
                $(".searchBox").hide();
                $(".searchBox1").hide();
            }
        })
    }else{
        document.attachEvent("onclick",function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if($(target).hasClass("search") || $(target).hasClass("search1")){

            }else{
                $(".searchBox").hide();
                $(".searchBox1").hide();
            }
        })
    }



    $scope.changeName = function(value){
        console.log(value)
        $scope.nameSearch1 = value;
        $(".searchBox").hide();
    }

//  $scope.hideSearchBox = function(){
//  	$(".searchBox").hide();
//
//  }

    $scope.keySearch = function (event) {
		if (event.keyCode == 13) {
			$scope.search();
		}
	};
	
	$scope.keySearch1 = function (event) {
		if (event.keyCode == 13) {
			$scope.search1();
		}
	};
    //讲课列表搜索功能
    $scope.search = function($event){
        $(".searchBox").hide();
        //关键词搜索
        var searchName = locals.get("searchName");
        console.log(searchName)
        if(searchName == "" || searchName==undefined || searchName==null || searchName=="undefined" || searchName=="null"){
            var searchNameTotal = $scope.nameSearch1;
        }else{
            console.log(searchName.indexOf($scope.nameSearch1))
            if(searchName.indexOf($scope.nameSearch1)<=-1 || searchName.indexOf($scope.nameSearch1)<="-1" ){
                var searchNameTotal = searchName + "," + $scope.nameSearch1;
            }else{
                var searchNameTotal = searchName
            }

        }
        if($.trim($scope.nameSearch1)!=""){
            locals.set("searchName",searchNameTotal)
        }
        if(!$event){
            $scope.errorPage = 1
            commonHttpService.httpRequest("post","/jxsd/teach/myTeachList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage,$("#test1").val(),$("#test2").val(),$scope.nameSearch1).teachingSearch(),teachingFunc)
        }else{
            if($event.keyCode==13){//回车
                console.log(333)
                $scope.errorPage = 1
                commonHttpService.httpRequest("post","/jxsd/teach/myTeachList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage,$("#test1").val(),$("#test2").val(),$scope.nameSearch1).teachingSearch(),teachingFunc)
            }
        }
    }

    //听课搜索功能
    $scope.showSearchBox1 = function(){
        $(".searchBox1").show();
        var searchName = locals.get("searchName1");
        if(searchName==undefined || searchName =="" || searchName==null){

        }else{
            $scope.searchData1 = searchName.split(",").reverse().slice(0,10);
        }
//  	$scope.searchData1 = searchName.split(",").reverse().slice(0,10);
//  	console.log($scope.searchData1)
//  	setTimeout(function(){
//  		$(".searchBox1").hide();
//  	},5000)
    }

    $scope.changeName1 = function(value){
        console.log(value)
        $scope.nameSearch2 = value;
        $(".searchBox1").hide();
    }

    //听课列表搜索功能
    $scope.search1 = function($event){
        $(".searchBox1").hide();
        //关键词搜索
        var searchName = locals.get("searchName1");
        console.log(searchName)
        if(searchName == "" || searchName==undefined || searchName==null){
            var searchNameTotal = $scope.nameSearch2;
        }else{
            console.log(searchName.indexOf($scope.nameSearch2))
            if(searchName.indexOf($scope.nameSearch2)<=-1 || searchName.indexOf($scope.nameSearch2)<="-1" ){
                var searchNameTotal = searchName + "," + $scope.nameSearch2;
            }else{
                var searchNameTotal = searchName
            }
        }


        if($.trim($scope.nameSearch2)!=""){
            locals.set("searchName1",searchNameTotal)
        }
        if(!$event){
            $scope.errorPage1 = 1
            commonHttpService.httpRequest("post","/jxsd/listen/myListenList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage1,$("#test3").val(),$("#test4").val(),$scope.nameSearch2).listenSearch(),listenFunc)
        }else{
            if($event.keyCode==13){//回车
                $scope.errorPage1 = 1
                commonHttpService.httpRequest("post","/jxsd/listen/myListenList",httpData(phoneName,"jxsd",connectingCode,$scope.errorPage1,$("#test3").val(),$("#test4").val(),$scope.nameSearch2).listenSearch(),listenFunc)
            }
        }
    }

    //跳转到观测报告页面
    $scope.toCpbg = function(teachId,listenTeacherId,value3){
        $state.go("app.ktgc.cpbg",{teachId:teachId,listenTeacherId:listenTeacherId,num:value3})
    }
    
    //跳转到评价报告页面
    $scope.toEvaluateReport = function(teachId,listenTeacherId,value3){
        $state.go("app.ktgc.evaluateReport",{teachId:teachId,listenTeacherId:listenTeacherId,num:value3})
    }

    var teachLayer;
    //分享讲课
    $scope.showShare = function(data1,data2,data3,data4){
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

        $(".chslas").on("click",function(){
            layer.close(teachLayer)
        })

        $(".shareImg1").on("click",function(){
            console.log(1)
            window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + commonHttpService.http+data1 + "&title=讲课分享", "newwindow");
        })

        $(".shareImg2").on("click",function(){
            console.log(2)
            window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title=讲课分享&url=' + commonHttpService.http+data1 + '', 'newwindow');
        })

        $(".shareImg3").on("click",function(){
            var param = {
                url: commonHttpService.http+data1,
                title: "讲课分享",
                rnd: new Date().valueOf()
            };
            var temp = [];
            for (var p in param) {
                temp.push(p + '=' + encodeURIComponent(param[p] || ''))
            }
            window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
        })
    }

    //

}])