//
// Level Parsing -----------------------------------------------------------------------------------
//
wadLoader.wallLength=function(s,e){
	var x=e.x-s.x,
		y=e.y-s.y;
	return Math.sqrt(x*x+y*y);
};

//
// Ideas-
//	if the angle of the wall doesn't change and its the same texture,
//	offset the xoff texture to keep it continuous?
//
wadLoader.buildFace=function(data,front,top,bottom,ceiling,floor,sv,ev,
	t,yoff,flags,texwidth,dir,uvec,width,wchunks){
	var height,wstart,wend,ww,peg='';
	var xoff=front.x;
	if(xoff>texwidth)
		xoff-=texwidth;

	if(bottom<floor)
		bottom=floor;
	
	while(top>bottom){
		if(bottom<floor)
			bottom=floor;
		height=Math.abs(top-bottom);
		wstart={x:sv.x,y:sv.y};
		wend={x:ev.x,y:ev.y};
		ww=texwidth;
		for(var itr=1;itr<wchunks+1;itr++){
			if(itr*ww>width){
				wend.x=ev.x;
				wend.y=ev.y;
			}else if(dir){
				wend.x=wstart.x+(ww*uvec[0]);
				wend.y=wstart.y+(ww*uvec[1]);
			} else {
				wend.x=wstart.x-(ww*uvec[0]);
				wend.y=wstart.y-(ww*uvec[1]);
			}
			twidth=wadLoader.wallLength(wstart,wend);
			if(xoff+twidth>texwidth)
				xoff=0;
			
			data.verts.push(
				wstart.x,top,wstart.y,		// start top
				wstart.x,bottom,wstart.y,	// start bottom
				wend.x,top,wend.y,			// end top
				wend.x,bottom,wend.y);		// end bottom
	
			data.indices.push(data.i++,data.i++,data.i++,data.i-1,data.i-2,data.i++);
			if(flags.peg_upper)
				peg='upper';
			else if(flags.peg_lower)
				peg='lower';

			data.uv.push(
				{t:t,w:twidth,h:height,x:xoff,y:yoff,peg:peg},
				{t:t,w:twidth,h:height,x:xoff,y:yoff,peg:peg},
				{t:t,w:twidth,h:height,x:xoff,y:yoff,peg:peg},
				{t:t,w:twidth,h:height,x:xoff,y:yoff,peg:peg});
			data.brightness.push(data.light,data.light,data.light,data.light);
			data.type.push(data.stype,data.stype,data.stype,data.stype);

			wstart.x=wend.x;
			wstart.y=wend.y;
		}

		if(bottom==floor)
			break;

		top-=(this.wad.textures[t].height-yoff)*MAP_SCALE;	
		bottom-=(this.wad.textures[t].height+yoff)*MAP_SCALE;
		if(yoff>0)
			yoff=0;
	}
};
wadLoader.addWall=function(data,map,front,back,start,end,flags){
	var tc=0;
	var frontsec=map.sectors[front.sector];
	var skybox=false;
	data.floor=frontsec.floor*MAP_SCALE;
	data.tex_f=frontsec.tex_f;
	data.ceiling=frontsec.ceiling*MAP_SCALE;
	data.tex_c=frontsec.tex_c;
	data.light=frontsec.lightlevel/255;
	data.stype=frontsec.type+0.1;

	if(back){
		var backsec=map.sectors[back.sector];
		if(frontsec.tex_c.indexOf('SKY')!=-1&&backsec.tex_c.indexOf('SKY')!=-1)
			skybox=true;
	}
	if(front.tex_l!=='-'){
		if(!data.textures[front.tex_l])
			data.textures[front.tex_l]=0;
		data.textures[front.tex_l]++;
		tc++;
	}
	if(front.tex_m!=='-'){
		if(!data.textures[front.tex_m])
			data.textures[front.tex_m]=0;
		data.textures[front.tex_m]++;
		tc++;
	}
	if(front.tex_u!=='-'){
		if(!data.textures[front.tex_u])
			data.textures[front.tex_u]=0;
		data.textures[front.tex_u]++;
		tc++;
	}

	// No Texture, don't bother building
	if(tc==0)
		return;

	// Build Verts
	var sv={x:0,y:0};
	var ev={x:0,y:0};
	if(start&VERT_IS_GL) sv.x=map.glverts[start&~VERT_IS_GL].x*MAP_SCALE
	else sv.x=map.vertexes[start].x*MAP_SCALE;
	if(start&VERT_IS_GL) sv.y=map.glverts[start&~VERT_IS_GL].y*MAP_SCALE
	else sv.y=map.vertexes[start].y*MAP_SCALE;
	if(end&VERT_IS_GL) ev.x=map.glverts[end&~VERT_IS_GL].x*MAP_SCALE
	else ev.x=map.vertexes[end].x*MAP_SCALE;
	if(end&VERT_IS_GL) ev.y=map.glverts[end&~VERT_IS_GL].y*MAP_SCALE
	else ev.y=map.vertexes[end].y*MAP_SCALE;

	var width=wadLoader.wallLength(sv,ev);
	var height=0;
	var peg='';

	// 1 height chunk wall -----
	if(!back&&front.tex_m!='-'){
		// Height
		var ceiling=frontsec.ceiling*MAP_SCALE;
		var floor=frontsec.floor*MAP_SCALE;
		height=Math.abs(ceiling-floor);

		// Width
		var wchunks=1;
		var texwidth=this.wad.textures[front.tex_m].width*MAP_SCALE;
		if(width>texwidth)
			wchunks=Math.ceil(width/texwidth);
		var dir=(Math.sqrt(sv.x*sv.x+sv.y*sv.y)<Math.sqrt(ev.x*ev.x+ev.y*ev.y));
		var uvec=[(ev.x-sv.x)/width,(ev.y-sv.y)/width];
		if(!dir)
			uvec=[(sv.x-ev.x)/width,(sv.y-ev.y)/width];

		if(height>(this.wad.textures[front.tex_m].height-front.y)*MAP_SCALE){
			var bottom=ceiling-(this.wad.textures[front.tex_m].height-front.y)*MAP_SCALE;
			wadLoader.buildFace(data,front,
				ceiling,bottom,ceiling,floor,sv,ev,
				front.tex_m,front.y,flags,texwidth,
				dir,uvec,width,wchunks);

		} else {
			wadLoader.buildFace(data,front,
				ceiling,floor,ceiling,floor,sv,ev,
				front.tex_m,front.y,flags,texwidth,
				dir,uvec,width,wchunks);
		}

	// Multi Textured Wall -----
	} else {
		var ceiling, floor;

		var dir=(Math.sqrt(sv.x*sv.x+sv.y*sv.y)<Math.sqrt(ev.x*ev.x+ev.y*ev.y));
		var uvec=[(ev.x-sv.x)/width,(ev.y-sv.y)/width];
		if(!dir)
			uvec=[(sv.x-ev.x)/width,(sv.y-ev.y)/width];

		// Lower
		if(front.tex_l!='-'){
			// Height
			ceiling=frontsec.ceiling*MAP_SCALE;
			floor=frontsec.floor*MAP_SCALE;
			if(back)
				ceiling=backsec.floor*MAP_SCALE;
			height=Math.abs(ceiling-floor);

			// Width
			var wchunks=1;
			var texwidth=this.wad.textures[front.tex_l].width*MAP_SCALE;
			if(width>texwidth)
				wchunks=Math.ceil(width/texwidth);

			if(back&&flags.peg_lower&&height<(this.wad.textures[front.tex_l].height)*MAP_SCALE){
				var tyoff=0;//(height+floor)+front.y;
				wadLoader.buildFace(data,front,
					ceiling,floor,ceiling,floor,sv,ev,
					front.tex_l,tyoff,flags,texwidth,
					dir,uvec,width,wchunks);
			}else if(height>(this.wad.textures[front.tex_l].height-front.y)*MAP_SCALE){
				var bottom=ceiling-(this.wad.textures[front.tex_l].height*MAP_SCALE);
				wadLoader.buildFace(data,front,
					ceiling,bottom,ceiling,floor,sv,ev,
					front.tex_l,0,flags,texwidth,
					dir,uvec,width,wchunks);
			}else{
				wadLoader.buildFace(data,front,
					ceiling,floor,ceiling,floor,sv,ev,
					front.tex_l,front.y,flags,texwidth,
					dir,uvec,width,wchunks);
			}
		}

		// Middle
		if(front.tex_m!='-'){
			// Height
			ceiling=frontsec.ceiling*MAP_SCALE;
			floor=frontsec.floor*MAP_SCALE;
			if(back){
				ceiling=backsec.ceiling*MAP_SCALE;
				floor=backsec.floor*MAP_SCALE;
			}
			height=Math.abs(ceiling-floor);

			// Width
			var wchunks=1;
			var texwidth=this.wad.textures[front.tex_m].width*MAP_SCALE;
			if(width>texwidth)
				wchunks=Math.ceil(width/texwidth);

			wadLoader.buildFace(data,front,
				ceiling,floor,ceiling,floor,sv,ev,
				front.tex_m,front.y,flags,texwidth,
				dir,uvec,width,wchunks);
		}

		// Upper
		if(front.tex_u!='-'){
			if(skybox)
				return; // Don't draw sky tagged faces

			// Height
			ceiling=frontsec.ceiling*MAP_SCALE;
			floor=frontsec.floor*MAP_SCALE;
			if(back)
				floor=backsec.ceiling*MAP_SCALE;
			height=Math.abs(ceiling-floor);

			// Width
			var wchunks=1;
			var texwidth=this.wad.textures[front.tex_u].width*MAP_SCALE;
			if(width>texwidth)
				wchunks=Math.ceil(width/texwidth);
			var dir=(Math.sqrt(sv.x*sv.x+sv.y*sv.y)<Math.sqrt(ev.x*ev.x+ev.y*ev.y));
			var uvec=[(ev.x-sv.x)/width,(ev.y-sv.y)/width];
			if(!dir)
				uvec=[(sv.x-ev.x)/width,(sv.y-ev.y)/width];

			if(back&&!flags.peg_upper&&
				height>(this.wad.textures[front.tex_u].height-front.y)*MAP_SCALE){
				var bottom=ceiling-(this.wad.textures[front.tex_u].height)*MAP_SCALE;
				wadLoader.buildFace(data,front,
					ceiling,bottom,ceiling,floor,sv,ev,
					front.tex_u,0,flags,texwidth,
					dir,uvec,width,wchunks);
			}else if(height>(this.wad.textures[front.tex_u].height-front.y)*MAP_SCALE){

				var bottom=ceiling-(this.wad.textures[front.tex_u].height-front.y)*MAP_SCALE;
				wadLoader.buildFace(data,front,
					ceiling,bottom,ceiling,floor,sv,ev,
					front.tex_u,front.y,flags,texwidth,
					dir,uvec,width,wchunks);
			}else{
				// Typically 'upper' door faces will be lower pegged
				if(!flags.peg_upper)
					flags.peg_lower='lower';
			
				wadLoader.buildFace(data,front,
					ceiling,floor,ceiling,floor,sv,ev,
					front.tex_u,front.y,flags,texwidth,
					dir,uvec,width,wchunks);
			}
		}
	}
};

