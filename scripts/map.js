//
// Map
//

//
// Idea, seeing as all the wall/floor data is in a single
//	indexed buffer, for the BSP style of rendering would it
//	work to just build a list of indices for each visible
//	sector? Store in the tree which indices are in that sector.
//
// That way the walls/floors could still be rendered in a single
//	call instead of having to drawElements on each sector. Hmm
//
// Doors/lifts would need to be their own buffers though as they
//	would need some independant translations depending on their
//	state but could still work.

he3d.game.map = {
	bsp:		{ vbo: {} },
	curmap:		'E1M1',
	debug: 		false,
	filename:	'gldoom1.wad',
	flatsvbo:	{},
	loaded:		false,
	path: 		'../wads/',
	titlescreen:{ data: null },
	traceBSP:	false,
	doTraceBSP:	false,
	vbo:		{}
};
he3d.game.flats = {
	a_frames:	[0, 0],
	show:		true,
	ticker:		0,
	vbo:		{}
};
he3d.game.lights = {
	timers:		[1.0, 1.0, 1.0, 1.0, 1.0],
	oscillatedir:false,
	blink:		0,
	halfblink:	0
};
he3d.game.sky = {
	show:	true,
	vbo:	{}
};
he3d.game.walls = {
	show:	true,
	vbo:	{}
};

he3d.game.map.init = function() {
	he3d.game.walls.vbo.texture = he3d.t.load({
		name: 	'atlas',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{
			min: he3d.gl.NEAREST,
			mag: he3d.gl.NEAREST
		},
		image:	he3d.game.map.atlas.data,
		height:	he3d.game.map.atlas.height,
		width:	he3d.game.map.atlas.width
	});
	he3d.game.flats.vbo.texture = he3d.t.load({
		name: 	'flatlas',
		type:	'raw',
		format:	'rgba',
		flip:	false,
		filter:	{
			min: he3d.gl.NEAREST,
			mag: he3d.gl.NEAREST
		},
		image:	he3d.game.map.flatlas.data,
		height:	he3d.game.map.flatlas.height,
		width:	he3d.game.map.flatlas.width
	});
	he3d.game.sky.vbo = he3d.primatives.bbox({
		insideout:true,
		z: { min: 0, max: he3d.game.map.sky.width },
		x: { min: 0, max: he3d.game.map.sky.width },
		y: { min: 0, max: he3d.game.map.sky.width }
	});

	// Skybox cam position
	he3d.game.sky.campos = [
		-he3d.game.map.sky.width / 2,
		-he3d.game.map.sky.width / 2,
		-he3d.game.map.sky.width / 2];
	he3d.game.sky.mvMatrix = he3d.m.mat4.create();

	// Load Sky Texture
	he3d.game.sky.tex = he3d.t.load({
		name:	'sky',
		type:	'rawcubemap',
		format:	'rgba',
		flip:	false,
		bottom:	he3d.game.map.sky.bottom,
		middle:	he3d.game.map.sky.data,
		height:	he3d.game.map.sky.height,
		width:	he3d.game.map.sky.width,
		top:	he3d.game.map.sky.top
	});

	// View heightmap
	// - Destroyer of browsers!
	if (false) {
		var rawimage = new Uint8Array((he3d.game.map.heightmap.width *
				he3d.game.map.heightmap.height) * 3),
			ai = 0, di = 0,
			scale = (he3d.game.map.heightmap.max - he3d.game.map.heightmap.min);
		for (var di = 0; di < he3d.game.map.heightmap.data.length; di++) {
			if (he3d.game.map.heightmap.data[di] == NOGROUND) {
				rawimage[ai++] = 0;
				rawimage[ai++] = 255;
				rawimage[ai++] = 0;
				continue;
			}
			rawimage[ai++] =
				(he3d.game.map.heightmap.data[di] - he3d.game.map.heightmap.min) / scale * 255;
			rawimage[ai++] = 0;
			rawimage[ai++] = 0;
		}
		he3d.t.load({
			name: 	'heightmap',
			type:	'raw',
			format:	'rgb',
			flip:	true,
			filter:	{
				min: he3d.gl.NEAREST,
				mag: he3d.gl.NEAREST
			},
			image:	rawimage,
			height:	he3d.game.map.heightmap.height,
			width:	he3d.game.map.heightmap.width
		});
	}

	// Upload Walls Data
	he3d.game.walls.vbo.buf_data = he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.walls.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER, he3d.game.map.data, he3d.gl.STATIC_DRAW);
	he3d.game.walls.vbo.buf_indices = he3d.gl.createBuffer();
	he3d.game.walls.vbo.indices = he3d.game.map.indices.length;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.walls.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(he3d.game.map.indices), he3d.gl.STATIC_DRAW);

	// Upload Flats Data
	he3d.game.flats.vbo.buf_data = he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.flats.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER, he3d.game.map.flatdata, he3d.gl.STATIC_DRAW);
	he3d.game.flats.vbo.buf_indices = he3d.gl.createBuffer();
	he3d.game.flats.vbo.indices = he3d.game.map.flatindices.length;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.flats.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(he3d.game.map.flatindices), he3d.gl.STATIC_DRAW);

	// Upload BSP Lines Data
	he3d.game.map.bsp.vbo.buf_data = he3d.gl.createBuffer();
	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.map.bsp.vbo.buf_data);
	he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER, he3d.game.map.bsplines, he3d.gl.STATIC_DRAW);
	he3d.game.map.bsp.vbo.buf_indices = he3d.gl.createBuffer();
	he3d.game.map.bsp.vbo.indices = he3d.game.map.bsplinesindices.length;
	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.map.bsp.vbo.buf_indices);
	he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(he3d.game.map.bsplinesindices), he3d.gl.STATIC_DRAW);
};

