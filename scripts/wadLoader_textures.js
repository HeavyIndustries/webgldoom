//
// Texture Builder ---------------------------------------------------------------------------------
//

//
// Scrolling textures - maybe put all the scrolling textures in a
//	single texture outside of the main wall atlas. Are all scrolling
//	textures the same width? Could just pad the textures vertically
//	set gl.REPEAT and scroll the horizontal coords 0.0 -> 1.0.
//

//
// Flats -------------------------------------------------------------------------------------------
//
wadLoader.buildFlatTextures=function(data){
	//
	//	- Flats are always 64x64
	//
	var cr=0;
	var cc=0;
	var d=0;
	var vpad=1;
	var hpad=1;

	// Check for MultiFrame Textures
	var aflats=[];
	for(var ft in data.flattextures){
		var tpart=ft.substr(0,ft.match(/\d+/).index);
		for(var af=0;af<animatedflats.length;af++){
			if(tpart==animatedflats[af]){
				// Remove main entry
				delete(data.flattextures[ft]);
				// Add back in each frame
				for(var t in this.wad.flats){
					if(t.substr(0,tpart.length)==tpart){
						data.flattextures[t]={count:1};
						if(!aflats[tpart])
							aflats[tpart]=0;
						aflats[tpart]++;
					}
				}
			}
		}
	}

	this.wad.flatlas={
		data:null,
		height:512,
		width:512
	};
	this.wad.flatlas.data=new Uint8Array(this.wad.flatlas.width*this.wad.flatlas.height*4);
	for(var cl=0;cl<this.wad.atlas.data.length;cl+=4){
		this.wad.flatlas.data[cl]=0;
		this.wad.flatlas.data[cl+1]=0;
		this.wad.flatlas.data[cl+2]=0;
		this.wad.flatlas.data[cl+3]=0;
	}
	var ftc=0,trid=0,tcid=0;
	tex=new Uint8Array(64*64*4);
	for(var ft in data.flattextures){
		var idx=0;
		var pal;
		var fli=0;
		for(var h=0;h<64;h++){
			for(var w=0;w<64;w++){
				pal=this.wad.colormaps[0][this.wad.flats[ft][fli++]];
				if(!(this.wad.playpal[0][pal])){
					tex[idx++]=0;
					tex[idx++]=0;
					tex[idx++]=0;
					tex[idx++]=0;
					continue;
				}
				tex[idx++]=this.wad.playpal[0][pal][0];
				tex[idx++]=this.wad.playpal[0][pal][1];
				tex[idx++]=this.wad.playpal[0][pal][2];
				tex[idx++]=255;
			}
		}
		if((64+cc)+hpad>this.wad.flatlas.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
			tcid=0;
			trid++;
		}
		data.flattextures[ft].tcrid=[tcid,trid];
		tcid++;
		d=0;
		for(var row=(cr*64)+vpad;row<(cr*64+64)+vpad;row++){
			for(var col=cc+hpad;col<cc+64+hpad;col++){
				off=(row*(this.wad.flatlas.width*4))+(col*4);
				this.wad.flatlas.data[off++]=tex[d++];
				this.wad.flatlas.data[off++]=tex[d++];
				this.wad.flatlas.data[off++]=tex[d++];
				this.wad.flatlas.data[off++]=tex[d++];
			}
		}
		data.flattextures[ft].uv=[
			((cr*64)+vpad)/this.wad.flatlas.height,
			(cc+hpad)/this.wad.flatlas.width,
			(((cr*64)+vpad)+64)/this.wad.flatlas.height,
			((cc+hpad)+64)/this.wad.flatlas.width
		];
		cc+=64;
		hpad++;
		ftc++;
	}

	// Update flat coords
	var tuv,tpart;
	var coords=[],frames=[];
	for(var uv=0;uv<data.flats.uv.length;uv++){
		tuv=data.flats.uv[uv];
		if(!data.flattextures[tuv.t])
			continue;

		tpart=tuv.t.substr(0,tuv.t.match(/\d+/).index);
		if(aflats[tpart])
			frames.push(aflats[tpart]+0.1);
		else
			frames.push(1.1);

		coords.push(
			data.flattextures[tuv.t].tcrid[0]+0.1,
			data.flattextures[tuv.t].tcrid[1]+0.1
		)
	}
	data.flats.uv=coords;
	data.flats.frames=frames;

	he3d.log("DEBUG","Total Unique Flat Textures:",ftc);
};

