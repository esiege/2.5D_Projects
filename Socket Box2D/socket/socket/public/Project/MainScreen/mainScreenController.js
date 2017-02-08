var incog;
var canvType = "2d";

function MainCtrl($scope, $rootScope, socket, update, pageFactory, three_draw) {

	incog = false;
	$scope.incognito = incog;
	$scope.screenType = pageFactory.getPage();
	$rootScope.spriteList = [];
	$scope.showDebug = false;

	$scope.setScreen = function (screenType) {
		pageFactory.setPage(screenType);
		$scope.screenType = screenType;
	};

	$scope.quick = function () {
		//$scope.setScreen('Grid');
		$scope.setScreen('Login');
	};

	if ($scope.incognito) {
		$scope.opacIncog = .05;
		$scope.BGIncog = "background-image: url('images/bg.png')";
		//$scope.quick();
	};
	$scope.quick();

	$scope.webGLStart = function () {
		three_draw.init();
	};

}