//
// BSP Functions -----------------------------------------------------------------------------------
//
he3d.game.map.bsp.draw = function() {
	if (!he3d.game.map.traceBSP)
		return;
	he3d.r.changeProgram('collines');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.map.bsp.vbo.buf_data);

	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 16, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aHit,
		1, he3d.gl.FLOAT, false, 16, 12);

	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, false, he3d.r.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.map.bsp.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.LINES, he3d.game.map.bsp.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
};

he3d.game.map.findSector = function(pos) {
	var node, side, sector,
		n = this.nodes.length - 1;

	if (this.doTraceBSP)
		console.log("Pos: " + pos[0] + "x" + pos[2]);

	while(!(n&SUBSECTOR)) {
		node = this.test.nodes[n];
		if (this.doTraceBSP)
			console.log("Checking Node["+n+"]\n"+JSON.stringify(node));
		// True 'Right'
		if (side = this.pointOnSide(pos, n)) {
			if (this.doTraceBSP)
				console.log("-> Right Side");
			sector = this.test.subsectors[node.c_r & ~SUBSECTOR].sector;
			n = node.c_r;
		} else {
			if (this.doTraceBSP)
				console.log("-> Left Side");
			sector = this.test.subsectors[node.c_l & ~SUBSECTOR].sector;
			n = node.c_l;
		}
	}

	if (this.doTraceBSP) {
		console.log("Found sector " + (sector) + " in Node " + (n));
		console.log("==========================================================");
		this.doTraceBSP = false;
	}
	return sector;
};

he3d.game.map.pointOnSide = function(pos, n) {
	var node = this.nodes[n];
	return (((node.x + node.dx) - node.x) * (pos[2] - node.y)
		- ((node.y + node.dy) - node.y) * (pos[0] - node.x)) > 0;
};

he3d.game.map.pointOnSegSide = function(pos, n) {
	var node = this.test.segs[n];
	return (((node.x + node.dx) - node.x) * (pos[2] - node.y)
		- ((node.y + node.dy) - node.y) * (pos[0] - node.x)) > 0;
};

he3d.game.map.pointOnLineSide = function(pos, n) {
	var line = this.test.segs[n];
	if (!line.dx) {
		return (pos[0] <= line.x) ? (line.dy > 0) : (line.dy < 0);
	} else if (!line.dy) {
		return (pos[2] <= line.y) ? (line.dx < 0) : (line.dx > 0);
	} else {
		return  ((line.dy * (pos[0] - line.x)) <= ((pos[2] - line.y) * (line.dx )));
	}
}

he3d.game.map.pointInSubsector = function(x, z) {
	nodebase = he3d.game.map.test;
	if (!nodebase.nodes.length)
		return 0;

	var nodenum = nodebase.nodes.length-1;
	while (!nodenum & SUBSECTOR) {
			node = nodebase.nodes[nodenum];
			side = he3d.game.map.pointOnSide(x, z, node);
			nodenum = side ? node.c_l : node.c_r;
	}
	return nodebase.subsectors[nodenum & ~SUBSECTOR];
}


