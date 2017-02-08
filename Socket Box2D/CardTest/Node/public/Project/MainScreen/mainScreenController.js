var incog;

function MainCtrl($scope, $rootScope, socket, update, pageFactory, authService, crudService) {
    
    
    

    incog = false;
    $scope.incognito = incog;
    $scope.screenType = pageFactory.getPage();
    $rootScope.spriteList = [];
    $scope.showDebug = false;
    
    $scope.setScreen = function (screenType) {
        pageFactory.setPage(screenType);
        $scope.screenType = screenType;
    };
    
    if ($scope.incognito) {
        $scope.BGIncog = "background-image: url('images/bg.png');";
        $scope.opacIncog = "opacity:1;"
    };
    
	//$scope.setScreen('login');
    $scope.setScreen('Idle');
}

