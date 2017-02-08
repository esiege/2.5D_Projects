'use strict';

app.service('minionService', function (card_body, structureService, placementTileService, canvasService) {

    var minions = [];
    var getById = function (id) {
        for (var i = 0; i < minions.length; i++) {
            if (minions[i].id === id)
                return minions[i];
        }
        return null;
    }

    return {
        init: function (canvas) {
        },
        insertOrUpdate: function (minionList) {
            canvasService.ready(function (canvas) {
                //minionId, pos, structureId

                for (var i = 0; i < minionList.length; i++) {

                    var minion = getById(minionList[i].id);
                    var structure = structureService.getStructureById(minionList[i].structureId);

                    if (!structure)
                        break;

                    if (!minion) {
                        minions.push(card_body.init({
                            x: placementTileService.getXYFromPos(minionList[i].pos).x,
                            y: placementTileService.getXYFromPos(minionList[i].pos).y + 60,
                            b_structure: structureService.getStructureById(minionList[i].structureId),
                            z: 3,
                            width: 30,
                            height: 30,
                            id: minionList[i].id,
                            color: !!structure ? structureService.getStructureById(minionList[i].structureId).body.details.color : null,
                            image: "images/card/minion.png",
                            scale: 0.3,
                            flipX: structureService.getStructureById(minionList[i].structureId).friendly,
                            friendly: structureService.getStructureById(minionList[i].structureId).friendly,
                            name: 'minion' + minionList[i].id,
                            canvas: canvas,
                            groupIndex: -1,
                            stepFunction: function (body) {
                                var pos = body.getPos();

                                if (pos.x > 1920 || pos.x < 0) {
                                    body.destroy();
                                }

                            },
                        }));
                    } else {
                        minion.body.setPos({
                            x: placementTileService.getXYFromPos(minionList[i].pos).x,
                            y: placementTileService.getXYFromPos(minionList[i].pos).y + 60
                        });
                    }
                }
            });
        },
        addFromStructure: function (structure, minionId) {
            if (!structure)
                return;

            canvasService.ready(function (canvas) {

                minions.push(card_body.init({
                    x: placementTileService.getXYFromPos(structure.pos).x,
                    y: placementTileService.getXYFromPos(structure.pos).y + 60,
                    b_structure: structure,
                    z: 3,
                    width: 30,
                    height: 30,
                    id: minionId,
                    color: structure.body.details.color,
                    image: "images/card/minion.png",
                    scale: 0.3,
                    flipX: structure.friendly,
                    friendly: structure.friendly,
                    name: 'minion' + minionId,
                    canvas: canvas,
                    groupIndex: -1,
                    stepFunction: function (body) {
                        var pos = body.getPos();

                        if (pos.x > 1920 || pos.x < 0) {
                            body.destroy();
                        }

                    },
                }));

                //if ( structure.friendly )
                //    minions[index - 1].body.setForce( { x: 1.8, y: 0 } );
                //else
                //    minions[index - 1].body.setForce( { x: -1.8, y: 0 } );

            });
        },

    }

});

