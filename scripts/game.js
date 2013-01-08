//
// WebGL Doom
//

//
// TODO - It would be much simpler to shift all the world positions to start vertically at 0
// TODO - Actually use the BSP tree ;F
//

he3d.game={
	flats:{
		show:	true,
		vbo:	{}
	},
	gravity:	500,	// This is wrong =]
	lights:{
		timers:	[1.0,1.0,1.0,1.0,1.0],
		oscillatedir:false,
		blink:	0,
		halfblink:0
	},
	loadingmsg: false,
	map:{
		curmap:	'E1M1',
		debug: 	false,
		filename:'gldoom1.wad',
		flatsvbo:{},
		loaded:	false,
		path: 	'../wads/',
		titlescreen:{data:null},
		vbo:	{}
	},
	name:		"WebGL Doom",
	path:		"../webgldoom/",
	player:{
		accel:		250,
		angle:		null,
		col:{
			count:	0,
			lines:	[],
			show:	false,
			vbo:	{}
		},
		delta:		null,
		freecam:	false,
		k_turnspeed:90,
		m_turnspeed:45,
		qrot:		null,
		pos:		null,
		speed:		1
	},
	sky:		{show:true,vbo:{}},
	splash:		{show:true,vbo:{},loaded:false},
	things:		{
		show:	true,
		vbo:	{}
	},
	showlines:	false,
	walls:{
		show:	true,
		vbo:	{}
	}
};

//
// Wad File Loader ---------------------------------------------------------------------------------
//
he3d.game.map.load=function(newmap){
	var file=newmap.filename;
	var fileType=file.split('.');

	he3d.log('NOTICE','Requesting Map File:',file);
	newmap.loaded=false;

	var wwml=new Worker("scripts/wadLoader.js");
	wwml.onmessage=he3d.game.map.progress;
	wwml.onerror=function(e){
		he3d.log('FATAL','Map ('+newmap.filename+') Loader Worker Error: '
			+e.message+" ("+e.filename+":"+e.lineno+")");
	};
	wwml.map=newmap;
	wwml.postMessage({
		'debug':parseInt(newmap.debug),
		'path':newmap.path,
		'filename':newmap.filename,
		'curmap':newmap.curmap
	});
};
he3d.game.map.progress=function(e){
	if(e.data.logmsg&&e.data.loglabel&&e.data.loglevel){
		he3d.log(e.data.loglevel,e.data.loglabel,e.data.logmsg);
		return;
	}else if(e.data.logmsg&&e.data.loglevel){
		he3d.log(e.data.loglevel,e.data.logmsg);
		return;
	}else if(e.data.logmsg){
		he3d.log(e.data.logmsg);
		return;
	}else if(e.data.titlescreen){
		this.map.titlescreen.data=e.data.titlescreen.data;
		this.map.titlescreen.height=e.data.titlescreen.height;
		this.map.titlescreen.width=e.data.titlescreen.width;
		return;
	}
	
	this.map.atlus=e.data.atlus;
	this.map.data=e.data.mapdata;
	this.map.indices=e.data.indices;
	this.map.flatdata=e.data.flatdata;
	this.map.flatindices=e.data.flatindices;
	this.map.flatlus=e.data.flatlus;
	this.map.heightmap=e.data.heightmap;
	this.map.sky=e.data.sky;
	this.map.spawnPos=e.data.spawnPos;
	this.map.spawnDir=e.data.spawnDir;
	this.map.sprites=e.data.sprites;
	this.map.things=e.data.things;
	this.map.thingsatlus=e.data.thingsatlus;
	this.map.worldbb=e.data.worldbb;

	this.map.loaded=true;
};

