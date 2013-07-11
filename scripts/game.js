//
// WebGL Doom
//
he3d.game = {
	dynamicLights: {
		maxLights: 32
	},
	gravity:	500,	// This is wrong =]
	hlSector:	-1,
	loadingmsg: false,
	name:		"WebGL Doom",
	path:		"../webgldoom/",
	splash:		{
		show: 	true,
		loaded:	false
	},
	settings:	{
		dynamicLights:	false,
		ssao:			false
	},
	showlines:	false,
	worldBuffer: {
		debug:	false,
		enabled:false,
		vbo:	{}
	},
};

//
// he3d Entry Point --------------------------------------------------------------------------------
//
he3d.game.loadAssets=function(){
	he3d.s.load({ name: 'collines' });
	he3d.s.load({ name: 'flats' });
	he3d.s.load({ name: 'flats_dl' });
	he3d.s.load({ name: 'hud' });
	he3d.s.load({ name: 'sky' });
	he3d.s.load({ name: 'splash' });
	he3d.s.load({ name: 'things' });
	he3d.s.load({ name: 'things_dl' });
	he3d.s.load({ name: 'walls' });
	he3d.s.load({ name: 'walls_dl' });

	// Disable FXAA - uglifies too much =P
	he3d.fx.postProcessing.options.fxaa = false;

	// SSAO, because why not?
	if (he3d.game.worldBuffer.init()){
		he3d.fx.ssao.init(
			he3d.game.worldBuffer.texture_depth,
			he3d.game.worldBuffer.texture_normal);

		he3d.fx.ssao.attenuation = [0.075, 0.2];
		he3d.fx.ssao.occluderBias = 0.05;
		he3d.fx.ssao.samplingRadius = 30;
	}

	var mapname = document.location.hash.substring(1);
	if (mapname.length > 1){
		switch (mapname.toUpperCase()) {
			case 'E1M1':
			case 'E1M2':
			case 'E1M3':
			case 'E1M4':
			case 'E1M5':
			case 'E1M6':
			case 'E1M7':
			case 'E1M8':
			case 'E1M9':
				he3d.game.map.curmap = mapname.toUpperCase();
				break;
		}
	}

	// Load WAD File
	he3d.game.map.load(he3d.game.map);

	// Set Camera pos
	he3d.game.camera = new he3d.camera({ type: 'quat' });
	he3d.game.camera.far = 5000;
	he3d.game.camera.fov = 60;

	he3d.game.dynamicLights.init();

	he3d.hud.init();
	he3d.mode = he3d.game.waitAssets;
};

he3d.game.waitAssets = function() {
	if (!he3d.s.checkQueue())
		return;

	// Give a quick notice for slow downloading
	if (!he3d.game.loadingmsg) {
		he3d.game.loadingmsg = true;
		he3d.log("NOTICE", "Loading WAD File, Please Wait....");
	}

	// Show Title Screen if the texture has come back early
	if (!he3d.game.splash.loaded && he3d.game.map.titlescreen.data) {
		he3d.game.splash.texture = he3d.t.load({
			name: 	'titlescreen',
			type:	'raw',
			format:	'rgba',
			filter:	{
				min: he3d.gl.NEAREST,
				mag: he3d.gl.NEAREST
			},
			flip:	true,
			image:	he3d.game.map.titlescreen.data,
			height:	he3d.game.map.titlescreen.height,
			width:	he3d.game.map.titlescreen.width
		});
		he3d.game.splash.loaded = true;
		he3d.game.camera.readInput().update().view().updatePerspective();
		he3d.console.toggle(false);

		he3d.r.clearColor = [0.1, 0.1, 0.1, 1.0];
		he3d.s.shaders[he3d.fx.postProcessing.shader].bound = false;

		// Remove HE3D Logo
		he3d.logo(false);
	}

	// Draw Title Screen
	if (he3d.game.splash.texture > -1) {
		he3d.r.rCount = 0;
		he3d.r.renderables[he3d.r.rCount++] = { func:he3d.game.splash.draw };
	}

	// Spin until we get the map data
	if (!he3d.game.map.loaded)
		return;

	he3d.log("NOTICE","Loading Level: ", he3d.game.map.curmap);

	he3d.game.statusbar.init();
	he3d.game.fpweap.init();
	he3d.game.map.init();
	he3d.game.things.init();
	he3d.game.player.init();

	// Set draw distance
	if ((he3d.game.map.worldbb[1] - he3d.game.map.worldbb[0]) <
		(he3d.game.map.worldbb[3] - he3d.game.map.worldbb[2]))
		he3d.game.camera.far = (he3d.game.map.worldbb[3] - he3d.game.map.worldbb[2]) + 10;
	else
		he3d.game.camera.far = (he3d.game.map.worldbb[1] - he3d.game.map.worldbb[0]) + 10;

	he3d.console.toggle(false);
	he3d.mode = he3d.game.loaded;
};

