//
// Height map generation ---------------------------------------------------------------------------
//
wadLoader.heightmapDrawSpan=function(s,e,y,height){
	var xdiff=e-s;
	if(xdiff==0)
		return;

	var f=0;
	var fstep=1/xdiff;

	// Set some pixels!
	for(var x=s;x<e;x++){
		this.wad.heightmap.data[x][y]=height;
		f+=fstep;// interpolation, probably not needed unless doom has ramps =P
		//	though more seriously, could ramp to the next height,
		//	then if the difference is HUGE its probably a wall =o
	}
};
wadLoader.heightmapDrawEdgeSpan=function(edge1,edge2,height){
	var e1ydiff=edge1[3]-edge1[1];
	if(e1ydiff==0)
		return;
	var e2ydiff=edge2[3]-edge2[1];
	if(e2ydiff==0)
		return;

	var e1xdiff=edge1[2]-edge1[0];
	var e2xdiff=edge2[2]-edge2[0];

	// Calculate interpolation factors
	var factor1=(edge2[1]-edge1[1])/e1ydiff;
	var factorStep1=1/e1ydiff;
	var factor2=0;
	var factorStep2=1/e2ydiff;

	// Loop through the lines between the edges and draw spans
	var start,end;
	for(var y=edge2[1];y<edge2[3];y++){
		// Create span
		start=edge1[0]+parseInt(e1xdiff*factor1);
		end=edge2[0]+parseInt(e2xdiff*factor2);

		if(start<end)
			wadLoader.heightmapDrawSpan(start,end,y,height);
		else
			wadLoader.heightmapDrawSpan(end,start,y,height);

		factor1+=factorStep1;
		factor2+=factorStep2;
	}
};

wadLoader.buildHeightmap=function(data){
	he3d.log("DEBUG","World Bounding Box",this.wad.worldbb);

	// Dimensions
	this.wad.heightmap={
		height:	Math.abs(this.wad.worldbb[0]-this.wad.worldbb[1]),
		offx:	-this.wad.worldbb[2],
		offy:	-this.wad.worldbb[0],
		min:	0,
		max:	0,
		width:	Math.abs(this.wad.worldbb[2]-this.wad.worldbb[3])
	};

	he3d.log("DEBUG","Heightmap Size",this.wad.heightmap.width+"x"+this.wad.heightmap.height+
		" offsets["+this.wad.heightmap.offx+"x"+this.wad.heightmap.offy+"]");

	// Build bitmap
	this.wad.heightmap.data=new Array(this.wad.heightmap.width);
	for(var w=0;w<this.wad.heightmap.width;w++){
		this.wad.heightmap.data[w]=new Array(this.wad.heightmap.height);
		for(var h=0;h<this.wad.heightmap.height;h++)
			this.wad.heightmap.data[w][h]=NOGROUND;
	}

	// Rasterise the flats into bitmap!
	// http://joshbeam.com/articles/triangle_rasterization/
	var edge=new Array(3);
	var len=0,maxlen=0,height,minh=0,maxh=0;
	var ledge=0,sedge1=0,sedge2=0;
	for(var v=0;v<data.flats.verts.length;v+=9){
		// Only read floors
		if(data.flats.cf[v]=='c')
			continue;

		height=data.flats.verts[v+1];

		if(height>maxh)maxh=height;
		if(height<minh)minh=height;

		edge[0]=[
			data.flats.verts[v]+this.wad.heightmap.offx,
			data.flats.verts[v+2]+this.wad.heightmap.offy,
			data.flats.verts[v+3]+this.wad.heightmap.offx,
			data.flats.verts[v+5]+this.wad.heightmap.offy];
		if(edge[0][1]>edge[0][3])
			edge[0]=[
				data.flats.verts[v+3]+this.wad.heightmap.offx,
				data.flats.verts[v+5]+this.wad.heightmap.offy,
				data.flats.verts[v]+this.wad.heightmap.offx,
				data.flats.verts[v+2]+this.wad.heightmap.offy];

		edge[1]=[
			data.flats.verts[v+3]+this.wad.heightmap.offx,
			data.flats.verts[v+5]+this.wad.heightmap.offy,
			data.flats.verts[v+6]+this.wad.heightmap.offx,
			data.flats.verts[v+8]+this.wad.heightmap.offy];
		if(edge[1][1]>edge[1][3])
			edge[1]=[
				data.flats.verts[v+6]+this.wad.heightmap.offx,
				data.flats.verts[v+8]+this.wad.heightmap.offy,
				data.flats.verts[v+3]+this.wad.heightmap.offx,
				data.flats.verts[v+5]+this.wad.heightmap.offy];

		edge[2]=[
			data.flats.verts[v+6]+this.wad.heightmap.offx,
			data.flats.verts[v+8]+this.wad.heightmap.offy,
			data.flats.verts[v]+this.wad.heightmap.offx,
			data.flats.verts[v+2]+this.wad.heightmap.offy];
		if(edge[2][1]>edge[2][3])
			edge[2]=[
				data.flats.verts[v]+this.wad.heightmap.offx,
				data.flats.verts[v+2]+this.wad.heightmap.offy,
				data.flats.verts[v+6]+this.wad.heightmap.offx,
				data.flats.verts[v+8]+this.wad.heightmap.offy];

		// Find longest edge
		maxlen=0;
		for(var e=0;e<3;e++){
			len=Math.abs(edge[e][3]-edge[e][1]);
			if(len>maxlen){
				maxlen=len;
				ledge=e;
			}
        }
		sedge1=(ledge+1)%3;
        sedge2=(ledge+2)%3;

        wadLoader.heightmapDrawEdgeSpan(edge[ledge],edge[sedge1],height);
        wadLoader.heightmapDrawEdgeSpan(edge[ledge],edge[sedge2],height);
	}
	this.wad.heightmap.min=minh;
	this.wad.heightmap.max=maxh;

	// Flatten array
	var data=new Int16Array(this.wad.heightmap.width*this.wad.heightmap.height);
	var ai=0;
	for(var h=0;h<this.wad.heightmap.height;h++)
		for(var w=0;w<this.wad.heightmap.width;w++)
			data[ai++]=this.wad.heightmap.data[w][h];
	this.wad.heightmap.data=data;
};
