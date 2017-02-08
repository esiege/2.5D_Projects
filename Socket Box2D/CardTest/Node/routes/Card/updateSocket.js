var playerSocket = require('./playerSocket.js');
var roomSocket = require('./roomSocket.js');
var cardSocket = require('./cardSocket.js');
var minionSocket = require('./minionSocket.js');
var h = require('./helpers.js');


var sendUpdateInterval = function (room, socket, timeout) {

    setTimeout(sendUpdateInterval, timeout, room, socket, timeout);

    minionSocket.updateMinionsByInterval(room, socket);


    if (room.updateInterval === 0) {
        cardSocket.drawCardsEvent(room);
        cardSocket.drawCardsEvent(room);
        cardSocket.drawCardsEvent(room);
        cardSocket.drawCardsEvent(room);
        playerSocket.getPlayer(room, function (player) {
            socket.in('room' + room.sid).emit('hand:update', { cards: player.cards });
            socket.in('room' + room.sid).broadcast.emit('hand:update', { cards: player.cards });
        });
    }
    else if (room.updateInterval % 48 === 0) {
        cardSocket.drawCardsEvent(room);
        playerSocket.getPlayer(room, function (player) {
            socket.in('room' + room.sid).emit('hand:update', { cards: player.cards });
            socket.in('room' + room.sid).broadcast.emit('hand:update', { cards: player.cards });
        } );

        playerSocket.getPlayer(room, function (player) {
            for (var i = 1; i <= 6; i++) {
                var s = player.structures["spot" + i];
                if (s.id) {
                    room.minionIdCounter++;
                    room.minions.push({
                        id: room.minionIdCounter,
                        pos: s.pos,
                        structureId: s.id,
                        playerId: player.id
                    });

                    socket.in('room' + room.sid).emit('minions:update', { minions: room.minions });
                    socket.in('room' + room.sid).broadcast.emit('minions:update', { minions: room.minions });
                }
            }
        });
    }
    room.updateInterval++;

    h.getNetworkIP(function (error, ip) {
        if (error) { console.log('error:', error); }
        room.ip = ip;
    }, false);
};

exports.sendUpdateInterval = sendUpdateInterval;