he3d.game.loaded = function() {
	he3d.hud.cb = he3d.game.hud;
	he3d.hud.enabled = true;
	he3d.hud.updaterate = 200;
	he3d.mode = he3d.game.main;

	// Pointer Lock API Support
	if (he3d.i.hasPointerlock)
		he3d.canvas.addEventListener('click', he3d.i.requestPointerLock, false);
};

he3d.game.main = function() {
	// Check Debug Keys
	if (he3d.i.keys[he3d.e.keys.Z]) {
		he3d.game.walls.show = !he3d.game.walls.show;
		he3d.i.keys[he3d.e.keys.Z] = false;
	}
	if (he3d.i.keys[he3d.e.keys.X]) {
		he3d.game.flats.show = !he3d.game.flats.show;
		he3d.i.keys[he3d.e.keys.X] = false;
	}
	if (he3d.i.keys[he3d.e.keys.C]) {
		he3d.game.sky.show = !he3d.game.sky.show;
		he3d.i.keys[he3d.e.keys.C] = false;
	}
	if (he3d.i.keys[he3d.e.keys.V]) {
		he3d.game.showlines = !he3d.game.showlines;
		he3d.i.keys[he3d.e.keys.V] = false;
	}
	if (he3d.i.keys[he3d.e.keys.B]) {
		he3d.game.things.show = !he3d.game.things.show;
		he3d.i.keys[he3d.e.keys.B] = false;
	}
	if (he3d.i.keys[he3d.e.keys.N]) {
		he3d.game.player.col.show = !he3d.game.player.col.show;
		he3d.i.keys[he3d.e.keys.N] = false;
	}
	if (he3d.i.keys[he3d.e.keys.M]) {
		he3d.game.statusbar.show = !he3d.game.statusbar.show;
		he3d.i.keys[he3d.e.keys.M] = false;
	}
	if (he3d.i.keys[he3d.e.keys.COMMA]) {
		he3d.game.map.traceBSP = !he3d.game.map.traceBSP;
		he3d.i.keys[he3d.e.keys.COMMA] = false;
	}
	if (he3d.i.keys[he3d.e.keys.PERIOD]) {
		he3d.game.settings.ssao = !he3d.game.settings.ssao;
		he3d.i.keys[he3d.e.keys.PERIOD] = false;
	}
	if (he3d.i.keys[he3d.e.keys.K]) {
		he3d.game.worldBuffer.debug = !he3d.game.worldBuffer.debug;
		he3d.i.keys[he3d.e.keys.K] = false;
	}
	if (he3d.i.keys[he3d.e.keys.L]) {
		he3d.game.settings.dynamicLights = !he3d.game.settings.dynamicLights;
		he3d.i.keys[he3d.e.keys.L] = false;
	}

	he3d.game.player.update();
	he3d.game.statusbar.update();
	he3d.game.fpweap.update();
	if (he3d.game.things.show)
		he3d.game.things.update();
	he3d.game.lights.update();

	// Update Camera View
	he3d.game.camera.view().updatePerspective();

	// Render normals for SSAO
	he3d.game.worldBuffer.prePass();
	if (he3d.game.settings.ssao)
		he3d.fx.ssao.pass();

	// Write final world pass
	if (!he3d.game.worldBuffer.debug) {
		he3d.game.worldBuffer.bind();
			he3d.game.flats.draw();
			he3d.game.walls.draw();
			he3d.game.things.draw();
			he3d.game.player.col.draw();
			he3d.game.map.bsp.draw();
		he3d.game.worldBuffer.close();
	}

	// Add to render queue
	he3d.r.rCount = 0;
	he3d.r.renderables[he3d.r.rCount++] = { func: he3d.game.sky.draw };
	he3d.r.renderables[he3d.r.rCount++] = { func: he3d.game.worldBuffer.draw };
	he3d.r.renderables[he3d.r.rCount++] = { func: he3d.game.fpweap.draw };
	he3d.r.renderables[he3d.r.rCount++] = { func: he3d.game.statusbar.draw };
};

