//
// Hud elements
//

he3d.game.statusbar={
	a_frame:0,
	items:	[],
	ticker:	0,
	show:	true,
	vbo:	{}
};
he3d.game.fpweap={
	a_frame:	0,
	bob:		0,
	bobangle:	0,
	bobdelta:	[0,0],
	items:		[],
	ticker:		0,
	show:		true,
	vbo:		{}
};

//
// First Person Weapon View ------------------------------------------------------------------------
//
he3d.game.fpweap.init=function(){
	this.vbo.texture=he3d.t.load({
		name: 	'fpweap',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
		image:	he3d.game.map.fpwatlas.data,
		height:	he3d.game.map.fpwatlas.height,
		width:	he3d.game.map.fpwatlas.width
	});
	
	// Use Statusbar .view matrix

	// Put each hud element into its own vbo
	var name;
	for(var fpwi=0;fpwi<he3d.game.map.fpw.length;fpwi++){
		name=he3d.game.map.fpw[fpwi].name;
		this.items[name]={
			height:	he3d.game.map.fpw[fpwi].height,
			width:	he3d.game.map.fpw[fpwi].width,
			vbo:{
				buf_data:	he3d.gl.createBuffer(),
				buf_indices:he3d.gl.createBuffer(),
				indices:	6
			}
		};
		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,this.items[name].vbo.buf_data);
		he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.tools.interleaveFloat32Arrays([3,2],[
			new Float32Array([
				0,he3d.game.map.fpw[fpwi].height,-1.0,
				0,0,-1.0,
				he3d.game.map.fpw[fpwi].width,0,-1.0,
				he3d.game.map.fpw[fpwi].width,he3d.game.map.fpw[fpwi].height,-1.0
			]),
			new Float32Array([
				he3d.game.map.fpw[fpwi].uv[1],
				he3d.game.map.fpw[fpwi].uv[0],
				he3d.game.map.fpw[fpwi].uv[1],
				he3d.game.map.fpw[fpwi].uv[2],
				he3d.game.map.fpw[fpwi].uv[3],
				he3d.game.map.fpw[fpwi].uv[2],
				he3d.game.map.fpw[fpwi].uv[3],
				he3d.game.map.fpw[fpwi].uv[0]])
			]),he3d.gl.STATIC_DRAW);

		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,
			this.items[name].vbo.buf_indices);
		he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array([0,1,2,0,2,3]),he3d.gl.STATIC_DRAW);
	}
};

he3d.game.fpweap.draw=function(){
	if(!he3d.game.fpweap.show||!he3d.game.statusbar.show)
		return;

	he3d.gl.disable(he3d.gl.DEPTH_TEST);
	he3d.gl.enable(he3d.gl.BLEND);
	he3d.r.changeProgram('hud');

	var vbo;
	for(var fpwi=0;fpwi<he3d.game.fpweap.drawlist.length;fpwi++){
		vbo=he3d.game.fpweap.items[he3d.game.fpweap.drawlist[fpwi].item].vbo;
		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,vbo.buf_data);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
			3,he3d.gl.FLOAT,false,20,0);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
			2,he3d.gl.FLOAT,false,20,12);

		he3d.gl.uniform2fv(he3d.r.curProgram.uniforms.uOffset,
			he3d.game.fpweap.drawlist[fpwi].offset);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture,he3d.game.fpweap.vbo.texture);
		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,false,
			he3d.game.statusbar.view);

		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,vbo.buf_indices);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}
	he3d.gl.disable(he3d.gl.BLEND);
	he3d.gl.enable(he3d.gl.DEPTH_TEST);
};

he3d.game.fpweap.update=function(){
	this.drawlist=[];
	var p=he3d.game.player;

	this.bob=0;
	if(this.bobangle++>360)
		this.bobangle-=360;

	this.bobdelta[0]+=this.bobdelta[0]*he3d.m.dirtycos(he3d.m.degtorad(he3d.game.player.angle[1]));
	this.bobdelta[1]+=this.bobdelta[1]*he3d.m.dirtysin(he3d.m.degtorad(he3d.game.player.angle[1]));
	this.bob=(this.bobdelta[0]+this.bobdelta[1])+he3d.m.dirtysin(he3d.m.degtorad(this.bobangle));
	
	// Weapons
	var weap='PISGA0';
	switch(he3d.game.player.weapon_sel){
		case 0: weap='SAWGA0'; break;
		case 1: weap='PUNGA0'; break;
		case 2: weap='PISGA0'; break;
		case 3: weap='SHTGA0'; break;
		case 4: weap='CHGGA0'; break;
		case 5: weap='MISGA0'; break;
		case 6: weap='PLSGA0'; break;
		case 7: weap='BFGGA0'; break;
		case 8: weap='SHT2A0'; break;
	}
	if(!this.items[weap])
		return;
	this.drawlist.push({
		item:	weap,	// Replaces frag count in singleplayer
		offset:	[0-(this.items[weap].width/2)+this.bob,(-120+this.items[weap].height/2)+-this.bob]
	});
};
	
