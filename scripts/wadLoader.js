//
// Model Loader Web Worker
//
wadLoader={};

importScripts('../../he3d/scripts/he3d_tools.js');
importScripts('../../he3d/scripts/lib/jdataview.js');

importScripts('wadLoader_level.js');
importScripts('wadLoader_textures.js');
importScripts('defines.js');

he3d.log=function(){
	switch(arguments.length){
		case 3:
			postMessage({
				'loglevel':	arguments[0],
				'loglabel':	arguments[1],
				'logmsg':	arguments[2]
			});
			break;
		case 2:
			postMessage({
				'loglevel':	arguments[0],
				'logmsg':	arguments[1]
			});
			break;
		default:
		case 1:
			postMessage({
				'logmsg':	arguments[0]
			});
			break;
	}
};

//
// Load new map type
//
onmessage=function(e) {
	wadLoader.path=e.data.path;
	wadLoader.debug=e.data.debug;
	wadLoader.getFile(e);
};

wadLoader.getFile=function(e){
	var file=wadLoader.path+e.data.filename;
	var filename=e.data.filename;
	var mxhr=new XMLHttpRequest();
	mxhr.open('GET',file);

	var fileType=file.split('.');
	mxhr.responseType="arraybuffer";
		
	mxhr.addEventListener('error',function(){
		he3d.log('FATAL','Failed to retrieve Map:',file);
	},false);
	mxhr.addEventListener('load',function(){
		if(mxhr.status!=200){
			he3d.log('FATAL','Failed to retrieve Map:',file+" (Http Status: "+mxhr.status+")");
			return;
		}
		var fileType=file.split('.');
		switch(fileType[fileType.length-1].toLowerCase()){
			case 'wad':
				wadLoader.parse(e.data.filename,e.data.curmap,mxhr.response);
				break;
			default:
				he3d.log("WARNING",'Unknown map file type',
					fileType[fileType.length-1].toLowerCase());
				break;
		}
	},false);
	mxhr.send();
};

//
// Wad File ----------------------------------------------------------------------------------------
//
wadLoader.getHeader=function(wad,view){
	view.seek(0);
	wad.header={
		id:				view.getString(4),
		numlumps:		view.getUint32(),
		infotableofs:	view.getUint32()
	};
	if(wadLoader.debug)
		he3d.log("NOTICE","Got Header: "+JSON.stringify(wad.header));
	if(wad.header.id!='IWAD')
		throw "Unsupported WAD format: "+wad.header.id;
};
wadLoader.getDirectory=function(wad,view){
	view.seek(wad.header.infotableofs);
	wad.directory=[];
	var l;
	for(l=0;l<wad.header.numlumps;l++){
		wad.directory.push({
			filepos:view.getUint32(),
			size:	view.getUint32(),
			name:	view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			data:	[]
		});
	}
	
	if(wadLoader.debug)
		he3d.log("NOTICE","Got Directory: "+wad.directory.length+" Entries");
	if(wad.directory[wad.directory.length-1].name!="F_END")
		throw "Unexpected end of Directory Marker: "+
			JSON.stringify(wad.directory[wad.directory.length-1]);
};
wadLoader.getLevels=function(wad,view){
	var l,curl;
	wad.levels=[];
	for(l=0;l<wad.directory.length;l++){
		if(wad.directory[l].name.match(/^(e\dm\d)/i)){
			if(wadLoader.debug)
				he3d.log("NOTICE","Found Level at Lump["+l+"]: "+wad.directory[l].name);
			curl=wad.directory[l].name;
			wad.levels[curl]={name:curl,lump:l};
			continue;
		}
		if(!curl)
			continue;

		switch(wad.directory[l].name){
			case 'THINGS':	this.getThings(wad,view,curl,l);break;
			case 'LINEDEFS':this.getLinedefs(wad,view,curl,l);break;
			case 'SIDEDEFS':this.getSidedefs(wad,view,curl,l);break;
			case 'VERTEXES':this.getVertexes(wad,view,curl,l);break;
			case 'SEGS':	this.getSegs(wad,view,curl,l);break;
			case 'SSECTORS':this.getSsectors(wad,view,curl,l);break;
			case 'NODES':	this.getNodes(wad,view,curl,l);break;
			case 'SECTORS':	this.getSectors(wad,view,curl,l);break;
			case 'REJECT':	this.getReject(wad,view,curl,l);break;
			case 'BLOCKMAP':this.getBlockmap(wad,view,curl,l);break;
			case 'GL_VERT':	this.getGLVerts(wad,view,curl,l);break;
			case 'GL_SEGS':	this.getGLSegs(wad,view,curl,l);break;
			case 'GL_SSECT':this.getGLSSect(wad,view,curl,l);break;
			case 'GL_NODES':this.getGLNodes(wad,view,curl,l);break;
			case 'GL_PVS':	this.getGLPVS(wad,view,curl,l);break;
		}
	}
};
wadLoader.getLumpOfs=function(wad,lump){
	for(var l=0;l<wad.directory.length;l++)
		if(wad.directory[l].name==lump)
			return wad.directory[l].filepos;
	return -1;
};
wadLoader.parse=function(filename,level,data){
	var view=new jDataView(data);
	var wad={};
	this.getHeader(wad,view);
	this.getDirectory(wad,view);
	this.getColorMaps(wad,view);
	
	// Grab and return the Title Screen straight away
	postMessage({titlescreen:this.getTitleScreen(wad,view)});

	this.getLevels(wad,view);
	this.getPatches(wad,view);
	this.getWallTextures(wad,view);
	this.getFlatTextures(wad,view);

	this.buildLevel(wad,level);

	he3d.log("NOTICE",'Finished Parsing '+filename,'Transfering Data back from Worker Thread');

	postMessage({
		'filename':		filename,
		'mapdata':		wad.mapdata,
		'indices':		wad.indices,
		'flatdata':		wad.flatdata,
		'flatindices':	wad.flatindices,
		'atlus':		wad.atlus,
		'flatlus':		wad.flatlus,
		'sky':			wad.sky,
		'spawnPos':		wad.spawnPos,
		'spawnDir':		wad.spawnDir,
		'things':		wad.levels[level].things,
		'worldbb':		wad.worldbb
	});
};

