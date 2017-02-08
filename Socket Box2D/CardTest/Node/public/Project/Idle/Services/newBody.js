'use strict';

var updateCalls = [];
var cache = {}; //todo add image cache


app.service('new_body', function (mathService) {
	
	this.init = function (dets) {
		this.details = {
			shape: "block",
			activity: "idle",
			name: "unnamed",
			color: "red",
			height: 30,
			width: 30,
			radius: 5,
			scale: 0.5,
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			density: 1,
			fixedRotation: true,
			doubleHeight: false,
			controllable: false,
			visible: true,
			groupIndex: 1,
			layer: 0,
			update: function () { },
			destroyEvent: function (body) { gl_destroy(body) },
			bindBody: [],
			tags: {},
		}
		
		for (var det in dets)
			this.details[det] = dets[det];
		
		if (this.details.offsets)
			this.details.startOffsets = this.details.offsets;
		
		this.details.setBoardPosition = function () {
			var pos = mathService.translatePosition(this.boardPos.x, this.boardPos.y, this.boardPos.z, this.height, this.width);
			this.x = pos.x;
			this.y = pos.y;
			this.z = pos.z;
			if (this.body)
				this.body.setPos(pos.x, pos.y);
		}
		this.details.addBoardPosition = function (pos) {
			var zeroPosition = mathService.translatePosition(0, 0, null, this.height, this.width);
			var pos = mathService.translatePosition(pos.x, pos.y, pos.z, this.height, this.width);
			this.x += (pos.x - zeroPosition.x);
			this.y += (pos.y - zeroPosition.y);
			this.z += (pos.z - zeroPosition.z);
			
			if (this.body)
				this.body.addPos({ x: (pos.x - zeroPosition.x), y: (pos.y - zeroPosition.y) });
		}
		
		if (this.details.boardPos) {
			this.details.setBoardPosition();
		}
		
		this.body = new Body(this.details);
		this.details.body = this.body;
		
		if (this.details.update)
			updateCalls.push(
				{
					update: this.details.update,
					body: this.body
				});
		
		return this.details;
	}

});