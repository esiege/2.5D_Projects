'use strict';

app.service('eventService', function (spawnService) {

    return {
        beginNewStage: function (canvas) {

            spawnService.spawnGroup(canvas);


        },
        clearedSpawn: function() {
            
        }
    }

});