//
// Splash Screen -----------------------------------------------------------------------------------
//
he3d.game.splash.draw = function() {
	if (!he3d.game.splash.show)
		return;
	he3d.r.changeProgram('splash');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 20, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
		2, he3d.gl.FLOAT, false, 20, 12);

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.splash.texture].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);

	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,
		false, he3d.game.worldBuffer.view);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES,
		he3d.game.worldBuffer.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
};

//
// Dynamic Lights ----------------------------------------------------------------------------------
//
he3d.game.dynamicLights.init = function (){
	he3d.game.dynamicLights.lights = new Array(he3d.game.dynamicLights.maxLights);
	for (var l = 0; l < he3d.game.dynamicLights.maxLights; l++)	{
		he3d.game.dynamicLights.lights[l] = {
			color:	he3d.m.vec3.create(),
			pos:	he3d.m.vec3.create(),
			size:	-1
		};
	}
};

he3d.game.dynamicLights.add = function (x, y, z, r, g, b, size){
	// Find next free light
	for (var l = 0; l < he3d.game.dynamicLights.maxLights; l++)	{
		if (he3d.game.dynamicLights.lights[l].size == -1){
			he3d.game.dynamicLights.lights[l].color[0] = r;
			he3d.game.dynamicLights.lights[l].color[1] = g;
			he3d.game.dynamicLights.lights[l].color[2] = b;
			he3d.game.dynamicLights.lights[l].pos[0] = x;
			he3d.game.dynamicLights.lights[l].pos[1] = y;
			he3d.game.dynamicLights.lights[l].pos[2] = z;
			he3d.game.dynamicLights.lights[l].size = size;
			return l;
		}
	}
	return null;
};

he3d.game.dynamicLights.clear = function (dlid) {
	if (dlid < 0 || dlid > he3d.game.dynamicLights.maxLights)
		return;

	he3d.game.dynamicLights.lights[dlid].color[0] = 0;
	he3d.game.dynamicLights.lights[dlid].color[1] = 0;
	he3d.game.dynamicLights.lights[dlid].color[2] = 0;
	he3d.game.dynamicLights.lights[dlid].pos[0] = 0;
	he3d.game.dynamicLights.lights[dlid].pos[1] = 0;
	he3d.game.dynamicLights.lights[dlid].pos[2] = 0;
	he3d.game.dynamicLights.lights[dlid].size = -1;
};

