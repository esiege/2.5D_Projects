function LoginCtrl($scope, $rootScope, $http, userService, authService) {
    $scope.loginScreen = 'login';
    $scope.validationErrors = {};
    $scope.validationErrors.username = "";
    $rootScope.user = userService.user;
    
    //login--------------------------------------
    $scope.login = function () {
        if (!userService.user.username) {
            $scope.validationErrors.login = "Enter Username";
            return;
        }
        
        authService.login(function (status) {
            userService.setToken(status.data);
            $scope.setScreen("Lobby");
        }, function (status) {
            $scope.validationErrors.loginErrors = [status.data.error_description];
        });
    
    }
    
    //register------------------------------------
    $scope.register = function () {
        if (!userService.user.username) {
            $scope.validationErrors.username = "Enter Username";
            return;
        }
        
        authService.register(function (status) {
            $scope.message = "New Account Created";
            $scope.loginScreen = 'login';

        }, function (status) {
            $scope.validationErrors = status.data.modelState;
        });
        
    }
    
    $scope.setLogin = function (screenType) {
        $scope.validationErrors = {};
        $scope.loginScreen = screenType;
    };
    $scope.getValidationError = function (type) {
        if ($scope.validationErrors && $scope.validationErrors[type])
            return "has-error";
        else
            return null;
    }
}