he3d.game.map.boxOnLineSide = function(thingbbox, n) {
	var seg = this.test.segs[n],
		p1 = 0,
		p2 = 0,
		slopetype = 0;

	if (seg.dy == 0)
		slopetype = 1;
	else if (seg.dx == 0)
		slopetype = 2;
	else if ((seg.dy / seg.dx) > 0)
		slopetype = 3;
	else
		slopetype = 4;

	switch (slopetype)
	{
	  case 1:
		p1 = thingbbox[0] > seg.y;
		p2 = thingbbox[1] > seg.y;
		if (seg.dx < 0) {
			p1 ^=  1;
			p2 ^=  1;
		}
		break;

	  case 2:
		p1 = thingbbox[4] < seg.x;
		p2 = thingbbox[3] < seg.x;
		if (seg.dy < 0) {
			p1 ^=  1;
			p2 ^=  1;
		}
		break;

	  case 3:
		p1 = this.pointOnLineSide([thingbbox[3], 0, thingbbox[0]], n);
		p2 = this.pointOnLineSide([thingbbox[2], 0, thingbbox[1]], n);
		break;

	  case 4:
		p1 = this.pointOnLineSide([thingbbox[2], 0, thingbbox[0]], n);
		p2 = this.pointOnLineSide([thingbbox[3], 0, thingbbox[1]], n);
		break;
	}

	return (p1  ==  p2) ? p1 : -1;
}

he3d.game.map.checkPosition = function(thing, x, z) {
	var nodebase = he3d.game.map.test,
		radius = thing.radius + 10,
		thingbase = he3d.game.map,
		linesecblock = [], lineblock = [], lineseg = [],
		thingblock = [], segblock = [];

	// top, bottom, right, left
	var thingbox = [z + (radius), z - (radius), x + (radius), x - (radius)];

	subsector = he3d.game.map.pointInSubsector(x, z);
	if (!subsector)
		return false;
	sector = nodebase.sectors[subsector.sector];
	ceiling = sector.ceiling;
	floor = sector.floor;

	if (thing.flags & mobjflag_t.MF_NOCLIP)
		return true;

	xl = (thingbox[3]);
	xh = (thingbox[2]);
	yl = (thingbox[1]);
	yh = (thingbox[0]);

	// vanilla Doom's check for blocking things
	for (var tm = 0; tm < this.things.length; tm++) {
		if (this.things[tm] != thing &&
			this.things[tm].curstate &&
			this.things[tm].pos[0] >= xl &&
			this.things[tm].pos[0] <= xh &&
			this.things[tm].pos[2] >= yl &&
			this.things[tm].pos[2] <= yh){

			thingblock.push(tm);
		}
	}

	for (tm = 0; tm < sector.segs.length; tm++) {
		addsect = nodebase.segs[sector.segs[tm]].line.fs;
		for (var ads = 0; ads < linesecblock.length; ads++) {
			if (linesecblock[ads] == addsect)
				addsect = null;
		}
		if (addsect)
			linesecblock.push(addsect);

		if (nodebase.segs[sector.segs[tm]].line.bs
			&&!nodebase.segs[sector.segs[tm]].line.flags.block_all) {
			addsect = nodebase.segs[sector.segs[tm]].line.bs;
			for (var ads = 0; ads < linesecblock.length; ads++) {
				if (linesecblock[ads] == addsect)
					addsect = null;
			}
			if (addsect)
				linesecblock.push(addsect);
		}
	}

	for (var tm = 0; tm < linesecblock.length;tm++) {
		for (var ts = 0; ts < nodebase.sectors[linesecblock[tm]].segs.length; ts++) {

			addsect = nodebase.sectors[linesecblock[tm]].segs[ts];

			for (var ads = 0; ads < lineseg.length; ads++) {
				if (lineseg[ads] == addsect)
					addsect = null;
			}
			if (addsect)
				lineseg.push(addsect);
		}
	}

	for (tm = 0; tm < lineseg.length; tm++) {

		seg = nodebase.segs[lineseg[tm]];
		segres = he3d.game.map.boxOnLineSide(thingbox, lineseg[tm]);
		console.log("Wall check seg[" + lineseg[tm] + "] result " + segres);

		if (segres == -1) {
			if ((seg.line.flags.block_all == 1) ||
				(!(thing.flags & mobjflag_t.MF_NOGRAVITY) &&
				seg.line.bs && Math.abs(
				seg.line.frontsector.floor < seg.line.backsector.floor ?
				seg.line.frontsector.floor - seg.line.backsector.floor :
				seg.line.backsector.floor - seg.line.frontsector.floor) > 25)){

				lineblock.push(lineseg[tm]);
			}
		}
	}

	console.log("Items in area ["+subsector.sector+"]\n"+JSON.stringify(thingblock));
	console.log("Wall collision list ["+subsector.sector+"]\n"+JSON.stringify(lineblock));
}

