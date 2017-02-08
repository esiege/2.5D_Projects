'use strict';

app.service('uiService', function (card_body, cardService, roomService, canvasService, placementTileService, structureService) {

    var b_interfaceAreaTop;
    var b_interfaceAreaBottom;

    var m;
    canvasService.ready(function (c) {
        m = new Body({ canvas: c });
    });

    return {
        init: function (canvas) {
            for (var tile in placementTileService.userFloorTiles) {
                placementTileService.userFloorTiles[tile].hoverFunction = [
                        function (b) {
                            if (cardService.getActiveCard()) {
                                //set active body
                                var mouseBody = cardService.getActiveCard().body;
                                mouseBody.details.b_activeTile = b

                                structureService.hover(b.position);
                            }
                        }
                ]
            }


            b_interfaceAreaTop = card_body.init({
                x: 0, y: placementTileService.yPos - 45, width: 9999, height: 20,
                color: 'red',
                name: 'interfaceAreaTop',
                isSensor: true,
                hidden: true,
                canvas: canvas,
                hoverFunction: [
                    function (b) {
                        var mouseBody = cardService.getActiveCard();
                        if (!mouseBody || !mouseBody.b_activeTile)
                            return;

                        structureService.returnFromHover();
                        delete mouseBody.b_activeTile;
                    }
                ]

            })
            b_interfaceAreaBottom = card_body.init({
                x: 0, y: placementTileService.yPos + 45, width: 9999, height: 20,
                color: 'red',
                name: 'interfaceAreaBottom',
                isSensor: true,
                hidden: true,
                canvas: canvas,
                hoverFunction: [
                    function (b) {
                        var mouseBody = cardService.getActiveCard();
                        if (!mouseBody || !mouseBody.b_activeTile)
                            return;

                        structureService.returnFromHover();
                        delete mouseBody.b_activeTile;

                    }
                ],
            })
        }
    }

});
