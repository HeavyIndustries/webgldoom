//
// Model Loader Web Worker
//
wadLoader={};

importScripts('../../he3d/scripts/he3d_tools.js');
importScripts('../../he3d/scripts/lib/jdataview.js');

importScripts('wadLoader_level.js');
importScripts('wadLoader_textures.js');
importScripts('wadLoader_things.js');
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
wadLoader.getHeader=function(){
	this.view.seek(0);
	this.wad.header={
		id:				this.view.getString(4),
		numlumps:		this.view.getUint32(),
		infotableofs:	this.view.getUint32()
	};
	if(wadLoader.debug)
		he3d.log("NOTICE","Got Header: "+JSON.stringify(this.wad.header));
	if(this.wad.header.id!='IWAD')
		throw "Unsupported WAD format: "+this.wad.header.id;
};
wadLoader.getDirectory=function(){
	this.view.seek(this.wad.header.infotableofs);
	this.wad.directory=[];
	var l;
	for(l=0;l<this.wad.header.numlumps;l++){
		this.wad.directory.push({
			filepos:this.view.getUint32(),
			size:	this.view.getUint32(),
			name:	this.view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			data:	[]
		});
	}
	
	if(wadLoader.debug)
		he3d.log("NOTICE","Got Directory: "+this.wad.directory.length+" Entries");
	if(this.wad.directory[this.wad.directory.length-1].name!="F_END")
		throw "Unexpected end of Directory Marker: "+
			JSON.stringify(this.wad.directory[this.wad.directory.length-1]);
};
wadLoader.getLevels=function(){
	var l,curl;
	this.wad.levels=[];
	for(l=0;l<this.wad.directory.length;l++){
		if(this.wad.directory[l].name.match(/^(e\dm\d)/i)){
			if(wadLoader.debug)
				he3d.log("NOTICE","Found Level at Lump["+l+"]: "+this.wad.directory[l].name);
			curl=this.wad.directory[l].name;
			this.wad.levels[curl]={name:curl,lump:l};
			continue;
		}
		if(!curl)
			continue;

		switch(this.wad.directory[l].name){
			case 'THINGS':	this.getThings(curl,l);break;
			case 'LINEDEFS':this.getLinedefs(curl,l);break;
			case 'SIDEDEFS':this.getSidedefs(curl,l);break;
			case 'VERTEXES':this.getVertexes(curl,l);break;
			case 'SEGS':	this.getSegs(curl,l);break;
			case 'SSECTORS':this.getSsectors(curl,l);break;
			case 'NODES':	this.getNodes(curl,l);break;
			case 'SECTORS':	this.getSectors(curl,l);break;
			case 'REJECT':	this.getReject(curl,l);break;
			case 'BLOCKMAP':this.getBlockmap(curl,l);break;
			case 'GL_VERT':	this.getGLVerts(curl,l);break;
			case 'GL_SEGS':	this.getGLSegs(curl,l);break;
			case 'GL_SSECT':this.getGLSSect(curl,l);break;
			case 'GL_NODES':this.getGLNodes(curl,l);break;
			case 'GL_PVS':	this.getGLPVS(curl,l);break;
		}
	}
};
wadLoader.getLumpOfs=function(lump){
	for(var l=0;l<this.wad.directory.length;l++)
		if(this.wad.directory[l].name==lump)
			return this.wad.directory[l].filepos;
	return -1;
};
wadLoader.parse=function(filename,level,data){
	this.view=new jDataView(data);
	this.wad={};
	this.getHeader();
	this.getDirectory();
	this.getColorMaps();
	
	// Grab and return the Title Screen straight away
	postMessage({titlescreen:this.getPatch('TITLEPIC')});

	this.getLevels();
	this.getPatches();
	this.getWallTextures();
	this.getFlatTextures();

	this.buildLevel(level);
	this.buildThings(level);

	he3d.log("NOTICE",'Finished Parsing '+filename,
		'Transfering Data back from Worker Thread');

	postMessage({
		'filename':		filename,
		'mapdata':		this.wad.mapdata,
		'indices':		this.wad.indices,
		'flatdata':		this.wad.flatdata,
		'flatindices':	this.wad.flatindices,
		'atlus':		this.wad.atlus,
		'flatlus':		this.wad.flatlus,
		'sky':			this.wad.sky,
		'spawnPos':		this.wad.spawnPos,
		'spawnDir':		this.wad.spawnDir,
		'sprites':		this.wad.sprites,
		'things':		this.wad.levels[level].things,
		'thingsatlus':	this.wad.thingsatlus,
		'worldbb':		this.wad.worldbb
	});
};