he3d.game.map.lineInterpolate = function( point1, point2, distance ) {
    var xdiff = point2.x - point1.x;
    var ydiff = point2.y - point1.y;
    return {
		x: point1.x + (xdiff*distance),
		y: point1.y + (ydiff*distance)
	};
}

he3d.game.map.lineIntersectTest = function(seg, thing) {
	var enter, exit,
		inside = 0,
		tangent = 0,
		intersects = 0;

	posX = thing.pos[0] + thing.delta[0];
	posY = thing.pos[2] + thing.delta[2];
	r = thing.radius;
	v1X = seg.v1.x;
	v1Y = seg.v1.y;
	v2X = seg.v2.x;
	v2Y = seg.v2.y;
	var a = (v2X - v1X) * (v2X - v1X) + (v2Y - v1Y) * (v2Y - v1Y);
	var b = 2 * ((v2X - v1X) * (v1X - posX) +(v2Y - v1Y) * (v1Y - posY));
	var cc = posX * posX + posY * posY + v1X * v1X + v1Y * v1Y -
		2 * (posX * v1X + posY * v1Y) - r * r;
	var deter = b * b - 4 * a * cc;
	if (deter <= 0 ) {
		inside = 0;
	} else {
		var e = Math.sqrt(deter),
			u1 = (-b + e) / (2 * a),
			u2 = (-b - e) / (2 * a);

		if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
			if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
				inside = 0;
			} else {
				inside = 1;
			}
		} else {
			if (0 <= u2 && u2 <= 1) {
				enter = this.lineInterpolate(seg.v1, seg.v2, 1 - u2);
			}
			if (0 <= u1 && u1 <= 1) {
				exit = this.lineInterpolate(seg.v1, seg.v2, 1 - u1);
			}
			intersects = 1;

			if (exit !==  null && enter !==  null && exit && enter &&
				exit.x == enter.x && exit.y == enter.y) {
				tangent = 1;
			}
		}
	}

	return {
		'r_ins':	inside,
		'r_int':	intersects,
		'r_enter':	enter,
		'r_exit':	exit,
		'r_tan':	tangent
	};
}

