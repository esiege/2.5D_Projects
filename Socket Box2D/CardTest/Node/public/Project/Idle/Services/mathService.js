'use strict';

app.service('mathService', function () {
	
	
	return {
		translatePosition: function (x, y, z, height, width) {
			//three/box to 100 point grid
			//params - x: 0-100, y: 0-100 (if inside main area)
			//output - body pos
			
			var topLeftCorner = {
				x: 330 + width * 4.3,
				y: 665 - height * 4.3,
				z: -58
			}
			var bottomRightCorner = {
				x: 1600 - width * 4.3,
				y: 979 - height * 4.3,
				z: 19
			}
			var size = {
				x: bottomRightCorner.x - topLeftCorner.x,
				y: bottomRightCorner.y - topLeftCorner.y,
				z: bottomRightCorner.z - topLeftCorner.z
			}
			
			// z value scales on y pos
			var retPos = {
				x: topLeftCorner.x + (size.x * (x / 100)),
				y: topLeftCorner.y + (size.y * (y / 100)),
				z: topLeftCorner.z + (size.z * (y / 100))
			}
			
			if (z)
				retPos.z += z;
			
			return retPos;
		},
		getZPos: function (x, y, z, height, width) {
			
			var topLeftCorner = {
				x: 330 + width * 4.3,
				y: 665 - height * 4.3,
				z: -58
			}
			var bottomRightCorner = {
				x: 1600 - width * 4.3,
				y: 979 - height * 4.3,
				z: 19
			}
			var size = {
				x: bottomRightCorner.x - topLeftCorner.x,
				y: bottomRightCorner.y - topLeftCorner.y,
				z: bottomRightCorner.z - topLeftCorner.z
			}

			var percentageOfBoardHeight = ((y - topLeftCorner.y) / size.y);
			var ret = topLeftCorner.z + percentageOfBoardHeight * size.z;
			
			ret += z;

			return ret;

		},
		distanceBetweenTwoPoints: function (p, q) {
			var dx = p.x - q.x;
			var dy = p.y - q.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			return dist;
		},
		spiral: function (x, y) {
			var iy = 0, ix = 0
                , hr = (x - 1) / 2
                , vr = (y - 1) / 2
                , tt = x * y
                , matrix = []
                , step = 1
                , dx = 1
                , dy = 0;
			
			while (matrix.length < tt) {
				
				if ((ix <= hr && ix >= (hr * -1)) && (iy <= vr && (iy >= (vr * -1)))) {
					//console.log(ix, iy);
					matrix.push({ x: ix, y: iy });
				}
				
				ix += dx;
				iy += dy;
				
				// check direction
				if (dx !== 0) {
					// increase step
					if (ix === step && iy === (step * -1)) step++;
					
					// horizontal range reached
					if (ix === step || (ix === step * -1)) {
						dy = (ix === iy) ? (dx * -1) : dx;
						dx = 0;
					}
				} else {
					// vertical range reached
					if (iy === step || (iy === step * -1)) {
						dx = (ix === iy) ? (dy * -1) : dy;
						dy = 0;
					}
				}
			}
			
			return matrix;
		}

	}

});