//
// he3d Entry Point --------------------------------------------------------------------------------
//
he3d.game.loadAssets=function(){
	he3d.s.load({name:'collines'});
	he3d.s.load({name:'flats'});
	he3d.s.load({name:'sky'});
	he3d.s.load({name:'splash'});
	he3d.s.load({name:'things'});
	he3d.s.load({name:'walls'});

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
		he3d.game.splash.tex=he3d.t.load({
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
	if(he3d.game.splash.tex>-1){
		he3d.r.rCount=0;
		he3d.r.renderables[he3d.r.rCount++]={func:he3d.game.splash.draw};
	}

	// Spin until we get the map data
	if(!he3d.game.map.loaded)
		return;

	he3d.log("NOTICE","Loading Level: ",he3d.game.map.curmap);

	// Upload Map Textures
	he3d.game.walls.vbo.texture=he3d.t.load({
		name: 	'atlus',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
		image:	he3d.game.map.atlus.data,
		height:	he3d.game.map.atlus.height,
		width:	he3d.game.map.atlus.width
	});
	he3d.game.flats.vbo.texture=he3d.t.load({
		name: 	'flatlus',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
		image:	he3d.game.map.flatlus.data,
		height:	he3d.game.map.flatlus.height,
		width:	he3d.game.map.flatlus.width
	});
	he3d.game.things.vbo.texture=he3d.t.load({
		name: 	'thingsatlus',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
		image:	he3d.game.map.thingsatlus.data,
		height:	he3d.game.map.thingsatlus.height,
		width:	he3d.game.map.thingsatlus.width
	});

	// View heightmap
	if(false){
		var rawimage=new Uint8Array((he3d.game.map.heightmap.width*
			he3d.game.map.heightmap.height)*3);
		var ai=0,di=0;
		var scale=(he3d.game.map.heightmap.max-he3d.game.map.heightmap.min);
		for(var di=0;di<he3d.game.map.heightmap.data.length;di++){
			if(he3d.game.map.heightmap.data[di]==-9999){
				rawimage[ai++]=0;
				rawimage[ai++]=255;
				rawimage[ai++]=0;
				continue;
			}
			rawimage[ai++]=
				(he3d.game.map.heightmap.data[di]-he3d.game.map.heightmap.min)/(scale)*255;
			rawimage[ai++]=0;
			rawimage[ai++]=0;
		}	
		he3d.t.load({
			name: 	'heightmap',
			type:	'raw',
			format:	'rgb',
			flip:	true,
			filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
			image:	rawimage,
			height:	he3d.game.map.heightmap.height,
			width:	he3d.game.map.heightmap.width
		});
	}
	
	he3d.game.sky.vbo=he3d.primatives.bbox({
		insideout:true,
		z:{min:0,max:he3d.game.map.sky.width},
		x:{min:0,max:he3d.game.map.sky.width},
		y:{min:0,max:he3d.game.map.sky.width}
	});
	// Skybox cam position
	he3d.game.sky.campos=[-he3d.game.map.sky.width/2,
		-he3d.game.map.sky.width/2,-he3d.game.map.sky.width/2];
	he3d.game.sky.mvMatrix=he3d.m.mat4.create();

	// Set draw distance
	if((he3d.game.map.worldbb[1]-he3d.game.map.worldbb[0])<
		(he3d.game.map.worldbb[3]-he3d.game.map.worldbb[2]))
		he3d.game.camera.far=(he3d.game.map.worldbb[3]-he3d.game.map.worldbb[2])+10;
	else
		he3d.game.camera.far=(he3d.game.map.worldbb[1]-he3d.game.map.worldbb[0])+10;
		
	// Load Sky Texture
	he3d.game.sky.tex=he3d.t.load({
		name:	'sky',
		type:	'rawcubemap',
		format:	'rgba',
		flip:	false,
		bottom:	he3d.game.map.sky.bottom,
		middle:	he3d.game.map.sky.data,
		height:	he3d.game.map.sky.height,
		width:	he3d.game.map.sky.width,
		top:	he3d.game.map.sky.top
	});

	// Upload Walls Data
	he3d.game.walls.vbo.buf_data=he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.walls.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.game.map.data,he3d.gl.STATIC_DRAW);
	he3d.game.walls.vbo.buf_indices=he3d.gl.createBuffer();
	he3d.game.walls.vbo.indices=he3d.game.map.indices.length;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.walls.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(he3d.game.map.indices),he3d.gl.STATIC_DRAW);

	// Upload Flats Data
	he3d.game.flats.vbo.buf_data=he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.flats.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.game.map.flatdata,he3d.gl.STATIC_DRAW);
	he3d.game.flats.vbo.buf_indices=he3d.gl.createBuffer();
	he3d.game.flats.vbo.indices=he3d.game.map.flatindices.length;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.flats.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(he3d.game.map.flatindices),he3d.gl.STATIC_DRAW);

	// Things Buffers
	he3d.game.things.count=0;
	he3d.game.things.mvMatrix=he3d.m.mat4.create();
	he3d.game.things.buildSprites();

	// Player
	he3d.game.player.angle=he3d.m.vec2.create();
	he3d.game.player.pos=he3d.m.vec3.create();
	he3d.game.player.delta=he3d.m.vec3.create();

	// Create array for visible Collision Lines
	he3d.game.player.col.lines=new Float32Array(he3d.game.map.things.length*4*2);	// r,g,b,hit
	he3d.game.player.col.vbo.buf_data=he3d.gl.createBuffer();

	he3d.console.toggle(false);
	he3d.mode=he3d.game.loaded;
};

