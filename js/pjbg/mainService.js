rootApp.service('cpbgService',["$http",function ($http) {
	function echartsOption1(score,name,time){
		var echartsOption1 = {
		    title: {
		        text: ''
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: { // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: ['评测得分','所用时间'],
		        left:"center",
		        bottom:"0",
		        itemWidth:15,
		        itemHeight:15
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '8%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        data: name
		        	//['1默读文本', '2观看课件', '3听讲', '4教师提问', '5回忆旧知']
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '数量',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    }],
		    series: [
		       {
		        name: '所用时间',
		        type: 'bar',
		        barWidth : 30,
		        itemStyle:{
		        	normal:{
		        		color:"#1E70E9"
		        	}
		        },
		        data: time
		    }, 
		    {
		        name: '评测得分',
		        type: 'bar',
		        barWidth : 30,
		        itemStyle:{
		        	normal:{
		        		color:"#FFB430"
		        	}
		        },
		        data: score
		    }]
		};
		
		return echartsOption1;
	}
	
	/**
	 * 饼图
	 */
	function pieEcharts(name,sumScoreData,avgScoreData,titleText){
		var pieEcharts = {
				title:{
					text: titleText,
			        subtext: '',
			        x:'center'
				},
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			    	top:10,
			        orient: 'vertical',
			        x: 'left',
			        data:name
			    },
			    series: [
			        {
			            name:'总分',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: true,
		
			            labelLine: {
			                normal: {
			                    show: true
			                }
			            },
			            data:sumScoreData
			        },
			        {
			            name:'平均分',
			            type:'pie',
			            radius: ['20%', '40%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '12',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:avgScoreData
			        }
			    ]
		};		
		return pieEcharts;
	}

	
	function leidaEcharts(arr1,arr2,arr3,arr4){
	    
		var defaultFontSize = 14,
		    defaultTextColor = '#636c72',
		    defaultGlobalColor = ['#8EE5EE', '#62c87f'],
		    defaultFontFamily = 'microsoft yahei',
		    defaultBackgroundColor = '#fff',
		    defaultShadowColor = 'rgba(204, 214, 235, 0.247059)';
		
		var leidaEcharts = {
		    title: {
		        text: '',
		        top: 10,
		        left: 'center',
		        textStyle: {
		            fontSize: 18,
		            fontWeight: 400
		        }
		    },
		    backgroundColor: defaultBackgroundColor, // 背景色，默认无背景。
		    color: defaultGlobalColor, // 调色盘颜色列表。
		    textStyle: { // 全局字体样式
		        color: defaultTextColor,
		        fontSize: defaultFontSize
		    },
		    legend: {
		        bottom: 0,
		        left: 'center',
		        width: 500,
		        itemWidth: 14,
		        itemHeight: 14,
		        itemBorderRadius: 8,
		        textStyle: {
		            // color: "#d7d7d7"
		        },
		        data: ['总分','平均分']
		    },
		    tooltip: { // 提示框组件
		        trigger: 'item', // 触发类型 可选为：'axis' | 'item' | 'none'
		        axisPointer: { // 坐标轴指示器，坐标轴触发有效
		            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
		            shadowStyle: {
		                color: defaultShadowColor
		            }
		        }
		    },
		    radar: {
		        // shape: 'circle',
		        splitArea: {
		            show: false
		        },
		        splitLine: {
		            lineStyle: {
		                color: ['#eae9e9', '#eae9e9', '#eae9e9', '#eae9e9', '#eae9e9', '#eae9e9']
		            }
		        },
		        axisLine: {
		            lineStyle: {
		                color: '#eae9e9'
		            }
		        },
		        indicator: arr4
		    },
		    series: [{
		        name: '雷达图',
		        type: 'radar',
		        symbol: 'none',
		        data: [{
		            value: arr1,
		            name: '总分',
		            z: 3,
		            areaStyle: {
                        normal: {
                            opacity: 1,
                            color: '#8EE5EE'
                        }
                    }
		        }
		        ]
		    }]
		};
	    
	    return leidaEcharts;
	}


	return{
		echartsOption1:echartsOption1,
		pieEcharts:pieEcharts,
		leidaEcharts:leidaEcharts
	}
}]);