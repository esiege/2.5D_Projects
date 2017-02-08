'use strict';
var canvasInit;

app.service('canvasService', function () {

	var mouse = {};
	var canvas;
	var readyCallbacks = [];
	var init = function(dets) {
		initBox(dets, function(c) {
			canvas = c;
			canvas.element.addEventListener('mousemove', function (evt) { getMousePos(canvas, evt); }, false);
			canvasInit = true;

			for (var i = 0; i < readyCallbacks.length; i++) {
				readyCallbacks[i](canvas, mouse);
			}
		});
	}

	init({ gravity: new b2Vec2(0, 0), canvType: "webgl", canvId: "center-canvas" });

	function getMousePos(canvas, evt)
	{
		var rect = canvas.element.getBoundingClientRect();
		mouse = {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
		return mouse;
	}
	return {
		getMouse: function() {
			return mouse;
		},
		getAdjustedMouse: function () {
			if (!mouse.x)
				return { x: 0, y: 0 };

			return {
				x: (mouse.x / canvas.element.clientHeight) * canvas.element.height,
				y: (mouse.y / canvas.element.clientWidth) * canvas.element.width
			}
		},
		ready: function(callback) {
			if (canvas)
				callback(canvas, mouse);
			else
				readyCallbacks.push(callback);
		},
		init: init
	}

});