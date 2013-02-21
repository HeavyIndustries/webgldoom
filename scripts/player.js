//
// Player
//
he3d.game.player={
	accel:		250,
	ammo:		{
		bullets:	{cur:60, 	max: 200},
		shells:		{cur:0, 	max: 50},
		rockets:	{cur:0, 	max: 50},
		cells:		{cur:0, 	max: 300}
	},
	angle:		null,
	armor:		0,
	bonuscount:	0,
	col:{
		count:	0,
		lines:	[],
		show:	false,
		vbo:	{}
	},
	delta:		null,
	dir:		0,
	freecam:	false,
	godmode:	false,
	health:		100,
	itemcount:	0,
	k_turnspeed:90,
	keys:		{
		blue:	false,
		red:	false,
		yellow:	false,
		sblue:	false,
		sred:	false,
		syellow:false
	},
	killcount:	0,
	m_turnspeed:22.5,
	qrot:		null,
	pos:		null,
	sector:		-1,
	speed:		{
		run:	583,
		walk:	292
	},
	thing:		null,
	weapon_sel:	2,
	weapons:	{
		chainsaw:	false,
		pistol:		true,
		shotgun:	false,
		sshotgun:	false,
		chaingun:	false,
		rocket:		false,
		plasma:		false,
		bfg9000:	false
	}
};

he3d.game.player.init=function(){
	
	var newpush=0;
	
	this.angle=he3d.m.vec2.create();
	this.pos=he3d.m.vec3.create();
	this.delta=he3d.m.vec3.create();
	this.weapon_sel=2;

	// Collision Lines
	this.col.lines=new Float32Array(he3d.game.map.things.length*4*2);	// r,g,b,hit
	this.col.vbo.buf_data=he3d.gl.createBuffer();

	// Set Camera pos
	this.pos.set([he3d.game.map.spawnPos[0],
		he3d.game.map.spawnPos[1],he3d.game.map.spawnPos[2]]);
	this.angle.set([0,he3d.game.map.spawnDir]);
	this.radius=THINGS[mobjtype_t.MT_PLAYER].radius;

	this.sector=he3d.game.map.findSector(
		[-this.pos[0],-this.pos[1],-this.pos[2]]);

	this.pos[1]=-he3d.game.map.sectors[this.sector].floor;
	
	// Create a THING for the player
	var playerThing={
		doomednum:	-1,
		type:		-1,
		curstate:	0,
		tic:		0,
		thing:		THINGS[mobjtype_t.MT_PLAYER],
		x:			Math.round(this.pos[0]),
		y:			Math.round(this.pos[1]),
		z:			Math.round(this.pos[2]),
		pos:		he3d.m.vec3.create(),
		delta:		he3d.m.vec3.create(),
		angle:		Math.round(this.angle[1]),
		flags:		THINGS[mobjtype_t.MT_PLAYER].flags,
		player:		this,
		radius:		THINGS[mobjtype_t.MT_PLAYER].radius,
		health:		THINGS[mobjtype_t.MT_PLAYER].spawnhealth,
		height:		THINGS[mobjtype_t.MT_PLAYER].height,
		damage:		THINGS[mobjtype_t.MT_PLAYER].damage,
		mass:		THINGS[mobjtype_t.MT_PLAYER].mass,
		sector:		this.sector
	}	

	playerThing.pos.set([-playerThing.x,-playerThing.y,-playerThing.z]);
	
	newpush=he3d.game.map.things.push(playerThing);
	this.thing=he3d.game.map.things[newpush-1];
	this.health=this.thing.thing.spawnhealth;	
	
};

//
// Draw Colision Lines -----------------------------------------------------------------------------
//
he3d.game.player.col.draw=function(){
	if(!he3d.game.player.col.show||he3d.game.player.col.count<1)
		return;

	he3d.r.changeProgram('collines');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,he3d.game.player.col.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.game.player.col.lines,he3d.gl.DYNAMIC_DRAW);

	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3,he3d.gl.FLOAT,false,16,0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aHit,
		1,he3d.gl.FLOAT,false,16,12);

	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,false,he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix,false,he3d.r.mvMatrix);

	he3d.gl.drawArrays(he3d.gl.LINES,0,he3d.game.player.col.count/4);
};