he3d.game.map.checkMoveLocation = function(thing, x, z) {
	var bols, boxtstx = 0, boxtsty = 0,
		rst_dx = 0, rst_dy = 0, rst_dydx = 0, linefail = 0,
		blocklist = [], sectorlist = [];

	cursector = this.findSector([thing.pos[0], 0, thing.pos[2]]);
	newsector = this.findSector([x, 0, z]);

	sectorlist.push(cursector);
	if (newsector != cursector)
		sectorlist.push(newsector);

	//var radius = thing.radius;
	var radius = 0;

	// top, bottom, right, left
	var thingbox = [
		Math.round((thing.pos[2]) + (radius)),
		Math.round((thing.pos[2]) - (radius)),
		Math.round((thing.pos[0]) + (radius)),
		Math.round((thing.pos[0]) - (radius))
	];

	deltaangle = he3d.game.things.thing_to_thing_angle(
						0, 0, x-thing.pos[0], z-thing.pos[2], 0);

	// new multi sector check
	for (chksector = 0;chksector<sectorlist.length;chksector++) {
		sector = sectorlist[chksector];

	for (ss = 0; ss < this.test.sectors[sector].segs.length; ss++) {
		sseg = this.test.sectors[sector].segs[ss];
		seg = this.test.segs[sseg];

		if (seg.linedef < 65535) {
			var lineinttst;
			lineinttst = this.lineIntersectTest(seg, thing);

			if (!lineinttst.r_int)
				continue;

			//pos = this.pointOnSegSide(thing.pos, sseg);
			pos = this.boxOnLineSide(thingbox, sseg);

				if ((!(thing.flags & mobjflag_t.MF_NOGRAVITY) &&
					seg.line.bs && (pos == -1 ? 0 : pos) == seg.side &&
					seg.line.backsector.floor  >= (seg.line.frontsector.floor + 25)) ||
					seg.line.flags.block_all == 1) {

					if (!seg.line.flags.block_all)
						console.log("seg failed:"+sseg);

					linefail = 1;

					side = this.pointOnLineSide([x, 0, z], sseg)

					lineangle = Math.round(
						he3d.game.things.thing_to_thing_angle(0, 0, seg.dx, seg.dy, 0));

					newdeltaangle = Math.round(deltaangle) - Math.round(lineangle);

					if (newdeltaangle < 0)
						newdeltaangle += 360;

					movelen = he3d.m.vec3.dist(
						[thing.pos[0], 0, thing.pos[2]], [x, 0, z]);

					// New delta
					newlen = Math.round(movelen * Math.cos(he3d.m.degtorad(newdeltaangle)));

					if (newlen >= thing.radius)
						console.log("Oops - too far ["+newlen+"]");

					// Apply new delta
					thing.delta[0] = Math.round(newlen * Math.cos(he3d.m.degtorad(lineangle)));
					thing.delta[1] = 0;
					thing.delta[2] = Math.round(newlen * Math.sin(he3d.m.degtorad(lineangle)));

					if (blocklist.length>0) {
						lineinttst2 = this.lineIntersectTest(
							blocklist[blocklist.length - 1], thing);

						if (lineinttst2.r_int) {
							thing.delta.set([0, 0, 0]);
							console.log("Blocklist:\n" + JSON.stringify(blocklist));
							return true;
						}
					}
					blocklist.push(seg);

					rst_dydx = 1;
			}
		}
	}

	if (!(thing.flags & mobjflag_t.MF_MISSILE)) {
		for (var tm = 0; tm < he3d.game.map.things.length; tm++) {
			otherthing = he3d.game.map.things[tm];

			if (thing != otherthing && otherthing.sector == sector &&
				(otherthing.flags & (mobjflag_t.MF_SOLID))) {

				mdist = he3d.m.vec3.dist([x, 0, z],
							[otherthing.pos[0], 0, otherthing.pos[2]]);
				if (mdist <= (radius+otherthing.radius)) {
					return false;
				}
			}
		}
	}

	} //sector loop

	if (!rst_dydx && linefail)
		return false;

	return true;

};

//
// Flats -------------------------------------------------------------------------------------------
//
he3d.game.flats.draw = function() {
	if (!he3d.game.flats.show && !he3d.game.showlines)
		return;

	var time = Date.now();
	if (time - he3d.game.flats.ticker >= 200) {
		he3d.game.flats.ticker = time;
		if (++he3d.game.flats.a_frames[0] > 2)
			he3d.game.flats.a_frames[0] = 0;
		if (++he3d.game.flats.a_frames[1] > 3)
			he3d.game.flats.a_frames[1] = 0;
	}

	if (he3d.game.settings.dynamicLights) {
		he3d.r.changeProgram('flats_dl');

		for (var l = 0; l < he3d.game.dynamicLights.maxLights; l++){
			he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].position'],
				he3d.game.dynamicLights.lights[l].pos);
			he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].color'],
				he3d.game.dynamicLights.lights[l].color);
			he3d.gl.uniform1f(he3d.r.curProgram.uniforms['uLight['+l+'].size'],
				he3d.game.dynamicLights.lights[l].size);
		}

	} else {
		he3d.r.changeProgram('flats');
	}

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.flats.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 48, 0);
	if (he3d.game.settings.dynamicLights)
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal,
			3, he3d.gl.FLOAT, false, 48, 12);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexId,
		2, he3d.gl.FLOAT, false, 48, 24);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aFrames,
		1, he3d.gl.FLOAT, false, 48, 32);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aLight,
		1, he3d.gl.FLOAT, false, 48, 36);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aType,
		1, he3d.gl.FLOAT, false, 48, 40);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aSector,
		1, he3d.gl.FLOAT, false, 48, 44);

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.flats.vbo.texture].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);

	he3d.gl.uniform1fv(he3d.r.curProgram.uniforms.lighttimers, he3d.game.lights.timers);
	he3d.gl.uniform1fv(he3d.r.curProgram.uniforms.aniFrame, he3d.game.flats.a_frames);

	if (he3d.game.map.traceBSP)
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.hlSector, he3d.game.hlSector);
	else
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.hlSector, -1);

	if (he3d.game.settings.ssao) {
		he3d.gl.activeTexture(he3d.gl.TEXTURE1);
		he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.fx.ssao.texture_raw].texture);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture_ssao, 1);

		he3d.gl.uniform2fv(he3d.r.curProgram.uniforms.ssao_size, he3d.fx.ssao.size);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.ssao, 1);
	} else {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.ssao, 0);
	}

	// Position in World
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, false, he3d.r.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.flats.vbo.buf_indices);

	if (he3d.game.flats.show) {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.lines, 0);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,
			he3d.game.flats.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
	}

	if (he3d.game.showlines) {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.lines, 1);
		he3d.gl.drawElements(he3d.gl.POINTS,
			he3d.game.flats.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
	}
};

