//
// Texture Builder ---------------------------------------------------------------------------------
//

//
// Flats -------------------------------------------------------------------------------------------
//
wadLoader.buildFlatTextures=function(data){
	//
	//	- Flats are always 64x64
	//
	//	Animated flats - http://doom.wikia.com/wiki/Animated_flat
	//		Put all the frames on the same row (detect with (*.)?[0-9]+ )
	//		Give each face a flag (maybe frame count?)
	//		If frame count > 1 && animation ticker > 1
	//			offset the col in the shader along by 1 tile.
	//			^ what if a flat has less frames than the max?
	//				Maybe a ticker per flat anim count?
	//				There are only two types in doom (3 and 4 frame)
	//
	cr=0;
	cc=0;
	d=0;
	vpad=1;
	hpad=1;
	this.wad.flatlus={
		data:null,
		height:512,
		width:512
	};
	this.wad.flatlus.data=new Uint8Array(this.wad.flatlus.width*this.wad.flatlus.height*4);
	for(var cl=0;cl<this.wad.atlus.data.length;cl+=4){
		this.wad.flatlus.data[cl]=0;
		this.wad.flatlus.data[cl+1]=0;
		this.wad.flatlus.data[cl+2]=0;
		this.wad.flatlus.data[cl+3]=255;
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
		if((64+cc)+hpad>this.wad.flatlus.width){
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
				off=(row*(this.wad.flatlus.width*4))+(col*4);
				this.wad.flatlus.data[off++]=tex[d++];
				this.wad.flatlus.data[off++]=tex[d++];
				this.wad.flatlus.data[off++]=tex[d++];
				this.wad.flatlus.data[off++]=tex[d++];
			}
		}
		data.flattextures[ft].uv=[
			((cr*64)+vpad)/this.wad.flatlus.height,
			(cc+hpad)/this.wad.flatlus.width,
			(((cr*64)+vpad)+64)/this.wad.flatlus.height,
			((cc+hpad)+64)/this.wad.flatlus.width
		];
		cc+=64;
		hpad++;
		ftc++;
	}

	// Update flat coords
	var tuv;
	coords=[];
	for(var uv=0;uv<data.flats.uv.length;uv++){
		tuv=data.flats.uv[uv];
		if(!data.flattextures[tuv.t])
			continue;
		coords.push(
			data.flattextures[tuv.t].tcrid[0]+0.1,
			data.flattextures[tuv.t].tcrid[1]+0.1
		)
	}
	data.flats.uv=coords;
	he3d.log("DEBUG","Total Unique Flat Textures:",ftc);
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
	for(var propertyName in statenum_t)
		if(statenum_t[propertyName]==state)
			return propertyName.replace('S_','').substring(0,4);
	return null;
};
wadLoader.buildSpriteTextures=function(spritenames){
	var l,b,sprite,maxh=0,maxw=0,sc=0;
	var readsprites=false;
	var sprites=[];
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
							if(sprite.patch.width>maxw)
								maxw=sprite.patch.width;
							sprites.push(sprite);
							sc++;
						}
					}
				}
				break;			
		}
	}

	if(wadLoader.debug)
		he3d.log("DEBUG","Max Sprite Size :",maxh+"x"+maxw);	

	var cr=0,cc=0;
	var off,d=0,vpad=1,hpad=1;
	this.wad.thingsatlus={
		data:	null,
		height:	1024,
		width:	1024
	};
	this.wad.sprites=[];
	this.wad.thingsatlus.data=new Uint8Array(
		this.wad.thingsatlus.width*this.wad.thingsatlus.height*4);
	for(var cl=0;cl<this.wad.thingsatlus.data.length;cl+=4){
		this.wad.thingsatlus.data[cl]=0;
		this.wad.thingsatlus.data[cl+1]=0;
		this.wad.thingsatlus.data[cl+2]=0;
		this.wad.thingsatlus.data[cl+3]=255;
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
		if((sprite.patch.width+cc)+hpad>this.wad.thingsatlus.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+sprite.patch.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+sprite.patch.width+hpad;col++){
				off=(row*(this.wad.thingsatlus.width*4))+(col*4);
				this.wad.thingsatlus.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlus.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlus.data[off++]=sprite.patch.data[d++];
				this.wad.thingsatlus.data[off++]=sprite.patch.data[d++];
			}
		}
		this.wad.sprites.push({
			name:	sprite.name,
			uv:[
				((cr*maxh)+vpad)/this.wad.thingsatlus.height,
				(cc+hpad)/this.wad.thingsatlus.width,
				(((cr*maxh)+vpad)+sprite.patch.height)/this.wad.thingsatlus.height,
				((cc+hpad)+sprite.patch.width)/this.wad.thingsatlus.width
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

	// Create Atlus
	var cr=0,cc=0,tex;
	var off,d=0,vpad=1,hpad=1;
	this.wad.atlus={
		data:null,
		height:1024,
		width:1024
	};
	this.wad.atlus.data=new Uint8Array(this.wad.atlus.width*this.wad.atlus.height*4);
	for(var cl=0;cl<this.wad.atlus.data.length;cl+=4){
		this.wad.atlus.data[cl]=0;
		this.wad.atlus.data[cl+1]=0;
		this.wad.atlus.data[cl+2]=0;
		this.wad.atlus.data[cl+3]=255;
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
		if((tex.width+cc)+hpad>this.wad.atlus.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+tex.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+tex.width+hpad;col++){
				off=(row*(this.wad.atlus.width*4))+(col*4);
				this.wad.atlus.data[off++]=tex.data[d++];
				this.wad.atlus.data[off++]=tex.data[d++];
				this.wad.atlus.data[off++]=tex.data[d++];
				this.wad.atlus.data[off++]=tex.data[d++];
			}
		}
		tex.uv=[
			((cr*maxh)+vpad)/this.wad.atlus.height,
			(cc+hpad)/this.wad.atlus.width,
			(((cr*maxh)+vpad)+tex.height)/this.wad.atlus.height,
			((cc+hpad)+tex.width)/this.wad.atlus.width
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
