'use strict';

function CardMainCtrl($scope, $rootScope, canvasService, cardService, roomService, handService, card_body, three_draw, queryFactory, placementTileService, structureService, uiService) {

    canvasService.ready(function (canvas) {
        Listener();
        placementTileService.init(canvas);
        structureService.init(canvas);
        uiService.init(canvas);
        cardService.init(canvas);
        beginUpdate($rootScope);
        three_draw.init(canvas);
    });


    $scope.webGLStart = function () {
        
    };

}