he3d.game.loaded=function(){
	// Set Camera pos
	he3d.game.player.pos.set([he3d.game.map.spawnPos[0],
		he3d.game.map.spawnPos[1],he3d.game.map.spawnPos[2]]);
	he3d.game.player.angle.set([0,he3d.game.map.spawnDir]);
	he3d.game.player.radius=THINGS[mobjtype_t.MT_PLAYER].radius;

	he3d.hud.cb=he3d.game.hud;
	he3d.hud.enabled=true;
	he3d.hud.updaterate=200;
	he3d.mode=he3d.game.main;

	he3d.fx.postProcessing.cb=he3d.game.postProcessingVariables;

	// Pointer Lock API Support
	if(he3d.i.hasPointerlock)
		he3d.canvas.addEventListener('click',he3d.i.requestPointerLock,false);
};

he3d.game.main=function(){
	// Check Debug Keys
	if(he3d.i.keys[he3d.e.keys._1]){
		he3d.game.walls.show=!he3d.game.walls.show;
		he3d.i.keys[he3d.e.keys._1]=false;
	}
	if(he3d.i.keys[he3d.e.keys._2]){
		he3d.game.flats.show=!he3d.game.flats.show;
		he3d.i.keys[he3d.e.keys._2]=false;
	}
	if(he3d.i.keys[he3d.e.keys._3]){
		he3d.game.sky.show=!he3d.game.sky.show;
		he3d.i.keys[he3d.e.keys._3]=false;
	}
	if(he3d.i.keys[he3d.e.keys._4]){
		he3d.game.showlines=!he3d.game.showlines;
		he3d.i.keys[he3d.e.keys._4]=false;
	}
	if(he3d.i.keys[he3d.e.keys._5]){
		he3d.game.things.show=!he3d.game.things.show;
		he3d.i.keys[he3d.e.keys._5]=false;
	}
	if(he3d.i.keys[he3d.e.keys._6]){
		he3d.game.player.col.show=!he3d.game.player.col.show;
		he3d.i.keys[he3d.e.keys._6]=false;
	}

	he3d.game.player.update();

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

	// Update Camera View
	he3d.game.camera.view().updatePerspective();
};

he3d.game.postProcessingVariables=function(){
	he3d.gl.uniform1f(he3d.r.curProgram.uniforms["vignette"],0.5);
};

