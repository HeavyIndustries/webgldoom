//
// WebGL Doom
//
he3d.game={
	gravity:	500,	// This is wrong =]
	hlSector:	-1,
	loadingmsg: false,
	name:		"WebGL Doom",
	path:		"../webgldoom/",
	splash:		{show:true,vbo:{},loaded:false},
	showlines:	false
};

//
// he3d Entry Point --------------------------------------------------------------------------------
//
he3d.game.loadAssets=function(){
	he3d.s.load({name:'collines'});
	he3d.s.load({name:'flats'});
	he3d.s.load({name:'hud'});
	he3d.s.load({name:'sky'});
	he3d.s.load({name:'splash'});
	he3d.s.load({name:'things'});
	he3d.s.load({name:'walls'});

	// Disable FXAA - uglifies too much =P
	he3d.fx.postProcessing.options.fxaa=false;

	var mapname=document.location.hash.substring(1);
	if(mapname.length>1){
		switch(mapname.toUpperCase()){
			case 'E1M1':
			case 'E1M2':
			case 'E1M3':
			case 'E1M4':
			case 'E1M5':
			case 'E1M6':
			case 'E1M7':
			case 'E1M8':
			case 'E1M9':
				he3d.game.map.curmap=mapname.toUpperCase();
				break;
		}
	}

	// Build splash screen
	he3d.game.splash.vbo.buf_data=he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.splash.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.tools.interleaveFloat32Arrays([3,2],[
		new Float32Array([-1.0,-1.0,-100,1.0,-1.0,-100,1.0,1.0,-100,-1.0,1.0,-100]),
		new Float32Array([0.0,0.0,1.0,0.0,1.0,1.0,0.0,1.0])
	]),he3d.gl.STATIC_DRAW);
	he3d.game.splash.vbo.buf_indices=he3d.gl.createBuffer();
	he3d.game.splash.vbo.indices=6;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.splash.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array([0,1,2,0,2,3]),he3d.gl.STATIC_DRAW);
	he3d.game.splash.view=he3d.m.mat4.create();
	he3d.m.mat4.ortho(-1,1,-1,1,0.01,100,he3d.game.splash.view);

	// Load WAD File
	he3d.game.map.load(he3d.game.map);

	// Set Camera pos
	he3d.game.camera=new he3d.camera({type:'quat'});
	he3d.game.camera.far=5000;
	he3d.game.camera.fov=60;

	he3d.hud.init();
	he3d.mode=he3d.game.waitAssets;
};

he3d.game.waitAssets=function(){
	if(!he3d.s.checkQueue())
		return;

	// Give a quick notice for slow downloading
	if(!he3d.game.loadingmsg){
		he3d.game.loadingmsg=true;
		he3d.log("NOTICE","Loading WAD File, Please Wait....");
	}

	// Show Title Screen if the texture has come back early
	if(!he3d.game.splash.loaded&&he3d.game.map.titlescreen.data){
		he3d.game.splash.texture=he3d.t.load({
			name: 	'titlescreen',
			type:	'raw',
			format:	'rgba',
			filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
			flip:	true,
			image:	he3d.game.map.titlescreen.data,
			height:	he3d.game.map.titlescreen.height,
			width:	he3d.game.map.titlescreen.width
		});
		he3d.game.splash.loaded=true;
		he3d.game.camera.readInput().update().view().updatePerspective();
		he3d.console.toggle(false);

		he3d.r.clearColor=[0.1,0.1,0.1,1.0];
		he3d.s.shaders[he3d.fx.postProcessing.shader].bound=false;

		// Remove HE3D Logo
		he3d.logo(false);
	}

	// Draw Title Screen
	if(he3d.game.splash.texture>-1){
		he3d.r.rCount=0;
		he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.splash.draw};
	}

	// Spin until we get the map data
	if(!he3d.game.map.loaded)
		return;

	he3d.log("NOTICE","Loading Level: ",he3d.game.map.curmap);

	he3d.game.statusbar.init();
	he3d.game.fpweap.init();
	he3d.game.map.init();
	he3d.game.things.init();
	he3d.game.player.init();

	// Set draw distance
	if((he3d.game.map.worldbb[1]-he3d.game.map.worldbb[0])<
		(he3d.game.map.worldbb[3]-he3d.game.map.worldbb[2]))
		he3d.game.camera.far=(he3d.game.map.worldbb[3]-he3d.game.map.worldbb[2])+10;
	else
		he3d.game.camera.far=(he3d.game.map.worldbb[1]-he3d.game.map.worldbb[0])+10;

	he3d.console.toggle(false);
	he3d.mode=he3d.game.loaded;
};

he3d.game.loaded=function(){
	he3d.hud.cb=he3d.game.hud;
	he3d.hud.enabled=true;
	he3d.hud.updaterate=200;
	he3d.mode=he3d.game.main;

	// Pointer Lock API Support
	if(he3d.i.hasPointerlock)
		he3d.canvas.addEventListener('click',he3d.i.requestPointerLock,false);
};

he3d.game.main=function(){
	// Check Debug Keys
	if(he3d.i.keys[he3d.e.keys.Z]){
		he3d.game.walls.show=!he3d.game.walls.show;
		he3d.i.keys[he3d.e.keys.Z]=false;
	}
	if(he3d.i.keys[he3d.e.keys.X]){
		he3d.game.flats.show=!he3d.game.flats.show;
		he3d.i.keys[he3d.e.keys.X]=false;
	}
	if(he3d.i.keys[he3d.e.keys.C]){
		he3d.game.sky.show=!he3d.game.sky.show;
		he3d.i.keys[he3d.e.keys.C]=false;
	}
	if(he3d.i.keys[he3d.e.keys.V]){
		he3d.game.showlines=!he3d.game.showlines;
		he3d.i.keys[he3d.e.keys.V]=false;
	}
	if(he3d.i.keys[he3d.e.keys.B]){
		he3d.game.things.show=!he3d.game.things.show;
		he3d.i.keys[he3d.e.keys.B]=false;
	}
	if(he3d.i.keys[he3d.e.keys.N]){
		he3d.game.player.col.show=!he3d.game.player.col.show;
		he3d.i.keys[he3d.e.keys.N]=false;
	}
	if(he3d.i.keys[he3d.e.keys.M]){
		he3d.game.statusbar.show=!he3d.game.statusbar.show;
		he3d.i.keys[he3d.e.keys.M]=false;
	}
	if(he3d.i.keys[he3d.e.keys.COMMA]){
		he3d.game.map.traceBSP=!he3d.game.map.traceBSP;
		he3d.i.keys[he3d.e.keys.COMMA]=false;
	}

	he3d.game.player.update();
	he3d.game.statusbar.update();
	he3d.game.fpweap.update();
	if(he3d.game.things.show)
		he3d.game.things.update();
	he3d.game.lights.update();

	// Add to render queue
	he3d.r.rCount=0;
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.sky.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.flats.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.walls.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.things.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.player.col.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.map.bsp.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.fpweap.draw};
	he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.statusbar.draw};

	// Update Camera View
	he3d.game.camera.view().updatePerspective();
};

//
// Splash Screen -----------------------------------------------------------------------------------
//
he3d.game.splash.draw=function(){
	if(!he3d.game.splash.show)
		return;
	he3d.r.changeProgram('splash');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.splash.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,3,he3d.gl.FLOAT,false,20,0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,2,he3d.gl.FLOAT,false,20,12);

	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture,he3d.game.splash.texture);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,false,he3d.game.splash.view);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.splash.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES,he3d.game.splash.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
};
