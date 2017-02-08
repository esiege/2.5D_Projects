'use strict';

var updateCalls = [];

app.service('new_body', function () {

	this.init = function (dets) {
		this.details = {
			shape: "block",
			activity: "idle",
			name: "unnamed",
            color: "red",
			height: 30,
			width: 30,
			radius: 5,
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