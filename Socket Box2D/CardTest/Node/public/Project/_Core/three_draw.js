
'use strict';


var sendBodyWarning = false;
var sendBodyToDraw = function () { if (!sendBodyWarning) { sendBodyWarning = true; console.log("no sendBodyToDraw function found"); } };

var gl_drawWarning = false;
var gl_destroyWarning = false;
var gl_draw = function () { if (!gl_drawWarning) { gl_drawWarning = true; console.log("no gl_draw function found"); } };
var gl_destroy = function () { if (!gl_destroyWarning) { gl_destroyWarning = true; console.log("no gl_destroy function found"); } };

//send body inits to console.log
var logBodies = false;

app.service('three_draw', function ($timeout, key, canvasService) {
	var loader = new THREE.JSONLoader(), scene, camera, renderer, widthUnit, heightUnit, bodyList = {}, cursorPosition = {}, sceneLoaded = false;
	
	//good for day/night cycles
	var ambientLightIntensity = 1;
	var ambientLight;
	var ambientLightInvert;
	var textureCache = {};
	
	//called globally.  add a body to scene
	sendBodyToDraw = function (body) {
		if (!checkDrawBody(body, true))
			return;
		
		if (!bodyList[body.details.name]) {
			bodyList[body.details.name] = {};
			bodyList[body.details.name].body = body;
			
			if (bodyList[body.details.name].body.details.objPath)
				setup3dObject(bodyList[body.details.name]);
			else if (bodyList[body.details.name].body.details.image || bodyList[body.details.name].body.details.color)
				setup2dObject(bodyList[body.details.name]);
		}
		updateMesh(bodyList[body.details.name], bodyList[body.details.name].mesh, .75);
	};
	
	//called globally.  remove a body from the scene
	gl_destroy = function (body) {
		if (checkDrawBody(body.m_userData, true) && bodyList[body.m_userData.details.name].shape) {
			scene.remove(scene.getObjectByName(body.m_userData.details.name));
			
			if (bodyList[body.m_userData.details.name].geometry)
				bodyList[body.m_userData.details.name].geometry.dispose();
			
			if (bodyList[body.m_userData.details.name].material)
				bodyList[body.m_userData.details.name].material.dispose();
			
			if (bodyList[body.m_userData.details.name].shape)
				bodyList[body.m_userData.details.name].shape.dispose();
			
			delete bodyList[body.m_userData.details.name];
		}
	};
	
	//case: 3d object
	var setup3dObject = function (body) {
		
		loader.load(body.objPath, function (geometry) {
			
			if (body.texturePath)
				var material = new THREE.MeshLambertMaterial({
					map: THREE.ImageUtils.loadTexture(body.texturePath),  // specify and load the texture
					colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
					colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
					colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
				});
			else if (true)
				var material = new THREE.MeshPhongMaterial({
					color: "red"
				});
			
			// create a mesh with models geometry and material
			var mesh = new THREE.Mesh(
				geometry,
				material
			);
			
			mesh.rotation.y = -Math.PI / 5;
			
			scene.add(mesh);
		});
	};
	
	//case: 2d object
	var setup2dObject = function (body, callback) {
		if (body.body.details.image) {
			//return;
			addImagePlane(body);
		}
		else if (body.body.details.particleCount) {
			addParticleEmitter(body);
		}
		else {
			//return;
			addColorPlane(body);
		}
		
		if (body.body.details.light) {
			
			if (!body.body.details.light.color)
				body.body.details.light.color = "yellow";
			
			body.body.details.light.body = new THREE.PointLight(body.body.details.light.color, body.body.details.light.intensity, 0);
			scene.add(body.body.details.light.body);
		}
		
		body.body.details.mesh = body.mesh;
		
		if (logBodies) {
			console.log(body.body.details.name + ":");
			console.log(body);
		}
	};
	
	//helper methods
	var getPixelColor = function (body, x, y) {
		if (!body.canvas) {
			body.canvas = $('<canvas />')[0];
			body.canvas.width = body.image.width;
			body.canvas.height = body.image.height;
			body.canvas.getContext('2d').drawImage(body.image, 0, 0, body.image.width, body.image.height);
		}
		
		return body.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
	};
	var addParticlesFromPixels = function (body) {
		
		var centralPosition = { x: 0, y: 0, z: 0 };
		var w, h;
		
		if (body.image) {
			w = body.image.width;
			h = body.image.height;
		} else {
			w = body.body.details.width;
			h = body.body.details.height;
		}
		
		centralPosition.x -= w / 4;
		centralPosition.y -= h / 4;
		
		
		var particles = w * h;
		var geometry = new THREE.BufferGeometry();
		
		var positions = new Float32Array(particles * 3);
		var colors = new Float32Array(particles * 3);
		
		var color = new THREE.Color();
		
		var i = 0;
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				
				
				var r, g, b, a;
				if (body.image) {
					var imagePixelColor = getPixelColor(body, x, y);
					r = imagePixelColor[0] / 255;
					g = imagePixelColor[1] / 255;
					b = imagePixelColor[2] / 255;
					a = imagePixelColor[3] / 255;
				}
				else if (body.body.details.color.r) {
					r = body.body.details.color.r / 255;
					g = body.body.details.color.g / 255;
					b = body.body.details.color.b / 255;
					a = body.body.details.color.a ? body.body.details.color.a / 255 : 1;
				} else {
					console.warn('Body needs rgb(r,g,b,a) || image path to render.');
				}
				
				if (a != 0) {
					positions[i] = x + centralPosition.x;
					positions[i + 1] = y + centralPosition.y;
					positions[i + 2] = 0;
					
					console.log("x:" + x, "y:" + y, "r:" + r, "g:" + g, "b:" + b);
					
					color.setRGB(r, g, b);
					
					colors[i] = r;
					colors[i + 1] = g;
					colors[i + 2] = b;


				}
				i += 3;

			}
		}
		
		geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		
		geometry.computeBoundingBox();
		
		var material = new THREE.PointCloudMaterial({ size: 3.2, vertexColors: THREE.VertexColors });
		
		var particleSystem = new THREE.PointCloud(geometry, material);
		body.mesh = particleSystem;
		scene.add(particleSystem);

	};
	var addCubesFromPixels = function (body) {
		
		var centralPosition = { x: 0, y: 0, z: 0 };
		var color = new THREE.Color();
		var w, h;
		
		if (body.image) {
			w = body.image.width;
			h = body.image.height;
		} else {
			w = body.body.details.width;
			h = body.body.details.height;
		}
		centralPosition.x -= w / 2;
		centralPosition.y -= h / 2;
		
		
		var i = 0;
		for (var x = 1; x <= w; x++) {
			for (var y = 1; y <= h; y++) {
				
				var r, g, b, a;
				if (body.image) {
					var imagePixelColor = getPixelColor(body, x, y);
					r = imagePixelColor[0] / 255;
					g = imagePixelColor[1] / 255;
					b = imagePixelColor[2] / 255;
					a = imagePixelColor[3] / 255;
				}
				else if (body.body.details.color.r) {
					r = body.body.details.color.r / 255;
					g = body.body.details.color.g / 255;
					b = body.body.details.color.b / 255;
					a = body.body.details.color.a ? body.body.details.color.a / 255 : 1;
				} else {
					console.warn('Body needs rgb(r,g,b,a) || image path to render.');
				}
				
				if (a != 0) {
					var localX = x + centralPosition.x;
					var localY = -y + centralPosition.y;
					var localZ = -(r + b + g);
					
					console.log("x:" + x, "y:" + y, "r:" + r, "g:" + g, "b:" + b);
					
					color.setRGB(r, g, b);
					
					var boxGeometry = new THREE.BoxGeometry(.9, .9, .9);
					
					
					var geometry = new THREE.Geometry();
					geometry.merge(boxGeometry);
					
					
					for (var j = 0; j < geometry.vertices.length; j++) {
						geometry.vertices[j].x += localX;
						geometry.vertices[j].y += localY;
					}
					
					if (!body.geometry)
						body.geometry = geometry;
					else {
						body.geometry.merge(geometry);
					}
				}
				i += 3;

			}
		}
		var material = new THREE.MeshPhongMaterial({ color: color });
		body.mesh = new THREE.Mesh(body.geometry, material);
		scene.add(body.mesh);

	};
	
	
	var addParticleEmitter = function (body) {
		// create the particle variables
		var particleCount = 1800,
			particles = new THREE.Geometry(),
			pMaterial = new THREE.ParticleBasicMaterial({
				color: 0xFFFFFF,
				size: 20
			});
		
		// now create the individual particles
		for (var p = 0; p < particleCount; p++) {
			
			// create a particle with random
			// position values, -250 -> 250
			var pX = Math.random() * 500 - 250,
				pY = Math.random() * 500 - 250,
				pZ = Math.random() * 500 - 250,
				particle = { position: new THREE.Vector3(pX, pY, pZ), velocity: new THREE.Vector3(0, -Math.random(), 0) };
			
			// add it to the geometry
			particles.vertices.push(particle);
		}
		
		// create the particle system
		var particleSystem = new THREE.ParticleSystem(particles, pMaterial);
		
		body.mesh = particleSystem;
		
		
		body.mesh.update = function (body) {
			
			var particleSystem = body.mesh;
			
			// add some rotation to the system
			particleSystem.rotation.y += 0.01;
			
			var pCount = particleCount;
			while (pCount--) {
				// get the particle
				var particle = particles.vertices[pCount];
				
				// check if we need to reset
				if (particle.position.y < -200) {
					particle.position.y = 200;
					particle.velocity.y = 0;
				}
				
				// update the velocity
				particle.velocity.y -= Math.random() * .1;
				
				// and the position
				particle.position.add(particle.velocity);
			}
			
			// flag to the particle system that we've
			// changed its vertices. This is the
			// dirty little secret.
			particleSystem.geometry.__dirtyVertices = true;
		}
		

		// add it to the scene
		scene.add(particleSystem);

	}
	
	
	
	var addColorPlane = function (b) {
		var materialDetails = b.body.details.materialDetails;
		
		if (!materialDetails)
			materialDetails = { color: b.body.details.color };
		
		setMaterialType(b, materialDetails);
		
		b.shape = new THREE.PlaneGeometry((b.body.details.width / 8) * b.body.details.scale, (b.body.details.height / 8) * b.body.details.scale);
		b.mesh = new THREE.Mesh(b.shape, b.material);
		b.mesh.name = b.body.details.name;
		scene.add(b.mesh);
	};
	var addImagePlane = function (b) {
		
		var imagePath = b.body.details.image;
		
		loadTexture(imagePath, function (texture) {
			b.texture = texture;
			
			//material
			b.texture.magFilter = THREE.NearestFilter;
			b.texture.minFilter = THREE.LinearMipMapLinearFilter;
			
			var materialDetails = b.body.details.materialDetails;
			
			if (!materialDetails)
				materialDetails = { map: b.texture, transparent: true, alphaTest: 0.5 };
			
			if (!materialDetails.map)
				materialDetails.map = b.texture;
			
			setMaterialType(b, materialDetails);
			
			//flip part 1 - if attribute exists
			if (b.body.details.flipX || b.body.details.flipY)
				b.material.side = THREE.DoubleSide;
			
			if (!b.body.details.width)
				b.body.details.width = texture.image.width;
			if (!b.body.details.height)
				b.body.details.height = texture.image.height;
			
			b.shape = new THREE.PlaneGeometry(b.body.details.width, b.body.details.height);
			
			//load normal map and assign - if normal map path exists
			var normalImagePath = b.body.details.normalMap;
			if (normalImagePath) {
				b.texture_normalMap = THREE.ImageUtils.loadTexture(normalImagePath, null, function (normalTexture) {
					
					//asign
					b.material.normalMap = b.texture_normalMap;
					
					//initialize
					b.mesh = new THREE.Mesh(b.shape.clone(), b.material);
					b.mesh.name = b.body.details.name;
					scene.add(b.mesh);
				}, function (event) {
					
					//throw error but still render if normal map is missing
					b.mesh = new THREE.Mesh(b.shape.clone(), b.material);
					b.mesh.name = b.body.details.name;
					scene.add(b.mesh);
					console.error("Normal Map not found:", event.target.currentSrc);
				});
			}
			else {
				//initialize
				//b.material = new THREE.SpriteMaterial(materialDetails);
				//b.mesh = new THREE.Sprite(b.material);
				//scene.add(b.mesh);
				
				
				b.mesh = new THREE.Mesh(b.shape.clone(), b.material);
				b.mesh.name = b.body.details.name;
				scene.add(b.mesh);
			}
		});
	};
	var loadTexture = function (imagePath, callback) {
		
		if (textureCache[imagePath] && textureCache[imagePath].image) {
			callback(textureCache[imagePath]);
			return textureCache[imagePath];
		}
		
		textureCache[imagePath] = THREE.ImageUtils.loadTexture(imagePath, null, function (texture) {
			textureCache[imagePath] = texture;
			callback(textureCache[imagePath]);
		}, function (event) {
			console.error("Image not found:", event.target.currentSrc);
		});
		return textureCache[imagePath];
		
	};
	var setMaterialType = function (b, materialDetails) {
		switch (b.body.details.materialType) {
			case 'Lambert':
				b.material = new THREE.MeshLambertMaterial(materialDetails);
				break;
			case 'Normal':
				b.material = new THREE.MeshNormalMaterial(materialDetails);
				break;
			case 'Sprite':
				b.material = new THREE.SpriteMaterial(materialDetails);
				break;
			case 'Line':
				b.material = new THREE.LineBasicMaterial(materialDetails);
				break;
			case 'LineDashed':
				b.material = new THREE.LineDashedMaterial(materialDetails);
				break;
			case 'Basic':
				b.material = new THREE.MeshBasicMaterial(materialDetails);
				break;
			case 'Depth':
				b.material = new THREE.MeshDepthMaterial(materialDetails);
				break;
			case 'Phong':
				b.material = new THREE.MeshPhongMaterial(materialDetails);
				break;
			default:
				if (b.body.details.materialType && b.body.details.materialType != 'Phong')
					console.error('Material not found, phong loaded instead:' + b.body.details.materialType);
				
				
				
				b.material = new THREE.MeshLambertMaterial(materialDetails);
		}
	};
	
	//misc
	var testRender = function (body) {
		var geometry = new THREE.Geometry();
		
		// Make the simplest shape possible: a triangle.
		geometry.vertices.push(
			new THREE.Vector3(-1, 1, 0),
				new THREE.Vector3(-1, -1, 0),
				new THREE.Vector3(1, -1, 0)
		);
		
		// Note that I'm assigning the face to a variable
		// I'm not just shoving it into the geometry.
		var face = new THREE.Face3(0, 1, 2);
		
		// Assign the colors to the vertices of the face.
		face.vertexColors[0] = new THREE.Color(0xff0000); // red
		face.vertexColors[1] = new THREE.Color(0x00ff00); // green
		face.vertexColors[2] = new THREE.Color(0x0000ff); // blue
		
		// Now the face gets added to the geometry.
		geometry.faces.push(face);
		
		// Using this material is important.
		var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
		
		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
	};
	
	//translation routine, updating from box2d 2 dimensional positions/rotations/etc. to three dimensional
	var updateMesh = function (bodyRef, mesh) {
		
		if (!mesh && bodyRef.meshList) {
			for (var i = 0; i < bodyRef.meshList.length; i++) {
				updateMesh(bodyRef, bodyRef.meshList[i]);
			}
		}
		
		if (!checkDrawBody(bodyRef.body, mesh))
			return;
		
		
		if (bodyRef.body.details.staticBody)
			bodyRef.body.details.staticUpdated = true;
		
		var posX = bodyRef.body.body.m_xf.position.x / 8.7;
		var posY = -bodyRef.body.body.m_xf.position.y / 8.7;
		var posZ = bodyRef.body.details.z || 0;
		if (bodyRef.body.details.layer)
			posZ = -bodyRef.body.details.layer * .2;
		
		mesh.position.x = posX;
		mesh.position.y = posY;
		mesh.position.z = posZ;
		
		var pi = 3.14159265359;
		
		if (bodyRef.body.details.rotation) {
			if (bodyRef.body.details.rotation.x)
				mesh.rotation.x = (bodyRef.body.details.rotation.x / 360) * pi;
			if (bodyRef.body.details.rotation.y)
				mesh.rotation.y = (bodyRef.body.details.rotation.y / 360) * pi;
			if (bodyRef.body.details.rotation.z)
				mesh.rotation.z = (bodyRef.body.details.rotation.z / 360) * pi;
		}
		
		if (bodyRef.body.details.light) {
			var light_posX = bodyRef.body.details.light.x || posX;
			var light_posY = bodyRef.body.details.light.y || posY;
			var light_posZ = bodyRef.body.details.light.z || posZ;
			
			if (bodyRef.body.details.light.xMod)
				light_posX += bodyRef.body.details.light.xMod;
			if (bodyRef.body.details.light.yMod)
				light_posY += bodyRef.body.details.light.yMod;
			if (bodyRef.body.details.light.zMod)
				light_posZ += bodyRef.body.details.light.zMod;
			
			bodyRef.body.details.light.body.position.set(light_posX, light_posY, light_posZ);

		}
		
		if (bodyRef.body.details.flipX)
			mesh.rotation.y = Math.PI;
		if (bodyRef.body.details.flipX === false)
			mesh.rotation.y = 0;
		if (bodyRef.body.details.flipY)
			mesh.rotation.x = Math.PI;
		if (bodyRef.body.details.flipY === false)
			mesh.rotation.x = 0;
		
		if (mesh.localPositionValues) {
			mesh.position.x += mesh.localPositionValues.x;
			mesh.position.y += mesh.localPositionValues.y;
			mesh.position.z += mesh.localPositionValues.z;
		}
		
		if (mesh.update) {
			mesh.update(bodyRef);
		}

	};
	
	//check required attributes
	var checkDrawBody = function (body, shape) {
		return !(!sceneLoaded || !body || !body.body || !shape || body.details.hidden || (!!body.details.tags && !!body.details.tags.objectType && body.details.tags.objectType == 'action'))
	}
	
	return {
		scene: scene,
		camera: camera,
		renderer: renderer,
		init: function () {
			canvasService.ready(function (c) {
				
				if (c.initialDetails.canvType != "webgl") {
					console.warn("WebGL attempted initiation without a 'webgl' type canvas.");
					return;
				}
				
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera(45, c.context.canvas.width / c.context.canvas.height, 1, 9999999999);
				renderer = new THREE.WebGLRenderer({ canvas: c.context.canvas, alpha: true, antialias: false });
				renderer.sortObjects = false;
				
				widthUnit = c.context.canvas.width * 0.0575;
				heightUnit = -c.context.canvas.height * 0.0575;
				
				//camera
				camera.position.x = widthUnit;
				camera.position.y = heightUnit;
				camera.position.z = 150;
				
				
				//ambient lighting
				ambientLight = new THREE.DirectionalLight(0xff6600, ambientLightIntensity);
				ambientLight.position.set(0, 1, 1).normalize();
				scene.add(ambientLight);
				
				ambientLightInvert = new THREE.DirectionalLight(0x00ccff, 1 - ambientLightIntensity);
				ambientLightInvert.position.set(0, 1, 1).normalize();
				scene.add(ambientLightInvert);
				
				//---test point light that follows mouse cursor
				//var light = new THREE.PointLight("white", .7, 0);
				//light.position.set(5, 5, 50);
				//scene.add(light);
				
				var geometry = new THREE.BoxGeometry(1, 1, 1);
				var material = new THREE.MeshBasicMaterial({ color: 'red' });
				cursorPosition = new THREE.Mesh(geometry, material);
				scene.add(cursorPosition);
				
				var render = function () {
					var m = canvasService.getAdjustedMouse();
					
					
					cursorPosition.position.set(m.x / 8.7, -m.y / 8.7, 0);
					//light.position.set(m.x / 8.7, -m.y / 8.7, 50);
					
					if (ambientLight.intensity > 0.01)
						ambientLight.intensity -= 0.005;
					
					ambientLightInvert.intensity = 1 - ambientLight.intensity;
					
					requestAnimationFrame(render);
					renderer.render(scene, camera);
				};
				
				sceneLoaded = true;
				render();

			});
		},
		resize: function () {
			renderer.setSize(window.innerWidth, window.innerHeight);
            //if (canvType != "webgl")
            //    return;


            //camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 1000);
            //camera.position.z = 900;
            //camera.position.y = -900;
            //camera.rotation.x = .85;
            //renderer = new THREE.WebGLRenderer({ canvas: canvas.get(0) });
            //renderer.setSize(window.innerWidth, window.innerHeight);
		},
		scroll: function (val) {
			if (canvType != "webgl")
				return;
			
			camera.position.z -= 20 * val;;
			camera.position.y += 14 * val;;
            //camera.rotation.x += .01 * val;
		}
	}

});