//
// Lights ------------------------------------------------------------------------------------------
//
he3d.game.lights.update = function() {
	var time = Date.now();
	// Blink Random
	if (time - he3d.game.lights.randomblink >= 25 && Math.random()) {
		if (he3d.game.lights.timers[1] == 1.0)
			he3d.game.lights.timers[1] = 0.0;
		else
			he3d.game.lights.timers[1] = 1.0;
		he3d.game.lights.randomblink = time;
	}

	// Blink 0.5
	if (time-he3d.game.lights.halfblink >= 500) {
		if (he3d.game.lights.timers[2] == 1.0)
			he3d.game.lights.timers[2] = 0.25;
		else
			he3d.game.lights.timers[2] = 1.0;
		he3d.game.lights.halfblink = time;
	}

	// Blink 1.0
	if (time-he3d.game.lights.blink >= 1000) {
		if (he3d.game.lights.timers[3] == 1.0)
			he3d.game.lights.timers[3] = 0.25;
		else
			he3d.game.lights.timers[3] = 1.0;
		he3d.game.lights.blink = time;
	}

	// Oscillating Light Timer
	if (he3d.game.lights.oscillatedir)
		he3d.game.lights.timers[4] += 0.0175;
	else
		he3d.game.lights.timers[4] -= 0.0175;
	if (he3d.game.lights.timers[4]>1.0||he3d.game.lights.timers[4]<0.25)
		he3d.game.lights.oscillatedir = !he3d.game.lights.oscillatedir;

};

//
// Sky ---------------------------------------------------------------------------------------------
//
he3d.game.sky.draw = function() {
	if (!he3d.game.sky.show)
		return;

	he3d.r.changeProgram('sky');

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.sky.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 48, 0);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal,
		3, he3d.gl.FLOAT, false, 48, 12);

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_CUBE_MAP, he3d.t.textures[he3d.game.sky.tex].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);

	// Inverse camera rotation
	he3d.m.mat4.identity(he3d.game.sky.mvMatrix);
	he3d.m.mat4.rotateX(he3d.game.sky.mvMatrix, he3d.m.degtorad(-he3d.game.player.angle[0]));
	he3d.m.mat4.rotateY(he3d.game.sky.mvMatrix, he3d.m.degtorad(-he3d.game.player.angle[1]));
	he3d.m.mat4.translate(he3d.game.sky.mvMatrix, he3d.game.sky.campos);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, false, he3d.game.sky.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.sky.vbo.buf_indices);
	he3d.gl.drawElements(he3d.gl.TRIANGLES, he3d.game.sky.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
};

