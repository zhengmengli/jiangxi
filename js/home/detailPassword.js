rootApp.controller('detailPasswordCtr',["$scope","$state","$http","$stateParams","httpService","commonHttpService","locals",function ($scope,$state,$http,$stateParams,httpService,commonHttpService,locals) {
	var connectingCode = locals.get("connectingCode");
	var phoneName = locals.get("phone");
	var id = ""
	function httpData(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10){
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
			info:function(){
				return {
					connectingCode:data1
				}	
			},	
			updateInfo:function(){
				return {
					tel:data1,
					connectingCode:data2,
					name:data3,
					districtCode:data4,
					schoolCode:data5,
					teachClassList:data6
				}	
			},
		}

	}		
	//完成
	$scope.finish = function(){
		console.log($scope.name2)
		if($.trim($scope.name1)=="" || $scope.name1==undefined || $.trim($scope.name2)=="" || $scope.name2==undefined || $.trim($scope.name3)=="" || $scope.name3==undefined){
			layer.msg('请完善所有信息');
		}else{
			if(password1 && password2 && password3){
				if($scope.name3 != $scope.name2){
					layer.msg('新密码不一致');
				}else{
					if($scope.name1!=$scope.name3){
						var ans = {
							id:id,
							password:$scope.name1,
							newPassword:$scope.name3,
							tel:phoneName
						}
						$.ajax({
							type:"post",
							url:commonHttpService.http + "/jxsd/sys/updatePassword",
							async:true,
							contentType:"application/json",
							dataType:"json",
							data:JSON.stringify(ans),
							success:function(data){
								console.log(data)
								if(data.status=="1" || data.status==1){
									layer.msg('密码修改成功');
									setTimeout(function(){
										$state.go('app.workboard.main')
									},3000)
								}else{
									layer.msg('原始密码输入有误');
								}
							}
						});						
					}else{
						layer.msg('请输设置不同的密码');
					}
					
				}				
			}else{
				layer.msg('请完善所有信息');
			}		
		}
	}
	
	var password1 = false;
	var password2 = false;
	var password3 = false;
	$scope.passwordNameChange1 = function(){
		
		if ($scope.name3!=$scope.name2) {
			$(".errorContent21").show()
			password3 = false;
		}else{
			$(".errorContent21").hide()
			password3 = true;
		}

		if($scope.name3 == ""){
			$(".errorContent21").hide()
			password3 = false;
		}		
	}

	$scope.passwordNameChange = function(){
		var patrn=/^([a-zA-Z0-9]|[._!@#$%^&*]){6,16}$/;
		if (!patrn.exec($scope.name2)) {
			$(".errorContent2").show()
			password2 = false;
		}else{
			$(".errorContent2").hide()
			password2 = true;
		}

		if($scope.name2 == ""){
			$(".errorContent2").hide()
			password2 = false;
		}		
	}	
	$scope.passwordNameChange2 = function(){
		var patrn=/^([a-zA-Z0-9]|[._!@#$%^&*]){6,16}$/;
		if (!patrn.exec($scope.name1)) {
			$(".errorContent12").show()
			password1 = false;
		}else{
			$(".errorContent12").hide()
			password1 = true;
		}

		if($scope.name1 == ""){
			$(".errorContent12").hide()
			password1 = false;
		}		
	}	
	
	//关闭
	$scope.goBack = function(){
		$state.go('app.workboard.main')
	}
    //个人信息
    commonHttpService.httpRequest("post","/jxsd/sys/myInfo",httpData(connectingCode).info(),infoFunc)
//  debugger
    function infoFunc(data){
    	console.log(data)
//  	$scope.name1 = data.data.password;
		id = data.data.id;
    }	
	
}])