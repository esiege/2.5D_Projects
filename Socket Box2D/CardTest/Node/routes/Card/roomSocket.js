
var rooms = {};
var usersConnectionList = [];

var updateSocket = require('./updateSocket.js');
var playerSocket = require('./playerSocket.js');
var h = require('./helpers.js');
var a = require('../../app.js');

var request = require('request');
var apiPath = "http://192.168.1.60/CardTest/api/";




exports.drawCardsEvent = function (room) {
	if (room.users[0].cards.length < 10) {
		room.users[0].cards.push({
			id: room.cardIdCounter++,
			cardId: parseInt(Math.random() * 10 + 1)
		});
	}
	if (room.users[1].cards.length < 10) {
		room.users[1].cards.push({
			id: room.cardIdCounter++,
			cardId: parseInt(Math.random() * 10 + 1)
		});
	}
}

a.io.on('connection', function (socket) {
    
	socket.on('roomSocket', function () {
		
		
		//io.on('disconnect',, function (socket) {})) <-----
		
		//check for disconnects when no reply is sent
		socket.on('updateInterval:recieved', function (data) {
			h.getNetworkIP(function (error, ip) {
				if (error) { console.log('error:', error); }
            //player.ip = ip;
			}, false);

		});
		
		socket.on('structure:built', function (data) {
			playerSocket.getPlayer(rooms['room' + data.data.sid], function (player) {
				
				var structureCount = 0;
				var tempStructures = {};
				for (var i = 1; i <= 6; i++) {
					if (player.structures["spot" + i].id)
						structureCount++;
					
					tempStructures["spot" + i] = {
						id: player.structures["spot" + i].id,
						pos: i
					};
				}
				if (structureCount > 5) {
					console.log("Whoops, too many buildings.");
					socket.in('room' + data.data.sid).emit('structure:built', { error: "Whoops, too many buildings.", cardId: data.data.cardId });
					socket.in('room' + data.data.sid).broadcast.emit('structure:built', { error: "Whoops, too many buildings.", cardId: data.data.cardId });
				}
				else if (data.data.pos == 6 && tempStructures["spot" + 6].id) {
					console.log("Whoops, cant take last spot.");
					socket.in('room' + data.data.sid).emit('structure:built', { error: "Whoops, cant take last spot.", cardId: data.data.cardId });
					socket.in('room' + data.data.sid).broadcast.emit('structure:built', { error: "Whoops, cant take last spot.", cardId: data.data.cardId });
				}
				else {
					
					var cardFound = false;
					for (var i = 0; i < player.cards.length && !cardFound; i++) {
						if (player.cards[i].id == data.data.cardId) {
							cardFound = true;
							h.log("Removed Card", player.cards[i]);
							player.cards.splice(i, 1);

						}
					}
					if (!cardFound) {
						console.log("Card not found.");
					}
					else {
						for (var i = data.data.pos; i <= 5; i++) {
							if (tempStructures["spot" + i].id)
								player.structures["spot" + (i + 1)].id = tempStructures["spot" + i].id
							else break;
						}
						player.structures["spot" + data.data.pos].id = data.data.cardId;
					}
					
					
					socket.in('room' + data.data.sid).emit('hand:update', { cards: player.cards });
					socket.in('room' + data.data.sid).emit('structure:built', { structures: player.structures, cardId: data.data.cardId });
					socket.in('room' + data.data.sid).broadcast.emit('structure:built', { structures: player.structures });
				}
			});

		});
		
		//io.sockets.in( 'room' ).emit( 'event_name', data )
		socket.on('login:joinRoom', function (data) {
			h.log('socket.on', 'login:joinRoom');
			
			var p_slot_id = 1;
			
			if (!rooms['room' + data.data.sid]) {
				rooms['room' + data.data.sid] = {};
				rooms['room' + data.data.sid].users = [];
				rooms['room' + data.data.sid].cardIdCounter = 0;
				rooms['room' + data.data.sid].minionIdCounter = 0;
				rooms['room' + data.data.sid].minions = [];
				rooms['room' + data.data.sid].sid = data.data.sid;
				rooms['room' + data.data.sid].updateInterval = 0;
				p_slot_id = 0;
				
				console.log("Room Created:");
				console.log("Room: " + data.data.sid);
			}
			
			if (!rooms['room' + data.data.sid].users[p_slot_id]) {
				rooms['room' + data.data.sid].users[p_slot_id] = data.data.user;
				rooms['room' + data.data.sid].users[p_slot_id].slot_id = p_slot_id;
				
				socket.join('room' + data.data.sid);
				playerSocket.setupNewPlayer(rooms['room' + data.data.sid].users[p_slot_id], function (p) {
					
					h.log("Player Created", p);
					
					rooms['room' + data.data.sid].users[p_slot_id] = p;
					console.log("Room Joined:");
					console.log("Room: " + data.data.sid);
					
					if (rooms['room' + data.data.sid].users.length === 2) {
						
						var o_slot_id = 1;
						if (p_slot_id == 1)
							o_slot_id = 0;
						
						
						for (var i = 0; i < rooms['room' + data.data.sid].users.length; i++) {
							var player = rooms['room' + data.data.sid].users[i];
							socket.in('room' + data.data.sid).emit('login:joinRoom', { cards: player.cards, structures: player.structures });
						}
						
						console.log("Room Initiated:");
						console.log("Room: " + data.data.sid);
						
						updateSocket.sendUpdateInterval(rooms['room' + data.data.sid], socket, 500);
					}
				});
			} else {
				o_slot_id = 0; //need to find p-slot based on ip
				h.log("join", data.data.sid);
				socket.join('room' + data.data.sid);
				playerSocket.getPlayer(rooms['room' + data.data.sid], function (player) {
					socket.in('room' + data.data.sid).emit('login:reconnectRoom', { cards: player.cards, structures: player.structures });
				});
			}
		});
		
		
		socket.on('structure:get', function (data) {
			playerSocket.getPlayer(rooms['room' + data.data.sid], function (player, opponent) {
				socket.in('room' + data.data.sid).emit('structure:get', { userStructures: player.structures, opponentStructures: player.structures });
			});
		});
		
		socket.on('hand:get', function (data) {
			playerSocket.getPlayer(rooms['room' + data.data.sid], function (player) {
				socket.in('room' + data.data.sid).emit('structure:get', { structures: player.hand });
			});
		});
		
		
		socket.on('grid:sendFunctionCallToServer', function (data) {
			var session = data.data.session;
			
			var room = rooms['room' + session.sid];
			if (room) {
				var user = room.users[session.localPos];
				
				socket.in('room' + session.sid).broadcast.emit('grid:getFunctionCallFromServer', data);
            //socket.emit('grid:getFunctionCallFromServer', user);
			}
			else {
				h.log('room ' + session.sid + ' not found, possible rooms:', rooms);
			}

		});
		
		socket.on('grid:getUserFromServer', function (data) {
			var room = rooms['room' + data.data.sid];
			if (room) {
				var user = room.users[data.data.localPos];
				socket.emit('grid:getUserFromServer', user);
				socket.in('room' + data.data.sid).broadcast.emit('grid:sendUserFromServer', user);
			}
			else {
				h.log('room ' + data.data.sid + ' not found, possible rooms:', rooms);
			}
		});
		
		socket.on('grid:syncLocalDataInterval', function (data) {
			h.log("syncLocalDataInterval", data);
			
			var room = rooms['room' + data.data.sid];
			if (room) {
				room.users[data.data.localPos] = data.data.user;
				var user = room.users[data.data.localPos];
				
				socket.in('room' + data.data.sid).broadcast.emit('grid:syncLocalDataInterval', user);
			}
			else {
				h.log('room ' + data.data.sid + ' not found, possible rooms:', rooms);
			}
		});
	});
});