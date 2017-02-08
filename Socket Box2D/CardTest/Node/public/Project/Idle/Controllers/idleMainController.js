'use strict';

function IdleMainCtrl($scope, $rootScope, socket, canvasService, boardService, boardScenery, mathService, playerService, eventService, spawnService, three_draw, new_body) {
	
	
	
	canvasService.ready(function (canvas) {
		Listener();
		
		beginUpdate($rootScope);
		three_draw.init(canvas);
		socket.emit('roomSocket', { my: 'data' });
		socket.emit('blah', { my: 'data' });


        eventService.beginNewStage(canvas);
		
		boardScenery.init(canvas);
		spawnService.spawnGroup(canvas);

        playerService.init(canvas);



	    boardService.initBackDrop(new_body, canvas);



	});
}
