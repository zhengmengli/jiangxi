var rootApp=angular.module('rootApp',['ui.router','ng-pagination','service.module']);
/**
 * 项目路由
 */
rootApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);

rootApp.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'html/login.html'
    })
    $stateProvider.state('app',{
        url:'/app',
        templateUrl:'html/app.html'
    })
    // 首页
    $stateProvider.state("app.workboard", {
        url: "/workboard",
        abstract: true,
        template: "<div ui-view style='height:100%;'></div>"
    });
    $stateProvider.state('app.workboard.main',{
        url:'/main',
        templateUrl:'html/main/main.html'
    })
    $stateProvider.state('app.workboard.basic',{
        url:'/basic',
        templateUrl:'html/main/basic.html'
    })
    $stateProvider.state('app.workboard.classInfo',{
        url:'/classInfo',
        templateUrl:'html/main/classInfo.html'
    })
    $stateProvider.state('app.workboard.detailPassword',{
        url:'/detailPassword',
        templateUrl:'html/main/detailPassword.html'
    })   
    $stateProvider.state('app.workboard.aboutUs',{
        url:'/aboutUs',
        templateUrl:'html/main/aboutUs.html'
    }) 
    // 课堂观测
    $stateProvider.state("app.ktgc", {
        url: "/ktgc",
        abstract: true,
        template: "<div ui-view></div>"
    });
    $stateProvider.state('app.ktgc.main',{
        url:'/main?type',
        templateUrl:'html/ktgc/main.html'
    })
    $stateProvider.state('app.ktgc.main1',{
        url:'/main/:tkjk',
        templateUrl:'html/ktgc/main.html'
    })
    $stateProvider.state('app.ktgc.addclass',{
        url:'/addclass',
        templateUrl:'html/ktgc/addClass.html'
    })
    $stateProvider.state('app.ktgc.detailclass',{
        url:'/detailclass:test',
        templateUrl:'html/ktgc/detailClass.html'
    })
    $stateProvider.state('app.ktgc.addlecture',{
        url:'/addlecture',
        templateUrl:'html/ktgc/addLecture.html'
    })
     $stateProvider.state('app.ktgc.addlectureTwo',{
        url:'/addlectureTwo',
        templateUrl:'html/ktgc/addLectureTwo.html'
    })
    $stateProvider.state('app.ktgc.attendclass',{
        url:'/attendclass:test1',
        templateUrl:'html/ktgc/attendClass.html'
    })
    // 采集指标
    $stateProvider.state("app.cjzb", {
        url: "/cjzb",
        abstract: true,
        template: "<div ui-view></div>"
    });
    $stateProvider.state('app.cjzb.main',{
        url:'/main?type',
        templateUrl:'html/cjzb/main.html'
    })
    $stateProvider.state('app.cjzb.main1',{
        url:'/main:test1',
        templateUrl:'html/cjzb/main.html'
    })
    // 评价报告
//  $stateProvider.state("app.pjbg", {
//      url: "/pjbg",
//      abstract: true,
//      template: "<div ui-view></div>"
//  });
    $stateProvider.state('app.pjbg.main',{
        url:'/main/:teachId',
        templateUrl:'html/pjbg/main.html'
    })
    $stateProvider.state('app.ktgc.cpbg',{
        url:'/cpbg/:teachId/:listenTeacherId/:num',
        templateUrl:'html/pjbg/cpbg.html'
    })
    //测评报告（新）
    $stateProvider.state('app.ktgc.evaluateReport',{
        url:'/evaluate_report/:teachId/:listenTeacherId/:num',
        templateUrl:'html/pjbg/evaluate_report.html'
    })
    
    $stateProvider.state("app.pjbg1", {
        url: "/pjbg1",
        abstract: true,
        template: "<div ui-view></div>"
    });
    $stateProvider.state('app.pjbg1.main',{
        url:'/main/:teachId',
        templateUrl:'html/pjbg1/main.html'
    })
    // 指标管理
    $stateProvider.state("app.zbgl", {
        url: "/zbgl",
        abstract: true,
        template: "<div ui-view></div>"
    });
    $stateProvider.state('app.zbgl.main',{
        url:'/main',
        templateUrl:'html/zbgl/main.html'
    })
    // 系统管理
    $stateProvider.state("app.xtgl", {
        url: "/xtgl",
        abstract: true,
        template: "<div ui-view></div>"
    });
    $stateProvider.state('app.xtgl.main',{
        url:'/main',
        templateUrl:'html/xtgl/main.html'
    })
    
    //分享
    $stateProvider.state('share',{
        url:'/share',
        templateUrl:'html/share/share.html'
    })    

}])

rootApp.service('jdhPath', function ($http, $q) {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var projectName = pathName.split("/")[1];
    var pos = curWwwPath.indexOf(projectName);
    //获取主机地址，如： http://localhost:8083
    localhostPath=curWwwPath.substring(0, pos);
    var finalRoot0 = localhostPath+projectName;
    var modulePath = {};
    //var ip_port='http://www.jxtqcic.com:8080';
    var ip_port='http://47.98.212.30:8080/';
    // var ip_port='http://58.240.82.126:8008/';
    //var ip_port='http://localhost:9090/';
    return {
    	finalIp:ip_port,
        finalRoot: finalRoot0,
        finalRoot1: ip_port+'/jxsd'
    };
});


