'use strict';

app.service('cardService', function (targetService) {
    var activeCard = null;

    return {
        init: function (canvas) {
        },
        setActiveCard: function (card) {
            activeCard = card;
        },
        getActiveCard: function () {
            return activeCard;
        },
        useCard: function (target, cardId, callback) {

            //build on tile
            if (target.placementTilePosition)
                targetService.addStructure(target.placementTilePosition, cardId, callback)

            activeCard = null;
        }
    }
});