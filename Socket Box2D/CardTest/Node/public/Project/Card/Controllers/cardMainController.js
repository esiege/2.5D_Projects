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

		card_body.init({
			x: 60,
			y: 60,
			z: -5,
			width: 100,
			height: 100,
			image: "images/shared/card.png",
			scale: .26,
			name: 'card1',
			color: 'blue',
			canvas: canvas,
			groupIndex: -1,
		});
		card_body.init({
			x: 200,
			y: 60,
			z: -5,
			width: 100,
			height: 100,
			image: "images/shared/card.png",
			scale: .26,
			name: 'card2',
			color: 'blue',
			canvas: canvas,
			groupIndex: -1,
		});
		card_body.init({
			x: 340,
			y: 60,
			z: -5,
			width: 100,
			height: 100,
			image: "images/shared/card.png",
			scale: .26,
			name: 'card3',
			color: 'blue',
			canvas: canvas,
			groupIndex: -1,
		});
		
		
		card_body.init({
			x: 960,
			y: 539.5,
			z: -19,
			width: 1920,
			height: 1080,
			image: "images/shared/background.png",
			//normalMap: "images/shared/background_NRM.jpg",
			scale: .26,
			name: 'bg',
			canvas: canvas,
			groupIndex: -1,
		});




    });


    $scope.webGLStart = function () {
        
    };

}