//
// Level Data Lumps --------------------------------------------------------------------------------
//
wadLoader.getBlockmap=function(level,lump){
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	this.wad.levels[level].blockmap={
		x:		this.view.getUint16(),
		y:		this.view.getUint16(),
		cols:	this.view.getUint16(),
		rows:	this.view.getUint16(),
		offsets:[]
	}
	while(this.view.tell()<len)
		this.wad.levels[level].blockmap.offsets.push(this.view.getUint16());
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] BLOCKMAP Offsets',
			this.wad.levels[level].blockmap.offsets.length);
};
wadLoader.getLinedefs=function(level,lump){
	this.wad.levels[level].linedefs=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	var ldef;
	while(this.view.tell()<len){
		ldef={
			start:	this.view.getUint16(),
			end:	this.view.getUint16(),
			flags:	this.view.getInt16(),
			type:	this.view.getUint16(),
			sector:	this.view.getUint16(),
			right:	this.view.getUint16(),
			left:	this.view.getUint16()
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
		this.wad.levels[level].linedefs.push(ldef);
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] LINEDEFS',this.wad.levels[level].linedefs.length);
};
wadLoader.getNodes=function(level,lump){
	this.wad.levels[level].nodes=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].nodes.push({
			x:		this.view.getUint16(),
			y:		this.view.getUint16(),
			ex:		this.view.getUint16(),
			ey:		this.view.getUint16(),
			bb_r:	this.view.getUint32(),
			bb_l:	this.view.getUint32(),
			c_r:	this.view.getUint16(),
			c_l:	this.view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] NODES',this.wad.levels[level].nodes.length);
};
wadLoader.getReject=function(level,lump){
	return;// XXX This is no doubt wrong, but is optional
	this.wad.levels[level].reject=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].reject.push({
			bit:	this.view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] REJECT',this.wad.levels[level].reject.length);
};
wadLoader.getSegs=function(level,lump){
	this.wad.levels[level].segs=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].segs.push({
			start:	this.view.getUint16(),
			end:	this.view.getUint16(),
			angle:	this.view.getInt16(),
			linedef:this.view.getUint16(),
			side:	this.view.getInt16(),
			offset:	this.view.getInt16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SEGS',this.wad.levels[level].segs.length);
};
wadLoader.getSidedefs=function(level,lump){
	this.wad.levels[level].sidedefs=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].sidedefs.push({
			x:		this.view.getUint16(),
			y:		this.view.getUint16(),
			tex_u:	this.view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			tex_l:	this.view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			tex_m:	this.view.getString(8).replace(/\u0000/g,'').toUpperCase(),
			sector:	this.view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SIDEDEFS',this.wad.levels[level].sidedefs.length);
};
wadLoader.getSsectors=function(level,lump){
	this.wad.levels[level].ssectors=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].ssectors.push({
			count:	this.view.getUint16(),
			start:	this.view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SSECTORS',this.wad.levels[level].ssectors.length);
};
wadLoader.getSectors=function(level,lump){
	this.wad.levels[level].sectors=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].sectors.push({
			floor:		this.view.getInt16(),
			ceiling:	this.view.getInt16(),
			tex_f:		this.view.getString(8).replace(/\u0000/g,''),
			tex_c:		this.view.getString(8).replace(/\u0000/g,''),
			lightlevel:	this.view.getUint16(),
			type:		this.view.getUint16(),
			tag:		this.view.getUint16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] SECTORS',this.wad.levels[level].sectors.length);
};
wadLoader.getThings=function(level,lump){
	this.wad.levels[level].things=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	var thing;
	while(this.view.tell()<len){
		thing={
			x:		this.view.getInt16(),
			y:		-999,
			z:		-this.view.getInt16(),
			angle:	this.view.getInt16(),
			type:	this.view.getInt16(),
			flags:	this.view.getInt16()
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
		this.wad.levels[level].things.push(thing);
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] THINGS',this.wad.levels[level].things.length);
};
wadLoader.getVertexes=function(level,lump){
	this.wad.levels[level].vertexes=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		this.wad.levels[level].vertexes.push({
			x:	this.view.getInt16(),
			y:	-this.view.getInt16()
		});
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] VERTEXES',this.wad.levels[level].vertexes.length);
};

//
// Graphics ----------------------------------------------------------------------------------------
//
wadLoader.getColorMaps=function(){
	var l,len,curl,pcount,patch;
	var offsets=[];
	this.wad.colormaps=[];
	this.wad.playpal=[];
	var tmp=new Array(16);
	for(var a=0;a<16;a++)
		tmp[a]=new Array(16);
		
	this.view.seek(wadLoader.getLumpOfs('COLORMAP'));
	if(wadLoader.debug)
		he3d.log("NOTICE","Found COLORMAP at:",this.view.tell());
	var val;
	for(var cm=0;cm<34;cm++){
		this.wad.colormaps[cm]=[];
		for(var p=0;p<256;p++)
			this.wad.colormaps[cm].push(this.view.getUint8());
	}
	if(wadLoader.debug)
		he3d.log("NOTICE","Total COLORMAPs:",this.wad.colormaps.length);

	this.view.seek(wadLoader.getLumpOfs('PLAYPAL'));
	if(wadLoader.debug)
		he3d.log("NOTICE","Found PLAYPAL at:",this.view.tell());
	for(var pal=0;pal<14;pal++){
		this.wad.playpal[pal]=[];
		for(var w=0;w<16;w++)
			for(var h=0;h<16;h++)
				tmp[w][h]=[this.view.getUint8(),this.view.getUint8(),this.view.getUint8()];
		this.wad.playpal[pal]=tmp.reduce(function(a,b){return a.concat(b);});
	}
};
wadLoader.getPatch=function(patch,poff){
	if(!poff)
		poff=wadLoader.getLumpOfs(patch);
	this.view.seek(poff);
	if(wadLoader.debug)
		he3d.log("NOTICE","Found patch "+patch+" at:",poff);

	var patch={
		width:	this.view.getUint16(),
		height:	this.view.getUint16(),
		o_left:	this.view.getUint16(),
		o_top:	this.view.getUint16(),
		data: 	[]
	};

	patch.data=new Array(patch.width);
	for(var row=0;row<patch.data.length;row++)
		patch.data[row]=[];
		
	var offsets=new Array(patch.width);
	for(var o=0;o<patch.width;o++)
		offsets[o]=this.view.getUint32();

	var rowstart=0;
	var pixcount=0;
	var dummy=0;
	for(var o=0;o<patch.width;o++){
		this.view.seek(poff+offsets[o]);
		while((rowstart=this.view.getUint8())!=255){
			pixcount=this.view.getUint8();
			dummy=this.view.getUint8();
			for(var pixi=0;pixi<pixcount;pixi++)
				patch.data[o][rowstart+pixi]=this.view.getUint8();
			dummy=this.view.getUint8();
		}
	}

	var data=new Uint8Array(patch.width*patch.height*4);
	var idx=0;
	var pal;
	for(var h=0;h<patch.height;h++){
		for(var w=0;w<patch.width;w++){
			pal=this.wad.colormaps[0][patch.data[w][h]];
			if(!(this.wad.playpal[0][pal])){
				data[idx++]=0;
				data[idx++]=0;
				data[idx++]=0;
				data[idx++]=0;
				continue;
			}
			data[idx++]=this.wad.playpal[0][pal][0];
			data[idx++]=this.wad.playpal[0][pal][1];
			data[idx++]=this.wad.playpal[0][pal][2];
			data[idx++]=255;
		}
	}
	return {data:data,width:patch.width,height:patch.height};
};
wadLoader.getPatches=function(){
	var l,len,curl,pcount,patch;
	this.wad.patches=[];
	this.wad.pnames=[];

	this.view.seek(wadLoader.getLumpOfs('PNAMES'));
	pcount=this.view.getInt32();
	if(wadLoader.debug)
		he3d.log("NOTICE","Found "+pcount+" patches in Lump:",'PNAMES');
	for(var p=0;p<pcount;p++)
		this.wad.pnames.push(this.view.getString(8).replace(/\u0000/g,'').toUpperCase());

	var patch,poff;
	for(var p in this.wad.pnames){
		if((poff=wadLoader.getLumpOfs(this.wad.pnames[p]))<0){
			//he3d.log("WARNING","Missing or invalid Patch:",this.wad.pnames[p]);
			continue;
		}
		
		this.view.seek(poff);
		patch={
			width:	this.view.getUint16(),
			height:	this.view.getUint16(),
			o_left:	this.view.getUint16(),
			o_top:	this.view.getUint16(),
			data:	[]
		};
		//he3d.log(p+" "+this.wad.pnames[p]+"="+JSON.stringify(patch));
		patch.data=new Array(patch.width);
		for(var row=0;row<patch.data.length;row++){
			patch.data[row]=new Array(patch.height);
		}
		
		var offsets=new Array(patch.width);
		for(var o=0;o<patch.width;o++){
			offsets[o]=this.view.getUint32();
		}

		var rowstart=0;
		var pixcount=0;
		var dummy=0;
		for(var o=0;o<patch.width;o++){
			this.view.seek(poff+offsets[o]);
			while((rowstart=this.view.getUint8())!=255){
				pixcount=this.view.getUint8();
				dummy=this.view.getUint8();
				for(var pixi=0;pixi<pixcount;pixi++)
					patch.data[o][rowstart+pixi]=this.view.getUint8();
				dummy=this.view.getUint8();
			}
		}
		this.wad.patches[this.wad.pnames[p]]=patch;
	}
};
wadLoader.getFlatTextures=function(){
	var l,b;
	this.wad.flats=[];
	var readflats=false;
	for(l=0;l<this.wad.directory.length;l++){
		switch(this.wad.directory[l].name){
			case 'F1_START':case 'F1_END':readflats=!readflats;break;
			default:
				if(readflats){
					this.view.seek(this.wad.directory[l].filepos);
					var flat=[];
					for(b=0;b<4096;b++)
						flat.push(this.view.getUint8());
					this.wad.flats[this.wad.directory[l].name]=flat;
				}
				break;			
		}
	}
};
wadLoader.getWallTextures=function(){
	var l,len,curl,tcount,texture;
	var offsets=[];
	this.wad.textures=[];
	for(l=0;l<this.wad.directory.length;l++){
		switch(this.wad.directory[l].name){
			case 'TEXTURE1':
			case 'TEXTURE2':
				this.view.seek(this.wad.directory[l].filepos);
				tcount=this.view.getInt32();
				if(wadLoader.debug)
					he3d.log("NOTICE","Found "+tcount+
						" textures in Lump["+l+"]:",this.wad.directory[l].name);
				for(var t=0;t<tcount;t++)
					offsets.push(this.view.getInt32());
				for(var t=0;t<tcount;t++){
					this.view.seek(this.wad.directory[l].filepos+offsets[t]);
					var tname=this.view.getString(8).replace(/\u0000/g,'');
					texture={
						masked:	this.view.getInt32(),
						width:	this.view.getInt16(),
						height:	this.view.getInt16(),
						coldir:	this.view.getInt32(),
						patchc:	this.view.getInt16()
					};
					texture.patches=[];
					for(var p=0;p<texture.patchc;p++){
						texture.patches.push({
							ox:			this.view.getInt16(),
							oy:			this.view.getInt16(),
							patch:		this.wad.pnames[this.view.getInt16()],
							stepdir:	this.view.getInt16(),
							colormap:	this.view.getInt16()								
						});
					}
					this.wad.textures[tname]=texture;
				}
				break;
		}
	}
};

//
// GL Lumps ----------------------------------------------------------------------------------------
//
wadLoader.getGLNodes=function(level,lump){
	this.wad.levels[level].glnodes=[];
	this.view.seek(this.wad.directory[lump].filepos);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		if(this.wad.glversion=='gNd5'){
			this.wad.levels[level].glnodes.push({
				x:		this.view.getInt16(),
				y:		-this.view.getInt16(),
				dx:		this.view.getInt16(),
				dy:		-this.view.getInt16(),
				bb_r:	[-this.view.getInt16(),-this.view.getInt16(),
							this.view.getInt16(),this.view.getInt16()],
				bb_l:	[-this.view.getInt16(),-this.view.getInt16(),
							this.view.getInt16(),this.view.getInt16()],
				c_r:	this.view.getUint32(),	// Version 5 32bit
				c_l:	this.view.getUint32()	// Version 5 32bit
			});
		}else{
			this.wad.levels[level].glnodes.push({
				x:		this.view.getInt16(),
				y:		-this.view.getInt16(),
				dx:		this.view.getInt16(),
				dy:		-this.view.getInt16(),
				bb_r:	[-this.view.getInt16(),-this.view.getInt16(),
							this.view.getInt16(),this.view.getInt16()],
				bb_l:	[-this.view.getInt16(),-this.view.getInt16(),
							this.view.getInt16(),this.view.getInt16()],
				c_r:	this.view.getUint16(),
				c_l:	this.view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_NODES',this.wad.levels[level].glnodes.length);
};
wadLoader.getGLPVS=function(level,lump){
	this.wad.levels[level].glpvs=[];
	return;
};
wadLoader.getGLSegs=function(level,lump){
	this.wad.levels[level].glsegs=[];
	this.view.seek(this.wad.directory[lump].filepos);
	if(this.wad.glversion==3||this.wad.glversion==4)this.view.getString(4);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		if(this.wad.glversion>2){
			this.wad.levels[level].glsegs.push({
				start:		this.view.getUint32(),
				end:		this.view.getUint32(),
				linedef:	this.view.getUint16(),
				side:		this.view.getUint16(),
				partner:	this.view.getUint32()
			});
		}else{
			this.wad.levels[level].glsegs.push({
				start:		this.view.getUint16(),
				end:		this.view.getUint16(),
				linedef:	this.view.getUint16(),
				side:		this.view.getUint16(),
				partner:	this.view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_SEGS',this.wad.levels[level].glsegs.length);
};
wadLoader.getGLSSect=function(level,lump){
	this.wad.levels[level].glssect=[];
	this.view.seek(this.wad.directory[lump].filepos);
	if(this.wad.glversion==3||this.wad.glversion==4)this.view.getString(4);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		if(this.wad.glversion>2){
			this.wad.levels[level].glssect.push({
				count:	this.view.getUint32(),
				start:	this.view.getUint32()
			});
		}else{
			this.wad.levels[level].glssect.push({
				count:	this.view.getUint16(),
				start:	this.view.getUint16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_SSECT',this.wad.levels[level].glssect.length);
};
wadLoader.getGLVerts=function(level,lump){
	this.wad.levels[level].glverts=[];
	this.view.seek(this.wad.directory[lump].filepos);
	this.wad.glversion=this.view.getString(4).substr(3,1);
	if(wadLoader.debug)
		he3d.log("NOTICE","["+level+"] GL_VERSION: ","gNd"+this.wad.glversion);
	var len=this.wad.directory[lump].filepos+this.wad.directory[lump].size;
	while(this.view.tell()<len){
		if(this.wad.glversion>1){
			this.wad.levels[level].glverts.push({
				xm:	this.view.getInt16(),
				x:	this.view.getInt16(),
				ym:	-this.view.getInt16(),
				y:	-this.view.getInt16()
			});
		}else{
			this.wad.levels[level].glverts.push({
				x:	this.view.getInt16(),
				y:	-this.view.getInt16()
			});
		}
	}
	if(wadLoader.debug)
		he3d.log("NOTICE",'['+level+'] GL_VERT',this.wad.levels[level].glverts.length);
};
