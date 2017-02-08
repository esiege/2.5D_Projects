
var h = require('./helpers.js');
var playerIdCounter = 0;


exports.getPlayer = function(room, callback) {
    h.getNetworkIP(function(error, ip) {
        var player;

        for (var i = 0; i < room.users.length; i++) {
            if (room.users[i].ip[0] == ip[0]) //need much better logic here, with real opponent check
                player = room.users[i];
        }

        if (!player)
            console.log("Whoops, player not found.");
        else
            callback(player, room.users[0]);

    }, false);
};

exports.setupNewPlayer = function (player, callback) {
    player.hp = 100;
    player.mp = 100;
    player.stamina = 100;
    player.id = playerIdCounter++;

    player.position = {};
    player.position.y = 100;

    player.cards = [];

    player.structures = {};
    for (var i = 1; i <= 6; i++) {
        player.structures["spot" + i] = {
            id: null,
            pos: i
        }
    }

    h.getNetworkIP(function (error, ip) {
        if (error) { console.log('error:', error); }
        player.ip = ip;
        callback(player);
    }, false);

}