//
// World Buffer ------------------------------------------------------------------------------------
//
he3d.game.worldBuffer.init = function () {
	if (!he3d.r.hasGLExt('OES_texture_float') || !he3d.r.hasGLExt('WEBGL_depth_texture') ) {
		he3d.log("WARNING", "No Float / Depth Texture Support", "World Buffer Disabled");
		return false;
	}
	he3d.r.getGLExt('OES_texture_float');
	if (he3d.r.hasGLExt('OES_texture_float_linear'))
		he3d.r.getGLExt('OES_texture_float_linear');
	he3d.r.getGLExt('WEBGL_depth_texture');

	he3d.s.load({ name:'worldbuffer' });
	he3d.s.load({ name:'worldview' });
	he3d.game.worldBuffer.size = [he3d.canvas.height, he3d.canvas.width];

	// Fullscreen Quad
	he3d.game.worldBuffer.vbo.buf_data = he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER, he3d.tools.interleaveFloat32Arrays([3, 2], [
		new Float32Array([-1.0, -1.0, -10, 1.0, -1.0, -10, 1.0, 1.0, -10, -1.0, 1.0, -10]),
		new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0])
	]), he3d.gl.STATIC_DRAW);
	he3d.game.worldBuffer.vbo.buf_indices = he3d.gl.createBuffer();
	he3d.game.worldBuffer.vbo.indices = 6;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array([0, 1, 2, 0, 2, 3]), he3d.gl.STATIC_DRAW);
	he3d.game.worldBuffer.view = he3d.m.mat4.create();
	he3d.m.mat4.ortho(-1, 1, -1, 1, 0.01, 10, he3d.game.worldBuffer.view);

	// Framebuffer
	he3d.game.worldBuffer.fbo = he3d.gl.createFramebuffer();
	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, he3d.game.worldBuffer.fbo);

	he3d.game.worldBuffer.texture = he3d.t.load({
		filter:	{ min: he3d.gl.NEAREST, mag: he3d.gl.NEAREST },
		height:	he3d.game.worldBuffer.size[0],
		image: 	null,
		name:	'worldBuffer::Output',
		type:	'raw',
		width:	he3d.game.worldBuffer.size[1]
	});
	he3d.gl.framebufferTexture2D(he3d.gl.FRAMEBUFFER, he3d.gl.COLOR_ATTACHMENT0,
		he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.worldBuffer.texture].texture, 0);

	he3d.game.worldBuffer.texture_normal = he3d.t.load({
		filter:	{ min: he3d.gl.NEAREST, mag: he3d.gl.NEAREST },
		height:	he3d.game.worldBuffer.size[0],
		image: 	null,
		name:	'worldBuffer::Normals',
		type:	'raw',
		stype:	he3d.gl.FLOAT,
		width:	he3d.game.worldBuffer.size[1]
	});
	he3d.gl.framebufferTexture2D(he3d.gl.FRAMEBUFFER, he3d.gl.COLOR_ATTACHMENT0,
		he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.worldBuffer.texture_normal].texture, 0);

	he3d.game.worldBuffer.texture_depth = he3d.t.load({
		format: 'depth',
		height:	he3d.game.worldBuffer.size[0],
		image: 	null,
		name:	'worldBuffer::Depth',
		type:	'raw',
		stype:	he3d.gl.UNSIGNED_SHORT,
		width:	he3d.game.worldBuffer.size[1]
	});
	he3d.gl.framebufferTexture2D(he3d.gl.FRAMEBUFFER, he3d.gl.DEPTH_ATTACHMENT,
		he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.worldBuffer.texture_depth].texture, 0);

	var fbstatus = he3d.gl.checkFramebufferStatus(he3d.gl.FRAMEBUFFER);
	if (fbstatus !== he3d.gl.FRAMEBUFFER_COMPLETE)
		he3d.log("FATAL", "Failed to create normalBuffer", he3d.r.getGLErrorString(fbstatus));

	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, null);

	he3d.game.worldBuffer.enabled = true;
	he3d.game.worldBuffer.nMatrix = he3d.m.mat3.create();

	he3d.game.settings.ssao = true;
	he3d.game.settings.dynamicLights = true;
	return true;
};

he3d.game.worldBuffer.bind = function() {
	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, he3d.game.worldBuffer.fbo);
	he3d.gl.framebufferTexture2D(he3d.gl.FRAMEBUFFER, he3d.gl.COLOR_ATTACHMENT0,
		he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.worldBuffer.texture].texture, 0);

	he3d.gl.viewport(0, 0, he3d.game.worldBuffer.size[1], he3d.game.worldBuffer.size[0]);
	he3d.gl.clearColor(0.0, 0.0, 0.0, 0.0);
	he3d.gl.clear(he3d.gl.COLOR_BUFFER_BIT);

	he3d.gl.depthFunc(he3d.gl.EQUAL);
	he3d.gl.depthMask(false);
};

he3d.game.worldBuffer.close = function() {
	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, null);

	he3d.gl.depthFunc(he3d.gl.LEQUAL);
	he3d.gl.depthMask(true);
};

