function LobbyCtrl($scope, $rootScope, $http, userService, queryFactory, socket, crudService) {
	
	//$scope.testDataRed = data;
	//$scope.testDataBlue = data;
	
	$rootScope.user = userService.user;
	
	
	$scope.single = function () {
		userService.updateUser({
			Status: "Single"
		});

		socket.emit("player:register", userService.user, function (result) {
			console.log('socket res');
			console.log(result);
		});

		$scope.setScreen("Card");
	};
	
	$scope.match = function () {
		crudService.post("Session/EnableMatching", {}, function (results) {
			userService.updateUser(results.data);
			
			socket.emit("player:register", userService.user, function (result) {
				
				console.log('socket res');
				console.log(result);
			});
			
			
			console.log('Started Sessions Search');
			console.log(results);
		});
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