//
// Walls -------------------------------------------------------------------------------------------
//
he3d.game.walls.draw = function() {
	if (!he3d.game.walls.show && !he3d.game.showlines)
		return;

	if (he3d.game.settings.dynamicLights) {
		he3d.r.changeProgram('walls_dl');

		for (var l = 0; l < he3d.game.dynamicLights.maxLights; l++){
			he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].position'],
				he3d.game.dynamicLights.lights[l].pos);
			he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].color'],
				he3d.game.dynamicLights.lights[l].color);
			he3d.gl.uniform1f(he3d.r.curProgram.uniforms['uLight['+l+'].size'],
				he3d.game.dynamicLights.lights[l].size);
		}

	} else {
		he3d.r.changeProgram('walls');
	}

	he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.walls.vbo.buf_data);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition,
		3, he3d.gl.FLOAT, false, 44, 0);
	if (he3d.game.settings.dynamicLights)
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal,
			3, he3d.gl.FLOAT, false, 44, 12);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord,
		2, he3d.gl.FLOAT, false, 44, 24);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aLight,
		1, he3d.gl.FLOAT, false, 44, 32);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aType,
		1, he3d.gl.FLOAT, false, 44, 36);
	he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aSector,
		1, he3d.gl.FLOAT, false, 44, 40);

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.walls.vbo.texture].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);

	he3d.gl.uniform1fv(he3d.r.curProgram.uniforms.lighttimers, he3d.game.lights.timers);

	if (he3d.game.map.traceBSP)
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.hlSector, he3d.game.hlSector);
	else
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.hlSector, -1);

	if (he3d.game.settings.ssao) {
		he3d.gl.activeTexture(he3d.gl.TEXTURE1);
		he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.fx.ssao.texture_raw].texture);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture_ssao, 1);

		he3d.gl.uniform2fv(he3d.r.curProgram.uniforms.ssao_size, he3d.fx.ssao.size);
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.ssao, 1);
	} else {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.ssao, 0);
	}

	// Position in World
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
	he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, false, he3d.r.mvMatrix);

	he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, he3d.game.walls.vbo.buf_indices);

	if (he3d.game.walls.show) {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.lines, 0);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,
			he3d.game.walls.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
	}

	if (he3d.game.showlines) {
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.lines, 1);
		he3d.gl.drawElements(he3d.gl.LINES,
			he3d.game.walls.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);
	}
};

//
// Wad File Loader ---------------------------------------------------------------------------------
//
he3d.game.map.load = function(newmap) {
	var file = newmap.filename;
	var fileType = file.split('.');

	he3d.log('NOTICE', 'Requesting Map File:', file);
	newmap.loaded = false;

	var wwml = new Worker("scripts/wadLoader.js");
	wwml.onmessage = he3d.game.map.progress;
	wwml.onerror = function(e) {
		he3d.log('FATAL', 'Map (' + newmap.filename + ') Loader Worker Error: ' +
			e.message + " (" + e.filename + ":" + e.lineno + ")");
	};
	wwml.map = newmap;
	wwml.postMessage({
		'debug':	parseInt(newmap.debug),
		'path':		newmap.path,
		'filename':	newmap.filename,
		'curmap':	newmap.curmap
	});
};

he3d.game.map.progress = function(e) {
	if (e.data.logmsg && e.data.loglabel && e.data.loglevel) {
		he3d.log(e.data.loglevel, e.data.loglabel, e.data.logmsg);
		return;
	} else if (e.data.logmsg && e.data.loglevel) {
		he3d.log(e.data.loglevel, e.data.logmsg);
		return;
	} else if (e.data.logmsg) {
		he3d.log(e.data.logmsg);
		return;
	} else if (e.data.titlescreen) {
		this.map.titlescreen.data = e.data.titlescreen.data;
		this.map.titlescreen.height = e.data.titlescreen.height;
		this.map.titlescreen.width = e.data.titlescreen.width;
		return;
	}

	this.map.atlas = e.data.atlas;
	this.map.audio = e.data.audio;
	this.map.bsplines = e.data.bsplines;
	this.map.bsplinesindices = e.data.bsplinesindices;
	this.map.data = e.data.mapdata;
	this.map.flatdata = e.data.flatdata;
	this.map.flatindices = e.data.flatindices;
	this.map.flatlas = e.data.flatlas;
	this.map.fpwatlas = e.data.fpwatlas;
	this.map.fpw = e.data.fpw;
	this.map.hud = e.data.hud;
	this.map.hudatlas = e.data.hudatlas;
	this.map.indices = e.data.indices;
	this.map.nodes = e.data.nodes;
	this.map.sectors = e.data.sectors;
	this.map.sky = e.data.sky;
	this.map.spawnPos = e.data.spawnPos;
	this.map.spawnDir = e.data.spawnDir;
	this.map.sprites = e.data.sprites;
	this.map.test = e.data.test;
	this.map.things = e.data.things;
	this.map.thingsatlas = e.data.thingsatlas;
	this.map.worldbb = e.data.worldbb;

	this.map.loaded = true;
};
