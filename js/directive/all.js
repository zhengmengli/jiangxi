rootApp.directive("minHeight", ['$window',function ($window) {
    return {
        scope: false,
        restrict: "A",
        link: function (scope, elements, attrs) {
            $window.onresize = function () {
                setHeight();
            }
//          function setHeight() {
//              var windowHeight = document.documentElement.clientHeight;
//              var minHeight = windowHeight - 94 + 'px';
//              elements[0].style.minHeight = minHeight;
//              elements[0].style.backgroundColor = 'white';
//          }
			function setHeight(){ //函数：获取尺寸
			    //获取浏览器窗口高度
			    var winHeight=0;
			    if (window.innerHeight)
			        winHeight = window.innerHeight;
			    else if ((document.body) && (document.body.clientHeight))
			        winHeight = document.body.clientHeight;
			    //通过深入Document内部对body进行检测，获取浏览器窗口高度
			    if (document.documentElement && document.documentElement.clientHeight)
			        winHeight = document.documentElement.clientHeight;
			    //DIV高度为浏览器窗口的高度
			    console.log(winHeight)
				var minHeight = winHeight - 94 + 'px';
//				elements[0].style.height = minHeight;
				elements.css("height",minHeight)
                elements[0].style.backgroundColor = 'white';
			}            
            setHeight();
        }
    };
}])