//
// FP Weapons --------------------------------------------------------------------------------------
//
wadLoader.buildFpWeaponsTextures=function(data){
	var l,b,fpwi,fpwc=0,maxh=0;
	var readsprites=false;
	var fpw=[];

	var fpwentries=['PUNG','SAWG','PISG','PISF','SHTG','SHTF',
		'CHGG','CHGF','MISG','MISF','PSMG','PSMF','BFGF','BFGF'];
	var l,fpwe;
	for(l=0;l<this.wad.directory.length;l++){
		for(fpwe=0;fpwe<fpwentries.length;fpwe++){
			if(this.wad.directory[l].name.indexOf(fpwentries[fpwe])===0){
				fpwi={
					name:	this.wad.directory[l].name,
					patch:	wadLoader.getPatch(this.wad.directory[l].name,
								this.wad.directory[l].filepos),
					packed: false
				};
				// Missing Item
				if(!fpwi.patch.data.length){
					he3d.log("DEBUG","Missing FPW Patch",fpwentries[fpwe]);
					continue;
				}
				if(fpwi.patch.height>maxh)
					maxh=fpwi.patch.height;
				fpw.push(fpwi);
				fpwc++;
			}
		}
	}

	var cr=0,cc=0;
	var off,d=0,vpad=1,hpad=1;
	this.wad.fpwatlas={
		data:	null,
		height:	768,
		width:	768
	};
	this.wad.fpw=[];
	this.wad.fpwatlas.data=new Uint8Array(
		this.wad.fpwatlas.width*this.wad.fpwatlas.height*4);
	for(var cl=0;cl<this.wad.fpwatlas.data.length;cl+=4){
		this.wad.fpwatlas.data[cl]=0;
		this.wad.fpwatlas.data[cl+1]=0;
		this.wad.fpwatlas.data[cl+2]=0;
		this.wad.fpwatlas.data[cl+3]=0;
	}

	for(var fpwid=0;fpwid<fpwc;fpwid++){
		var curh='';
		var curw=0;
		for(var w in fpw){
			if(!fpw[w].packed&&fpw[w].patch.width>curw){
				curh=w;
				curw=fpw[w].patch.width;
			}
		}

		fpwi=fpw[curh];
		if((fpwi.patch.width+cc)+hpad>this.wad.fpwatlas.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+fpwi.patch.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+fpwi.patch.width+hpad;col++){
				off=(row*(this.wad.fpwatlas.width*4))+(col*4);
				this.wad.fpwatlas.data[off++]=fpwi.patch.data[d++];
				this.wad.fpwatlas.data[off++]=fpwi.patch.data[d++];
				this.wad.fpwatlas.data[off++]=fpwi.patch.data[d++];
				this.wad.fpwatlas.data[off++]=fpwi.patch.data[d++];
			}
		}
		this.wad.fpw.push({
			name:	fpwi.name,
			uv:[
				((cr*maxh)+vpad)/this.wad.fpwatlas.height,
				(cc+hpad)/this.wad.fpwatlas.width,
				(((cr*maxh)+vpad)+fpwi.patch.height)/this.wad.fpwatlas.height,
				((cc+hpad)+fpwi.patch.width)/this.wad.fpwatlas.width
			],
			height: fpwi.patch.height,
			width:	fpwi.patch.width
		});
		cc+=fpwi.patch.width;
		hpad++;
		fpwi.packed=true;
	}
}
//
// HUD ---------------------------------------------------------------------------------------------
//
wadLoader.buildHUDTextures=function(data){
	var l,b,hi,hc=0,maxh=0;
	var readsprites=false;
	var hud=[];

	var stentries=['STBAR','STGNUM','STTNUM','STTMINUS','STTPRCNT',
		'STYSNUM','STKEYS','STDISK','STCDROM','STARMS','STFB','STF'];
	var l,ste;
	for(l=0;l<this.wad.directory.length;l++){
		for(ste=0;ste<stentries.length;ste++){
			if(this.wad.directory[l].name.indexOf(stentries[ste])===0){
				hi={
					name:	this.wad.directory[l].name,
					patch:	wadLoader.getPatch(this.wad.directory[l].name,
								this.wad.directory[l].filepos),
					packed: false
				};
				// Missing Item
				if(!hi.patch.data.length){
					he3d.log("DEBUG","Missing HUD Patch",stentries[ste]);
					continue;
				}
				if(hi.patch.height>maxh)
					maxh=hi.patch.height;
				hud.push(hi);
				hc++;
			}
		}
	}

	var cr=0,cc=0;
	var off,d=0,vpad=1,hpad=1;
	this.wad.hudatlas={
		data:	null,
		height:	384,
		width:	384
	};
	this.wad.hud=[];
	this.wad.hudatlas.data=new Uint8Array(
		this.wad.hudatlas.width*this.wad.hudatlas.height*4);
	for(var cl=0;cl<this.wad.hudatlas.data.length;cl+=4){
		this.wad.hudatlas.data[cl]=0;
		this.wad.hudatlas.data[cl+1]=0;
		this.wad.hudatlas.data[cl+2]=0;
		this.wad.hudatlas.data[cl+3]=0;
	}

	for(var hid=0;hid<hc;hid++){
		var curh='';
		var curw=0;
		for(var h in hud){
			if(!hud[h].packed&&hud[h].patch.width>curw){
				curh=h;
				curw=hud[h].patch.width;
			}
		}

		hi=hud[curh];
		if((hi.patch.width+cc)+hpad>this.wad.hudatlas.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+hi.patch.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+hi.patch.width+hpad;col++){
				off=(row*(this.wad.hudatlas.width*4))+(col*4);
				this.wad.hudatlas.data[off++]=hi.patch.data[d++];
				this.wad.hudatlas.data[off++]=hi.patch.data[d++];
				this.wad.hudatlas.data[off++]=hi.patch.data[d++];
				this.wad.hudatlas.data[off++]=hi.patch.data[d++];
			}
		}
		this.wad.hud.push({
			name:	hi.name,
			uv:[
				((cr*maxh)+vpad)/this.wad.hudatlas.height,
				(cc+hpad)/this.wad.hudatlas.width,
				(((cr*maxh)+vpad)+hi.patch.height)/this.wad.hudatlas.height,
				((cc+hpad)+hi.patch.width)/this.wad.hudatlas.width
			],
			height: hi.patch.height,
			width:	hi.patch.width
		});
		cc+=hi.patch.width;
		hpad++;
		hi.packed=true;
	}
};