//
// Status Bar --------------------------------------------------------------------------------------
//
he3d.game.statusbar.init=function(){
	this.vbo.texture=he3d.t.load({
		name: 	'hud',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{min:he3d.gl.NEAREST,mag:he3d.gl.NEAREST},
		image:	he3d.game.map.hudatlas.data,
		height:	he3d.game.map.hudatlas.height,
		width:	he3d.game.map.hudatlas.width
	});

	// Ortho to 320x240
	this.view=he3d.m.mat4.create();
	he3d.m.mat4.ortho(-160,160,-120,120,0.01,100,this.view);

	// Put each hud element into its own vbo
	var name;
	for(var hi=0;hi<he3d.game.map.hud.length;hi++){
		name=he3d.game.map.hud[hi].name;
		this.items[name]={
			width:he3d.game.map.hud[hi].width,
			vbo:{
				buf_data:	he3d.gl.createBuffer(),
				buf_indices:he3d.gl.createBuffer(),
				indices:	6
			}
		};
		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,this.items[name].vbo.buf_data);
		he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER,he3d.tools.interleaveFloat32Arrays([3,2],[
			new Float32Array([
				0,he3d.game.map.hud[hi].height,-1.0,
				0,0,-1.0,
				he3d.game.map.hud[hi].width,0,-1.0,
				he3d.game.map.hud[hi].width,he3d.game.map.hud[hi].height,-1.0
			]),
			new Float32Array([
				he3d.game.map.hud[hi].uv[1],
				he3d.game.map.hud[hi].uv[0],
				he3d.game.map.hud[hi].uv[1],
				he3d.game.map.hud[hi].uv[2],
				he3d.game.map.hud[hi].uv[3],
				he3d.game.map.hud[hi].uv[2],
				he3d.game.map.hud[hi].uv[3],
				he3d.game.map.hud[hi].uv[0]])
			]),he3d.gl.STATIC_DRAW);

		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,
			this.items[name].vbo.buf_indices);
		he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array([0,1,2,0,2,3]),he3d.gl.STATIC_DRAW);
	}
};

he3d.game.statusbar.draw=function(){
	if(!he3d.game.statusbar.show)
		return;

	he3d.gl.disable(he3d.gl.DEPTH_TEST);
	he3d.gl.enable(he3d.gl.BLEND);
	he3d.r.changeProgram('hud');

	var vbo;
	for(var hi=0;hi<he3d.game.statusbar.drawlist.length;hi++){
		vbo=he3d.game.statusbar.items[he3d.game.statusbar.drawlist[hi].item].vbo;
		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER,vbo.buf_data);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
			3,he3d.gl.FLOAT,false,20,0);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
			2,he3d.gl.FLOAT,false,20,12);

		he3d.gl.uniform2fv(he3d.r.curProgram.uniforms.uOffset,
			he3d.game.statusbar.drawlist[hi].offset);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture,he3d.game.statusbar.vbo.texture);
		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix,false,
			he3d.game.statusbar.view);

		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER,vbo.buf_indices);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,vbo.indices,he3d.gl.UNSIGNED_SHORT,0);
	}
	he3d.gl.disable(he3d.gl.BLEND);
	he3d.gl.enable(he3d.gl.DEPTH_TEST);
};

