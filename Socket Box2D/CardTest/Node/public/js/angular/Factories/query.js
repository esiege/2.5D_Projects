'use strict';

app.factory('queryFactory', function ($rootScope, socket) {
    var queryFactory = {};
    var activeSockets = {};

    queryFactory.query = function (emitCall, data, callback, noEmit) {
        if (!(noEmit == true))
            socket.emit(emitCall, { data: data });

        if (!activeSockets[emitCall]) {
            activeSockets[emitCall] = true;
            socket.on(emitCall, function (results) {
                callback(results);
            });
        }
    }


    queryFactory.updateActivePlayer = function (user, id, callback) {
        user.where = "username = '" + user.username + "'";
        queryFactory.query('login:updateActivePlayer' + id, user, function (results) {
            if (callback)
                callback();
        });
    }


    queryFactory.updateNewUser = function (user, callback) {
        queryFactory.query('login:removeUserFromActive', { where: "username = '" + user.username + "'" }, function (results) {
            queryFactory.query('login:addUserToActive', user, function (results) {
                if (callback)
                    callback();
            });
        });
    }


    return queryFactory;

});
