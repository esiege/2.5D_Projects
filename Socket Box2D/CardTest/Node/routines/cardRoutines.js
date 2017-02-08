
var h = require('../routes/Card/helpers.js');
var request = require('request');
var apiPath = "http://192.168.1.60/CardTest/api/";

exports.routines = {
	start: function () {

	    setInterval(this.checkForMatches, 1000, 1);

	},
    checkForMatches: function (i) {
		



		//request(apiPath + 'Lobby/AttemptPairing', function (error, response, body) {
		//	var data = JSON.parse(body);

		//	h.log("response", JSON.parse(body));
		//});
	

    }
};