wadLoader.buildSSector=function(data,map,node,side,ss){
	var off=map.glssect[ss].start;
	var lines=[];
	for(var segno=0;segno<map.glssect[ss].count;segno++){
		var start=map.glsegs[off+segno].start;
		var end=map.glsegs[off+segno].end;
		var line=map.linedefs[map.glsegs[off+segno].linedef];
		lines.push(start);

		if(!line)
			continue;

		if(map.glsegs[off+segno].side==0){
			if(line.left){
				wadLoader.addWall(data,map,map.sidedefs[line.right],
					map.sidedefs[line.left],start,end,line.flags);
			}else{
				wadLoader.addWall(data,map,map.sidedefs[line.right],null,
					start,end,line.flags);
			}
		} else {
			if(line.right){
				wadLoader.addWall(data,map,map.sidedefs[line.left],
					map.sidedefs[line.right],start,end,line.flags);
			}else{
				wadLoader.addWall(data,map,map.sidedefs[line.left],null,
					start,end,line.flags);
			}
		}
	}

	// Get Thing Heights
	wadLoader.findThingInSSector(map,(!side)?node.bb_r:node.bb_l,data.floor);
//	wadLoader.updateHeightMap(map,(!side)?node.bb_r:node.bb_l,data.floor);

	// World Bounding Box
	if(!side){
		if(isNaN(data.worldbb[0])||node.bb_r[0]<data.worldbb[0])
			data.worldbb[0]=node.bb_r[0];
		if(isNaN(data.worldbb[1])||node.bb_r[1]>data.worldbb[1])
			data.worldbb[1]=node.bb_r[1];
		if(isNaN(data.worldbb[2])||node.bb_r[2]<data.worldbb[2])
			data.worldbb[2]=node.bb_r[2];
		if(isNaN(data.worldbb[3])||node.bb_r[3]>data.worldbb[3])
			data.worldbb[3]=node.bb_r[3];
	}else{
		if(isNaN(data.worldbb[0])||node.bb_l[0]<data.worldbb[0])
			data.worldbb[0]=node.bb_l[0];
		if(isNaN(data.worldbb[1])||node.bb_l[1]>data.worldbb[1])
			data.worldbb[1]=node.bb_l[1];
		if(isNaN(data.worldbb[2])||node.bb_l[2]<data.worldbb[2])
			data.worldbb[2]=node.bb_l[2];
		if(isNaN(data.worldbb[3])||node.bb_l[3]>data.worldbb[3])
			data.worldbb[3]=node.bb_l[3];
	}
	if(data.floor<data.worldbb[4])
		data.worldbb[4]=data.floor;
	if(data.ceiling>data.worldbb[5])
		data.worldbb[5]=data.ceiling;

	// Floor
	var sv=0;
	var nv=1;
	var itr=false;
	var ev=lines.length-1;
	var tris=lines.length-2;
	if(tris<1)
		return;
		
	var first=true;
	while(tris--){
		if(first){
			if(lines[sv]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
					data.floor,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
					data.floor,map.vertexes[lines[sv]].y*MAP_SCALE);
				
			if(lines[ev]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
					data.floor,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
					data.floor,map.vertexes[lines[ev]].y*MAP_SCALE);
	
			if(lines[nv]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
					data.floor,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
					data.floor,map.vertexes[lines[nv]].y*MAP_SCALE);
	
			data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
			data.flats.uv.push(
				{t:data.tex_f,v:0,u:1},
				{t:data.tex_f,v:0,u:3},
				{t:data.tex_f,v:2,u:1}
			);
			data.flats.brightness.push(data.light,data.light,data.light);
			data.flats.type.push(data.stype,data.stype,data.stype);
			first=false;
			continue;
			
		} else {
			
			if(itr){
				sv=nv;
				nv++;
				if(lines[sv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[sv]].y*MAP_SCALE);
					
				if(lines[ev]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[ev]].y*MAP_SCALE);
	
				if(lines[nv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[nv]].y*MAP_SCALE);
						
				data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
				data.flats.uv.push(
					{t:data.tex_f,v:0,u:1},
					{t:data.tex_f,v:0,u:3},
					{t:data.tex_f,v:2,u:1}
				);
				data.flats.brightness.push(data.light,data.light,data.light);
				data.flats.type.push(data.stype,data.stype,data.stype);
			} else {
				sv=ev;
				ev--;

				if(lines[sv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[sv]].y*MAP_SCALE);
					
				if(lines[ev]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[ev]].y*MAP_SCALE);
	
				if(lines[nv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
						data.floor,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
						data.floor,map.vertexes[lines[nv]].y*MAP_SCALE);
					
				data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
				data.flats.uv.push(
					{t:data.tex_f,v:0,u:3},
					{t:data.tex_f,v:2,u:3},
					{t:data.tex_f,v:2,u:1}
				);
				data.flats.brightness.push(data.light,data.light,data.light);
				data.flats.type.push(data.stype,data.stype,data.stype);
			}

		}
		itr=!itr;
	}

	// Ceiling
	if(data.tex_c.indexOf('SKY')!=-1)
		return;
	sv=0;
	nv=1;
	itr=true;
	ev=lines.length-1;
	tris=lines.length-2;
	first=true;
	while(tris--){
		if(first){
			if(lines[sv]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
					data.ceiling,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
					data.ceiling,map.vertexes[lines[sv]].y*MAP_SCALE);

			if(lines[nv]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
					data.ceiling,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
					data.ceiling,map.vertexes[lines[nv]].y*MAP_SCALE);
				
			if(lines[ev]&VERT_IS_GL)
				data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
					data.ceiling,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
			else
				data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
					data.ceiling,map.vertexes[lines[ev]].y*MAP_SCALE);

			data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
			data.flats.uv.push(
				{t:data.tex_c,v:0,u:1},
				{t:data.tex_c,v:0,u:3},
				{t:data.tex_c,v:2,u:1}
			);
			data.flats.brightness.push(data.light,data.light,data.light);
			data.flats.type.push(data.stype,data.stype,data.stype);
			first=false;
			continue;
			
		} else {

			if(itr){
				sv=nv;
				nv++;
				if(lines[sv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[sv]].y*MAP_SCALE);
	
				if(lines[nv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[nv]].y*MAP_SCALE);
					
				if(lines[ev]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[ev]].y*MAP_SCALE);

				data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
				data.flats.uv.push(
					{t:data.tex_c,v:0,u:1},
					{t:data.tex_c,v:0,u:3},
					{t:data.tex_c,v:2,u:1}
				);
				data.flats.brightness.push(data.light,data.light,data.light);
				data.flats.type.push(data.stype,data.stype,data.stype);

			} else {
				sv=ev;
				ev--;
				if(lines[sv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[sv]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[sv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[sv]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[sv]].y*MAP_SCALE);
	
				if(lines[nv]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[nv]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[nv]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[nv]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[nv]].y*MAP_SCALE);
					
				if(lines[ev]&VERT_IS_GL)
					data.flats.verts.push(map.glverts[lines[ev]&~VERT_IS_GL].x*MAP_SCALE,
						data.ceiling,map.glverts[lines[ev]&~VERT_IS_GL].y*MAP_SCALE);
				else
					data.flats.verts.push(map.vertexes[lines[ev]].x*MAP_SCALE,
						data.ceiling,map.vertexes[lines[ev]].y*MAP_SCALE);

				data.flats.indices.push(data.flats.i++,data.flats.i++,data.flats.i++);
				data.flats.uv.push(
					{t:data.tex_c,v:0,u:3},
					{t:data.tex_c,v:2,u:3},
					{t:data.tex_c,v:2,u:1}
				);
				data.flats.brightness.push(data.light,data.light,data.light);
				data.flats.type.push(data.stype,data.stype,data.stype);
			}
		}

		itr=!itr;
	}

	if(!data.flattextures[data.tex_f])
		data.flattextures[data.tex_f]={count:0};
	data.flattextures[data.tex_f].count++;
	
	if(!data.flattextures[data.tex_c])
		data.flattextures[data.tex_c]={count:0};
	data.flattextures[data.tex_c].count++;
};

