//
// Texture Builder ---------------------------------------------------------------------------------
//

//
// Flats -------------------------------------------------------------------------------------------
//
wadLoader.buildFlatTextures=function(wad,data){
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
	wad.flatlus={
		data:null,
		height:512,
		width:512
	};
	wad.flatlus.data=new Uint8Array(wad.flatlus.width*wad.flatlus.height*4);
	for(var cl=0;cl<wad.atlus.data.length;cl+=4){
		wad.flatlus.data[cl]=0;
		wad.flatlus.data[cl+1]=0;
		wad.flatlus.data[cl+2]=0;
		wad.flatlus.data[cl+3]=255;
	}
	var ftc=0,trid=0,tcid=0;
	tex=new Uint8Array(64*64*4);
	for(var ft in data.flattextures){
		var idx=0;
		var pal;
		var fli=0;
		for(var h=0;h<64;h++){
			for(var w=0;w<64;w++){
				pal=wad.colormaps[0][wad.flats[ft][fli++]];
				if(!(wad.playpal[0][pal])){
					tex[idx++]=0;
					tex[idx++]=0;
					tex[idx++]=0;
					tex[idx++]=0;
					continue;
				}
				tex[idx++]=wad.playpal[0][pal][0];
				tex[idx++]=wad.playpal[0][pal][1];
				tex[idx++]=wad.playpal[0][pal][2];
				tex[idx++]=255;
			}
		}
		if((64+cc)+hpad>wad.flatlus.width){
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
				off=(row*(wad.flatlus.width*4))+(col*4);
				wad.flatlus.data[off++]=tex[d++];
				wad.flatlus.data[off++]=tex[d++];
				wad.flatlus.data[off++]=tex[d++];
				wad.flatlus.data[off++]=tex[d++];
			}
		}
		data.flattextures[ft].uv=[
			((cr*64)+vpad)/wad.flatlus.height,
			(cc+hpad)/wad.flatlus.width,
			(((cr*64)+vpad)+64)/wad.flatlus.height,
			((cc+hpad)+64)/wad.flatlus.width
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
wadLoader.buildSkyTextures=function(wad,data){
	var skytex=wad.patches['SKY1'];
	wad.sky={
		data:	new Uint8Array(skytex.width*skytex.width*4),
		height:	skytex.width,	// Must be Square
		width:	skytex.width
	};

	for(var cl=0;cl<wad.sky.data.length;cl+=4){
		wad.sky.data[cl]=255;
		wad.sky.data[cl+1]=255;
		wad.sky.data[cl+2]=255;
		wad.sky.data[cl+3]=255;
	}

	var idx=0;
	var hd=Math.ceil(skytex.width/skytex.height);
	for(var h=0;h<skytex.height;h++){
		for(var d=0;d<hd;d++){ // Height Repeating
			for(var w=0;w<skytex.width;w++){
				pal=wad.colormaps[0][skytex.data[w][h]];
				if(!(wad.playpal[0][pal])){
					wad.sky.data[idx++]=0;
					wad.sky.data[idx++]=0;
					wad.sky.data[idx++]=0;
					wad.sky.data[idx++]=255;
					continue;
				}
				wad.sky.data[idx++]=wad.playpal[0][pal][0];
				wad.sky.data[idx++]=wad.playpal[0][pal][1];
				wad.sky.data[idx++]=wad.playpal[0][pal][2];
				wad.sky.data[idx++]=255;
			}
		}
	}
	
	// Take top left pixel for sky top
	wad.sky.top=new Uint8Array(skytex.width*skytex.width*4);
	for(var cl=0;cl<wad.sky.top.length;cl+=4){
		wad.sky.top[cl]=wad.sky.data[0];
		wad.sky.top[cl+1]=wad.sky.data[1];
		wad.sky.top[cl+2]=wad.sky.data[2];
		wad.sky.top[cl+3]=wad.sky.data[3];
	}
	
	// Take bottom right pixel for sky bottom
	var fidx=(skytex.height*skytex.width*4)-1;
	wad.sky.bottom=new Uint8Array(skytex.width*skytex.width*4);
	for(var cl=0;cl<wad.sky.bottom.length;cl+=4){
		wad.sky.bottom[cl]=wad.sky.data[fidx-3];
		wad.sky.bottom[cl+1]=wad.sky.data[fidx-2];
		wad.sky.bottom[cl+2]=wad.sky.data[fidx-1];
		wad.sky.bottom[cl+3]=wad.sky.data[fidx];
	}
};

//
// Walls -------------------------------------------------------------------------------------------
//
wadLoader.buildWallTextures=function(wad,data){
	var tc=0,tw=0,th=0,maxh=0,maxw=0;
	for(var t in data.textures){
		if(!wad.textures[t]){
			he3d.log("WARNING","Missing or invalid Texture:",t);
			continue;
		}

		tw+=wad.textures[t].width;
		th+=wad.textures[t].height;
		tc++;

		if(wad.textures[t].height>maxh)
			maxh=wad.textures[t].height;
		if(wad.textures[t].width>maxw)
			maxw=wad.textures[t].width;
			
		var texture=new Array(wad.textures[t].width);
		for(var w=0;w<wad.textures[t].width;w++)
			texture[w]=new Array(wad.textures[t].height);

		for(var p in wad.textures[t].patches){
			var patch=wad.patches[wad.textures[t].patches[p].patch];
			if(!patch){
				he3d.log("WARNING","Missing Patch:",wad.textures[t].patches[p].patch);
				continue;
			}
			var w,h=0;
			var ofy=wad.textures[t].patches[p].oy;
			var ofx=wad.textures[t].patches[p].ox;
			if(ofy<0)ofy=0;
			if(ofx<0)ofx=0;

			for(var oy=ofy;oy<patch.height+ofy;oy++){
				if(oy>=wad.textures[t].height)
					break;
				w=0;
				for(var ox=ofx;ox<patch.width+ofx;ox++){
					if(ox>=wad.textures[t].width)
						break;
					texture[ox][oy]=patch.data[w++][h];
				}
				h++;
			}
		}

		wad.textures[t].data=new Uint8Array(wad.textures[t].width*wad.textures[t].height*4);
		var idx=0;
		var pal;
		for(var h=0;h<wad.textures[t].height;h++){
			for(var w=0;w<wad.textures[t].width;w++){
				pal=wad.colormaps[0][texture[w][h]];
				if(!(wad.playpal[0][pal])){
					idx+=4;
					continue;
				}
				wad.textures[t].data[idx++]=wad.playpal[0][pal][0];
				wad.textures[t].data[idx++]=wad.playpal[0][pal][1];
				wad.textures[t].data[idx++]=wad.playpal[0][pal][2];
				wad.textures[t].data[idx++]=255;
			}
		}
		wad.textures[t].packed=false;
	}
	he3d.log("DEBUG","Total Unique Textures",tc+" ["+tw+"x"+th+"]");
	he3d.log("DEBUG","Max Tex Size",maxw+"x"+maxh);

	// Create Atlus
	var cr=0,cc=0,tex;
	var off,d=0,vpad=1,hpad=1;
	wad.atlus={
		data:null,
		height:1024,
		width:1024
	};
	wad.atlus.data=new Uint8Array(wad.atlus.width*wad.atlus.height*4);
	for(var cl=0;cl<wad.atlus.data.length;cl+=4){
		wad.atlus.data[cl]=0;
		wad.atlus.data[cl+1]=0;
		wad.atlus.data[cl+2]=0;
		wad.atlus.data[cl+3]=255;
	}

	for(var tid=0;tid<tc;tid++){
		var curt='';
		var curw=0;
		for(var t in data.textures){
			if(!wad.textures[t].packed&&wad.textures[t].width>curw){
				curt=t;
				curw=wad.textures[t].width;
			}
		}

		tex=wad.textures[curt];
		if((tex.width+cc)+hpad>wad.atlus.width){
			cr++;
			vpad++;
			hpad=1;
			cc=0;
		}
		d=0;
		for(var row=(cr*maxh)+vpad;row<(cr*maxh+tex.height)+vpad;row++){
			for(var col=cc+hpad;col<cc+tex.width+hpad;col++){
				off=(row*(wad.atlus.width*4))+(col*4);
				wad.atlus.data[off++]=tex.data[d++];
				wad.atlus.data[off++]=tex.data[d++];
				wad.atlus.data[off++]=tex.data[d++];
				wad.atlus.data[off++]=tex.data[d++];
			}
		}
		tex.uv=[
			((cr*maxh)+vpad)/wad.atlus.height,
			(cc+hpad)/wad.atlus.width,
			(((cr*maxh)+vpad)+tex.height)/wad.atlus.height,
			((cc+hpad)+tex.width)/wad.atlus.width
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
			top=wad.textures[data.uv[uv].t].uv[0];
			left=wad.textures[data.uv[uv].t].uv[1];
			bottom=wad.textures[data.uv[uv].t].uv[2];
			right=wad.textures[data.uv[uv].t].uv[3];

			// Offset X
			if(data.uv[uv].x!=0){
				pixel=(right-left)/wad.textures[data.uv[uv].t].width;
				left+=data.uv[uv].x*pixel;
				right+=data.uv[uv].x*pixel;
			}

			// Offset Y (this is apparently right but it looks wrong)
//			if(data.uv[uv].y!=0){
//				pixel=(top-bottom)/wad.textures[data.uv[uv].t].height;
//				top+=data.uv[uv].y*pixel;
//				bottom+=data.uv[uv].y*pixel;
//			}

			// Resize Right Edge
			if(data.uv[uv].w>0&&wad.textures[data.uv[uv].t].width>data.uv[uv].w){
				right-=((right-left)/(wad.textures[data.uv[uv].t].width/
						(wad.textures[data.uv[uv].t].width-data.uv[uv].w)));
			}
			// Resize Bottom Edge
			if(data.uv[uv].h>0&&wad.textures[data.uv[uv].t].height>data.uv[uv].h){
				if(data.uv[uv].peg=='lower')
					top-=((top-bottom)/(wad.textures[data.uv[uv].t].height/
							(wad.textures[data.uv[uv].t].height-data.uv[uv].h)));
				else
					bottom+=((top-bottom)/(wad.textures[data.uv[uv].t].height/
							(wad.textures[data.uv[uv].t].height-data.uv[uv].h)));
			}

			coords.push(left,top,left,bottom,right,top,right,bottom);
		}
	}
	data.uv=coords;
};
