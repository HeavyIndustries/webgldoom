//
// Things Parsing ----------------------------------------------------------------------------------
//

// Atluses
//	Maybe have two? one for basic non-state/framed things
//	and one for animated things. This would require
// 	either drawing all single frame things THEN all
//	multiframe ones or binding both textures and
//	switching between them in the shader.
//
//	What else is different between the two types
//	of thing? maybe there should be two sperate routines
//
//	Some things glow with a light pulse effect
//

//
// XXX This is crazy loopy for deduping, must be a way to reduce it
//
wadLoader.buildThings=function(level){
	var uThings=[],uT,dupe=false;
	var sprites=[],spritename;
	for(var t in this.wad.levels[level].things){
		if((uT=wadLoader.LookupThing(this.wad.levels[level].things[t].type))!=null){
			// Clone Thing Structure
			for(var a in THINGS[uT])
				this.wad.levels[level].things[t][a]=THINGS[uT][a];
				
			dupe=false;
			for(var uTs=0;uTs<uThings.length;uTs++)
				if(uT==uThings[uTs])
					dupe=true;
			if(!dupe){
				uThings.push(uT);
				if((spritename=wadLoader.lookupSpriteName(THINGS[uT].spawnstate))){
					for(var uTs=0;uTs<sprites.length;uTs++)
						if(spritename==sprites[uTs])
							dupe=true;
					if(!dupe)
						sprites.push({
							name:	spritename,
							stateid:this.wad.levels[level].things[t].type
						});
				}
			}
		}
	}
	he3d.log("DEBUG","Level Things (Unique):",
		this.wad.levels[level].things.length+" ("+uThings.length+")");
	wadLoader.buildSpriteTextures(sprites);
};

wadLoader.findThingInSSector=function(map,bb,floor){
	for(var t=0;t<map.things.length;t++){
		if((map.things[t].z>=bb[0]&&map.things[t].z<=bb[1])&&
			(map.things[t].x>=bb[2]&&map.things[t].x<=bb[3])){
			map.things[t].y=floor;
			if(wadLoader.debug)
				he3d.log("DEBUG","Found Thing["+t+"]","Height: "+map.things[t].y);
		}
	}
};

wadLoader.LookupThing=function(doomednum){
	for(var t in THINGS)
		if(THINGS[t].doomednum==doomednum)
			return t;
	return null;
};