wadLoader.buildLevel=function(level){
	he3d.log("DEBUG","Level Vertexes: ",
		this.wad.levels[level].vertexes.length+this.wad.levels[level].glverts.length);
	var map=this.wad.levels[level];

	var data={
		worldbb:[null,null,null,null,0,0],
		verts:[],
		indices:[],
		colours:[],
		textures:[],
		flats:{
			verts:[],
			colors:[],
			uv:[],
			brightness:[],
			type:[],
			indices:[],
			i:0
		},
		flattextures:[],
		uv:[],
		type:[],
		brightness:[],
		i:0
	};

	he3d.log("DEBUG","Building Nodes","Total: "+map.glnodes.length);
	var node;
	for(var n=0;n<map.glnodes.length;n++){
		node=map.glnodes[n];
		if(node.c_r&SUBSECTOR)
			wadLoader.buildSSector(data,map,node,0,node.c_r&~SUBSECTOR);
		if(node.c_l&SUBSECTOR)
			wadLoader.buildSSector(data,map,node,1,node.c_l&~SUBSECTOR);
	}

	this.wad.spawnPos=[0,0,0];
	this.wad.spawnDir=0;
	for(var t=0;t<map.things.length;t++){
		if(map.things[t].type==1){
			this.wad.spawnPos=[
				-map.things[t].x*MAP_SCALE,
				((map.things[t].y*MAP_SCALE)+40),
				-map.things[t].z*MAP_SCALE
			];
			this.wad.spawnDir=map.things[t].angle-90;
			if(this.wad.spawnDir<0)this.wad.spawnDir+=360;
			he3d.log("NOTICE","Found Spawn Point:",this.wad.spawnPos[0]+"x"+this.wad.spawnPos[2]);
		}
	}

	this.wad.worldbb=data.worldbb;
	he3d.log("DEBUG","World Bounding Box",this.wad.worldbb);

	he3d.log("DEBUG","Building Textures"," ");
	wadLoader.buildWallTextures(data);
	wadLoader.buildFlatTextures(data);
	wadLoader.buildSkyTextures(data);

	he3d.log("DEBUG","Total Wall Triangles",data.verts.length/3);
	this.wad.mapdata=he3d.tools.interleaveFloat32Arrays([3,2,1,1],
		[data.verts,data.uv,data.brightness,data.type]);
	this.wad.indices=data.indices;
	
	he3d.log("DEBUG","Total Flats Triangles",data.flats.verts.length/3);
	this.wad.flatdata=he3d.tools.interleaveFloat32Arrays([3,2,1,1],
		[data.flats.verts,data.flats.uv,data.flats.brightness,data.flats.type]);
	this.wad.flatindices=data.flats.indices;
};
