function LobbyCtrl($scope, $rootScope, queryFactory, socket, update) {
	$scope.single = function () {
		if (!$rootScope.user.userName) {
			$scope.validationErrors.login = "Enter Username";
			return;
		}

		$rootScope.user.status = "Matching";
		queryFactory.updateActivePlayer($rootScope.user, 1, function () {
			console.log('Started Sessions Search');
			//either create new session id and set status to 'Matching' or copy from existing and set status to 'Session Found'
			queryFactory.query('login:getSessionId', { userName: $rootScope.user.userName }, function (results) {
			});

			//timeout checking status for 'Session Found'
			checkForSessions();
		});
	};

	$scope.match = function () {
		$scope.lobbyStatus = 'Matching';


		if (!$rootScope.user.userName) {
			$scope.validationErrors.login = "Enter Username";
			return;
		}

		$rootScope.user.status = "Matching";
		queryFactory.updateActivePlayer($rootScope.user, 1, function () {
			console.log('Started Sessions Search');
			//either create new session id and set status to 'Matching' or copy from existing and set status to 'Session Found'
			queryFactory.query('login:getSessionId', { userName: $rootScope.user.userName }, function (results) {
			});

			//timeout checking status for 'Session Found'
			checkForSessions();
		});
	};

	function checkForSessions() {
		if ($scope.lobbyStatus != 'Matching')
			return;

		console.log('Checking for Sessions');

		//check for session found

		//if found, assign room based on session id

		queryFactory.query('login:getSessionStatus', { where: "userName = '" + $rootScope.user.userName + "' and status = 'Session Found'" }, function (results) {
			if (!results.results.length)
				return;

			$rootScope.user.sid = results.results[0].session_id;

			//timeout checking status for 'Session Found'
			$scope.lobbyStatus = 'Session Found';
			console.log('Found Session');
			createRoomAndEnter($rootScope.user.sid);
		});

		if ($scope.lobbyStatus == 'Matching')
			window.setTimeout(function () { checkForSessions(); }, 3000);

	}

	function createRoomAndEnter(sid) {
		queryFactory.query('login:joinRoom', { sid: sid, playerStatus: 'playing', user: $rootScope.user }, function (results) { });
	}

	socket.on('login:connectRoom', function (results) {
		$rootScope.user = results.room.users[results.localPos];
		$rootScope.opponent = results.room.users[results.opponentPos];
		$rootScope.roomData = results;
		$rootScope.session = { sid: results.room.sid, localPos: results.localPos };

		console.log("connected");
		console.log(results);
		$scope.setScreen("Grid");
	});



}