//
// Level Data Lumps --------------------------------------------------------------------------------
//
wadLoader.getBlockmap=function(wad,view,level,lump){
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	wad.levels[level].blockmap={
		x:		view.getUint16(),
		y:		view.getUint16(),
		cols:	view.getUint16(),
		rows:	view.getUint16(),
		offsets:[]
	}
	while(view.tell()<len)
		wad.levels[level].blockmap.offsets.push(view.getUint16());
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] BLOCKMAP Offsets',wad.levels[level].blockmap.offsets.length);
};
wadLoader.getLinedefs=function(wad,view,level,lump){
	wad.levels[level].linedefs=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	var ldef;
	while(view.tell()<len){
		ldef={
			start:	view.getUint16(),
			end:	view.getUint16(),
			flags:	view.getInt16(),
			type:	view.getUint16(),
			sector:	view.getUint16(),
			right:	view.getUint16(),
			left:	view.getUint16()
		};
		// Bit Shift flags
		var flags=ldef.flags;
		ldef.flags={
			block_all:		(flags&(1<<0)?1:0),
			block_monsters:	(flags&(1<<1)?1:0),
			twosided:		(flags&(1<<2)?1:0),
			peg_upper:		(flags&(1<<3)?1:0),
			peg_lower:		(flags&(1<<4)?1:0),
			secret:			(flags&(1<<5)?1:0),
			blocksound:		(flags&(1<<6)?1:0),
			automap_hide:	(flags&(1<<7)?1:0),
			automap_always:	(flags&(1<<8)?1:0)
		};
		wad.levels[level].linedefs.push(ldef);
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] LINEDEFS',wad.levels[level].linedefs.length);
};
wadLoader.getNodes=function(wad,view,level,lump){
	wad.levels[level].nodes=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].nodes.push({
			x:		view.getUint16(),
			y:		view.getUint16(),
			ex:		view.getUint16(),
			ey:		view.getUint16(),
			bb_r:	view.getUint32(),
			bb_l:	view.getUint32(),
			c_r:	view.getUint16(),
			c_l:	view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] NODES',wad.levels[level].nodes.length);
};
wadLoader.getReject=function(wad,view,level,lump){
	return;// XXX This is no doubt wrong, but is optional
	wad.levels[level].reject=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].reject.push({
			bit:	view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] REJECT',wad.levels[level].reject.length);
};
wadLoader.getSegs=function(wad,view,level,lump){
	wad.levels[level].segs=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].segs.push({
			start:	view.getUint16(),
			end:	view.getUint16(),
			angle:	view.getInt16(),
			linedef:view.getUint16(),
			side:	view.getInt16(),
			offset:	view.getInt16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SEGS',wad.levels[level].segs.length);
};
wadLoader.getSidedefs=function(wad,view,level,lump){
	wad.levels[level].sidedefs=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].sidedefs.push({
			x:		view.getUint16(),
			y:		view.getUint16(),
			tex_u:	view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			tex_l:	view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			tex_m:	view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			sector:	view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SIDEDEFS',wad.levels[level].sidedefs.length);
};
wadLoader.getSsectors=function(wad,view,level,lump){
	wad.levels[level].ssectors=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].ssectors.push({
			count:	view.getUint16(),
			start:	view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SSECTORS',wad.levels[level].ssectors.length);
};
wadLoader.getSectors=function(wad,view,level,lump){
	wad.levels[level].sectors=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].sectors.push({
			floor:		view.getInt16(),
			ceiling:	view.getInt16(),
			tex_f:		view.getString(8).replace(/\u0000/g,''),
			tex_c:		view.getString(8).replace(/\u0000/g,''),
			lightlevel:	view.getUint16(),
			type:		view.getUint16(),
			tag:		view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SECTORS',wad.levels[level].sectors.length);
};
wadLoader.getThings=function(wad,view,level,lump){
	wad.levels[level].things=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	var thing;
	while(view.tell()<len){
		thing={
			x:		view.getInt16(),
			y:		0,
			z:		-view.getInt16(),
			angle:	view.getInt16(),
			type:	view.getInt16(),
			flags:	view.getInt16()
		};

		// Bit Shift flags
		var flags=thing.flags;
		thing.flags={
			skill1_2:	(flags&(1<<0)?1:0),
			skill3:		(flags&(1<<1)?1:0),
			skill4_5:	(flags&(1<<2)?1:0),
			deaf:		(flags&(1<<3)?1:0),
			mponly:		(flags&(1<<4)?1:0)
		};
		wad.levels[level].things.push(thing);
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] THINGS',wad.levels[level].things.length);
};
wadLoader.getVertexes=function(wad,view,level,lump){
	wad.levels[level].vertexes=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		wad.levels[level].vertexes.push({
			x:	view.getInt16(),
			y:	-view.getInt16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] VERTEXES',wad.levels[level].vertexes.length);
};

//
// Graphics ----------------------------------------------------------------------------------------
//
wadLoader.getColorMaps=function(wad,view){
	var l,len,curl,pcount,patch;
	var offsets=[];
	wad.colormaps=[];
	wad.playpal=[];
	var tmp=new Array(16);
	for(var a=0;a<16;a++)
		tmp[a]=new Array(16);
		
	view.seek(wadLoader.getLumpOfs(wad,'COLORMAP'));
	if(wadLoader.debug)
		he3d.log("NOTICE","Found COLORMAP at:",view.tell());
	var val;
	for(var cm=0;cm<34;cm++){
		wad.colormaps[cm]=[];
		for(var p=0;p<256;p++)
			wad.colormaps[cm].push(view.getUint8());
	}
	if(wadLoader.debug)
		he3d.log("NOTICE","Total COLORMAPs:",wad.colormaps.length);

	view.seek(wadLoader.getLumpOfs(wad,'PLAYPAL'));
	if(wadLoader.debug)
		he3d.log("NOTICE","Found PLAYPAL at:",view.tell());
	for(var pal=0;pal<14;pal++){
		wad.playpal[pal]=[];
		for(var w=0;w<16;w++)
			for(var h=0;h<16;h++)
				tmp[w][h]=[view.getUint8(),view.getUint8(),view.getUint8()];
		wad.playpal[pal]=tmp.reduce(function(a,b){return a.concat(b);});
	}
};
wadLoader.getPatches=function(wad,view){
	var l,len,curl,pcount,patch;
	wad.patches=[];
	wad.pnames=[];

	view.seek(wadLoader.getLumpOfs(wad,'PNAMES'));
	pcount=view.getInt32();
	if(wadLoader.debug)
		he3d.log("NOTICE","Found "+pcount+" patches in Lump:",'PNAMES');
	for(var p=0;p<pcount;p++)
		wad.pnames.push(view.getString(8).replace(/\u0000/g,'').toUpperCase());

	var patch,poff;
	for(var p in wad.pnames){
		if((poff=wadLoader.getLumpOfs(wad,wad.pnames[p]))<0){
			//he3d.log("WARNING","Missing or invalid Patch:",wad.pnames[p]);
			continue;
		}
		
		view.seek(poff);
		patch={
			width:	view.getUint16(),
			height:	view.getUint16(),
			o_left:	view.getUint16(),
			o_top:	view.getUint16(),
			data:	[]
		};
		//he3d.log(p+" "+wad.pnames[p]+"="+JSON.stringify(patch));
		patch.data=new Array(patch.width);
		for(var row=0;row<patch.data.length;row++){
			patch.data[row]=new Array(patch.height);
		}
		
		var offsets=new Array(patch.width);
		for(var o=0;o<patch.width;o++){
			offsets[o]=view.getUint32();
		}

		var rowstart=0;
		var pixcount=0;
		var dummy=0;
		for(var o=0;o<patch.width;o++){
			view.seek(poff+offsets[o]);
			while((rowstart=view.getUint8())!=255){
				pixcount=view.getUint8();
				dummy=view.getUint8();
				for(var pixi=0;pixi<pixcount;pixi++)
					patch.data[o][rowstart+pixi]=view.getUint8();
				dummy=view.getUint8();
			}
		}
		wad.patches[wad.pnames[p]]=patch;
	}
};
wadLoader.getFlatTextures=function(wad,view){
	var l,b;
	wad.flats=[];

	var readflats=false;
	for(l=0;l<wad.directory.length;l++){
		switch(wad.directory[l].name){
			case 'F1_START':case 'F1_END':readflats=!readflats;break;
			default:
				if(readflats){
					view.seek(wad.directory[l].filepos);
					var flat=[];
					for(b=0;b<4096;b++)
						flat.push(view.getUint8());
					wad.flats[wad.directory[l].name]=flat;
				}
				break;			
		}
	}
};
wadLoader.getTitleScreen=function(wad,view){
	var poff=wadLoader.getLumpOfs(wad,'TITLEPIC');
	view.seek(poff);
	if(wadLoader.debug)
		he3d.log("NOTICE","Found TITLEPIC at:",poff);

	var patch={
		width:	view.getUint16(),
		height:	view.getUint16(),
		o_left:	view.getUint16(),
		o_top:	view.getUint16(),
		data: 	[]
	};

	patch.data=new Array(patch.width);
	for(var row=0;row<patch.data.length;row++)
		patch.data[row]=[];
		
	var offsets=new Array(patch.width);
	for(var o=0;o<patch.width;o++)
		offsets[o]=view.getUint32();

	var rowstart=0;
	var pixcount=0;
	var dummy=0;
	for(var o=0;o<patch.width;o++){
		view.seek(poff+offsets[o]);
		while((rowstart=view.getUint8())!=255){
			pixcount=view.getUint8();
			dummy=view.getUint8();
			for(var pixi=0;pixi<pixcount;pixi++)
				patch.data[o].push(view.getUint8());
			dummy=view.getUint8();
		}
	}

	var data=new Uint8Array(patch.width*patch.height*4);
	var idx=0;
	var pal;
	for(var h=0;h<patch.height;h++){
		for(var w=0;w<patch.width;w++){
			pal=wad.colormaps[0][patch.data[w][h]];
			if(!(wad.playpal[0][pal])){
				data[idx++]=0;
				data[idx++]=0;
				data[idx++]=0;
				data[idx++]=0;
				continue;
			}
			data[idx++]=wad.playpal[0][pal][0];
			data[idx++]=wad.playpal[0][pal][1];
			data[idx++]=wad.playpal[0][pal][2];
			data[idx++]=255;
		}
	}
	return {data:data,width:patch.width,height:patch.height};
};
wadLoader.getWallTextures=function(wad,view){
	var l,len,curl,tcount,texture;
	var offsets=[];
	wad.textures=[];
	for(l=0;l<wad.directory.length;l++){
		switch(wad.directory[l].name){
			case 'TEXTURE1':
			case 'TEXTURE2':
				view.seek(wad.directory[l].filepos);
				tcount=view.getInt32();
				if(wadLoader.debug)
					he3d.log("NOTICE","Found "+tcount+
						" textures in Lump["+l+"]:",wad.directory[l].name);
				for(var t=0;t<tcount;t++)
					offsets.push(view.getInt32());
				for(var t=0;t<tcount;t++){
					view.seek(wad.directory[l].filepos+offsets[t]);
					var tname=view.getString(8).replace(/\u0000/g,'');
					texture={
						masked:	view.getInt32(),
						width:	view.getInt16(),
						height:	view.getInt16(),
						coldir:	view.getInt32(),
						patchc:	view.getInt16()
					};
					texture.patches=[];
					for(var p=0;p<texture.patchc;p++){
						texture.patches.push({
							ox:			view.getInt16(),
							oy:			view.getInt16(),
							patch:		wad.pnames[view.getInt16()],
							stepdir:	view.getInt16(),
							colormap:	view.getInt16()								
						});
					}
					wad.textures[tname]=texture;
				}
				break;
		}
	}
};

//
// GL Lumps ----------------------------------------------------------------------------------------
//
wadLoader.getGLNodes=function(wad,view,level,lump){
	wad.levels[level].glnodes=[];
	view.seek(wad.directory[lump].filepos);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		if(wad.glversion=='gNd5'){
			wad.levels[level].glnodes.push({
				x:		view.getInt16(),
				y:		-view.getInt16(),
				dx:		view.getInt16(),
				dy:		-view.getInt16(),
				bb_r:	[-view.getInt16(),-view.getInt16(),view.getInt16(),view.getInt16()],
				bb_l:	[-view.getInt16(),-view.getInt16(),view.getInt16(),view.getInt16()],
				c_r:	view.getUint32(),	// Version 5 32bit
				c_l:	view.getUint32()	// Version 5 32bit
			});
		}else{
			wad.levels[level].glnodes.push({
				x:		view.getInt16(),
				y:		-view.getInt16(),
				dx:		view.getInt16(),
				dy:		-view.getInt16(),
				bb_r:	[-view.getInt16(),-view.getInt16(),view.getInt16(),view.getInt16()],
				bb_l:	[-view.getInt16(),-view.getInt16(),view.getInt16(),view.getInt16()],
				c_r:	view.getUint16(),
				c_l:	view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_NODES',wad.levels[level].glnodes.length);
};
wadLoader.getGLPVS=function(wad,view,level,lump){
	wad.levels[level].glpvs=[];
	return;
};
wadLoader.getGLSegs=function(wad,view,level,lump){
	wad.levels[level].glsegs=[];
	view.seek(wad.directory[lump].filepos);
	if(wad.glversion==3||wad.glversion==4)view.getString(4);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		if(wad.glversion>2){
			wad.levels[level].glsegs.push({
				start:		view.getUint32(),
				end:		view.getUint32(),
				linedef:	view.getUint16(),
				side:		view.getUint16(),
				partner:	view.getUint32()
			});
		}else{
			wad.levels[level].glsegs.push({
				start:		view.getUint16(),
				end:		view.getUint16(),
				linedef:	view.getUint16(),
				side:		view.getUint16(),
				partner:	view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_SEGS',wad.levels[level].glsegs.length);
};
wadLoader.getGLSSect=function(wad,view,level,lump){
	wad.levels[level].glssect=[];
	view.seek(wad.directory[lump].filepos);
	if(wad.glversion==3||wad.glversion==4)view.getString(4);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		if(wad.glversion>2){
			wad.levels[level].glssect.push({
				count:	view.getUint32(),
				start:	view.getUint32()
			});
		}else{
			wad.levels[level].glssect.push({
				count:	view.getUint16(),
				start:	view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_SSECT',wad.levels[level].glssect.length);
};
wadLoader.getGLVerts=function(wad,view,level,lump){
	wad.levels[level].glverts=[];
	view.seek(wad.directory[lump].filepos);
	wad.glversion=view.getString(4).substr(3,1);
	if(wadLoader.debug)
		he3d.log("NOTICE","["+level+"] GL_VERSION: ","gNd"+wad.glversion);
	var len=wad.directory[lump].filepos+wad.directory[lump].size;
	while(view.tell()<len){
		if(wad.glversion>1){
			wad.levels[level].glverts.push({
				xm:	view.getInt16(),
				x:	view.getInt16(),
				ym:	-view.getInt16(),
				y:	-view.getInt16()
			});
		}else{
			wad.levels[level].glverts.push({
				x:	view.getInt16(),
				y:	-view.getInt16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_VERT',wad.levels[level].glverts.length);
};
