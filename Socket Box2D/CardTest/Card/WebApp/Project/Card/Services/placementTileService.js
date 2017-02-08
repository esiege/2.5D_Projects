'use strict';

app.service('placementTileService', function (card_body, canvasService) {

    var m;
    canvasService.ready(function (c) {
        m = new Body({ canvas: c });
    });

    var userFloorTiles = {};
    var emptyFloorTiles = {};
    var opponentFloorTiles = {};

    var offset = 1920 / 25;

    var getXYFromPos = function (pos) {
        return { x: pos * offset, y: 530 };
    }


    return {
        init: function (canvas) {
            for (var i = 1; i <= 6; i++) {
                userFloorTiles["tile" + i] = card_body.init({
                    x: offset * i, y: 530, z: -1,
                    width: 60,
                    height: 60,
                    color: "gray",
                    position: i,
                    name: 'floor' + i,
                    scale: 0.5,
                    canvas: canvas,
                    isSensor: true,
                });
            }

            for (var i = 7; i <= 18; i++) {
                emptyFloorTiles["tile" + i] = card_body.init({
                    x: offset * i, y: 530, z: -1,
                    width: 60,
                    height: 60,
                    color: "lightgray",
                    position: i,
                    name: 'floor' + i,
                    scale: 0.5,
                    canvas: canvas,
                    isSensor: true,
                });
            }

            //first tile is farthest to the right, so indexes are symmetrical if player states are swapped
            for (var i = 1; i <= 6; i++) {
                opponentFloorTiles["tile" + i] = card_body.init({
                    x: -offset * i + 1920, y: 530, z: -1,
                    width: 60,
                    height: 60,
                    color: "darkgray",
                    position: i,
                    name: 'floor' + i,
                    scale: 0.5,
                    canvas: canvas,
                    isSensor: true,
                });
            }

            userFloorTiles["tile" + 1].floorTileRight = userFloorTiles["tile" + 2];
            userFloorTiles["tile" + 6].floorTileLeft = userFloorTiles["tile" + 5];
            for (var i = 1; i <= 5; i++) {
                userFloorTiles["tile" + i].floorTileLeft = userFloorTiles["tile" + (i - 1)];
                userFloorTiles["tile" + i].floorTileRight = userFloorTiles["tile" + (i + 1)];
            }
        },
        getXYFromPos: getXYFromPos,
        userFloorTiles: userFloorTiles,
        emptyFloorTiles: emptyFloorTiles,
        opponentFloorTiles: opponentFloorTiles,

    }


});
