rootApp.controller('loginCtr',["$scope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,httpService,commonHttpService,locals) {

    console.log(locals.get("phone"))
    if(locals.get("phone")!="" &&　locals.get("phone")!=undefined){
        $scope.userName = locals.get("phone")
    }else{

    }
    console.log(locals.get("check"))
    if(locals.get("check")=="1"){
        $scope.userPassword = locals.get("passwordNew")
        $("#jzmm").find("i").removeClass("icon-32duoxuanweixuanzhong").addClass("icon-33duoxuanxuanzhong");
    }else{
        $scope.userPassword = ""
    }


    //记住密码
    // $("#jzmm").on("change",function(){
    //     if($(this).is(':checked')){
    //         locals.set("check","1")
    //     }else{
    //         locals.set("check","0")
    //     }
    // })
    $("#jzmm").on("click",function(){
        if($(this).find("i").hasClass("icon-33duoxuanxuanzhong")){
            $(this).find("i").removeClass("icon-33duoxuanxuanzhong").addClass("icon-32duoxuanweixuanzhong");
            locals.set("check","0")
        }else if($(this).find("i").hasClass("icon-32duoxuanweixuanzhong")){
            $(this).find("i").removeClass("icon-32duoxuanweixuanzhong").addClass("icon-33duoxuanxuanzhong");
            locals.set("check","1")
        }
        console.log(locals.get("check"))
    })
    // 增加学段、年级、班级、学科
    var infoObj = {
        periodCode: '',
        gradeCode: '',
        classCode: '',
        subjectCode: ''
    };
    $scope.infoList = [infoObj];
    $scope.addInfo = function () {
        var obj = angular.copy({
            periodCode: '',
            gradeCode: '',
            classCode: '',
            subjectCode: ''
        });;
        $scope.infoList.push(obj);
    };
    $scope.reduceInfo = function (index) {
        $scope.infoList.splice(index,1);
    };

    //忘记密码
    $scope.forget = '1'
    $scope.forgetFunc = function(){
        $(".loginContent").addClass("loginam");
        setTimeout(function(){
            $(".loginContent").removeClass("loginam")
        },1000)
        $scope.forget = '2'
    }

    $scope.forgetFinish = '1'

    // 增加学段、年级、班级、学科结束
    $scope.loginasign = "登录";
    $scope.showLogin = '1';
    $scope.selUpDailog1 = false;
    $scope.selUpDailog2 = false;
    $scope.selUpDailog3 = false;
    $scope.selUpDailog4 = false;
    $scope.selUpDailog5 = false;
    $scope.selUpDailog6 = false;
    var district_code = "";
    var districtCode = ""
    var cityCode = ""
    var provinceCode =""
    var province_data = "";
    var city_data = "";
    var area_data = "";
    $scope.periodList1 = [
        {id:'1',name:"高中段"},
        {id:'2',name:"初中段"},
        {id:'3',name:"小学高年级"},
        {id:'4',name:"小学中年级"},
        {id:'5',name:"小学低年级"}
    ]
    $scope.periodList2 = [
        {id:'1',name:"一年级"},
        {id:'2',name:"二年级"},
        {id:'3',name:"三年级"},
        {id:'4',name:"四年级"},
        {id:'5',name:"五年级"},
        {id:'6',name:"六年级"}
    ]
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

    //只能输入数字


    function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10){
        return httpDatad={
            login:function(){
                return {
                    // account:data1,
                    account:data1,
                    password:data2,
                    loginWay:data3
                }
            },
            code:function(){
                return {
                    mobile:data1
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
            registerCode:function(){
                return {
                    mobile:data1
                }
            },
            register:function(){
                return {
                    tel:data1,
                    msgCode:data2,
                    password:data3,
                    name:data4,
                    districtCode:data5,
                    schoolCode:data6,
                    period_code:data7,
                    gradeCode:data8,
                    classCode:data9,
                    subjectCode:data10
                }
            },
            forget:function(){
                return {
                    tel:data1,
                    password:data2,
                    verifyCode:data3
                }
            },
            testCode:function(){
                return {
                    tel:data1,
                    password:data2
                }
            },
        }

    }


    function loginFunc(data){
        console.log(data)
        if(data.status == "200"){
            locals.set("connectingCode",data.data.connectingCode);
            locals.set("phone",$scope.userName);
            locals.set("passwordNew",$scope.userPassword);
            locals.set("schoolCode",data.data.schoolCode);
            locals.set("districtCode",data.data.districtCode);
            locals.set("listenIdCode",data.data.id);
            if(data.data.name=="" || data.data.name==null || data.data.name==undefined){
                locals.set("name","老师2");
            }else{
                locals.set("name",data.data.name);
            }

            $(".errorContent").hide()
            $state.go("app.ktgc.main")
        }else{
            $(".errorContent").show()
            setTimeout(function(){
                $(".errorContent").hide()
            },3000)
        }
        // else if(data.status == "修改成审核的状态对应"){//登录审核中
        //     layer.msg('<i class="iconfont icon-shenhe" style="font-size:100px;line-height:100px;"></i><p style="font-size:18px;">审核中</p><p>账号'+$scope.userName+'正在审核中</p>');
        //     $(".examineTel").show();
        //     var exhtml = $scope.userName;
        //     $(".examineTel").find("span").html(exhtml);
        // }
    }

    var phone = false;
    var password = false;
    var phoneFz = false;
    var passwordFz = false;
    /**
     * 登录
     */
    $scope.userNameChange = function(){
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var ereg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if(!myreg.test($scope.userName) && !ereg.test($scope.userName)){
            $(".errorContent111").show()

        }else{
            $(".errorContent111").hide()

        }
        if($scope.userName == ""){
            $(".errorContent111").hide()

        }
    }

    /**
     * 注册第一步
     */
    $scope.phoneNameChange = function(){
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var ereg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(!myreg.test($scope.phoneName) && !ereg.test($scope.phoneName)){
            $(".errorContent1").show()
            phone = false;
        }else{
            $(".errorContent1").hide()
            phone = true;
        }
        if($scope.phoneName == ""){
            $(".errorContent1").hide()
            phone = false;
        }
    }
    $scope.phoneNameChangeForget = function(){
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test($scope.phoneNameForget)){
            $(".errorContent1_1").show()
            phoneFz = false;
        }else{
            $(".errorContent1_1").hide()
            phoneFz = true;
        }
        if($scope.phoneNameForget == ""){
            $(".errorContent1_1").hide()
            phoneFz = false;
        }
    }
    $scope.passwordNameChange1 = function(){
        var patrn=/^([a-zA-Z0-9]|[._!@#$%^&*]){6,16}$/;
        if (!patrn.exec($scope.userPassword)) {
            $(".errorContent21").show()
        }else{
            $(".errorContent21").hide()
        }

        if($scope.userPassword == ""){
            $(".errorContent21").hide()
        }
    }

    $scope.passwordNameChange = function(){
        var patrn=/^([a-zA-Z0-9]|[._!@#$%^&*]){6,16}$/;
        if (!patrn.exec($scope.passwordName)) {
            $(".errorContent2").show()
            password = false;
        }else{
            $(".errorContent2").hide()
            password = true;
        }

        if($scope.passwordName == ""){
            $(".errorContent2").hide()
            password = false;
        }
    }
    $scope.passwordNameChangeForget = function(){
        var patrn=/^([a-zA-Z0-9]|[._!@#$%^&*]){6,16}$/;
        if (!patrn.exec($scope.passwordNameForget)) {
            $(".errorContent2_1").show()
            passwordFz = false;
        }else{
            $(".errorContent2_1").hide()
            passwordFz = true;
        }

        if($scope.passwordNameForget == ""){
            $(".errorContent2_1").hide()
            passwordFz = false;
        }
    }
    $scope.loginAsign = function(e){
        if(e == '注册'){
            $(".loginContent").addClass("loginam");
            setTimeout(function(){
                $(".loginContent").removeClass("loginam")
            },1000)
        }
        if(e == '登录'){
            $(".loginContent").addClass("loginam2");
            setTimeout(function(){
                $(".loginContent").removeClass("loginam2")
            },1000)
        }
        $scope.loginasign = e
    }
    /**
     * 登录输入框切换
     */
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
        var form = layui.form;
        form.on('checkbox(test)', function(data){
            if(data.elem.checked){
                console.log(1)
                $(data.elem).parent().css({"background":"#1e70e9"})
                $(data.elem).parent().find("span").css({"color":"#fff"})
            }else{
                console.log(2)
                $(data.elem).parent().css({"background":"#fff"})
                $(data.elem).parent().find("span").css({"color":"#838C95"})
            }

        });
    });
    $scope.teachercheck = "1";
    $(".teacher img").attr("src","img/login/blue_person.png")
    $(".department img").attr("src","img/login/black_ground.png")
    $scope.teacherCheck = function(e){
        if(e=="1"){
            $(".teacher img").attr("src","img/login/blue_person.png")
            $(".department img").attr("src","img/login/black_ground.png")
        }else{
            $(".teacher img").attr("src","img/login/black_person.png")
            $(".department img").attr("src","img/login/blue_ground.png")
        }
        $scope.teachercheck = e
    }

    $scope.dailogcheck = false;

    /**
     * 拉起弹出框
     */

    $scope.dailogCheck = function(){
        if($.trim($("#name").val())!="" && $("#name").val()!=undefined && $("#name").val()!="您的真实姓名" && $(".selUp2").html()!="学校所在区域" && $scope.schoolInit!="请选择学校"){
			var loginD ={
				districtCode:districtCode,
				cityCode:cityCode,
				provinceCode:provinceCode,
				tel:$scope.phoneName,
				password:$scope.passwordName,
				name:$("#name").val(),
				schoolCode:$scope.schoolInit,
			}
			commonHttpService.httpRequest("post","/jxsd/sys/register",loginD,registerFunc)
        }else{
            layer.msg('请完善所有信息');
        }
    }
    $scope.dailogCheck1 = function(){
        $scope.dailogcheck = true;
    }
    /**
     * 关闭弹出框
     */
    $scope.closeDailog = function(){
        $scope.dailogcheck = false;
    }
    $scope.checkAdmin =function(){
        $scope.dailogcheck = false;
        if($scope.teachercheck == "1"){
            $scope.teachercheck = "2";
            $(".teacher img").attr("src","img/login/black_person.png")
            $(".department img").attr("src","img/login/blue_ground.png")
        }else{
            $scope.teachercheck = "1";
            $(".teacher img").attr("src","img/login/blue_person.png")
            $(".department img").attr("src","img/login/black_ground.png")
        }

    }
    $scope.keywords = "密码"
    $scope.getCode = function(event,value){
        $(".errorContent").html("")
        if($(".loginCheckY").html() == "验证码登录"){
            $(".loginCheckY").html("账号登录")
            $(".pass1").html("验证码")
            $(".getCode1").show()
            $scope.keywords = "验证码"
        }else{
            $(".loginCheckY").html("验证码登录")
            $(".pass1").html("密码")
            $(".getCode1").hide()
            $scope.keywords = "密码"
        }
    }

    //注册获取code码
    $scope.registerCode = function(){
        if(!phone){
            $(".errorContent3").html("请输入正确手机号")
            $(".errorContent3").show()
        }else{
            var dstext = 60;
            $(".getCodeSet").html(dstext + "s后重新获取");
            $(".getCodeSet").addClass("disabled");
            var timeSet = setInterval(function(){
                $(".getCodeSet").html(dstext + "s后重新获取");
                if(dstext=="0" || dstext==0){
                    clearInterval(timeSet)
                    $(".getCodeSet").removeClass("disabled");
                    $(".getCodeSet").html("获取验证码")
                    return false;
                }
                dstext --;
            },1000)
            $(".errorContent3").hide()
        }
    }

    $scope.registerCode1 = function(){

        var dstext = 60;
        $(".getCodeSet1").html(dstext + "s后重新获取");
        $(".getCodeSet1").addClass("disabled");
        var timeSet = setInterval(function(){
            $(".getCodeSet1").html(dstext + "s后重新获取");
            if(dstext=="0" || dstext==0){
                clearInterval(timeSet)
                $(".getCodeSet1").removeClass("disabled");
                $(".getCodeSet1").html("获取验证码")
                return false;
            }
            dstext --;
        },1000)
    }

    function registerCodeFunc(data){
        console.log(data)
    }

    $(".check22").hide()

    $(".radioBox1").on("change",function(){
        var checkRadio = document.getElementsByName("adminType");
        for(var i=0;i<checkRadio.length;i++){
            if(checkRadio[i].checked == true){
                if(checkRadio[i].value=="1"){
                    $(".checkboxImg1").css("left","calc(22% + 170px)")
                    $(".checkboxImg2").css("left","22%")
                    $(".check1").show()
                    $(".check2").hide()
                    $(".check11").show()
                    $(".check22").hide()
                }else{
                    $(".checkboxImg2").css("left","calc(22% + 170px)")
                    $(".checkboxImg1").css("left","22%")
                    $(".check1").hide()
                    $(".check2").show()
                    $(".check22").show()
                    $(".check11").hide()
                }
            }
        }
    })

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

        provinceCode = event.target.attributes[2].value
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
        cityCode = event.target.attributes[2].value
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
        districtCode = event.target.attributes[2].value
        area_data = event.target.innerText;
        var dataL = event.target.attributes[1].value;
        district_code = event.target.attributes[2].value;
        for(var i=0;i<dataL;i++){
            $scope["blueClicka"+i] = false
        }
        $scope["blueClicka"+value] = true
        $(".selUp2").html(province_data+","+city_data+","+area_data)
        $scope.selUpDailog2 = false
        $scope.showHide = false
        $scope.showHide1 = false
        commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",districtCode).school(),schoolFunc)

    }


    //查询学校
    $scope.schoolInit = "所属学校"
    $scope.selUp3 = function(){
        if($scope.selUpDailog3){
            commonHttpService.httpRequest("post","/jxsd/baseInfo/getSchool",httpData("jxsd",districtCode).school(),schoolFunc)
        }

    }

    function schoolFunc(data){
        console.log(data)
        $scope.schoolData = data.data
    }

    //查询年级
    $scope.classInit = "执教年级（可多选）"
    $scope.selUp4 = function(){
        $scope.selUpDailog4 = !$scope.selUpDailog4;
        if(!$scope.selUpDailog4){
            console.log($(".selUpDailog4 .active"))
            var selUpDailog4List = $(".selUpDailog4 .active");
            var str = "";
            if(selUpDailog4List.length!=0){
                for(var i=0;i<selUpDailog4List.length;i++){
                    if(i == selUpDailog4List.length-1){
                        str = str+$(selUpDailog4List[i]).html()
                    }else{
                        str = str+$(selUpDailog4List[i]).html()+","
                    }
                }
            }
            str =="" ? $scope.classInit="执教年级（可多选）" : $scope.classInit = str;

        }else{
            httpService.loginHttp.classN().success(function (data) {
                console.log(data)
                $scope.classData = data.data;
                for(var i = 0;i<data.data.length;i++){
                    $scope["blue2Click"+i] = false
                }
            })
        }
    }
    $scope.classClick = function(value,event){
        var dataL = event.target.attributes[1].value;
        console.log(dataL)
    }

    //查询学段
    $scope.selUp1 = function(){
        $scope.selUpDailog1 = !$scope.selUpDailog1
        if($scope.selUpDailog1 == false){
            var checkBox = document.getElementsByName("xd");
            var arrCheck = []
            var str = ""
            for(var i=0;i<checkBox.length;i++){
                var that = i
                if(checkBox[i].checked){
                    arrCheck.push(checkBox[i].value)
                    str = str + checkBox[i].value + ","
                }
            }
            console.log(arrCheck.length)
            console.log(str)
            if(str=="" || str==undefined){
                $(".selUp1").html("执教学段（可多选）")
            }else{
                str = str.substring(0,str.length-1)
                $(".selUp1").html(str)
            }

        }

    }

    //查询学科
    $scope.selUp5 = function(){
        $scope.selUpDailog5 = !$scope.selUpDailog5
        if($scope.selUpDailog5 == false){
            var checkBox = document.getElementsByName("xdt");
            var arrCheck = []
            var str = ""
            for(var i=0;i<checkBox.length;i++){
                var that = i
                if(checkBox[i].checked){
                    arrCheck.push(checkBox[i].value)
                    str = str + checkBox[i].value + ","
                }

            }
            console.log(arrCheck.length)
            console.log(str)
            if(str=="" || str==undefined){
                $(".selUp5").html("执教学科（可多选）")
            }else{
                str = str.substring(0,str.length-1)
                $(".selUp5").html(str)
            }
        }
    }

    //查询班级
    $scope.selUp6 = function(){
        $scope.selUpDailog6 = !$scope.selUpDailog6
        if($scope.selUpDailog6 == false){
            var checkBox = document.getElementsByName("xdb");
            var arrCheck = []
            var str = ""
            for(var i=0;i<checkBox.length;i++){
                var that = i
                if(checkBox[i].checked){
                    arrCheck.push(checkBox[i].value)
                    str = str + checkBox[i].value + ","
                }

            }
            console.log(arrCheck.length)
            console.log(str)
            if(str=="" || str==undefined){
                $(".selUp6").html("执教学科（可多选）")
            }else{
                str = str.substring(0,str.length-1)
                $(".selUp6").html(str)
            }

        }
    }

    /***
     * 手机号纪录phoneName
     * 验证码
     * 密码passwordName
     */
    $scope.loginbtn2 = function(){
        if($.trim($scope.verificationCode) == ""){
            console.log(1)
            $(".errorContent3").show()
            return false;
        }else{
            $(".errorContent3").hide()
            if(phone){
                $(".errorContent1").hide()
                if(password){
                    $(".errorContent2").hide()
                    commonHttpService.httpRequest("post","/jxsd/sys/ifUserExists",httpData($scope.phoneName,$scope.passwordName).testCode(),testCodeFunc)
//  				$scope.showLogin = '2';
                }else{
                    console.log(2)

                    $(".errorContent2").show()
                }

            }else{
                $(".errorContent1").show()
            }
        }
    }


    function testCodeFunc(data){
//  	console.log(data)
        if(data.status=="1" || data.status==1){
            $scope.showLogin = '2';
        }else{

            layer.msg(data.info);
        }

    }

    $scope.loginbtn3 = function(){
        $scope.showLogin = '3';
    }

    $scope.loginbtn4 = function(){
        commonHttpService.httpRequest("post","/jxsd/sys/register",httpData($scope.phoneName,$scope.verificationCode,$scope.passwordName,$("#name").val(),$(".selUp2").html(),$(".selUp3").html(),$(".selUp1").html(),$(".selUp4").html(),$(".selUp5").html(),$(".selUp6").html()).register(),registerFunc)
    }

    //结果
    function registerFunc(data){
        console.log(data)
        if(data.status == "1"){
            $scope.showLogin = '4';
            $scope.dailogcheck = false;
        }else if((data.status == "7")){
            layer.msg(data.info);
        }else if((data.status == "8")){
            layer.msg(data.info);
        }else{
            layer.msg("填写信息有误");
        }
    }

    $scope.loginbtn5 = function(){
        $scope.showLogin = '1';
    }
    //登录接口
    $scope.loginbtn6 = function(){
//		$(".errorContent21").hide()
//		if($(".loginCheckY").html()=="验证码登录"){
        console.log($(".errorContent111").css("display"))
        console.log($(".errorContent21").css("display"))
        if($scope.userName == ""){
            $(".userName").addClass("loginNone");
            setTimeout(function(){
                $(".userName").removeClass("loginNone");
            },3000)
        }
        if($scope.userPassword == ""){
            $(".password").addClass("loginNone");
            setTimeout(function(){
                $(".password").removeClass("loginNone");
            },3000)
        }
        if($(".errorContent111").css("display")!="block" && $(".errorContent21").css("display")!="block"){

            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var ereg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            var loginWay;
            if(!myreg.test($scope.userName)){
                loginWay = 'loginEmail';
            }else if(!ereg.test($scope.userName)){
                loginWay = 'loginTel';
            }
            console.log(loginWay)
            commonHttpService.httpRequest("post","/jxsd/sys/login",httpData($scope.userName,$scope.userPassword,loginWay).login(),loginFunc)
        }
    }
    
    $scope.keySearch = function (event) {
		if (event.keyCode == 13) {
			$scope.loginbtn6();
		}
	};
	$scope.keySearch1 = function (event) {
		if (event.keyCode == 13) {
			$scope.loginbtn2();
		}
	};

    function codeFunc(data){
        console.log(data)
        if(data.status=="0"){
            $(".errorContent").html("用户名或验证码不正确")
            $(".errorContent").show()
            setTimeout(function(){
                $(".errorContent").hide()
            },3000)

        }
    }

    //忘记密码
    $scope.loginFooterF1 = function(){
        $(".loginContent").addClass("loginam2");
        setTimeout(function(){
            $(".loginContent").removeClass("loginam2")
        },1000)
        $scope.forget = '1'
    }

    $scope.loginFooterF2 = function(){
        if($.trim($scope.verificationCodeForget) == ""){
            $(".errorContent3_1").show()
            return false;
        }else{
            $(".errorContent3_1").hide()
            if(phoneFz){
                $(".errorContent1_1").hide()
                if(passwordFz){
                    $(".errorContent2_1").hide()
                    commonHttpService.httpRequest("post","/jxsd/sys/resetPassword",httpData($scope.phoneNameForget,$scope.passwordNameForget,$scope.verificationCodeForget).forget(),forgetTheFunc)
                }else{
                    $(".errorContent2_1").show()
                }

            }else{
                $(".errorContent1_1").show()
            }
        }
    }

    function forgetTheFunc(data){
        console.log(data)
        if(data.status=="0"){
            layer.msg(data.info)
        }else if(data.status=="1"){
//			$scope.forget = '1'
            $scope.forgetFinish = '2'
        }
    }

    $scope.returnDelu = function(){
        $scope.forget = '1'
        $scope.forgetFinish = '1'
    }

    $scope.backLogin = function(){
        $scope.showLogin = '1';
    }

    //关闭验证按钮
    $scope.examineTelClose = function(){
        $(".examineTel").hide();
    }

    //审核未通过时候事件
    $scope.noshtg = function(){
        layer.msg('<i class="iconfont icon-shenhe" style="font-size:100px;line-height:150px;color:#a9b7b7;"></i><p style="font-size:18px;padding:0 55px;">信息审核未完成</p><p style="padding-bottom:20px">暂不可使用本功能</p>');
    }
}])