//
// Player ------------------------------------------------------------------------------------------
//
he3d.game.player.update=function(){
	if(he3d.i.keys[he3d.e.keys.F]){
		this.freecam=!this.freecam;
		he3d.i.keys[he3d.e.keys.F]=false;
	}

	this.speed=1;
	if(he3d.i.keys[he3d.e.keys.SHIFT]){
		if(!this.freecam)
			this.speed=0.5;	// Run!
		else
			this.speed=2.5;	// Walk!
	}

	if(he3d.i.mouse.wheel>0)he3d.game.camera.setfov(he3d.game.camera.fov-5);
	if(he3d.i.mouse.wheel<0)he3d.game.camera.setfov(he3d.game.camera.fov+5);
	
	if(he3d.i.keys[he3d.e.keys.W])this.delta[2]= (this.accel/this.speed)*he3d.timer.delta;
	if(he3d.i.keys[he3d.e.keys.S])this.delta[2]=-(this.accel/this.speed)*he3d.timer.delta;
	if(he3d.i.keys[he3d.e.keys.A])this.delta[0]= (this.accel/this.speed)*he3d.timer.delta;
	if(he3d.i.keys[he3d.e.keys.D])this.delta[0]=-(this.accel/this.speed)*he3d.timer.delta;

	if(he3d.i.keys[he3d.e.keys.LEFT_ARROW])this.angle[1]+=
		(this.k_turnspeed/this.speed)*he3d.timer.delta;
	if(he3d.i.keys[he3d.e.keys.RIGHT_ARROW])this.angle[1]-=
		(this.k_turnspeed/this.speed)*he3d.timer.delta;

	// Mouse Strafe
	if(!this.freecam&&he3d.i.pointerLocked&&he3d.i.mouse.buttons[he3d.e.mouse.right])
		this.delta[0]=(-he3d.i.mouse.delta[0]*(this.accel/this.speed))*he3d.timer.delta;

	// Mouse Move/look
	if(he3d.i.pointerLocked||he3d.i.mouse.buttons[he3d.e.mouse.middle]){
		if(!he3d.i.mouse.buttons[he3d.e.mouse.right])
			this.angle[1]-=(this.m_turnspeed*he3d.i.mouse.delta[0])*he3d.timer.delta;
		if(!this.freecam)
			this.delta[2]-=(he3d.i.mouse.delta[1]*(this.accel/this.speed))*he3d.timer.delta;
	}

	//
	// Free Cam ----------------
	//
	if(this.freecam){
		if(he3d.i.pointerLocked||he3d.i.mouse.buttons[he3d.e.mouse.middle])
			this.angle[0]-=(this.m_turnspeed*he3d.i.mouse.delta[1])*he3d.timer.delta;
		
		if(he3d.i.keys[he3d.e.keys.E])this.delta[1]= (this.accel/this.speed)*he3d.timer.delta;
		if(he3d.i.keys[he3d.e.keys.Q])this.delta[1]=-(this.accel/this.speed)*he3d.timer.delta;

		if(he3d.i.keys[he3d.e.keys.DOWN_ARROW])this.angle[0]+=
			(this.k_turnspeed/this.speed)*he3d.timer.delta;
		if(he3d.i.keys[he3d.e.keys.UP_ARROW])this.angle[0]-=
			(this.k_turnspeed/this.speed)*he3d.timer.delta;

		this.groundheight=0;

	}

	// Wrap angles
	if(this.angle[0]>360)this.angle[0]-=360;
	else if(this.angle[0]<0)this.angle[0]+=360;
	if(this.angle[1]>360)this.angle[1]-=360;
	else if(this.angle[1]<0)this.angle[1]+=360;

	this.qrot=he3d.m.quat4.eulerAngleCreate(this.angle[0],this.angle[1],0);
	he3d.m.quat4.multiplyVec3(this.qrot,this.delta);
	
	//
	// Walking Mode ------------
	//
	if(!this.freecam){
		this.angle[0]=0;	// No lookup/down ;)
		
		var hm=he3d.game.map.heightmap;
		var newpos=[
			this.pos[0]+this.delta[0],
			this.pos[1]+this.delta[1],
			this.pos[2]+this.delta[2]
		];

		this.gndavg=0;
		for(var r=0;r<this.radius/8;r++){
			this.gndavg+=-hm.data[((Math.round(-newpos[2]+(r*-this.delta[2]))+hm.offy)*hm.width)+
				(Math.round(-newpos[0]+(r*-this.delta[0]))+hm.offx)];
		}
		this.gndavg/=this.radius/8;
		
		var groundheight=-hm.data[(Math.round(-newpos[2]+hm.offy)*hm.width)+
			Math.round(-newpos[0]+hm.offx)];

		if(-groundheight==NOGROUND||(groundheight<this.groundheight)&&
			(Math.abs(this.groundheight-this.gndavg)>25)){
			this.pos[0]-=this.delta[0];
			this.pos[1]=this.groundheight;
			this.pos[2]-=this.delta[2];

			this.delta[0]=0;
			this.delta[1]=0;
			this.delta[2]=0;
		} else {
			this.groundheight=groundheight;
		}

		if(this.pos[1]<groundheight)
			this.delta[1]+=he3d.game.gravity*he3d.timer.delta;
		else
			this.pos[1]=groundheight;
	}
	
	// Movement
	this.pos[0]+=this.delta[0];
	this.pos[1]+=this.delta[1];
	this.pos[2]+=this.delta[2];
	this.delta[0]=0;
	this.delta[1]=0;
	this.delta[2]=0;

	// Update Camera
	he3d.game.camera.camMat=he3d.m.quat4.toMat4_broke(this.qrot);
	he3d.game.camera.pos[0]=this.pos[0];
	he3d.game.camera.pos[1]=(this.pos[1]+-PLAYER_HEIGHT);
	he3d.game.camera.pos[2]=this.pos[2];
};

