function LoginCtrl( $scope, $rootScope, queryFactory, socket, update )
{
    $scope.loginScreen = 'login';
    $scope.validationErrors = {};
    $scope.validationErrors.userName = "";
    var userList = null;
    $rootScope.user = {};

    $scope.getValidationError = function ( type )
    {
        if ( $scope.validationErrors[type] )
            return "has-error";
        else
            return null;
    }

    $scope.login = function ()
    {
        if ( !$rootScope.user.userName )
        {
            $scope.validationErrors.login = "Enter Username";
            return;
        }

        queryFactory.query( 'account:getUserLogin2', { where: "userName = '" + $rootScope.user.userName + "'" }, function ( results )
        {
            if ( !results.results.length )
            {
                $scope.validationErrors.login = "Username not found";
                return;
            }

            $rootScope.user.last_connection = new Date();
            $rootScope.user.status = "Lobby";

            queryFactory.updateNewUser( $rootScope.user, function () { } );
            $scope.setScreen( "Lobby" );
        } );
    }

    $scope.addNewUser = function ()
    {
        if ( !$rootScope.user.userName )
        {
            $scope.validationErrors.userName = "Enter Username";
            return;
        }

        queryFactory.query( 'account:getUserLogin', { where: "userName = '" + $rootScope.user.userName + "'" }, function ( results )
        {
            if ( results.results.length )
            {
                $scope.validationErrors.userName = "Username already exists";
                return;
            }

            queryFactory.query('account:addUserLogin', $rootScope.user, function (results) { $scope.loginScreen = 'login'; });
            $scope.message = "Account Created";
        } );





    }


    $scope.setLogin = function ( screenType )
    {
        $scope.validationErrors = {};
        $scope.loginScreen = screenType;
    };

}
