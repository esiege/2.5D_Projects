'use strict';

app.service('playerService', function (new_body, boardService, bodyInitializerService, mathService) {
	
	
	var currentPos = { x: 0, y: 0 };
	var local = {};
	var bulletIndex = 0;
	
	var playerActions = {
		move: function (params) {
			if (params.details.moving) {
				for (var i = 0; i < boardService.shiftingObjects.length; i++) {
					boardService.shiftingObjects[i].body.addPos({ x: 2, y: 0 });
				};
				
				if (params.details.stepMotionCounter >= 0) {
					params.details.body.addPos({ x: 0, y: 0.4 });
					params.details.stepMotionCounter++;
				} else {
					params.details.body.addPos({ x: 0, y: -0.4 });
					params.details.stepMotionCounter++;
				}
				
				if (params.details.stepMotionCounter > params.details.stepMotionCounterMax)
					params.details.stepMotionCounter *= -1;
			}
		}
	};
	
	var weaponActions = {
		move: function (params) {
			if (params.playerDetails.moving) {
				if (params.details.stepMotionCounter >= 0) {
					params.details.body.addPos({ x: 0.2, y: 0.3 });
					params.details.stepMotionCounter++;
				} else {
					params.details.body.addPos({ x: -0.2, y: -0.3 });
					params.details.stepMotionCounter++;
				}
				
				if (params.details.stepMotionCounter > params.playerDetails.stepMotionCounterMax)
					params.details.stepMotionCounter *= -1;
			}
		},
		recoilGun: function (params) {
			if (params.details.recoil) {
				if (params.details.recoilCounter >= 0) {
					params.details.body.addPos({ x: 1.5, y: 0.0 });
					params.details.recoilCounter++;
				} else {
					params.details.body.addPos({ x: -1.5, y: -0.0 });
					params.details.recoilCounter++;
				}
				
				if (params.details.recoilCounter > 4)
					params.details.recoilCounter *= -1;
				
				if (params.details.recoilCounter == 0)
					local.body_gun.recoil = false;
			}
		}
	};
	
	var playerTiggeredActions = {
		closestEnemyEventCycle: function (spawnBody) {
			if (spawnBody.distanceToPlayer <= local.body.stats.attackRange) {
				local.body.moving = false;
				
				if (local.body.stats.attackCooldownTimer <= 0) {
					weaponTiggeredActions.fireAtSpawn(spawnBody);
					local.body.stats.attackCooldownTimer = local.body.stats.attackCooldown;
				}

			} else if (spawnBody.distanceToPlayer < local.body.stats.sightRange) {
				local.body.moving = true;
				
				
				console.log('move');
			}
		}
	};
	
	var debugSingleShot = false;
	
	var weaponTiggeredActions = {
		fireAtSpawn: function (spawnBody) {
			
			local.body_gun.recoil = true;
			
			if (!debugSingleShot)
				bodyInitializerService.basicBulletParticles();
			
			debugSingleShot = true;

			//var bullet = new_body.init({
			//	x: 910,
			//	y: 880,
			//	z: local.body.z,
			//	width: 1,
			//	height: 1,
			//	lifespan: 200,
			//	name: 'bullet_' + bulletIndex,
			//	image: "images/idle/eyeBullet.png",
			//	canvas: local.canvas,
			//	color: 'rgb(220,220,100)',
			//	moving: true,
			//	materialType: 'Basic',
			//	particle: {
			//		intensity: 1
			//	},
			//	light: {
			//		intensity: .3,
			//		z: 32,
			//		yMod: 12,
			//		color: 'white'
			//	},//todo move to node.js service
			//	stats: {
			//		speed: 25
			//	},
			//	groupIndex: -1,
			//});
			//bullet.updateFunction = {
			//	execute: function (params) {
			//		var spawnPos = params.spawnBody.body.getPos();
			//		spawnPos.z = params.spawnBody.z;
			//		var playerPos = local.body.body.getPos();
			//		playerPos.z = local.body.z;
					
			//		var distance = {
			//			x: spawnPos.x - playerPos.x - params.spawnBody.width * 4.3  - local.body_gun.width * 4.3 ,
			//			y: spawnPos.y - playerPos.y - params.spawnBody.height * 4.3  - local.body_gun.height * 4.3 ,
			//			z: spawnPos.z - playerPos.z,
			//		};
					
					
			//		//convert to percentage
			//		var normalized = {
			//			x: distance.x / (Math.abs(distance.x) + Math.abs(distance.y)),
			//			y: distance.y / (Math.abs(distance.x) + Math.abs(distance.y)),
			//		};
					
					
					
			//		//todo change getZPos to normlized routine in mathService

			//		params.details.body.addPos({ x: params.details.stats.speed * normalized.x, y: params.details.stats.speed * normalized.y });
			//		params.details.z = mathService.getZPos(params.details.body.getPos().x, params.details.body.getPos().y, null, params.details.height, params.details.width);
					
			//		params.details.lifespan--;
					
			//		if (params.details.lifespan <= 0) {
			//			params.details.body.destroy();
						
			//			for (var i = 0; i < updateFunctions.length; i++) {
			//				if (updateFunctions[i].index == params.details.name) {
			//					updateFunctions.splice(i, 1);
			//					i--;
			//				}
			//			};
			//			for (var i = 0; i < local.body_gun.activeBullets.length; i++) {
			//				if (local.body_gun.activeBullets[i].name == params.details.name) {
			//					local.body_gun.activeBullets.splice(i, 1);
			//					i--;
			//				}
			//			};
			//			params.details.deleted = true;
			//			delete params.details;
			//		}
			//	},
			//	params: {
			//		details: bullet,
			//		spawnBody: spawnBody ,
			//		persist: true
			//	},
			//	index: 'bullet_' + bulletIndex,
			//};
			//local.body_gun.activeBullets.push(bullet);
			//updateFunctions.push(bullet.updateFunction);
			
			//bulletIndex++;

		}
	};
	
	var bulletTiggeredActions = function () {




	};
	
	return {
		currentPos: currentPos,
		local: local,
		playerTiggeredActions: playerTiggeredActions,
		bulletTiggeredActions: bulletTiggeredActions,
		init: function (canvas) {
			local.canvas = canvas;
			local.body = new_body.init({
				//x: 960,
				//y: 850,
				boardPos: {
					x: 50, y: 80
				},
				width: 10,
				height: 15,
				name: 'ffwiz',
				stepMotionCounter: 14,
				stepMotionCounterMax: 12,
				image: "images/idle/plagueDoctor.png",
				//image: "images/test/40pBoundBox.png",
				canvas: canvas,
				color: 'rgb(0,0,100)',
				moving: true,
				light: {
					intensity: .3,
					z: 32,
					yMod: 12,
					color: 'white'
				},//todo move to node.js service
				stats: {
					attackRange: 300,
					sightRange: 2000,
					attackCooldown: 30,
					attackCooldownTimer: 0
				},
				groupIndex: -1,
			});
			
			local.body.updateFunction = {
				execute: function (params) {
					playerActions.move(params);

				},
				params: {
					details: local.body,
					persist: true
				}
			};
			updateFunctions.push(local.body.updateFunction);
			
			local.body_gun = new_body.init({
				boardPos: {
					x: 48, y: 72, z: 8
				},
				width: 8,
				height: 5,
				scale: 0.02,
				stepMotionCounter: 14,
				recoilCounter: 0,
				name: 'playerWeapon',
				image: "images/idle/gun.png",
				canvas: canvas,
				color: 'rgb(90,0,100)',
				moving: true,
				groupIndex: -1,
				activeBullets: [],
			});
			local.body_gun.updateFunction = {
				execute: function (params) {
					weaponActions.move(params);
					weaponActions.recoilGun(params);
					
					
					if (local.body.stats.attackCooldownTimer > 0)
						local.body.stats.attackCooldownTimer--;
				},
				params: {
					details: local.body_gun,
					playerDetails: local.body,
					persist: true
				}
			};
			updateFunctions.push(local.body_gun.updateFunction);
		}
	}

});