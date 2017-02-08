'use strict';

app.service('targetService', function (structureService, placementTileService) {


    return {
        isTileAvailable: function(pos)
        {
            return !!placementTileService.floorTiles["tile" + pos].id;
        },
        addStructure: function (pos, id, callback)
        {
            structureService.add(pos, id, callback);
        }
    }



});