//
// Sky ---------------------------------------------------------------------------------------------
//
wadLoader.buildSkyTextures=function(data){
	var skytex=this.wad.patches['SKY1'];
	this.wad.sky={
		data:	new Uint8Array(skytex.width*skytex.width*4),
		height:	skytex.width,	// Must be Square
		width:	skytex.width
	};

	for(var cl=0;cl<this.wad.sky.data.length;cl+=4){
		this.wad.sky.data[cl]=255;
		this.wad.sky.data[cl+1]=255;
		this.wad.sky.data[cl+2]=255;
		this.wad.sky.data[cl+3]=255;
	}

	var idx=0;
	var hd=Math.ceil(skytex.width/skytex.height);
	for(var h=0;h<skytex.height;h++){
		for(var d=0;d<hd;d++){ // Height Repeating
			for(var w=0;w<skytex.width;w++){
				pal=this.wad.colormaps[0][skytex.data[w][h]];
				if(!(this.wad.playpal[0][pal])){
					this.wad.sky.data[idx++]=0;
					this.wad.sky.data[idx++]=0;
					this.wad.sky.data[idx++]=0;
					this.wad.sky.data[idx++]=255;
					continue;
				}
				this.wad.sky.data[idx++]=this.wad.playpal[0][pal][0];
				this.wad.sky.data[idx++]=this.wad.playpal[0][pal][1];
				this.wad.sky.data[idx++]=this.wad.playpal[0][pal][2];
				this.wad.sky.data[idx++]=255;
			}
		}
	}

	// Take top left pixel for sky top
	this.wad.sky.top=new Uint8Array(skytex.width*skytex.width*4);
	for(var cl=0;cl<this.wad.sky.top.length;cl+=4){
		this.wad.sky.top[cl]=this.wad.sky.data[0];
		this.wad.sky.top[cl+1]=this.wad.sky.data[1];
		this.wad.sky.top[cl+2]=this.wad.sky.data[2];
		this.wad.sky.top[cl+3]=this.wad.sky.data[3];
	}

	// Take bottom right pixel for sky bottom
	var fidx=(skytex.height*skytex.width*4)-1;
	this.wad.sky.bottom=new Uint8Array(skytex.width*skytex.width*4);
	for(var cl=0;cl<this.wad.sky.bottom.length;cl+=4){
		this.wad.sky.bottom[cl]=this.wad.sky.data[fidx-3];
		this.wad.sky.bottom[cl+1]=this.wad.sky.data[fidx-2];
		this.wad.sky.bottom[cl+2]=this.wad.sky.data[fidx-1];
		this.wad.sky.bottom[cl+3]=this.wad.sky.data[fidx];
	}
};

