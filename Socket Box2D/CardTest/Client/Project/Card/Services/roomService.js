'use strict';

app.service('roomService', function (socket, handService, minionService, structureService, queryFactory) {

    queryFactory.query('login:joinRoom', { sid: 1, playerStatus: 'playing', user: { name: "user1" } }, function (results) {
        console.log(results);
    });

    socket.on('login:reconnectRoom', function (results) {
        console.log('reconnected');
        handService.updateHand(results.cards, function () {
            console.log('hand set');
        });
        structureService.updateStructures();
    });

    //socket.on('structure:spawn', function (results) {
    //    structureService.spawn(results.structureId, results.minionId);
    //});

    socket.on('minions:update', function (results) {
        minionService.insertOrUpdate(results.minions);
    });

    socket.on('hand:update', function (results) {
        handService.updateHand(results.cards, function () {
            console.log('hand set');
        });
    });

    socket.on('updateInterval:ping', function (results) {

        if (results.updateInterval === 1) {
            console.log('begin');
        }

        queryFactory.query('updateInterval:recieved', { sid: 1, user: {} }, function (results) {
            console.log(results);
        });

    });


    return {
    }



});
