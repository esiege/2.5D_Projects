'use strict';

function CardMainCtrl($scope, $rootScope, socket, canvasService, cardService, roomService, handService, card_body, three_draw, queryFactory, placementTileService, structureService, uiService) {

    canvasService.ready(function (canvas) {
        Listener();
        placementTileService.init(canvas);
        structureService.init(canvas);
        uiService.init(canvas);
        cardService.init(canvas);
        beginUpdate($rootScope);
		three_draw.init(canvas);
		socket.emit('roomSocket', { my: 'data' });
        socket.emit('blah', { my: 'data' });
    });


    $scope.webGLStart = function () {
        
    };

}