//
// Sprites -----------------------------------------------------------------------------------------
//
wadLoader.lookupSpriteName=function(state){
	var spr_state=state_t[state].sprite;
	for(var propertyName in spritenum_t){
		if(spritenum_t[propertyName]==spr_state)
			return propertyName.replace('SPR_','').substring(0,4);
	}
	return null;
};

wadLoader.buildSpriteTextures=function(spritenames){
	var l,b,sprite,maxh=0,sc=0;
	var readsprites=false;
	var sprites=[];
	
	// Im sure you wont approve; however this will include all the available missiles as they will
	// not exist on the level until either a player or a thing attacks. Its a HACK but not a nasty
	// one.
	for(var uT=0;uT<THINGS.length;uT++)
	if(THINGS[uT].flags&mobjflag_t.MF_MISSILE){
		if((spritename=wadLoader.lookupSpriteName(THINGS[uT].spawnstate))){
			dupe=false;
			for(var uTs=0;uTs<sprites.length;uTs++)
				if(spritename==sprites[uTs])
					dupe=true;
			if(!dupe)
				spritenames.push({
				name:	spritename,
				stateid:THINGS[uT].doomednum
			});
		};
	};
	
	for(l=0;l<this.wad.directory.length;l++){
		switch(this.wad.directory[l].name){
			case 'S_START':case 'S_END':readsprites=!readsprites;break;
			default:
				if(readsprites){
					for(var s=0;s<spritenames.length;s++){
						if(this.wad.directory[l].name.substring(0,4)==spritenames[s].name){ 

							sprite={
								name:	this.wad.directory[l].name,
								patch:	wadLoader.getPatch(this.wad.directory[l].name,
											this.wad.directory[l].filepos),
								packed: false
							};
							// Missing Sprite
							if(!sprite.patch.data.length){
								he3d.log("DEBUG","Missing Sprite Patch",sprites[s].name);
								continue;
							}
							if(sprite.patch.height>maxh)
								maxh=sprite.patch.height;
							sprites.push(sprite);
							sc++;
						}
					}
				}
				break;
		}
	}

	var cr=0,cc=0;
	var off,d=0,vpad=1,hpad=1;
	this.wad.thingsatlas={
		data:	null,
		height:	2048,
		width:	2048
	};
	this.wad.sprites=[];
	this.wad.thingsatlas.data=new Uint8Array(
		this.wad.thingsatlas.width*this.wad.thingsatlas.height*4);
	for(var cl=0;cl<this.wad.thingsatlas.data.length;cl+=4){
		this.wad.thingsatlas.data[cl]=0;
		this.wad.thingsatlas.data[cl+1]=0;
		this.wad.thingsatlas.data[cl+2]=0;
		this.wad.thingsatlas.data[cl+3]=0;
	}

	for(var sid=0;sid<sc;sid++){
		var curs='';
		var curw=0;
		for(var s in sprites){
			if(!sprites[s].packed&&sprites[s].patch.width>curw){
				curs=s;
				curw=sprites[s].patch.width;
			}
		}

		sprite=sprites[curs];
		if((sprite.patch.width+cc)+hpad>this.wad.thingsatlas.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+sprite.patch.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+sprite.patch.width+hpad;col++){
				off=(row*(this.wad.thingsatlas.width*4))+(col*4);
				this.wad.thingsatlas.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlas.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlas.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlas.data[off++]=sprite.patch.data[d++];
			}
		}
		this.wad.sprites.push({
			name:		sprite.name,
			flippable:	(sprite.name.length==8?true:false),
			uv:[
				((cr*maxh)+vpad)/this.wad.thingsatlas.height,
				(cc+hpad)/this.wad.thingsatlas.width,
				(((cr*maxh)+vpad)+sprite.patch.height)/this.wad.thingsatlas.height,
				((cc+hpad)+sprite.patch.width)/this.wad.thingsatlas.width
			],
			height: sprite.patch.height,
			width:	sprite.patch.width
		});
		cc+=sprite.patch.width;
		hpad++;
		sprite.packed=true;
	}
};

