var playerSocket = require('./playerSocket.js');
var roomSocket = require('./roomSocket.js');
var cardSocket = require('./cardSocket.js');
var h = require('./helpers.js');


exports.updateMinionsByInterval = function (room, socket) {
    var updateInterval = room.updateInterval;


    if (updateInterval % 4 === 0) {
        for (var i = 0; i < room.minions.length; i++) {
            if (room.minions[i].pos >= 26) {
                room.minions.splice(i--, 1);
            }
            else {
                room.minions[i].pos++;

                var matchingPosMinions = [];

                for (var j = 0; j < room.minions.length; j++) {
                    if (room.minions[j].pos === room.minions[i].pos && room.minions[j].playerId !== room.minions[i].playerId)
                        matchingPosMinions.add(room.minions[j]);
                }
            }

        }

        socket.in('room' + room.sid).emit('minions:update', { minions: room.minions });
        socket.in('room' + room.sid).broadcast.emit('minions:update', { minions: room.minions });
        h.log("Minions", room.minions);
        h.log("updateInterval", updateInterval);












    }


};