'use strict';

app.service('boardService', function () {
	
	//var wallColor = 'rgb(255,255,255)';
	//var floorColor = 'rgb(255,255,255)';
	
	var shiftingObjects = [];
	
	var wallColor = 'rgb(0,0,0)';
	var floorColor = '#273e3e';
	
	return {
		initBackDrop: function (new_body, canvas) {
			new_body.init({
				x: 970,
				y: 240,
				z: -64,
				width: 4230,
				height: 2278,
				scale: 0.35,
				name: 'bg',
				//image: "images/idle/bg.png",
				color: wallColor,
				canvas: canvas,
				groupIndex: -1,
			});
			new_body.init({
				x: 970,
				y: 200,
				z: -62.1,
				width: 40,
				height: 128,
				name: 'tower',
				image: "images/idle/tower.png",
				color: floorColor,
				canvas: canvas,
				groupIndex: -1,
			});
			new_body.init({
				x: 1270,
				y: 200,
				z: -63,
				width: 13,
				height: 34,
				name: 'tower2',
				image: "images/idle/tower.png",
				color: floorColor,
				canvas: canvas,
				groupIndex: -1,
			});
			new_body.init({
				x: 470,
				y: 200,
				z: -63,
				width: 30,
				height: 64,
				name: 'tower3',
				image: "images/idle/tower.png",
				color: floorColor,
				canvas: canvas,
				groupIndex: -1,
			});
			new_body.init({
				x: 970,
				y: 820,
				z: -20,
				width: 1200,
				height: 700,
				scale: 1,
				name: 'ground',
				color: floorColor,
				canvas: canvas,
				groupIndex: -1,
				rotation: {
					y: 0,
					x: -130
				}
			});
			new_body.init({
				x: 310,
				y: 820,
				z: -20,
				width: 1200,
				height: 1200,
				scale: 1,
				name: 'leftWall',
				color: wallColor,
				canvas: canvas,
				groupIndex: -1,
				rotation: {
					y: 180,
					x: -130
				}
			});
			new_body.init({
				x: 1610,
				y: 810,
				z: -20,
				width: 1200,
				height: 1200,
				scale: 1,
				name: 'rightWall',
				color: wallColor,
				canvas: canvas,
				groupIndex: -1,
				rotation: {
					y: -180,
					x: -130
				}
			});
			//new_body.init({
			//	x: 960,
			//	y: 520,
			//	z: -50,
			//	width: 1800,
			//	height: 1200,
			//	scale: 1,
			//	name: 'backWall',
			//	materialType: 'Depth',
			//	color: wallColor,
			//	canvas: canvas,
			//	groupIndex: -1,
			//	rotation: {
			//		x: 90
			//	}
			//});
		},
		shiftingObjects: shiftingObjects
	}

});