he3d.game.statusbar.update=function(){
	this.drawlist=[];
	var p=he3d.game.player;

	// Background bar
	this.drawlist.push({item:'STBAR',offset:[-160,-120]});

	// Current Weapon Ammo
	var str=p.ammo.bullets.cur.toString();
	var off=-130;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STTNUM'+str[str.length-len-1],
			offset:	[off,-107]
		});
		off-=this.items['STTNUM'+str[str.length-len-1]].width;
	}

	// Health
	this.drawlist.push({item:'STTPRCNT',offset:[-70,-107]});
	str=p.health.toString();
	off=-84;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STTNUM'+str[str.length-len-1],
			offset:	[off,-107]
		});
		off-=this.items['STTNUM'+str[str.length-len-1]].width;
	}

	// Weapons
	this.drawlist.push({
		item:	'STARMS',	// Replaces frag count in singleplayer
		offset:	[-56,-120]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.pistol?'YS':'G')+'NUM2',
		offset:	[-49,-98]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.shotgun||p.weapons.sshotgun?'YS':'G')+'NUM3',
		offset:	[-37,-98]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.chaingun?'YS':'G')+'NUM4',
		offset:	[-25,-98]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.rocket?'YS':'G')+'NUM5',
		offset:	[-49,-108]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.plasma?'YS':'G')+'NUM6',
		offset:	[-37,-108]
	});
	this.drawlist.push({
		item:	'ST'+(p.weapons.bfg9000?'YS':'G')+'NUM7',
		offset:	[-25,-108]
	});

	// Face
	var time=Date.now();
	if(time-this.ticker>=1000){
		this.ticker=time+Math.round(Math.random()*500);
		this.a_frame=Math.round(Math.random()*2);
	}
	var face='STFST0'+this.a_frame;
	if(p.godmode)
		face='STFGOD0';
	else if(p.health<1)
		face='STFDEAD0';
	else if(p.health<20)
		face='STFST4'+this.a_frame;
	else if(p.health<40)
		face='STFST3'+this.a_frame;
	else if(p.health<60)
		face='STFST2'+this.a_frame;
	else if(p.health<80)
		face='STFST1'+this.a_frame;
	this.drawlist.push({
		item:	'STFB1',	// Color'd background in multiplayer mode
		offset:	[-17,-120]
	});
	this.drawlist.push({item:face,offset:[-12,-120]});

	// Armor
	this.drawlist.push({item:'STTPRCNT',offset:[61,-107]});
	str=p.armor.toString();
	off=47;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STTNUM'+str[str.length-len-1],
			offset:	[off,-107]
		});
		off-=this.items['STTNUM'+str[str.length-len-1]].width;
	}

	// Keys
	if(p.keys.blue)		this.drawlist.push({item:'STKEYS0',offset:[79,-97]});
	if(p.keys.yellow)	this.drawlist.push({item:'STKEYS1',offset:[79,-107]});
	if(p.keys.red)		this.drawlist.push({item:'STKEYS2',offset:[79,-117]});
	if(p.keys.sblue)	this.drawlist.push({item:'STKEYS3',offset:[79,-98]});
	if(p.keys.syellow)	this.drawlist.push({item:'STKEYS4',offset:[79,-108]});
	if(p.keys.syellow)	this.drawlist.push({item:'STKEYS5',offset:[79,-118]});

	// Ammo
	str=p.ammo.bullets.max.toString();
	off=150;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-99]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.bullets.cur.toString();
	off=125;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-99]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.shells.max.toString();
	off=150;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-105]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.shells.cur.toString();
	off=125;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-105]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.rockets.max.toString();
	off=150;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-111]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.rockets.cur.toString();
	off=125;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-111]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.cells.max.toString();
	off=150;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-117]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
	str=p.ammo.cells.cur.toString();
	off=125;
	for(var len=0;len<str.length;len++){
		this.drawlist.push({
			item:	'STYSNUM'+str[str.length-len-1],
			offset:	[off,-117]
		});
		off-=this.items['STYSNUM'+str[str.length-len-1]].width;
	}
};

//
// Canvas Hud --------------------------------------------------------------------------------------
//
he3d.game.hud=function(){
	if(he3d.game.player.col.show){
		this.ctx.textAlign='left';
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.translate(10,15);
		for(var t=0;t<he3d.game.hud.tmp.length;t++){
			this.ctx.translate(0,10);
			this.ctx.fillText(he3d.game.hud.tmp[t],0,0);
		}
	}

	this.ctx.setTransform(1,0,0,1,0,0);
	this.ctx.translate(he3d.hud.size[0]-10,10);
	this.ctx.textAlign='right';

	this.ctx.fillText("Toggle Walls - z / Flats - x / Sky - c "+
		"/ Lines - v / Things - b / Coltest - n "+
		" / Status Bar - m / Trace BSP - ,",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Fullviewport - alt+return / Click to enable Mouse Support",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("W/A/S/D/Q/E - Move Camera",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Cursor Keys - Look",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Toggle FreeCam (noclip) - F",0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Player Pos - ["+
		he3d.game.player.pos[0].toFixed(2)+","+
		he3d.game.player.pos[1].toFixed(2)+","+
		he3d.game.player.pos[2].toFixed(2)+"]"+
		" Ground: "+he3d.game.player.groundheight+
		" Dir: "+he3d.game.player.dir+
		" Sector: "+he3d.game.player.sector,0,0);
	this.ctx.translate(0,10);
	this.ctx.fillText("Bob - "+he3d.game.fpweap.bob,0,0);
	this.ctx.translate(0,10);
if(he3d.game.player.sector>0)
	this.ctx.fillText("Floor material: "+he3d.game.map.sectors[he3d.game.player.sector].tex_f,0,0);

	
	if(he3d.game.player.freecam){
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.translate(he3d.hud.size[0]/2,he3d.hud.size[1]-100);
		this.ctx.textAlign='center';
		this.ctx.fillStyle="rgb(255,0,0)";
		this.ctx.fillText("FreeCam",0,0);
		this.ctx.textAlign='left';
		this.ctx.fillStyle="rgb(255,255,255)";
	}
};