//
// Walls -------------------------------------------------------------------------------------------
//
wadLoader.buildWallTextures=function(data){
	var tc=0,tw=0,th=0,maxh=0,maxw=0;
	for(var t in data.textures){
		if(!this.wad.textures[t]){
			he3d.log("WARNING","Missing or invalid Texture:",t);
			continue;
		}

		tw+=this.wad.textures[t].width;
		th+=this.wad.textures[t].height;
		tc++;

		if(this.wad.textures[t].height>maxh)
			maxh=this.wad.textures[t].height;
		if(this.wad.textures[t].width>maxw)
			maxw=this.wad.textures[t].width;

		var texture=new Array(this.wad.textures[t].width);
		for(var w=0;w<this.wad.textures[t].width;w++)
			texture[w]=new Array(this.wad.textures[t].height);

		for(var p in this.wad.textures[t].patches){
			var patch=this.wad.patches[this.wad.textures[t].patches[p].patch];
			if(!patch){
				he3d.log("WARNING","Missing Patch:",this.wad.textures[t].patches[p].patch);
				continue;
			}
			var w,h=0;
			var ofy=this.wad.textures[t].patches[p].oy;
			var ofx=this.wad.textures[t].patches[p].ox;
			if(ofy<0)ofy=0;
			if(ofx<0)ofx=0;

			for(var oy=ofy;oy<patch.height+ofy;oy++){
				if(oy>=this.wad.textures[t].height)
					break;
				w=0;
				for(var ox=ofx;ox<patch.width+ofx;ox++){
					if(ox>=this.wad.textures[t].width)
						break;
					texture[ox][oy]=patch.data[w++][h];
				}
				h++;
			}
		}

		this.wad.textures[t].data=new Uint8Array(
			this.wad.textures[t].width*this.wad.textures[t].height*4);
		var idx=0;
		var pal;
		for(var h=0;h<this.wad.textures[t].height;h++){
			for(var w=0;w<this.wad.textures[t].width;w++){
				pal=this.wad.colormaps[0][texture[w][h]];
				if(!(this.wad.playpal[0][pal])){
					idx+=4;
					continue;
				}
				this.wad.textures[t].data[idx++]=this.wad.playpal[0][pal][0];
				this.wad.textures[t].data[idx++]=this.wad.playpal[0][pal][1];
				this.wad.textures[t].data[idx++]=this.wad.playpal[0][pal][2];
				this.wad.textures[t].data[idx++]=255;
			}
		}
		this.wad.textures[t].packed=false;
	}
	he3d.log("DEBUG","Total Unique Textures",tc+" ["+tw+"x"+th+"]");
	he3d.log("DEBUG","Max Tex Size",maxw+"x"+maxh);

	// Create atlas
	var cr=0,cc=0,tex;
	var off,d=0,vpad=1,hpad=1;
	this.wad.atlas={
		data:null,
		height:1024,
		width:1024
	};
	this.wad.atlas.data=new Uint8Array(this.wad.atlas.width*this.wad.atlas.height*4);
	for(var cl=0;cl<this.wad.atlas.data.length;cl+=4){
		this.wad.atlas.data[cl]=0;
		this.wad.atlas.data[cl+1]=0;
		this.wad.atlas.data[cl+2]=0;
		this.wad.atlas.data[cl+3]=0;
	}

	for(var tid=0;tid<tc;tid++){
		var curt='';
		var curw=0;
		for(var t in data.textures){
			if(!this.wad.textures[t].packed&&this.wad.textures[t].width>curw){
				curt=t;
				curw=this.wad.textures[t].width;
			}
		}

		tex=this.wad.textures[curt];
		if((tex.width+cc)+hpad>this.wad.atlas.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+tex.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+tex.width+hpad;col++){
				off=(row*(this.wad.atlas.width*4))+(col*4);
				this.wad.atlas.data[off++]=tex.data[d++];
				this.wad.atlas.data[off++]=tex.data[d++];
				this.wad.atlas.data[off++]=tex.data[d++];
				this.wad.atlas.data[off++]=tex.data[d++];
			}
		}
		tex.uv=[
			((cr*maxh)+vpad)/this.wad.atlas.height,
			(cc+hpad)/this.wad.atlas.width,
			(((cr*maxh)+vpad)+tex.height)/this.wad.atlas.height,
			((cc+hpad)+tex.width)/this.wad.atlas.width
		];
		cc+=tex.width;
		hpad++;
		tex.packed=true;
	}

	// Convert TEXTURE to UV Coords
	var coord,coords=[];
	var left,right,top,bottom,pixel;
	for(var uv=0;uv<data.uv.length;uv+=4){
		if(data.uv[uv].t=='-'){
			coords.push(0,0,0,0,0,0,0,0);
		}else{
			top=this.wad.textures[data.uv[uv].t].uv[0];
			left=this.wad.textures[data.uv[uv].t].uv[1];
			bottom=this.wad.textures[data.uv[uv].t].uv[2];
			right=this.wad.textures[data.uv[uv].t].uv[3];

			// Offset X
			if(data.uv[uv].x!=0){
				pixel=(right-left)/this.wad.textures[data.uv[uv].t].width;
				left+=data.uv[uv].x*pixel;
				right+=data.uv[uv].x*pixel;
			}

			// Offset Y (this is apparently right but it looks wrong)
//			if(data.uv[uv].y!=0){
//				pixel=(top-bottom)/this.wad.textures[data.uv[uv].t].height;
//				top+=data.uv[uv].y*pixel;
//				bottom+=data.uv[uv].y*pixel;
//			}

			// Resize Right Edge
			if(data.uv[uv].w>0&&this.wad.textures[data.uv[uv].t].width>data.uv[uv].w){
				right-=((right-left)/(this.wad.textures[data.uv[uv].t].width/
						(this.wad.textures[data.uv[uv].t].width-data.uv[uv].w)));
			}
			// Resize Bottom Edge
			if(data.uv[uv].h>0&&this.wad.textures[data.uv[uv].t].height>data.uv[uv].h){
				if(data.uv[uv].peg=='lower')
					top-=((top-bottom)/(this.wad.textures[data.uv[uv].t].height/
							(this.wad.textures[data.uv[uv].t].height-data.uv[uv].h)));
				else
					bottom+=((top-bottom)/(this.wad.textures[data.uv[uv].t].height/
							(this.wad.textures[data.uv[uv].t].height-data.uv[uv].h)));
			}

			coords.push(left,top,left,bottom,right,top,right,bottom);
		}
	}
	data.uv=coords;
};