he3d.game.worldBuffer.draw = function() {
	he3d.r.changeProgram('worldview');

	he3d.gl.disable(he3d.gl.DEPTH_TEST);
	he3d.gl.enable(he3d.gl.BLEND);

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 20, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
		2, he3d.gl.FLOAT, false, 20, 12);

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);
	if (he3d.game.worldBuffer.debug) {
		he3d.gl.uniform1f(he3d.r.curProgram.uniforms.health, 100.0);
		he3d.gl.bindTexture(he3d.gl.TEXTURE_2D,
			he3d.t.textures[he3d.game.worldBuffer.texture_normal].texture);
	} else {
		he3d.gl.uniform1f(he3d.r.curProgram.uniforms.health, he3d.game.player.health);
		he3d.gl.bindTexture(he3d.gl.TEXTURE_2D,
			he3d.t.textures[he3d.game.worldBuffer.texture].texture);
	}

	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,
		false, he3d.game.worldBuffer.view);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.worldBuffer.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES,
		he3d.game.worldBuffer.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);

	he3d.gl.disable(he3d.gl.BLEND);
	he3d.gl.enable(he3d.gl.DEPTH_TEST);
};

he3d.game.worldBuffer.prePass = function() {
	if (he3d.r.resizeEvent)
		he3d.game.worldBuffer.resize();

	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, he3d.game.worldBuffer.fbo);
	he3d.gl.viewport(0, 0, he3d.game.worldBuffer.size[1], he3d.game.worldBuffer.size[0]);
	he3d.gl.clearColor(0.0, 0.0, 0.0, 0.0);
	he3d.gl.clear(he3d.gl.COLOR_BUFFER_BIT | he3d.gl.DEPTH_BUFFER_BIT);
	he3d.r.changeProgram('worldbuffer');

	he3d.gl.depthFunc(he3d.gl.LESS);
	he3d.gl.depthMask(true);

	// Bind normal buffer for SSAO or disable writes
	if (he3d.game.settings.ssao)
		he3d.gl.framebufferTexture2D(he3d.gl.FRAMEBUFFER, he3d.gl.COLOR_ATTACHMENT0,
			he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.worldBuffer.texture_normal].texture, 0);
	else
		he3d.gl.colorMask(false, false, false, false);

	he3d.m.mat3.identity(he3d.game.worldBuffer.nMatrix);
	he3d.gl.uniformMatrix3fv(he3d.r.curProgram.uniforms.uNMatrix, false,
		he3d.game.worldBuffer.nMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, false, he3d.r.mvMatrix);

	// Write Flats
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.uMask, 0);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.uFlip, 0);
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.flats.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 48, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal,
		3, he3d.gl.FLOAT, false, 48, 12);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
		3, he3d.gl.FLOAT, false, 48, 24);	// use 3 because things have a flip flag!
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.flats.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES, he3d.game.flats.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);

	// Write Walls
	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.walls.vbo.texture].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.uMask, 1);

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.walls.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 44, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal,
		3, he3d.gl.FLOAT, false, 44, 12);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
		3, he3d.gl.FLOAT, false, 44, 24);	// use 3 because things have a flip flag!
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.walls.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES, he3d.game.walls.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);

	// Write Things
	he3d.game.things.draw(true);

	if (!he3d.game.settings.ssao)
		he3d.gl.colorMask(true, true, true, true);

	he3d.gl.bindFramebuffer(he3d.gl.FRAMEBUFFER, null);
};

he3d.game.worldBuffer.resize = function() {
	he3d.game.worldBuffer.size[0] = he3d.canvas.height;
	he3d.game.worldBuffer.size[1] = he3d.canvas.width;

	he3d.t.textures[he3d.game.worldBuffer.texture].height = he3d.canvas.height;
	he3d.t.textures[he3d.game.worldBuffer.texture].width = he3d.canvas.width;
	he3d.t.update(he3d.game.worldBuffer.texture);

	he3d.t.textures[he3d.game.worldBuffer.texture_normal].height = he3d.canvas.height;
	he3d.t.textures[he3d.game.worldBuffer.texture_normal].width = he3d.canvas.width;
	he3d.t.update(he3d.game.worldBuffer.texture_normal);

	he3d.t.textures[he3d.game.worldBuffer.texture_depth].height = he3d.canvas.height;
	he3d.t.textures[he3d.game.worldBuffer.texture_depth].width = he3d.canvas.width;
	he3d.t.update(he3d.game.worldBuffer.texture_depth);
};
