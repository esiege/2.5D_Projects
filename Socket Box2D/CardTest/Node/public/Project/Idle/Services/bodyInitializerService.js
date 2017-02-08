'use strict';

var updateCalls = [];
var cache = {}; //todo add image cache


app.service('bodyInitializerService', function (new_body, canvasService) {
	
	var autoId = 0;
	var checkValid = function (id) {
		if (!id) {
			autoId += 10000;
			id = autoId;
		}
		
		return id;
	}
	
	return {
		basicBulletParticles: function (id) {
			
			if (!(id = checkValid(id)))
				return;
			
			canvasService.ready(function (canvas) {
				var b = new_body.init({
					x: 916,
					y: 865,
					particleCount: 1800,
					width: 15,
					height: 15,
					name: 'basicBulletParticles_' + id,
					canvas: canvas,
					groupIndex: -1,
				});
			});
			
		},
		eyeBullet: function (id) {
			
			if (!checkValid(id))
				return;
			
			canvasService.ready(function (canvas) {
				var bullet = new_body.init({
					x: 916,
					y: 865,
					width: 15,
					height: 15,
					stepMotionCounter: 0,
					name: 'bullet_' + id,
					image: "images/idle/eyeBullet.png",
					canvas: canvas,
					color: 'rgb(220,220,100)',
					moving: true,
					hidden: true,
					light: {
						intensity: .3,
						z: 32,
						yMod: 12,
						color: 'white'
					},//todo move stats to node.js service
					stats: {
						speed: 10
					},
					groupIndex: -1,
				});
			});
		}
	}

});