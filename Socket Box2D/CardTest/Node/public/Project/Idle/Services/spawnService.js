'use strict';

app.service('spawnService', function (new_body, boardService, mathService, playerService) {
	
	var spawnGroups = [];
	var activeBodies = [];
	var canvas;
	var id = 0;
	
	var spawn_defaults = function (b) {
		boardService.shiftingObjects.push(b);
		
		if (b.updateFunction) //suppport for single function
			updateFunctions.push(b.updateFunction);
		
		updateFunctions.push({
			execute: function (params) {
				if (!playerService.local.body)
					return;
				
				var playerPos = playerService.local.body.body.getPos();
				var distanceToPlayer = mathService.distanceBetweenTwoPoints(params.body.body.getPos(), playerService.local.body.body.getPos());
				params.body.body.details.distanceToPlayer = distanceToPlayer;
				
				
				
				var closestSpawn = true;
				for (var i = 0; i < activeBodies.length; i++) {
					
					if (params.body.body.details.distanceToPlayer > activeBodies[i].body.details.distanceToPlayer)
						closestSpawn = false;
				};
				
				if (closestSpawn) {
					playerService.playerTiggeredActions.closestEnemyEventCycle(params.body);
				}
				
				//shift position if we get stacked - TODO
				for (var i = 0; i < activeBodies.length; i++) {
					//body.body.getPos().x
				    
					//if (activeBodies[i].)

				};
				

			},
			params: {
				body: b,
				persist: true
			}
		});
		
		id++;
	}
	
	
	//scripts for each individual sprite's update routine
	var spriteActions = {
		
		flipAndFacePlayer: function (body) {
			if (playerService.local.body.body.getPos().x > body.body.getPos().x) {
				body.body.details.flipX = true;
			} else {
				body.body.details.flipX = false;
			}
		}, 
		
		chasePlayer: function (body) {
			var distanceToPlayer = mathService.distanceBetweenTwoPoints(body.body.getPos(), playerService.local.body.body.getPos());
			
			if (distanceToPlayer > 1) {
				var playerToTheRightSide = (playerService.local.body.body.getPos().x > body.body.getPos().x + 2);
				var playerToTheBottom = (playerService.local.body.body.getPos().y > body.body.getPos().y - 20);
				
				if (playerToTheRightSide)
					body.body.details.addBoardPosition({ x: body.body.details.stats.speed / 100 , y: 0 });
				else
					body.body.details.addBoardPosition({ x: -body.body.details.stats.speed / 100 , y: 0 });
				
				
				if (playerToTheBottom)
					body.body.details.addBoardPosition({ x: 0, y: body.body.details.stats.speed / 100 });
				else
					body.body.details.addBoardPosition({ x: 0, y: -body.body.details.stats.speed / 100 });

			}
		}

	};
	
	var spawn_ffOrange = function (position) {
		var b = new_body.init({
			boardPos: {
				x: position.x, y: position.y
			},
			stats: {
				speed: 0
			},
			width: 2,
			height: 3,
			stepMotionCounter: 0,
			name: 'ffOrange_' + id,
			image: "images/idle/chewyCrystalRat.png",
			canvas: canvas,
			color: 'rgb(40,0,0)',
			flipX: true,
			moving: true,
			pause: 10, /////////////////////add pause function to update - subtract each interval
			groupIndex: -1,
		});
		b.updateFunction = {
			execute: function (params) {
				if (!playerService.local.body)
					return;
				
				//active scripts
				spriteActions.chasePlayer(params.body);
				spriteActions.flipAndFacePlayer(params.body);
				
				
				
				if (params.body.moving) {
					if (params.body.stepMotionCounter >= 0) {
						params.body.body.addPos({ x: 0, y: 0.4 });
						params.body.stepMotionCounter++;
					} else {
						params.body.body.addPos({ x: 0, y: -0.4 });
						params.body.stepMotionCounter++;
					}
					
					if (params.body.stepMotionCounter > 12)
						params.body.stepMotionCounter *= -1;
				}

			},
			params: {
				body: b,
				persist: true
			}
		};
		
		spawn_defaults(b);
		activeBodies.push(b);
	}
	
	
	return {
		spawnGroup: function (c) {
			canvas = c;
			
			var position = { x: 5, y: 50 };
			var spawnGroup = [];
			var size = parseInt(22 * Math.random());
			
			size = 1;

			var spread = 1;
			var distance = 7;
			
			var sizeSqRootInt = Math.ceil(Math.sqrt(size));
			var cnt = 0;
			for (var x = 0; x < sizeSqRootInt; x++) {
				for (var y = 0; y < sizeSqRootInt; y++) {
					if (cnt >= size)
						break;
					
					var pos = {
						x: position.x + (x * distance),
						y: position.y + (y * distance)
					}
					
					spawn_ffOrange(pos);
					
					cnt++;
				};
			};
			
			
			spawn_ffOrange(position);




		},
		activeBodies: activeBodies,
		spawnGroups: spawnGroups

	}

});