//
// Update Player -----------------------------------------------------------------------------------
//
he3d.game.player.update=function(){
	// Free Cam
	if(he3d.i.keys[he3d.e.keys.F]){
		this.freecam=!this.freecam;
		he3d.i.keys[he3d.e.keys.F]=false;
	}

	// Select Weapon
	if(he3d.i.keys[he3d.e.keys._1]){
		if(this.weapons.chainsaw) this.weapon_sel=0;
		else this.weapon_sel=1;
		he3d.i.keys[he3d.e.keys._1]=false;
	}
	if(he3d.i.keys[he3d.e.keys._2]){
		if(this.weapons.pistol) this.weapon_sel=2;
		he3d.i.keys[he3d.e.keys._2]=false;
	}
	if(he3d.i.keys[he3d.e.keys._3]){
		if(this.weapons.sshotgun) this.weapon_sel=8;
		if(this.weapons.shotgun) this.weapon_sel=3;
		he3d.i.keys[he3d.e.keys._3]=false;
	}
	if(he3d.i.keys[he3d.e.keys._4]){
		if(this.weapons.chaingun) this.weapon_sel=4;
		he3d.i.keys[he3d.e.keys._4]=false;
	}
	if(he3d.i.keys[he3d.e.keys._5]){
		if(this.weapons.rocket) this.weapon_sel=5;
		he3d.i.keys[he3d.e.keys._5]=false;
	}
	if(he3d.i.keys[he3d.e.keys._6]){
		if(this.weapons.plasma) this.weapon_sel=6;
		he3d.i.keys[he3d.e.keys._6]=false;
	}
	if(he3d.i.keys[he3d.e.keys._7]){
		if(this.weapons.bfg9000) this.weapon_sel=7;
		he3d.i.keys[he3d.e.keys._7]=false;
	}

	if(he3d.i.mouse.wheel>0)he3d.game.camera.setfov(he3d.game.camera.fov-5);
	if(he3d.i.mouse.wheel<0)he3d.game.camera.setfov(he3d.game.camera.fov+5);

	if(he3d.i.keys[he3d.e.keys.SHIFT]){
		if(he3d.i.keys[he3d.e.keys.W])this.delta[2]= this.speed.run;
		if(he3d.i.keys[he3d.e.keys.S])this.delta[2]=-this.speed.run;
		if(he3d.i.keys[he3d.e.keys.A])this.delta[0]= this.speed.run;
		if(he3d.i.keys[he3d.e.keys.D])this.delta[0]=-this.speed.run;
	}else{
		if(he3d.i.keys[he3d.e.keys.W])this.delta[2]= this.speed.walk;
		if(he3d.i.keys[he3d.e.keys.S])this.delta[2]=-this.speed.walk;
		if(he3d.i.keys[he3d.e.keys.A])this.delta[0]= this.speed.walk;
		if(he3d.i.keys[he3d.e.keys.D])this.delta[0]=-this.speed.walk;
	}

	if(he3d.i.keys[he3d.e.keys.LEFT_ARROW])this.angle[1]+=
		(this.k_turnspeed)*he3d.timer.delta;
	if(he3d.i.keys[he3d.e.keys.RIGHT_ARROW])this.angle[1]-=
		(this.k_turnspeed)*he3d.timer.delta;

	// Mouse Strafe
//	if(!this.freecam&&he3d.i.pointerLocked&&he3d.i.mouse.buttons[he3d.e.mouse.right])
//		this.delta[0]=(-he3d.i.mouse.delta[0]*(this.accel/this.speed))*he3d.timer.delta;

	// Mouse Move/look
	if(he3d.i.pointerLocked||he3d.i.mouse.buttons[he3d.e.mouse.middle]){
		if(!he3d.i.mouse.buttons[he3d.e.mouse.right])
			this.angle[1]-=(this.m_turnspeed*he3d.i.mouse.delta[0])*he3d.timer.delta;
//		if(!this.freecam)
//			this.delta[2]-=(he3d.i.mouse.delta[1]*(this.accel/this.speed))*he3d.timer.delta;
	}

	//
	// Free Cam ----------------
	//
	if(this.freecam){
		if(he3d.i.pointerLocked||he3d.i.mouse.buttons[he3d.e.mouse.middle])
			this.angle[0]-=(this.m_turnspeed*he3d.i.mouse.delta[1])*he3d.timer.delta;

		if(he3d.i.keys[he3d.e.keys.E])this.delta[1]+= this.speed.walk;
		if(he3d.i.keys[he3d.e.keys.Q])this.delta[1]+=-this.speed.walk;

		if(he3d.i.keys[he3d.e.keys.DOWN_ARROW])this.angle[0]+=(this.k_turnspeed)*he3d.timer.delta;
		if(he3d.i.keys[he3d.e.keys.UP_ARROW])this.angle[0]-=(this.k_turnspeed)*he3d.timer.delta;

		this.groundheight=0;

	}

	// Wrap angles
	if(this.angle[0]>360)this.angle[0]-=360;
	else if(this.angle[0]<0)this.angle[0]+=360;
	if(this.angle[1]>360)this.angle[1]-=360;
	else if(this.angle[1]<0)this.angle[1]+=360;

	// Delta *before* transform
	he3d.game.fpweap.bobdelta[0]=he3d.m.degtorad(this.delta[0]);
	he3d.game.fpweap.bobdelta[1]=he3d.m.degtorad(this.delta[2]);

	// FPS Movement
	this.delta[0]*=he3d.timer.delta;
	this.delta[1]*=he3d.timer.delta;
	this.delta[2]*=he3d.timer.delta;

	this.qrot=he3d.m.quat4.eulerAngleCreate(this.angle[0],this.angle[1],0);
	he3d.m.quat4.multiplyVec3(this.qrot,this.delta);

	//
	// Walking Mode ------------
	//
	if(!this.freecam&&(this.delta[0]||this.delta[2]||this.delta[3])){
		this.angle[0]=0;	// No lookup/down ;)

		this.thing.delta[0]=-this.delta[0];
		this.thing.delta[1]=-this.delta[1];
		this.thing.delta[2]=-this.delta[2];

		if(!he3d.game.map.checkMoveLocation(
			this.thing,
			-(this.pos[0]+this.delta[0]),
			-(this.pos[2]+this.delta[2])))
		{
			this.delta.set([0,0,0]);
		}else{
			this.delta[0]=-this.thing.delta[0];
			this.delta[1]=-this.thing.delta[1];
			this.delta[2]=-this.thing.delta[2];
		}
		var sector=
			he3d.game.map.findSector(
				[-(this.pos[0]+this.delta[0]),
				-(this.pos[1]+this.delta[1]),
				-(this.pos[2]+this.delta[2])]);
		this.thing.sector=sector;
		this.pos[1]=-he3d.game.map.sectors[this.sector].floor;
		this.delta[1]=0;
		
		// Update the player THING to the location of the player
		this.thing.pos.set([-Math.round(this.pos[0]+this.delta[0]),
							-Math.round(this.pos[1]+this.delta[1]),
							-Math.round(this.pos[2]+this.delta[2])]);

		this.thing.angle=Math.round(this.angle[1]);		
	}


	// View Direction
	this.dir=Math.round((this.angle[1]/360)*8)||8;

	// Movement
	this.pos[0]+=this.delta[0];
	this.pos[1]+=this.delta[1];
	this.pos[2]+=this.delta[2];

	this.delta.set([0,0,0]);

	if(!sector)
		this.sector=he3d.game.map.findSector([-this.pos[0],-this.pos[1],-this.pos[2]]);
	else
		this.sector=sector;

	if(he3d.game.map.traceBSP&&this.sector!=he3d.game.hlSector)
		he3d.game.map.doTraceBSP=true;

	he3d.game.hlSector=this.sector;
	
//	if(this.sector>0 && !this.freecam)
//		this.pos[1]=-he3d.game.map.sectors[this.sector].floor;

//	this.thing.sector=this.sector;

	// Update Camera
	he3d.game.camera.camMat=he3d.m.quat4.toMat4_broke(this.qrot);
	he3d.game.camera.pos[0]=this.pos[0];
	he3d.game.camera.pos[1]=(this.pos[1]+-PLAYER_HEIGHT);
	he3d.game.camera.pos[2]=this.pos[2];


};
