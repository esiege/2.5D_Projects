'use strict';

app.service('boardScenery', function (new_body, boardService) {
	
	var activeBodies = [];
	var inactiveBodies = [];
	var loadedBodies = [];

    return {
        init: function (canvas) {
			for (var i = 0; i < 50; i++) {
				var bush = new_body.init({
					boardPos: {
						x: Math.random() * 1000 - 900,
						y: Math.random() * 100
					},
					width: 8,
					height: 8,
					name: 'bush' + i,
					image: "images/idle/eyeplant.png",
					color: 'rgb(155,155,155)',
					canvas: canvas,
					groupIndex: -1,
				});
				boardService.shiftingObjects.push(bush);
			};
			for (var i = 0; i < 50; i++) {
				
				var bush_b = new_body.init({
					boardPos: {
						x: Math.random() * 1000 - 900,
						y: Math.random() * 100
					},
					width: 8,
					height: 8,
					scale: 0.25,
					name: 'bush_b' + i,
					image: "images/idle/bush_b.png",
					color: 'rgb(155,155,155)',
					canvas: canvas,
					groupIndex: -1,
				});
				boardService.shiftingObjects.push(bush_b);
			};
			for (var i = 0; i < 50; i++) {
				var rand = Math.random();
				
				var bush_c = new_body.init({
					boardPos: {
						x: Math.random() * 1000 - 900,
						y: Math.random() * 100
					},
					width: 8,
					height: 8,
					name: 'bush_c' + i,
					image: "images/idle/bush_c.png",
					color: 'rgb(155,155,155)',
					canvas: canvas,
					groupIndex: -1,
				});
				boardService.shiftingObjects.push(bush_c);
			};
			for (var i = 0; i < 50; i++) {
				var rand = Math.random();
				var randMin = Math.random();
				
				while (randMin < 0.3)
					randMin = Math.random();
				
				var rock = new_body.init({
					boardPos: {
						x: Math.random() * 1000 - 900,
						y: Math.random() * 100
					},
					width: 8,
					height: 8,
					name: 'rock' + i,
					image: "images/idle/rock.png",
					color: 'rgb(155,155,155)',
					canvas: canvas,
					groupIndex: -1,
				});
				boardService.shiftingObjects.push(rock);
				
			};
        },
        activeBodies: activeBodies
	}

});