he3d.game.player.col.draw=function(){
	if(!he3d.game.player.col.show||he3d.game.player.col.count<1)
		return;

	he3d.r.changeProgram('collines');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.player.col.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.game.player.col.lines,he3d.gl.DYNAMIC_DRAW);
	
	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
		3,he3d.gl.FLOAT,false,16,0);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aHit']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aHit'],
		1,he3d.gl.FLOAT,false,16,12);

	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uMVMatrix'],false,he3d.r.mvMatrix);

	he3d.gl.drawArrays(he3d.gl.LINES,0,he3d.game.player.col.count/4);
};

//
// Lights ------------------------------------------------------------------------------------------
//
he3d.game.lights.update=function(){
	var time=Date.now();
	// Blink Random
	if(time-he3d.game.lights.randomblink>=25&&Math.random()){
		if(he3d.game.lights.timers[1]==1.0)
			he3d.game.lights.timers[1]=0.0;
		else
			he3d.game.lights.timers[1]=1.0;
		he3d.game.lights.randomblink=time;
	}

	// Blink 0.5
	if(time-he3d.game.lights.halfblink>=500){
		if(he3d.game.lights.timers[2]==1.0)
			he3d.game.lights.timers[2]=0.25;
		else
			he3d.game.lights.timers[2]=1.0;
		he3d.game.lights.halfblink=time;
	}
	
	// Blink 1.0
	if(time-he3d.game.lights.blink>=1000){
		if(he3d.game.lights.timers[3]==1.0)
			he3d.game.lights.timers[3]=0.25;
		else
			he3d.game.lights.timers[3]=1.0;
		he3d.game.lights.blink=time;
	}
	
	// Oscillating Light Timer
	if(he3d.game.lights.oscillatedir)
		he3d.game.lights.timers[4]+=0.0175;
	else
		he3d.game.lights.timers[4]-=0.0175;
	if(he3d.game.lights.timers[4]>1.0||he3d.game.lights.timers[4]<0.25)
		he3d.game.lights.oscillatedir=!he3d.game.lights.oscillatedir;

};

//
// Map ---------------------------------------------------------------------------------------------
//
he3d.game.flats.draw=function(){
	if(!he3d.game.flats.show&&!he3d.game.showlines)
		return;
		
	he3d.r.changeProgram('flats');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.flats.vbo.buf_data);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
		3,he3d.gl.FLOAT,false,28,0);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aTexId']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aTexId'],
		2,he3d.gl.FLOAT,false,28,12);
		
	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aLight']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aLight'],
		1,he3d.gl.FLOAT,false,28,20);
		
	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aType']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aType'],
		1,he3d.gl.FLOAT,false,28,24);

	he3d.gl.uniform1i(he3d.r.curProgram.uniforms['texture'],he3d.game.flats.vbo.texture);
	he3d.gl.uniform1fv(he3d.r.curProgram.uniforms['lighttimers'],he3d.game.lights.timers);

	// Position in World
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uMVMatrix'],false,he3d.r.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.flats.vbo.buf_indices);
	
	if(he3d.game.flats.show){
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms['lines'],0);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,
			he3d.game.flats.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}

	if(he3d.game.showlines){
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms['lines'],1);
		he3d.gl.drawElements(he3d.gl.POINTS,
			he3d.game.flats.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}
};

he3d.game.walls.draw=function(){
	if(!he3d.game.walls.show&&!he3d.game.showlines)
		return;
		
	he3d.r.changeProgram('walls');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.walls.vbo.buf_data);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
		3,he3d.gl.FLOAT,false,28,0);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aTexCoord']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aTexCoord'],
		2,he3d.gl.FLOAT,false,28,12);
		
	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aLight']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aLight'],
		1,he3d.gl.FLOAT,false,28,20);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aType']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aType'],
		1,he3d.gl.FLOAT,false,28,24);

	he3d.gl.uniform1i(he3d.r.curProgram.uniforms['texture'],he3d.game.walls.vbo.texture);
	he3d.gl.uniform1fv(he3d.r.curProgram.uniforms['lighttimers'],he3d.game.lights.timers);
	
	// Position in World
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uMVMatrix'],false,he3d.r.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.walls.vbo.buf_indices);
	
	if(he3d.game.walls.show){
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms['lines'],0);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,
			he3d.game.walls.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}

	if(he3d.game.showlines){
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms['lines'],1);
		he3d.gl.drawElements(he3d.gl.LINES,
			he3d.game.walls.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}
};

