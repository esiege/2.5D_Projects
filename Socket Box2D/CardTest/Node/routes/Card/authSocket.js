
var updateSocket = require('./updateSocket.js');
var playerSocket = require('./playerSocket.js');
var h = require('./helpers.js');
var a = require('../../app.js');

var request = require('request');
var apiPath = "http://192.168.1.60/CardTest/api/";


h.log("authSocket initialized.");


a.io.on('connection', function (socket) {
    
        
        socket.on('player:register', function (player) {
            h.log("player", player);
        });

});