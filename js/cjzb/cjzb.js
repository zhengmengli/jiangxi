rootApp.controller('cjzbCtrl', ["$scope", "$state", "$http", "$stateParams", "commonHttpService", "locals", "jdhPath", function ($scope, $state, $http, $stateParams, commonHttpService, locals, jdhPath) {
	//获取地址栏信息
	var url = JSON.parse($state.params.test1);
	var lessonCode1 = url.value1;
	var periodCode1 = parseInt(url.value2);
	var subjectCode1 = parseInt(url.value3);
	var listenTeacherId = parseInt(url.value4);
	var teachId = parseInt(url.value5);
	var teachTeacherId = parseInt(url.value6);
	var delpart, delIndex, delEle
	$scope.allData = [];
	//主辅/组织切换
	$scope.collectTypeList = [{
		name: '主辅教学',
		status: true,
		img: 'img/cjzb/zhufu.png',
		activeImg: 'img/cjzb/zhufu-hover.png'
	}, {
		name: '组织管理',
		status: true,
		img: 'img/cjzb/zuzhi.png',
		activeImg: 'img/cjzb/zuzhi-hover.png'
	}, {
		name: '作业布置',
		status: true,
		img: 'img/cjzb/zuzhi.png',
		activeImg: 'img/cjzb/zuzhi-hover.png'
	}, {
		name: '综合记录',
		status: false,
		img: 'img/cjzb/zhufu.png',
		activeImg: 'img/cjzb/zhufu-hover.png'
	}]
	$scope.type = function (index, name) {
		$scope.active = index;
		switch (index) {
			case 0:
				$scope.collectTypes = 1
				break;
			case 1:
				$scope.collectTypes = 2
				break;
			case 2:
				$scope.collectTypes = 4
			case 3:
				$scope.collectTypes = 3
				break;
			default:
				console.log("传入参数不符合要求")
		}
	}

	//第三级指标保存的对象
	$scope.lev3 = {};
	$scope.lev3.showAll = '展开全部'
	//  新增指标
	$scope.addStatus = false

	//点击完成之前
	$scope.btnClick = 1;
	$scope.active = 0;
	//生成报告的请求数据
	$scope.lv3_copy = [];
	$scope.collectTypes = {}
	$scope.marks = []

	/********************************主辅教学*********************************/
	$scope.level1 = [];
	$scope.level2 = [];
	$scope.level3 = [];
	// $scope.currentList = [];



	//  包含所有用时的数组
	$scope.times = [];
	var currentNumber = 0
	$scope.currentTime = []
	$scope.timeList = []
	//获取每级指标
	var param1 = {
		lessonCode: lessonCode1,
		parentClassCode: 0,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	$http.post(jdhPath.finalRoot1 + '/index/download', param1).then(function (response) {
		$scope.allData = response.data.data
		$scope.level1 = response.data.data.tree1;
		angular.forEach($scope.level1, function (item) {
			if (!("number" in item)) {
				item.number = 1;
				item.addNumber = 1;
			}
		})
		//debugger;
	}, function errorCallback(response) {
		console.info(response.data.info);
	});
	var optionFinish = 0;
	//获取指标项
	var optionList = {};
	$scope.optionObj = {};
	var param3 = {
		collectType: 1,
		lessonCode: lessonCode1,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	// $http.post(jdhPath.finalRoot1 + '/index/collect/option/list', param3).then(function (response) {
	// 	optionList = response.data.data;
	// 	for (key in optionList) {
	// 		$scope.optionObj[optionList[key].optionList[0].classCode3] = [];
	// 		$scope.optionObj[optionList[key].optionList[0].classCode3] = optionList[key].optionList;
	// 		angular.forEach(optionList[key].optionList, function (item, index) {
	// 			item.orderNums = 1;
	// 		});
	// 	}
	// 	optionFinish = 1;

	// }, function errorCallback(response) {
	// 	alert(response.data.info);
	// });
	//一二级
	$scope.active1 = -1;
	$scope.active2 = -2;
	$scope.active3 = -1;
	//  每个题的点击事件
	$scope.showAddPart = function (ind) {
		if ($scope.lev3.showAll === '展开全部') {
			$(".sep_field fieldset .level3Sel").eq(ind).toggleClass("toggle")
		}
	}
	//  展示全部题
	$scope.showAllFlag = function () {
		if ($scope.lev3.showAll === '全部收起') {
			$scope.lev3.showAll = '展开全部'
			$(".sep_field fieldset").addClass('retract')
			$(".sep_field fieldset .level3Sel").each(function (index, val) {
				// $(this).css({
				// 	'display': 'none'
				// })
				$(this).removeClass('show')
				$(this).addClass('hidd')
			})
		} else {
			$scope.lev3.showAll = '全部收起'
			$(".sep_field fieldset .level3Sel").each(function (index, val) {
				// $(this).css({
				// 	'display': 'inline-block'
				// })
				$(this).removeClass('hidd')
				$(this).addClass('show')
				$(".sep_field fieldset").removeClass('retract')
			})
		}
	}
	//  确认添加功能
	$scope.addSure = function () {
		let list = [];
		if (delIndex === 1) {
			switch (delPart) {
				case '主辅教学':
					list = $scope.level1
					break;
				case '组织管理':
					list = $scope.level4
					// delList = $scope.level33
					break;
				case '作业布置':
					list = $scope.level41
					// delList = $scope.level331

					break;
				default:
					console.log("传入参数不符合要求")
			}

		}
		if (delIndex === 2) {
			switch (delPart) {
				case '主辅教学':
					list = $scope.level2
					break;
				case '组织管理':
					list = $scope.level5
					// delList = $scope.level44
					break;
				case '作业布置':
					list = $scope.level51
					// delList = $scope.level441
					break;
				default:
					console.log("传入参数不符合要求")
			}
		}
		list.unshift($scope.addObj.addIndexList[$scope.addObj.curIndex])
		$scope.addStatus = false

	}
	//copy功能
	$scope.addFirstIndex = function (val, part) {
		delIndex = val
		delPart = part
		$scope.addStatus = true
		let addObj = {};
		let list = {}
		let delList = []
		if (val === 1) {
			switch (part) {
				case '主辅教学':
					list = $scope.level1
					delList = $scope.level11
					break;
				case '组织管理':
					list = $scope.level4
					delList = $scope.level33
					break;
				case '作业布置':
					list = $scope.level41
					delList = $scope.level331

					break;
				default:
					console.log("传入参数不符合要求")
			}
			addObj.addTitle = '添加一级指标'
			addObj.addIndexList = []
			Object.assign(addObj.addIndexList, delList)
			for (let item of list) {
				if (item.repeatFlag === 1) {
					addObj.addIndexList.push(item)
				}
			}

		}
		if (val === 2) {
			switch (part) {
				case '主辅教学':
					list = $scope.level2
					delList = $scope.level22
					break;
				case '组织管理':
					list = $scope.level5
					delList = $scope.level44
					break;
				case '作业布置':
					list = $scope.level51
					delList = $scope.level441
					break;
				default:
					console.log("传入参数不符合要求")
			}
			addObj.addTitle = '添加二级指标'
			addObj.addIndexList = []
			Object.assign(addObj.addIndexList, delList)
			for (let item of $scope.level2) {
				if (item.repeatFlag === 1) {
					addObj.addIndexList.push(item)
				}
			}
		}
		if (addObj.addIndexList.length === 0) {
			$(".copyList").text("暂无数据")
		} else {
			$scope.addObj = addObj
		}
		$(".animate1").removeClass('loginam2')
		$(".animate1").addClass('loginam')

	}
	$scope.addCancle = function () {
		$(".animate1").removeClass('loginam').addClass('loginam2')
		$scope.addStatus = false

	}

	//主辅教学一级指标点击
	$scope.fir = function (index) {
		$scope.collectTypes.indexCode1 = $scope.level1[index].cd
		$scope.level2 = $scope.level1[index].children;
		$scope.level3 = [];
		$scope.active1 = index;
		$scope.active2 = -1;
		$scope.active3 = -1;
	}
	//主辅教学二级指标点击
	$scope.sec = function (index, title) {
		$scope.collectTypes.indexCode2 = $scope.level2[index].cd
		$scope.level3Title = $scope.level2[index].nm
		once = []
		let tys = {
			typ1: {
				time: '',
				title: '学',
				cxt: []
			},
			typ2: {
				time: '',
				title: '思',
				cxt: []
			},
			typ3: {
				time: '',
				title: '行',
				cxt: []
			},
			typ4: {
				time: '',
				title: '省',
				cxt: []
			},
		}
		// if (optionFinish == 1) {
		let lv3 = $scope.level2[index].children;
		let opt1 = $scope.allData.option1;
		for (let i = 0; i < lv3.length; i++) {
			Object.keys(opt1).forEach(function (val, index) {
				if (val === lv3[i].cd) {
					lv3[i].classCode = opt1[val].li
				}
			})
		}

		for (let item of lv3) {
			// $scope.marks.push({indexCode3:item.cd,optionCode:item.pc,score:''})
			// console.log("$scope.marks",$scope.marks)
			if (item.it === 1) {
				tys.typ1.cxt.push(item)
			} else if (item.it === 2) {
				tys.typ2.cxt.push(item)
			} else if (item.it === 3) {
				tys.typ3.cxt.push(item)
			} else if (item.it === 4) {
				tys.typ4.cxt.push(item)
			}
		}
		$scope.level3 = tys;
		console.log("level3", $scope.level3)
		angular.forEach($scope.level3, function (item, index1) {
			if (!(item.classCode in item)) {
				item[item.cxt.classCode] = [];
				item[item.cxtclassCode] = angular.copy($scope.optionObj[item.cxt.classCode]);
			}
		});
		$scope.active2 = index;
		$scope.active3 = 0;
		// } else {
		// 	alert("正在加载");
		// }
		//		debugger;
	}
	//启动定时器功能
	var _id = 0;
	var once = []
	$scope.startTime = function (index) {
		if (once[index] === 1) {
			clearTimeout(_id)
			layer.msg('计时已停止，不能再次开始计时');
			return;
		}
		once[index] = 1;
		currentNumber = 0;
		let cha = 0;
		for (let i = 1; i < 4; i++) {
			console.log($scope.level3['typ' + i].cxt)
			if (!$scope.level3['typ' + i].cxt.length) {
				cha++
			}
		}
		clearTimeout(_id)
		// debugger
		run()

		function run() {
			const flg_h = 60 * 60
			const flg_m = 60
			let h = Math.floor(currentNumber / flg_h)
			let m = Math.floor((currentNumber - h * flg_h) / flg_m)
			let s = Math.floor(currentNumber - h * flg_h - m * flg_m)
			let time = h.toString().padStart(2, 0) + ':' + m.toString().padStart(2, 0) + ':' + s.toString().padStart(2, 0)
			$scope.level3['typ' + (index + 1)].time = time
				++currentNumber
			// debugger;
			$(".setTime").eq(index - cha).text(time)
			_id = setTimeout(function () {
				//   类中函数的调用
				run()
			}, 1000)
		}


		// setInterval(fucntion(){},1000)
	}
	// //复制
	// $scope.copy = function (item) {
	// 	item.addNumber++;
	// 	if (!('copy' in item)) {
	// 		var itemCopy = angular.copy(item);
	// 		//itemCopy.text+="(副本)";
	// 		itemCopy.text += "(" + (item.addNumber - 1) + ")";
	// 		itemCopy.copy = 1;
	// 		itemCopy.number = item.addNumber;
	// 		$scope.level1.push(itemCopy);
	// 	}
	// }
	// $scope.copy2 = function (item) {
	// 	if (item.copyCount == undefined) {
	// 		item.copyCount = 0;
	// 	}
	// 	item.copyCount++;
	// 	if (!('copy' in item)) {
	// 		var itemCopy = angular.copy(item);
	// 		itemCopy.text += "(" + (item.copyCount) + ")";
	// 		itemCopy.copy = 1;
	// 		$scope.level2.push(itemCopy);
	// 	}
	// }
	$scope.level11 = [];
	$scope.level22 = [];
	$scope.dialog1 = 0;
	$scope.dialog2 = 0;
	//删除功能封装
	$scope.del = function ($event, part, val, index) {
		$event.stopPropagation();
		delpart = part
		delIndex = val
		delEle = index
		$scope.dialog1 = 1;

	}
	//  得到当前删除的数据列表
	$scope.getPart = function (list, delList) {
		if (list.length != 0) {
			delList.push(list[delEle])
			list.splice(delEle, 1);
			flag1 = 0;
		}
		// $scope.currentList = delList;
		// if (list.length == 0) return
		// if (delEle == -1) {
		// 	flag1 = 0;
		// } else {
		// 	if (list.length != 0) {
		// 		delList.push(list[delEle])
		// 		list.splice(delEle, 1);
		// 		flag1 = 0;
		// 	}
		// 	$scope.currentList = delList;
		// 	flag2 = -2;
		// 	flag3 = -1;
		// 	console.log("hjjthgh",$scope.active51)
		// }

	}
	//删除1级指标
	$scope.Yes1 = function () {
		$scope.dialog1 = 0;
		let list, flag1, flag2, flag3, delList
		if (delIndex === 1) {
			switch (delpart) {
				case '主辅教学':
					list = $scope.level1
					$scope.active3 = -1
					$scope.active2 = -2
					delList = $scope.level11
					break;
				case '组织管理':
					list = $scope.level4
					$scope.active4 = -1
					$scope.active5 = -1
					// flag1 = $scope.active4
					// flag2 = $scope.active6
					// flag3 = $scope.active5
					delList = $scope.level33

					break;
				case '作业布置':
					list = $scope.level41
					$scope.active41 = -1
					$scope.active51 = -1
					delList = $scope.level331
					break;
				case '综合记录':
					list = $scope.level7
					$scope.active7 = -1
					$scope.active8 = -1
					delList = $scope.level71
					break;
			}
		}
		if (delIndex === 2) {
			switch (delpart) {
				case '主辅教学':
					list = $scope.level2
					$scope.active3 = -1
					delList = $scope.level22
					break;
				case '组织管理':
					list = $scope.level5
					$scope.active5 = -1
					delList = $scope.level44

					break;
				case '作业布置':
					list = $scope.level51
					$scope.active51 = -1
					delList = $scope.level441
					break;
				case '综合记录':
					list = $scope.level8
					$scope.active8 = -1
					delList = $scope.level81
					break;
			}
		}
		$scope.getPart(list, delList)
	}
	$scope.No1 = function () {
		$scope.dialog1 = 0;
	}
	// //一级返回
	// $scope.return = function (item, index) {
	// 	//把删除的元素放回原来的位置
	// 	$scope.level1.splice(item.orderNum - 1, 0, item);
	// 	$scope.level11.splice(index, 1);
	// 	$scope.active1 = 0;
	// }
	// //二级删除
	// $scope.deltwo = function () {
	// 	$scope.dialog2 = 1;
	// }
	// $scope.Yes2 = function () {
	// 	$scope.dialog2 = 0;
	// 	if ($scope.active2 == -1) {
	// 		// $scope.active2=0;
	// 	} else {
	// 		var level2Par = $scope.level1[$scope.active1];
	// 		if (!("children1" in level2Par)) {
	// 			level2Par.children1 = [];
	// 		}
	// 		if ($scope.level2.length != 0) {
	// 			level2Par.children1.push($scope.level2[$scope.active2]);
	// 			$scope.level3 = [];
	// 			$scope.level22 = level2Par.children1;
	// 			$scope.level2.splice($scope.active2, 1);
	// 			$scope.active2 = 0;
	// 			$scope.active3 = -1;
	// 		}
	// 	}
	// }
	// $scope.No2 = function () {
	// 	$scope.dialog2 = 0;
	// }
	// //二级返回
	// $scope.returntwo = function (item, index) {
	// 	var insertItem = $scope.level1[$scope.active1].children1[index];
	// 	$scope.level2.splice(insertItem.orderNum - 1, 0, insertItem);
	// 	$scope.level1[$scope.active1].children1.splice(index, 1);
	// 	//$scope.level22.length=0;
	// 	$scope.active2 = 0;
	// }
	/*******************************作业布置*********************************/
	$scope.level41 = [];
	$scope.level51 = [];
	$scope.level61 = [];
	var param31 = {
		lessonCode: lessonCode1,
		parentClassCode: 0,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	$http.post(jdhPath.finalRoot1 + '/index/download', param31).then(function (response) {
		$scope.level41 = response.data.data.tree4;
		angular.forEach($scope.level41, function (item) {
			if (!("number" in item)) {
				item.number = 1;
				item.addNumber = 1;
			}
		})
		//console.log($scope.level5)		
	}, function errorCallback(response) {
		alert(response.data.info);
	});
	var optionFinish11 = 0;
	//获取指标项
	var optionList21 = {};
	$scope.optionObj21 = {};
	var param41 = {
		collectType: 3,
		lessonCode: lessonCode1,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	// $http.post(jdhPath.finalRoot1 + '/index/collect/option/list', param41).then(function (response) {
	// 	optionList21 = response.data.data;
	// 	for (key in optionList21) {
	// 		$scope.optionObj21[optionList21[key].optionList[0].classCode3] = [];
	// 		$scope.optionObj21[optionList21[key].optionList[0].classCode3] = optionList21[key].optionList;
	// 		angular.forEach(optionList21[key].optionList, function (item, index) {
	// 			item.orderNums = 1;
	// 		});
	// 	}
	// 	optionFinish11 = 1;
	// }, function errorCallback(response) {
	// 	alert(response.data.info);
	// });

	$scope.active41 = -1;
	$scope.active51 = -1;
	$scope.active61 = -2;

	//作业布置一级指标点击
	$scope.firzz1 = function (index) {
		$scope.level51 = $scope.level41[index].children;
		$scope.level61 = [];
		$scope.active41 = index;
		$scope.active51 = -1;
	}
	//作业布置二级指标点击
	$scope.seczz1 = function (index, title) {
		$scope.level3Title = $scope.level51[index].nm
		let tys = {
			typ1: {
				time: '',
				title: '学',
				cxt: []
			},
			typ2: {
				time: '',
				title: '思',
				cxt: []
			},
			typ3: {
				time: '',
				title: '行',
				cxt: []
			},
			typ4: {
				time: '',
				title: '省',
				cxt: []
			},
		}

		let lv3 = $scope.level51[index].children;
		let opt1 = $scope.allData.option4;
		console.log("option", opt1)
		for (let i = 0; i < lv3.length; i++) {
			Object.keys(opt1).forEach(function (val, index) {
				if (val === lv3[i].cd) {
					lv3[i].classCode = opt1[val].li
				}
			})
		}
		for (let item of lv3) {
			if (item.it === 1) {
				tys.typ1.cxt.push(item)
			} else if (item.it === 2) {
				tys.typ2.cxt.push(item)
			} else if (item.it === 3) {
				tys.typ3.cxt.push(item)
			} else if (item.it === 4) {
				tys.typ4.cxt.push(item)
			}
		}
		$scope.level61 = tys;
		console.log("tys", tys)
		$scope.active51 = index;
		// } else {
		// 	alert("正在加载");
		// }

	}






	/*******************************组织管理*********************************/
	$scope.level4 = [];
	$scope.level5 = [];
	$scope.level6 = [];
	//获取每级指标
	var param2 = {
		lessonCode: lessonCode1,
		parentClassCode: 0,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	$http.post(jdhPath.finalRoot1 + '/index/download', param2).then(function (response) {
		$scope.level4 = response.data.data.tree2;
		angular.forEach($scope.level4, function (item) {
			if (!("number" in item)) {
				item.number = 1;
				item.addNumber = 1;
			}
		})
		//console.log($scope.level5)		
	}, function errorCallback(response) {
		alert(response.data.info);
	});

	var optionFinish1 = 0;
	//获取指标项
	var optionList2 = {};
	$scope.optionObj2 = {};
	var param4 = {
		collectType: 2,
		lessonCode: lessonCode1,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	// $http.post(jdhPath.finalRoot1 + '/index/collect/option/list', param4).then(function (response) {
	// 	optionList2 = response.data.data;
	// 	for (key in optionList2) {
	// 		$scope.optionObj2[optionList2[key].optionList[0].classCode3] = [];
	// 		$scope.optionObj2[optionList2[key].optionList[0].classCode3] = optionList2[key].optionList;
	// 		angular.forEach(optionList2[key].optionList, function (item, index) {
	// 			item.orderNums = 1;
	// 		});
	// 	}
	// 	optionFinish1 = 1;
	// }, function errorCallback(response) {
	// 	alert(response.data.info);
	// });

	$scope.active4 = -1;
	$scope.active5 = -1;
	$scope.active6 = -2;

	//组织管理一级指标点击
	$scope.firzz = function (index) {
		$scope.level5 = $scope.level4[index].children;
		$scope.level6 = [];
		$scope.active4 = index;
		$scope.active5 = -1;
	}
	//组织管理二级指标点击
	$scope.seczz = function (index, title) {
		$scope.level3Title = $scope.level5[index].nm
		let tys = {
			typ1: {
				time: '',
				title: '学',
				cxt: []
			},
			typ2: {
				time: '',
				title: '思',
				cxt: []
			},
			typ3: {
				time: '',
				title: '行',
				cxt: []
			},
			typ4: {
				time: '',
				title: '省',
				cxt: []
			},
		}
		// if (optionFinish == 1) {
		let lv3 = $scope.level5[index].children;
		let opt1 = $scope.allData.option2;
		for (let i = 0; i < lv3.length; i++) {
			Object.keys(opt1).forEach(function (val, index) {
				if (val === lv3[i].cd) {
					lv3[i].classCode = opt1[val].li
				}
			})
		}
		for (let item of lv3) {
			if (item.it === 1) {
				tys.typ1.cxt.push(item)
			} else if (item.it === 2) {
				tys.typ2.cxt.push(item)
			} else if (item.it === 3) {
				tys.typ3.cxt.push(item)
			} else if (item.it === 4) {
				tys.typ4.cxt.push(item)
			}
		}

		$scope.level6 = tys;
		angular.forEach($scope.level3, function (item, index1) {
			if (!(item.classCode in item)) {
				item[item.cxt.classCode] = [];
				item[item.cxtclassCode] = angular.copy($scope.optionObj[item.cxt.classCode]);
			}
		});
		$scope.active5 = index;

	}


	//------------------------------------------------------
	//复制
	$scope.double = function (item) {
		item.addNumber++;
		if (!('copy' in item)) {
			var itemCopy = angular.copy(item);
			itemCopy.text += "(" + (item.addNumber - 1) + ")";
			itemCopy.copy = 1;
			itemCopy.number = item.addNumber;
			$scope.level4.push(itemCopy);
		}
	}
	$scope.double2 = function (item) {
		if (item.copyCount == undefined) {
			item.copyCount = 0;
		}
		item.copyCount++;
		if (!('copy' in item)) {
			var itemCopy = angular.copy(item);
			itemCopy.text += "(" + (item.copyCount) + ")";
			itemCopy.copy = 1;
			$scope.level5.push(itemCopy);
		}
	}
	$scope.level33 = [];
	$scope.level331 = [];
	$scope.level71 = [];
	$scope.level81 = [];
	$scope.level441 = [];
	$scope.level44 = [];
	$scope.dialog3 = 0;
	$scope.dialog4 = 0;
	//一级删除
	$scope.cut = function () {
		$scope.dialog3 = 1;
	}
	$scope.Yes3 = function () {
		$scope.dialog3 = 0;
		if ($scope.active4 == -1) {
			$scope.active4 = 0;
		} else {
			if ($scope.level4.length != 0) {
				$scope.level33.push($scope.level4[$scope.active4]);
				$scope.level4.splice($scope.active4, 1);
				$scope.active4 = -1;

			}
			$scope.active6 = -2;
			$scope.active5 = -1;
		}
	}
	$scope.No3 = function () {
		$scope.dialog3 = 0;
	}
	//一级返回
	$scope.back = function (item, index) {
		$scope.level4.splice(item.orderNum - 1, 0, item);
		$scope.level33.splice(index, 1);
		$scope.active4 = 0;
	}

	//二级删除
	$scope.cuttwo = function () {
		$scope.dialog4 = 1;
	}
	$scope.Yes4 = function () {
		$scope.dialog4 = 0;
		if ($scope.active5 == -1) {} else {
			var level5Par = $scope.level4[$scope.active4];
			if (!("children1" in level5Par)) {
				level5Par.children1 = [];
			}
			if ($scope.level5.length != 0) {
				level5Par.children1.push($scope.level5[$scope.active5]);
				$scope.level6 = [];
				$scope.level44 = level5Par.children1;
				$scope.level5.splice($scope.active5, 1);
				$scope.active6 = 0;
				$scope.active5 = -1;
			}
		}
	}
	$scope.No4 = function () {
		$scope.dialog4 = 0;
	}
	//二级返回
	$scope.backtwo = function (item, index) {
		var insertItem = $scope.level4[$scope.active4].children1[index];
		$scope.level5.splice(insertItem.orderNum - 1, 0, insertItem);
		$scope.level4[$scope.active4].children1.splice(index, 1);
		$scope.active6 = 0;
	}

	/*******************************综合评价*********************************/
	$scope.level7 = [];
	$scope.level8 = [];
	$scope.level9 = [];
	//获取每级指标
	var param6 = {
		collectType: 4,
		lessonCode: lessonCode1,
		parentClassCode: 0,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	$http.post(jdhPath.finalRoot1 + '/index/download', param6).then(function (response) {
		$scope.level7 = response.data.data.tree3;
	}, function errorCallback(response) {
		alert(response.data.info);
	});
	var optionList3 = {};
	$scope.optionObj3 = {};
	var param7 = {
		collectType: 4,
		lessonCode: lessonCode1,
		periodCode: periodCode1,
		subjectCode: subjectCode1
	};
	// $http.post(jdhPath.finalRoot1 + '/index/collect/option/list', param7).then(function (response) {
	// 	optionList3 = response.data.data;
	// 	for (key in optionList3) {
	// 		//debugger;
	// 		$scope.optionObj3[optionList3[key].optionList[0].classCode3] = [];
	// 		$scope.optionObj3[optionList3[key].optionList[0].classCode3] = optionList3[key].optionList;
	// 		angular.forEach(optionList3[key].optionList, function (item, index) {
	// 			item.orderNums = 1;
	// 		});
	// 	}
	// }, function errorCallback(response) {
	// 	alert(response.data.info);
	// });
	$scope.active7 = -1;
	$scope.active8 = -1;

	//综合评价一级指标点击
	$scope.firtt = function (index) {
		$scope.level8 = $scope.level7[index].children;
		$scope.level9 = [];
		$scope.active7 = index;
		$scope.active8 = -1;
	}
	//得到指标显示的数据列表选中项
	$scope.getaddList = function (index) {
		$scope.addObj.curIndex = index
	}
	//综合评价二级指标点击
	$scope.sectt = function (index, title) {
		$scope.level3Title = $scope.level8[index].nm
		let tys = {
			typ1: {
				time: '',
				title: '学',
				cxt: []
			},
			typ2: {
				time: '',
				title: '思',
				cxt: []
			},
			typ3: {
				time: '',
				title: '行',
				cxt: []
			},
			typ4: {
				time: '',
				title: '省',
				cxt: []
			},
		}
		// if (optionFinish == 1) {
		let lv3 = $scope.level8[index].children;
		let opt1 = $scope.allData.option3;
		for (let i = 0; i < lv3.length; i++) {
			Object.keys(opt1).forEach(function (val, index) {
				if (val === lv3[i].cd) {
					lv3[i].classCode = opt1[val].li
				}
			})
		}
		for (let item of lv3) {
			if (item.it === 1) {
				tys.typ1.cxt.push(item)
			} else if (item.it === 2) {
				tys.typ2.cxt.push(item)
			} else if (item.it === 3) {
				tys.typ3.cxt.push(item)
			} else if (item.it === 4) {
				tys.typ4.cxt.push(item)
			}
		}

		$scope.level9 = tys;
		angular.forEach($scope.level3, function (item, index1) {
			if (!(item.classCode in item)) {
				item[item.cxt.classCode] = [];
				item[item.cxtclassCode] = angular.copy($scope.optionObj[item.cxt.classCode]);
			}
		});
		$scope.active8 = index;
	}
	//更改选项
	$scope.select = function (item, list) {
		if (item.optionType == 0) {

			angular.forEach(list, function (item1, index1) {
				item1.isDefault = 0;
			});
			item.isDefault = 1;
		} else {
			item.isDefault = item.isDefault == 1 ? 0 : 1;
		}
	}
	//获取更改指标项
	function getChecked(optionCode) {
		var list = [];
		for (var i = 0; i < $scope.level1.length; i++) {
			//debugger;
			if ($scope.level1[i].children) {
				for (var j = 0; j < $scope.level1[i].children.length; j++) {
					if ($scope.level1[i].children[j].children) {
						for (var h = 0; h < $scope.level1[i].children[j].children.length; h++) {
							if ($scope.level1[i].children[j].children[h][$scope.level1[i].children[j].children[h].classCode]) {
								for (var t = 0; t < $scope.level1[i].children[j].children[h][$scope.level1[i].children[j].children[h].classCode].length; t++) {
									if ($scope.level1[i].children[j].children[h][$scope.level1[i].children[j].children[h].classCode][t].isDefault == 1) {
										$scope.level1[i].children[j].children[h][$scope.level1[i].children[j].children[h].classCode][t].orderNums = $scope.level1[i].number;
										list.push($scope.level1[i].children[j].children[h][$scope.level1[i].children[j].children[h].classCode][t][optionCode]);
									}
								}
							}

						}
					}

				}
			}

		}
		return list;
	}
	//获取组织管理更改指标项
	function getChecked2(optionCode) {
		var list = [];
		for (key in $scope.optionObj2) {
			angular.forEach($scope.optionObj2[key], function (item, index) {
				if (item.isDefault == 1) {
					list.push(item[optionCode]);
				}
			});
		}
		return list;
	}
	//获取综合评价更改指标项
	function getChecked3(optionCode) {
		var list = [];
		for (key in $scope.optionObj3) {
			angular.forEach($scope.optionObj3[key], function (item, index) {
				if (item.isDefault == 1) {
					list.push(item[optionCode]);
				}
			});
		}
		return list;
	}
	$scope.list55 = [];
	$scope.list66 = [];
	// //确认按钮点击
	// $scope.certain = function () {
	// 	var list1 = getChecked("optionCode").join(",");
	// 	var list3 = getChecked2("optionCode").join(",");
	// 	var list5 = "";
	// 	if (list1.length == 0) {
	// 		list5 = list3;
	// 	} else if (list3.length == 0) {
	// 		list5 = list1;
	// 	} else {
	// 		list5 = list1 + "," + list3;
	// 	}
	// 	$scope.list55 = list5;
	// 	var list2 = getChecked("orderNums").join(",");
	// 	var list4 = getChecked2("orderNums").join(",");
	// 	var list6 = "";
	// 	if (list2.length == 0) {
	// 		list6 = list4;
	// 	} else if (list4.length == 0) {
	// 		list6 = list2;
	// 	} else {
	// 		list6 = list2 + "," + list4;
	// 	}
	// 	$scope.list66 = list6;
	// 	$scope.btnClick = 2;
	// 	$scope.active = 2;
	// }
	//  测试完成
	$scope.finished = function () {
		let text = $(".finish").text();
		if (text === '生成报告') {
			let marks = [];
			let times = [];
			let lev3 =[]
			// let lev3 = [...$scope.level3.typ1.cxt, ...$scope.level3.typ2.cxt, ...$scope.level3.typ3.cxt, ...$scope.level3.typ4.cxt];
			console.log("leveeee", Object.keys($scope.level3))
			for(let item of Object.keys($scope.level3)){
				console.log($scope.level3[item].cxt.length)
				if($scope.level3[item].cxt.length){
					lev3.push($scope.level3[item].cxt)
					debugger
					times.push({totalTime:$scope.level3[item].time})
				}
			}
			console.log("times",times)
			// for (let item of lev3) {
			// 	// times.push({
			// 	// 	timeType: item.it,
			// 	// 	totalTime: $scope.time
			// 	// })
			// }

			// for (let item of lev3) {
			// 	for (let part of item.classCode) {

			// 		if (part.df === 1) {
			// 			marks.push({
			// 				indexCode3: item.cd,
			// 				optionCode: item.pc,
			// 				score: part.score,
			// 			})
			// 		}
			// 	}
			// }
			let param = {
				collectTypes: {
					collectType: '',
					indexCode1: '',
					indexCode2: '',
				},
				marks: [{
					indexCode3: '',
					optionCode: '',
					score: '',
				}],
				times: [{
					timeType: '',
					totalTime: ''
				}],
				connectingCode: '',
				teachId: ''

			}
			$http.post(jdhPath.finalRoot1 + '/mark/addTeachMark', param).then(function (response) {

			}, function errorCallback(response) {
				console.info(response.data.info);
			});
		}
		if (text === '完成测评') {
			let list = $scope.collectTypeList
			$scope.active = 3;
			for (let item of list) {
				item.status = false
				if (item.name === '综合记录') {
					item.status = true
					$(".finish").text("生成报告").css({
						'background': '#447dfe',
						'color': '#fff'
					})
				}
			}
		}

	}
	//完成按钮点击
	$scope.finish = function () {
		var list7 = getChecked3("optionCode").join(",");
		var list8 = getChecked3("orderNums").join(",");
		var list77 = "";
		if (list7.length == 0) {
			list77 = $scope.list55;
		} else if ($scope.list55.length == 0) {
			list77 = list7;
		} else {
			list77 = $scope.list55 + "," + list7;
		}
		var list88 = "";
		if (list8.length == 0) {
			list88 = $scope.list66;
		} else if ($scope.list66.length == 0) {
			list88 = list8;
		} else {
			list88 = $scope.list66 + "," + list8;
		}
		var param10 = {
			listenTeacherId: listenTeacherId,
			optionCodes: list77,
			orderNums: list88,
			teachId: teachId,
			teachTeacherId: teachTeacherId
		}
		$http.post(jdhPath.finalRoot1 + '/index/collect/option/mark', param10).then(function (response) {
			$state.go("app.ktgc.main");
		}, function errorCallback(response) {
			alert(response.data.info);
		});
	}
}]);