//
// Sky ---------------------------------------------------------------------------------------------
//
he3d.game.sky.draw=function(){
	if(!he3d.game.sky.show)
		return;
	he3d.r.changeProgram('sky');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.sky.vbo.buf_data);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
		3,he3d.gl.FLOAT,false,48,0);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aNormal']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aNormal'],
		3,he3d.gl.FLOAT,false,48,12);
		
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms['texture'],he3d.game.sky.tex);

	// Inverse camera rotation
	he3d.m.mat4.identity(he3d.game.sky.mvMatrix);
	he3d.m.mat4.rotateX(he3d.game.sky.mvMatrix,he3d.m.degtorad(-he3d.game.player.angle[0]));
	he3d.m.mat4.rotateY(he3d.game.sky.mvMatrix,he3d.m.degtorad(-he3d.game.player.angle[1]));
	he3d.m.mat4.translate(he3d.game.sky.mvMatrix,he3d.game.sky.campos);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uMVMatrix'],false,he3d.game.sky.mvMatrix);
	
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.sky.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES,he3d.game.sky.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
};

//
// Splash Screen -----------------------------------------------------------------------------------
//
he3d.game.splash.draw=function(){
	if(!he3d.game.splash.show)
		return;
	he3d.r.changeProgram('splash');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.splash.vbo.buf_data);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
		3,he3d.gl.FLOAT,false,20,0);

	he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aTexCoord']);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aTexCoord'],
		2,he3d.gl.FLOAT,false,20,12);
		
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms['texture'],he3d.game.splash.tex);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,
		he3d.game.splash.view);
	
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,he3d.game.splash.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES,he3d.game.splash.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
};

//
// Things ------------------------------------------------------------------------------------------
//
he3d.game.things.buildSprites=function(){
	var aname,verts,texcoords,data,vbo,w,h,
		indices=new Uint16Array([0,1,2,0,2,3]);
	for(var s in he3d.game.map.sprites){
		if(!he3d.game.map.sprites)
			continue;

			h=he3d.game.map.sprites[s].height/2;
			w=he3d.game.map.sprites[s].width/2;
			verts=new Float32Array([
				-w,  h, 0,
				-w, -h, 0,
				 w, -h, 0,
				 w,  h, 0
			]);
			texcoords=new Float32Array([
				he3d.game.map.sprites[s].uv[1],he3d.game.map.sprites[s].uv[0],
				he3d.game.map.sprites[s].uv[1],he3d.game.map.sprites[s].uv[2],
				he3d.game.map.sprites[s].uv[3],he3d.game.map.sprites[s].uv[2],
				he3d.game.map.sprites[s].uv[3],he3d.game.map.sprites[s].uv[0]
				
			]);
			
			data=he3d.tools.interleaveFloat32Arrays([3,2],[verts,texcoords]);
			he3d.game.map.sprites[s].vbo={};
			he3d.game.map.sprites[s].vbo.buf_data=he3d.gl.createBuffer();
			he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.map.sprites[s].vbo.buf_data);
			he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,data,he3d.gl.STATIC_DRAW);

			he3d.game.map.sprites[s].vbo.buf_indices=he3d.gl.createBuffer();
			he3d.game.map.sprites[s].vbo.indices=indices.length;
			he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,
				he3d.game.map.sprites[s].vbo.buf_indices);
			he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,indices,he3d.gl.STATIC_DRAW);
	}
};

he3d.game.things.draw=function(){
	if(!he3d.game.things.show)
		return;
	he3d.r.changeProgram('things');
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms['texture'],he3d.game.things.vbo.texture);

	he3d.game.things.count=0;
	var thing;
	for(var t=0;t<he3d.game.map.things.length;t++){
		thing=he3d.game.map.things[t];
		if(!thing.sprite)
			continue;

		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,thing.sprite.vbo.buf_data);
	
		he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aPosition']);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aPosition'],
			3,he3d.gl.FLOAT,false,20,0);
	
		he3d.gl.enableVertexAttribArray(he3d.r.curProgram.attributes['aTexCoord']);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes['aTexCoord'],
			2,he3d.gl.FLOAT,false,20,12);

		he3d.m.mat4.set(he3d.r.mvMatrix,he3d.game.things.mvMatrix);
		he3d.m.mat4.translate(he3d.game.things.mvMatrix,[
			thing.x,
			thing.y,
			thing.z
		]);

		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uPMatrix'],false,he3d.r.pMatrix);
		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms['uMVMatrix'],
			false,he3d.game.things.mvMatrix);
		
		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,thing.sprite.vbo.buf_indices);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,thing.sprite.vbo.indices,he3d.gl.UNSIGNED_SHORT,0);

		he3d.game.things.count++;
	}
};

