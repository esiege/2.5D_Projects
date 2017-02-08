var h = require('../routes/Card/helpers.js');
var request = require('request');
var a = require('../app.js');
var _ = a.underscore._;



var apiPath = "http://192.168.1.60/CardTest/api/";
var users = [];
exports.users = users;

exports.routines = {
    start: function () {    
        
        



    },
    register: function (user) {

    },
    addUser: function (token) {
        
        request(apiPath + 'Lobby/AttemptPairing', function (error, response, body) {
            var data = JSON.parse(body);
            
            h.log("response", JSON.parse(body));
        });
        
        var newUser = {};
        newUser.token = token;
        users.push(newUser);
    },
    getUser: function (token) {
        
        var returnUsers = _.where(users, { token: token });
        
        if (returnUsers.length > 1) {
            //todo: catch
        }
        else if (returnUsers.length === 0) {
            return null;
        } else if (returnUsers.length === 1) {
            return returnUsers[0];
        }

    }
};

