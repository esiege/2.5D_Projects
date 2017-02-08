function LobbyCtrl($scope, $rootScope, $http, userService, queryFactory, socket, crudService) {
    
    

	$rootScope.user = userService.user;

	$scope.match = function () {
	    var userConfig = {something:1};
        //crudService.post("Account/EnableMatchSearching", userConfig, function (results) {
        //    //userService.updateUser(results);
        //    console.log('Started Sessions Search');
        //});
        crudService.post("GameState/GetIt", 1, function (results) {
            //userService.updateUser(results);
            console.log(results);
        }, function(status) {}, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'authorization' : true });

	};

	socket.on('login:connectRoom', function (results) {
		userService.updateUser(results.room.users[results.localPos]);
		$rootScope.opponent = results.room.users[results.opponentPos];
		$rootScope.roomData = results;
		$rootScope.session = { sid: results.room.sid, localPos: results.localPos };

		console.log("connected");
		console.log(results);
		$scope.setScreen("Card");
	});



}