he3d.game.things.getSpriteName=function(state){
	// Needs angle checking! the thing.angle might be wrong in WADLOADER
	var name=spritenames[state_t[state].sprite]+		// Rootname
		(String.fromCharCode(65+(state_t[state].frame&FF_FRAMEMASK)));	// Frame
	for(var s=0;s<he3d.game.map.sprites.length;s++)
		if(he3d.game.map.sprites[s].name.substring(0,5)==name)
			return he3d.game.map.sprites[s];
	return null;
};

he3d.game.things.update=function(){
	var thing,
		col=he3d.m.vec3.create(),
		hit=0,
		dist=0,
		offx=he3d.game.map.heightmap.offx,
		offy=he3d.game.map.heightmap.offy,
		hmw=he3d.game.map.heightmap.width;

	he3d.game.hud.tmp=[];
	he3d.game.player.col.count=0;
	
	for(var t=0;t<he3d.game.map.things.length;t++){
		thing=he3d.game.map.things[t];
		if(thing.curstate==statenum_t.S_NULL||!state_t[thing.curstate])
			continue;

		// Move to next state
		if(state_t[thing.curstate].tics>0&&
			(thing.tic+=ANIM_FPS*he3d.timer.delta)>=state_t[thing.curstate].tics){
			thing.curstate=state_t[thing.curstate].nextstate;
			thing.tic=0;
			thing.sprite=he3d.game.things.getSpriteName(thing.curstate);
		}

		// Get spritename
		if(!thing.sprite)
			thing.sprite=he3d.game.things.getSpriteName(thing.curstate);

		// Get Sector Height
		if(thing.sprite){
			thing.y=he3d.game.map.heightmap.data[((thing.z+offy)*hmw)+(thing.x+offx)]+
				(thing.sprite.height/2);

			// Collision Lines
			col[0]=-thing.x;
			col[1]=-thing.y;
			col[2]=-thing.z;
			hit=0;
			dist=he3d.m.vec3.dist(he3d.game.player.pos,col);
			if(dist<=(thing.radius+he3d.game.player.radius))
				hit=1;
			if(he3d.game.player.col.show&&dist<500){
				he3d.game.hud.tmp.push(t+" ["+thing.sprite.name+"] dist = "+dist.toFixed(2));  
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-he3d.game.player.pos[0];
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-he3d.game.player.pos[1]+8;
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-he3d.game.player.pos[2];
				he3d.game.player.col.lines[he3d.game.player.col.count++]=hit;
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-col[0];
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-col[1];
				he3d.game.player.col.lines[he3d.game.player.col.count++]=-col[2];
				he3d.game.player.col.lines[he3d.game.player.col.count++]=hit;
			}

		}
	}
};

//
// Hud ---------------------------------------------------------------------------------------------
//
he3d.game.hud=function(){
	if(he3d.game.player.col.show){
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.translate(10,10);
		for(var t=0;t<he3d.game.hud.tmp.length;t++){
			this.ctx.translate(0,10);
			this.ctx.fillText(he3d.game.hud.tmp[t],0,0);
		}
	}
	
	this.ctx.setTransform(1,0,0,1,0,0);
	this.ctx.translate(10,he3d.hud.size[1]-80);
	this.ctx.fillText("Fullviewport - alt+return / Click to enable Mouse Support",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("W/A/S/D/Q/E - Move Camera",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Cursor Keys - Look",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Toggle FreeCam (noclip) - F",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Toggle Walls - 1 / Flats - 2 / Sky - 3 "+
		"/ Lines - 4 / Things - 5 / Coltest - 6",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Player Pos - ["+
		he3d.game.player.pos[0].toFixed(2)+","+
		he3d.game.player.pos[1].toFixed(2)+","+
		he3d.game.player.pos[2].toFixed(2)+"]"+
		" ground : "+he3d.game.player.groundheight+" avg:"+he3d.game.player.gndavg,0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("THINGS count - "+he3d.game.things.count,0,0);
};
