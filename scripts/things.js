//
// Things
//

he3d.game.things = {
	show:	true, 
	vbo:	{}
};

he3d.game.things.init = function() {
	he3d.game.things.vbo.texture = he3d.t.load({
		name: 	'thingsatlas', 
		type:	'raw', 
		format:	'rgba', 
		flip:	false, 
		filter:	{
			min: he3d.gl.NEAREST,
			mag: he3d.gl.NEAREST
		}, 
		image:	he3d.game.map.thingsatlas.data, 
		height:	he3d.game.map.thingsatlas.height, 
		width:	he3d.game.map.thingsatlas.width
	});

	// reset all things to spawn state
	var spdir = 0, thing, sector;
	for (var t = 0; t < he3d.game.map.things.length; t++) {
		thing = he3d.game.map.things[t];
		if (thing.spawnstate)
			thing.curstate = thing.spawnstate;

		thing.target = null;
		if (!thing.pos)
			thing.pos = he3d.m.vec3.create();
		thing.pos[0] = thing.x;
		thing.pos[1] = thing.y;
		thing.pos[2] = thing.z;
		if (!thing.delta)
			thing.delta = he3d.m.vec3.create();

		pangle = he3d.game.things.thing_to_thing_angle(-he3d.game.map.spawnPos[0], 
			-he3d.game.map.spawnPos[2], thing.pos[0], thing.pos[2], 0);
		pangle = (Math.round(pangle / 45) * 45);

		view_angle = 360 - pangle + thing.angle + 25;
		if (view_angle < 0)
			view_angle += 360;
		if (view_angle >= 360)
			view_angle -= 360;

		thing.dir = Math.floor(view_angle / 45) + 1;
		spdir = thing.dir;

		if (spdir > 5) {
			spdir = 5 + (-(spdir - 5));
			thing.flip = true;
		}

		if (thing.curstate != statenum_t.S_NULL)
			thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);

		if (thing.sprite) {
			thing.sector = he3d.game.map.findSector([thing.pos[0], thing.pos[1], thing.pos[2]]);
			sector = he3d.game.map.sectors[thing.sector];
			thing.pos[1] = sector.floor + (thing.sprite.height / 2);
			thing.lightlevel = sector.lightlevel / 255;
			thing.lighttype = getLightType(sector.type);
		}
		thing.dlid = null;
	}

	he3d.game.things.count = 0;
	he3d.game.things.mvMatrix = he3d.m.mat4.create();
	he3d.game.things.rotMatrix = he3d.m.mat4.create();
	he3d.game.things.ppos = he3d.m.vec3.create();
	he3d.game.things.rpos = he3d.m.vec3.create();
	he3d.game.things.tpos = he3d.m.vec3.create();	
	he3d.game.things.buildSprites();
};

//
// Draw Functions ----------------------------------------------------------------------------------
//
he3d.game.things.draw = function(zPass) {
	if (!he3d.game.things.show)
		return;

	if (!zPass) {
		if (he3d.game.settings.dynamicLights) {
			he3d.r.changeProgram('things_dl');

			for (var l = 0; l < he3d.game.dynamicLights.maxLights; l++){
				he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].position'],
					he3d.game.dynamicLights.lights[l].pos);
				he3d.gl.uniform3fv(he3d.r.curProgram.uniforms['uLight['+l+'].color'],
					he3d.game.dynamicLights.lights[l].color);
				he3d.gl.uniform1f(he3d.r.curProgram.uniforms['uLight['+l+'].size'],
					he3d.game.dynamicLights.lights[l].size);
			}
		} else {
			he3d.r.changeProgram('things');
		}
		he3d.game.things.count = 0;
	}

	he3d.gl.activeTexture(he3d.gl.TEXTURE0);
	he3d.gl.bindTexture(he3d.gl.TEXTURE_2D, he3d.t.textures[he3d.game.things.vbo.texture].texture);
	he3d.gl.uniform1i(he3d.r.curProgram.uniforms.texture, 0);

	he3d.m.vec3.set(he3d.game.player.thing.pos, he3d.game.things.ppos);
	he3d.game.things.ppos[1] = 0;

	var thing;	
	for (var t = 0; t < he3d.game.map.things.length; t++) {
		thing = he3d.game.map.things[t];
		if (!thing.sprite)
			continue;

		he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, thing.sprite.vbo.buf_data);

		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aPosition, 
			3, he3d.gl.FLOAT, false, 36, 0);
		he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aTexCoord, 
			3, he3d.gl.FLOAT, false, 36, 24);

		if (zPass || he3d.game.settings.dynamicLights) {
			he3d.gl.vertexAttribPointer(he3d.r.curProgram.attributes.aNormal, 
				3, he3d.gl.FLOAT, false, 36, 12);
		}

		he3d.m.mat4.set(he3d.r.mvMatrix, he3d.game.things.mvMatrix);
		he3d.m.mat4.translate(he3d.game.things.mvMatrix, thing.pos);

		he3d.m.vec3.set(thing.pos, he3d.game.things.tpos);
		he3d.game.things.tpos[1] = 0;
		he3d.m.vec3.subtract(he3d.game.things.ppos, he3d.game.things.tpos, he3d.game.things.rpos);
		he3d.m.mat4.lookAt([0,0,0], he3d.game.things.rpos, [0, -1, 0], he3d.game.things.rotMatrix);

		he3d.m.mat4.multiply(he3d.game.things.mvMatrix, he3d.game.things.rotMatrix);

		if (zPass || he3d.game.settings.dynamicLights) {
			he3d.m.mat4.toInverseMat3(he3d.game.things.rotMatrix,
				he3d.game.worldBuffer.nMatrix);
			he3d.m.mat3.transpose(he3d.game.worldBuffer.nMatrix);
			he3d.gl.uniformMatrix3fv(he3d.r.curProgram.uniforms.uNMatrix, false,
				he3d.game.worldBuffer.nMatrix);
		}

		if (!zPass) {
			he3d.gl.uniform1f(he3d.r.curProgram.uniforms.lightType, thing.lighttype);
			he3d.gl.uniform1f(he3d.r.curProgram.uniforms.lightLevel, 
				(thing.flash ? '1.0' : thing.lightlevel));
			he3d.gl.uniform1fv(he3d.r.curProgram.uniforms.lighttimers, he3d.game.lights.timers);
		}
		
		he3d.gl.uniform1i(he3d.r.curProgram.uniforms.uFlip, thing.flip);
		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uPMatrix, false, he3d.r.pMatrix);
		he3d.gl.uniformMatrix4fv(he3d.r.curProgram.uniforms.uMVMatrix, 
			false, he3d.game.things.mvMatrix);

		he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, thing.sprite.vbo.buf_indices);
		he3d.gl.drawElements(he3d.gl.TRIANGLES,
			thing.sprite.vbo.indices, he3d.gl.UNSIGNED_SHORT, 0);

		he3d.game.things.count++;
	}
};

//
// Spawn a projectile as a thing on the map --------------------------------------------------------
//

he3d.game.things.spawnMissile = function(thing, missile_type) {
	// we dont want to do this without a thing, its target and a missile
	if (!thing || !thing.target || !missile_type)
		return;

	var pthing = {
		angle:			0, 
		basething:		THINGS[missile_type], 
		curstate:		THINGS[missile_type].spawnstate, 
		damage: 		THINGS[missile_type].damage, 
		deathstate:		THINGS[missile_type].deathstate, 
		delta:			he3d.m.vec3.create(),
		dlid:			null,
		doomednum:		THINGS[missile_type].doomednum, 
		flags: 			THINGS[missile_type].flags, 
		flash:			true, 
		health:			THINGS[missile_type].spawnhealth, 
		height: 		THINGS[missile_type].height, 
		lightlevel:		1, 
		lighttype:		0.0, 
		mass: 			THINGS[missile_type].mass, 
		missile:		true, 
		pos:			he3d.m.vec3.create(), 
		radius: 		THINGS[missile_type].radius, 
		reactiontime:	THINGS[missile_type].reactiontime, 
		seesound: 		THINGS[missile_type].seesound, 
		sector:			-1, 
		spawner:		thing, 
		spawnhealth:	THINGS[missile_type].spawnhealth, 
		spawnlocation:	he3d.m.vec3.create(), 
		spawnstate:		THINGS[missile_type].spawnstate, 
		speed: 			THINGS[missile_type].speed, 
		sprite:			null, 
		tic:			0, 
		type:			missile_type, 
		x:				0, 
		xdeathstate:	THINGS[missile_type].xdeathstate, 
		y:				0, 
		z:				0
	}

	//	Position of spawner
	pthing.pos[0] = thing.pos[0];
	pthing.pos[1] = thing.pos[1];
	pthing.pos[2] = thing.pos[2];

	// Generate delta
	he3d.m.vec3.direction(
		[thing.pos[0], thing.pos[1] + (thing.height / 2), thing.pos[2]], 
		[thing.target.pos[0], thing.target.pos[1] + (thing.target.height), thing.target.pos[2]], 
		pthing.delta);

	// Angle reletive to x/z that missile will travel in for angle to player vis
	pthing.angle = he3d.game.things.thing_to_thing_angle(
		thing.pos[0], thing.pos[2], thing.target.pos[0], thing.target.pos[2], 0);

	pthing.delta[0] = pthing.delta[0] * pthing.basething.speed * ANIM_FPS;
	pthing.delta[1] = pthing.delta[1] * pthing.basething.speed * ANIM_FPS;
	pthing.delta[2] = pthing.delta[2] * pthing.basething.speed * ANIM_FPS;

	// Move missile forward so that it appears infront of the spawner rather than inside it
	pthing.pos[0] -= (Math.round(pthing.delta[0]) > 0 ? pthing.radius / 2 + thing.radius / 2 : 0);
	pthing.pos[2] -= (Math.round(pthing.delta[2]) > 0 ? pthing.radius / 2 + thing.radius / 2 : 0);

	pthing.sector = he3d.game.map.findSector(pthing.pos);

	// Dynamic Light
	pthing.dlid = he3d.game.dynamicLights.add(
		pthing.pos[0], pthing.pos[1], pthing.pos[2],
		1.0, 0.5, 0.1,	// color
		500				// size
	);

	// Apply the sprite image to the new missile
	pthing.sprite = he3d.game.things.getSpriteName(pthing.spawnstate, 0);

	// Store the new missile in the things array
	he3d.game.map.things.push(pthing);
}


//
//	Spawn a new thing into the current level
//

he3d.game.things.spawnThing = function(thing, type) {
	if (!thing&&!type)
		return;

	var pthing = {
		angle:			0, 
		basething:		THINGS[type], 
		curstate:		THINGS[type].spawnstate, 
		damage: 		THINGS[type].damage, 
		deathstate:		THINGS[type].deathstate, 
		delta:			he3d.m.vec3.create(),
		dlid:			null,
		doomednum:		THINGS[type].doomednum, 
		flags: 			THINGS[type].flags, 
		flash:			true, 
		health:			THINGS[type].spawnhealth, 
		height: 		THINGS[type].height, 
		lightlevel:		1, 
		lighttype:		0.0, 
		mass: 			THINGS[type].mass, 
		pos:			he3d.m.vec3.create(), 
		radius: 		THINGS[type].radius, 
		reactiontime:	THINGS[type].reactiontime, 
		seesound: 		THINGS[type].seesound, 
		sector:			-1, 
		spawner:		thing, 
		spawnhealth:	THINGS[type].spawnhealth, 
		spawnlocation:	he3d.m.vec3.create(), 
		spawnstate:		THINGS[type].spawnstate, 
		speed: 			THINGS[type].speed, 
		sprite:			null, 
		tic:			0, 
		type:			type, 
		x:				0, 
		xdeathstate:	THINGS[type].xdeathstate, 
		y:				0, 
		z:				0
	}

	//	Position of spawner
	pthing.pos[0] = thing.pos[0];
	pthing.pos[1] = thing.pos[1];
	pthing.pos[2] = thing.pos[2];

	// Apply the sprite image to the new thing
	pthing.sprite = he3d.game.things.getSpriteName(pthing.spawnstate, 0);

	// Set the sector and height (requires a sprite for position offset)
	pthing.sector = he3d.game.map.findSector(pthing.pos);
	pthing.pos[1] = sector.floor + (thing.sprite.height / 2);

	// Store the new thing in the things array
	he3d.game.map.things.push(pthing);
}

//
// Update Functions --------------------------------------------------------------------------------
//

he3d.game.things.thing_to_thing_angle = function(x1, y1, x2, y2, direction) {
	var angle = Math.atan2(y2 - y1, x2 - x1);
	if (angle<0)
		angle += 2 * Math.PI;
	angle *= (180 / Math.PI);

	if (angle < 0)
		angle += 360;

	if (angle >= 180 && direction) {
		angle -= 180;
	} else if (direction) {
		angle += 180;
	}

	return Math.round(angle);
};

he3d.game.things.damageThing = function(target, source, attacker, damage) {
	if (!(target.flags & mobjflag_t.MF_SHOOTABLE))
		return;

	if (target.health <= 0)
		return;

	var ang, impulse;

	if (target.flags & mobjflag_t.MF_SKULLFLY) {
		target.delta[0] = 0;
		target.delta[1] = 0;
		target.delta[2] = 0;
	}

	if (source && !(target.flags & mobjflag_t.MF_NOCLIP) &&
		(!attacker || !attacker.player || attacker.player.weapons.weapon_sel == 0)) {

		ang = this.thing_to_thing_angle(source.x, source.y, target.x, target.y, 0);

		impulse = (damage * 300) / target.mass;

		var delta = he3d.m.vec3.create();
		he3d.m.vec3.direction(source.pos, target.pos, delta);
		delta[1] = 0;

		// make thing fall forwards sometimes
		if (damage < 40	&& damage > target.health &&
			target.pos[3] - source.pos[3] > 64 * 65535 && (he3d.game.random() & 1)){

			delta[0] *= -1;
			delta[2] *= -1;
			impulse  *=  .5;
		}

		var newpos = [
			target.pos[0] - (delta[0] * impulse), 
			target.pos[1] - (delta[1] * impulse), 
			target.pos[2] - (delta[2] * impulse)
		];

		if (he3d.game.map.checkMoveLocation(target, Math.round(newpos[0]), Math.round(newpos[2]))) {
			target.pos[0] = newpos[0];
			target.pos[1] = newpos[1];
			target.pos[2] = newpos[2];
		}
	}

	if (target.player) {
		if (target.player.armor > 0) {
			var saved = 0;
			if (target.player.armortype&&target.player.armortype == 1)
				saved = Math.round(damage / 3);
			else
				saved = Math.round(damage / 2);

			if (target.player.armor <= saved) {
				saved -= target.player.armor;
				target.player.armor = 0;
				target.player.armortype = 0;
			} else {
				target.player.armor -= saved;
			}
			damage -= saved;
		}
		target.player.health -= damage;
		if (target.player.health <= 0)
			target.player.health = 0;

		target.player.attacker = attacker;
	}

	target.health -= damage;
	
	if (target.health <= 0 && !target.player) {
		target.health = 0;
		he3d.game.things.killThing(attacker, target)
		//kill item
		return
	} else if (!target.player) {
		if (target.painstate && target.painstate != target.curstate) {

			target.curstate = target.painstate;

			target.tic -= he3d.game.random()&3;
			if (target.tic < 1)
				target.tic = 1;
			
			//target.tic = 0;

			spdir = target.dir;

			if (spdir > 5) {
				spdir = 5 + (-(spdir - 5));
				target.flip = true;
			}

			target.sprite = he3d.game.things.getSpriteName(target.painstate, spdir);

			if (target.sprite && !(target.flags & mobjflag_t.MF_NOGRAVITY))
				target.pos[1] = target.sector.floor + (target.sprite.height / 2);
		}
	}
}
			
he3d.game.things.killThing = function(killer, target) {
	if ((target.flags & mobjflag_t.MF_CORPSE))
		return;

	target.flags &= ~(mobjflag_t.MF_SHOOTABLE);

	if (target.type != mobjtype_t.MT_SKULL)
		target.flags &= ~mobjflag_t.MF_NOGRAVITY;

	if (!(target.flags & mobjflag_t.MF_CORPSE))
		target.flags += mobjflag_t.MF_CORPSE;

	if (!(target.flags & mobjflag_t.MF_DROPOFF))
		target.flags += mobjflag_t.MF_DROPOFF;

	if (target.flags & mobjflag_t.MF_SOLID)
		target.flags -= mobjflag_t.MF_SOLID;

	if (target.flags & mobjflag_t.MF_COUNTKILL && killer && killer.player)
		killer.player.killcount++;

	if (target.health < -target.spawnhealth	&& target.xdeathstate)
		target.curstate = target.xdeathstate;
	else
		target.curstate = target.deathstate;

	target.tic -= he3d.game.random() & 3;
	if (target.tic <1)
		target.tic = 1;

	target.sprite = this.getSpriteName(target.curstate, 0);
	sector = he3d.game.map.sectors[target.sector];
	if (!(target.flags & mobjflag_t.MF_NOGRAVITY) && target.sprite)
		target.pos[1] = sector.floor+(target.sprite.height / 2);	

	if (!target.player) {
		var item;

		switch (target.doomednum) {
			// drop Ammo
			case 84: //mobjtype_t.MT_WOLFSS:
			case 1:	//mobjtype_t.MT_POSSESSED:
				item = mobjtype_t.MT_CLIP;
				break;
			
			// drop Shotgun
			case 9:	//mobjtype_t.MT_SHOTGUY:
				item = mobjtype_t.MT_SHOTGUN;
				break;

			// drop chaingun
			case 65: //mobjtype_t.MT_CHAINGUY:
				item = mobjtype_t.MT_CHAINGUN;
				break;

			// No drop
			default:
				break;
		}

		if (item)
			he3d.game.things.spawnThing(target, item);
	}
	return;
}

he3d.game.things.checkThing = function(thing, otherthing) {
	
	// thing cannot effect itself
	if (thing == otherthing)
		return true;
	
	// thing cant be hit
	if (!(thing.flags &	(mobjflag_t.MF_SOLID|mobjflag_t.MF_SPECIAL | mobjflag_t.MF_SHOOTABLE)))
		return true;
	
	// spectate level
	if (thing.player && thing.player.spectator)
		return true;
	// spectate level
	if (otherthing.player && otherthing.player.spectator)
		return true;
		
	//minimum distance between things being checked
	blockdist = thing.radius + otherthing.radius;
	
	//actual distance between things being checked
	mdist = he3d.m.vec3.dist([thing.pos[0], 0, thing.pos[2]], 
		[otherthing.pos[0], 0, otherthing.pos[2]]);

	// things too far apart
	if (blockdist < mdist)
		return true;
	
    // missiles can hit other things
	if (otherthing.flags & mobjflag_t.MF_MISSILE) {
		// see if it went over / under
		if (otherthing.pos[1] > thing.pos[1] + thing.height)
			return true; // overhead
		if (otherthing.pos[1] + otherthing.height < thing.pos[1])
			return true; // underneath

		if (thing.basething == otherthing.basething)
			return true;

		if (!(thing.flags & mobjflag_t.MF_SHOOTABLE))
			return !(thing.flags & mobjflag_t.MF_SOLID); // didn't do any damage

		// damage / explode
		if (otherthing.damage) {
			damage = ((he3d.game.random() % 8) + 1) * otherthing.damage;
			this.damageThing(thing, otherthing, otherthing, damage);
		}

		// don't traverse any more
		return false;
	}

	// check for special pickup
	if (thing.flags & mobjflag_t.MF_SPECIAL)
	{
		solid = thing.flags & mobjflag_t.MF_SOLID;
		if (otherthing.flags & mobjflag_t.MF_PICKUP) {
			// can remove thing
			//P_TouchSpecialThing (thing, otherthing);
		}
		return !solid;
	}

	return !(thing.flags & mobjflag_t.MF_SOLID);
	
};

he3d.game.things.update = function() {
	var thing, 
		hit = 0, 
		dist = 0, 
		spdir = 0, 
		mdist = 0;
		mod_y = new Array(9), 
		killthing = false;

	he3d.game.hud.tmp = [];
	he3d.game.player.col.count = 0;

	// Work backwards through thing stack so we can splice out dead entries
	for (var t = he3d.game.map.things.length -1 ; t > -1 ; t--) {
		thing = he3d.game.map.things[t];

		if ((thing.curstate == statenum_t.S_NULL || !state_t[thing.curstate]) &&
			!(thing.flags & mobjflag_t.MF_MISSILE) && !thing.player)
			continue;

		// Remove expired missles
		if ((thing.flags & mobjflag_t.MF_MISSILE) &&
			(thing.curstate == statenum_t.S_NULL || he3d.m.vec3.length(thing.delta) == 0)) {

			if (thing.dlid !== null){
				he3d.game.dynamicLights.clear(thing.dlid);
				thing.dlid = null;
			}
			he3d.game.map.things.splice(t, 1);
			continue;
		}

		// Dont target things that cant be hit
		if (thing.target && !thing.target.flags & mobjflag_t.MF_SOLID)
			thing.target = null;
		if (thing.sector)
			sector = he3d.game.map.sectors[thing.sector];

		//
		// Projectiles -----------------------------------------
		//
		
		// Non player thing in motion
		// Check for valid move locations, collision damage and
		// Splash damage
		if (!thing.player && thing.health > 0) {
			if (he3d.m.vec3.length(thing.delta)) {
				var newpos = [
					thing.pos[0] - (thing.delta[0] * he3d.timer.delta), 
					thing.pos[1] - (thing.delta[1] * he3d.timer.delta), 
					thing.pos[2] - (thing.delta[2] * he3d.timer.delta)
				];

				//	Hit surface, Try for Splash Damage?
				// Need to actually add this - Matt
				if (!he3d.game.map.checkMoveLocation(thing,
					Math.round(newpos[0]), Math.round(newpos[2])) || 
					(newpos[1] - thing.radius) < sector.floor) {

					thing.delta.set([0, 0, 0]);
					this.killThing(null, thing);

					for (var tm = 0; tm < he3d.game.map.things.length; tm++) {
						if (tm != t && 
							!(he3d.game.map.things[tm].flags & mobjflag_t.MF_MISSILE) &&
							he3d.game.map.things[tm] != thing.spawner &&
							he3d.game.map.things[tm].flags & mobjflag_t.MF_SOLID) {
									
							tm_thing = he3d.game.map.things[tm];

							mdist = he3d.m.vec3.dist([thing.pos[0], 0, thing.pos[2]], 
								[tm_thing.pos[0], 0, tm_thing.pos[2]]);
							if (mdist < (thing.radius + tm_thing.radius)) {

								thing.delta = null;
								this.killThing(null, thing);

//								he3d.game.things.checkThing(tm_thing, thing);
								this.damageThing(tm_thing, thing, thing.spawner, thing.damage);

								if (tm_thing.doomednum != thing.spawner.doomednum)
									tm_thing.target = thing.spawner;
							}
						}
					}
				} else{
					thing.pos[0] = newpos[0];
					thing.pos[1] = newpos[1];
					thing.pos[2] = newpos[2];

					thing.sector = he3d.game.map.findSector(newpos);
					sector = he3d.game.map.sectors[thing.sector];

					if (!(thing.flags & mobjflag_t.MF_NOGRAVITY))
						thing.pos[1] = sector.floor + (thing.sprite.height / 2);

					// Update Dynamic Light
					if (thing.dlid !== null) {
						he3d.game.dynamicLights.lights[thing.dlid].pos[0] = thing.pos[0];
						he3d.game.dynamicLights.lights[thing.dlid].pos[1] = thing.pos[1];
						he3d.game.dynamicLights.lights[thing.dlid].pos[2] = thing.pos[2];
					}

					for (var tm = 0; tm < he3d.game.map.things.length; tm++) {
						if (tm != t &&
							!(he3d.game.map.things[tm].flags & mobjflag_t.MF_MISSILE) &&
							he3d.game.map.things[tm] != thing.spawner &&
							he3d.game.map.things[tm].flags & mobjflag_t.MF_SOLID) {
									
							tm_thing = he3d.game.map.things[tm];
								
							mdist = he3d.m.vec3.dist([newpos[0], 0, newpos[2]], 
								[tm_thing.pos[0], 0, tm_thing.pos[2]]);
							if (mdist < (thing.radius + tm_thing.radius)) {

								// killing it here is a doesnt work correctly
								// I dont know why (yet) :(
								this.killThing(null, thing);

								if (thing.dlid !== null){
									he3d.game.dynamicLights.clear(thing.dlid);
									thing.dlid = null;
								}
			
								thing.curstate = thing.deathstate;
								thing.tic = 0;
								thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
								
								if (!(thing.flags & mobjflag_t.MF_NOGRAVITY))
									thing.pos[1] = sector.floor + (thing.sprite.height / 2);
								
								thing.delta[0] = 0;
								thing.delta[1] = 0;
								thing.delta[2] = 0;								

								he3d.game.things.damageThing(tm_thing, thing, 
									thing.spawner, thing.damage);

								if (tm_thing.doomednum != thing.spawner.doomednum)
									tm_thing.target = thing.spawner;
							}
						}
					}
				}
			}
		//
		// Player Pickups --------------------------------------
		//
		} else if (thing.player) {
			for (var tm = 0; tm < he3d.game.map.things.length; tm++) {
				if (tm != t && !(he3d.game.map.things[tm].flags & mobjflag_t.MF_MISSILE) &&
					he3d.game.map.things[tm] != thing.spawner) {

					tm_thing = he3d.game.map.things[tm];

					mdist = he3d.m.vec3.dist([thing.pos[0], 0, thing.pos[2]], 
						[tm_thing.pos[0], 0, tm_thing.pos[2]]);
	
					killthing = true;
					if (mdist < (thing.radius + tm_thing.radius)) {
						switch(state_t[tm_thing.curstate].sprite) {
							case spritenum_t.SPR_ARM1:	//got ARMOR
								thing.player.armor += 10;
								if (thing.player.armor > 200)
									thing.player.armor = 200;
								break;
							case spritenum_t.SPR_ARM2:	// got MEGA
								thing.player.armor += 10;
								if (thing.player.armor > 200)
									thing.player.armor = 200;
								break;
							case spritenum_t.SPR_BON1:	// got health bottle
								if (thing.player.health < 200)
									thing.player.health++;
								break;
							case spritenum_t.SPR_BON2:	// got armour shard
								if (thing.player.armor < 200)
									thing.player.armor++;
								break;
							case spritenum_t.SPR_SOUL:	// got super
								thing.player.health += 100;
								if (thing.player.health > 200)
									thing.player.health = 200;
								break;
							case spritenum_t.SPR_MEGA:
								thing.player.health = 200;
								thing.player.armor = 200;
								break;
							case spritenum_t.SPR_BKEY:
								thing.player.keys.blue = true;
								break;
							case spritenum_t.SPR_YKEY:
								thing.player.keys.yellow = true;
								break;
							case spritenum_t.SPR_RKEY:
								thing.player.keys.red = true;
								break;
							case spritenum_t.SPR_BSKU:
								thing.player.keys.sblue = true;
								break;
							case spritenum_t.SPR_YSKU:
								thing.player.keys.syellow = true;
								break;
							case spritenum_t.SPR_RSKU:
								thing.player.keys.sred = true;
								break;
							case spritenum_t.SPR_STIM:
								thing.player.health += 10;
								if (thing.player.health > 200)
									thing.player.health = 200;
								break;
							case spritenum_t.SPR_MEDI:
								thing.player.health += 25;
								if (thing.player.health > 200)
									thing.player.health = 200;
								break;
							case spritenum_t.SPR_PINV:
							case spritenum_t.SPR_PSTR:
							case spritenum_t.SPR_PINS:
							case spritenum_t.SPR_SUIT:
							case spritenum_t.SPR_PMAP:
							case spritenum_t.SPR_PVIS:
								break;
							case spritenum_t.SPR_CLIP:
								thing.player.ammo.bullets.cur += 1;
								if (thing.player.ammo.bullets.cur > thing.player.ammo.bullets.max)
									thing.player.ammo.bullets.cur = thing.player.ammo.bullets.max;
								break;
							case spritenum_t.SPR_AMMO:
								thing.player.ammo.bullets.cur += 5;
								if (thing.player.ammo.bullets.cur > thing.player.ammo.bullets.max)
									thing.player.ammo.bullets.cur = thing.player.ammo.bullets.max;
								break;
							case spritenum_t.SPR_ROCK:
								thing.player.ammo.rockets.cur += 1;
								if (thing.player.ammo.rockets.cur > thing.player.ammo.rockets.max)
									thing.player.ammo.rockets.cur = thing.player.ammo.rockets.max;
								break;
							case spritenum_t.SPR_BROK:
								thing.player.ammo.rockets.cur += 5;
								if (thing.player.ammo.rockets.cur > thing.player.ammo.rockets.max)
									thing.player.ammo.rockets.cur = thing.player.ammo.rockets.max;
								break;
							case spritenum_t.SPR_CELL:
								thing.player.ammo.cell.cur += 1;
								if (thing.player.ammo.cell.cur > thing.player.ammo.cell.max)
									thing.player.ammo.cell.cur = thing.player.ammo.cell.max;
								break;
							case spritenum_t.SPR_CELP:
								thing.player.ammo.cell.cur += 5;
								if (thing.player.ammo.cell.cur > thing.player.ammo.cell.max)
									thing.player.ammo.cell.cur = thing.player.ammo.cell.max;
								break;
							case spritenum_t.SPR_SHEL:
								thing.player.ammo.shells.cur += 1;
								if (thing.player.ammo.shells.cur > thing.player.ammo.shells.max)
									thing.player.ammo.shells.cur = thing.player.ammo.shells.max;
								break;
							case spritenum_t.SPR_SBOX:
								thing.player.ammo.shells.cur += 5;
								if (thing.player.ammo.shells.cur > thing.player.ammo.shells.max)
									thing.player.ammo.shells.cur = thing.player.ammo.shells.max;
								break;
							case spritenum_t.SPR_BPAK:	// increase max ammo and give full ammo
								break;
							case spritenum_t.SPR_BFUG:
								thing.player.weapons.bfg9000 = true;
								break;
							case spritenum_t.SPR_MGUN:
								thing.player.weapons.chaingun = true;
								break;
							case spritenum_t.SPR_CSAW:
								thing.player.weapons.chainsaw = true;
								break;
							case spritenum_t.SPR_LAUN:
								thing.player.weapons.rocket = true;
								break;
							case spritenum_t.SPR_PLAS:
								thing.player.weapons.plasma = true;
								break;
							case spritenum_t.SPR_SHOT:
								thing.player.weapons.shotgun = true;
								break;
							case spritenum_t.SPR_SGUN:
								thing.player.weapons.sshotgun = true;
								break;
							default:
								killthing = false;
								break;
						}
						if (tm_thing.flags & mobjflag_t.MF_COUNTITEM)
								thing.player.itemcount++;

						// If player interacted with thing kill it
						if (killthing) {
							this.killThing(thing, tm_thing);
						}
					}
				}
			}
		}

		if (!thing.player) {
			pangle = he3d.game.things.thing_to_thing_angle(-he3d.game.player.pos[0], 
				-he3d.game.player.pos[2], thing.pos[0], thing.pos[2], 0);
			pangle = (Math.round(pangle / 45) * 45);
		} else{
			pangle = 0;
		}

		// Angle to Direction
		if (!thing.target) {
			view_angle = thing.angle;
			view_angle = 360 - pangle + view_angle + 25;
			if (view_angle < 0)
				view_angle += 360;
			if (view_angle >= 360)
				view_angle -= 360;
		} else if (thing.target.player) {
			view_angle = 0;
		} else{
			view_angle = he3d.game.things.thing_to_thing_angle(thing.pos[0], thing.pos[2], 
				thing.target.pos[0], thing.target.pos[2], 0);
			view_angle = 180 - pangle + view_angle + 25;
			if (view_angle<0)
				view_angle += 360;
			if (view_angle >= 360)
				view_angle -= 360;
		}

		// Angle to Direction
		thing.dir = Math.floor(view_angle / 45) + 1;
		thing.flip = false;

		// Mirrored angle, (╯°□°）╯︵ ┻━┻
		spdir = thing.dir;
		if (spdir > 5) {
			spdir = 5 + (-(spdir - 5));
			thing.flip = true;
		}

		// Move to next state
		if (state_t[thing.curstate].tics > 0 &&
			(thing.tic += ANIM_FPS * he3d.timer.delta) >= state_t[thing.curstate].tics) {
			thing.curstate = state_t[thing.curstate].nextstate;
			thing.tic = 0;
			thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
			if (thing.sprite && !(thing.flags & mobjflag_t.MF_NOGRAVITY))
				thing.pos[1] = sector.floor + (thing.sprite.height / 2);
		}

		// Get spritename
		if (!thing.sprite) {
			thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
			if (thing.sprite && !(thing.flags & mobjflag_t.MF_NOGRAVITY))
				thing.pos[1] = sector.floor+(thing.sprite.height / 2);
		}

		if (thing.sprite) {
			dist = he3d.m.vec3.dist(he3d.game.player.thing.pos, thing.pos);
			if (thing.target)
				tdist = he3d.m.vec3.dist(thing.target.pos, thing.pos)
			thing.flash = false;
			// States
			switch(state_t[thing.curstate].action) {
				// AWAKE
				case "A_Chase":
					if (thing.missilestate && state_t[thing.seestate].frame == 0) {
						if (Math.floor((Math.random() * 100) + 1) <= 5 && dist < 800 ) {
							thing.curstate = thing.missilestate;
							thing.tic = 0;
						}
					}

					if (thing.target) {
						thing.angle = he3d.game.things.thing_to_thing_angle(thing.pos[0], 
							thing.pos[2], thing.target.pos[0], thing.target.pos[2], 0);
					}

					// Angle to Direction
					if (!thing.target) {
							view_angle = thing.angle;
						view_angle = 360 - pangle+view_angle + 25;
						if (view_angle<0)
							view_angle += 360;
						if (view_angle >= 360)
							view_angle -= 360;
					} else if (thing.target.player) {
						view_angle = 0;
					} else{
						view_angle = he3d.game.things.thing_to_thing_angle(thing.pos[0],
							thing.pos[2], thing.target.pos[0], thing.target.pos[2], 0);

						view_angle = 180 - pangle + view_angle + 25;
						if (view_angle < 0)
							view_angle += 360;
						if (view_angle >= 360)
							view_angle -= 360;
					}

					thing.dir = Math.floor(view_angle / 45) + 1;
					// Mirrored angle, (╯°□°）╯︵ ┻━┻
					spdir = thing.dir;
					if (spdir > 5) {
						spdir = 5 + (-(spdir - 5));
						thing.flip = true;
					}

					thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
					thing.pos[1] = sector.floor+(thing.sprite.height / 2);
					break;
				case "A_Look":
					if (dist < 300 && thing.seestate != statenum_t.S_NULL &&
						state_t[thing.seestate] && !thing.target) {
						thing.target = he3d.game.player.thing;
						thing.curstate = thing.seestate;
						thing.tic = 0;
						thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
						thing.pos[1] = sector.floor + (thing.sprite.height / 2);
					} else if (thing.target) {
						thing.curstate = thing.seestate;
						view_angle = he3d.game.things.thing_to_thing_angle(thing.pos[0],
							thing.pos[2], thing.target.pos[0], thing.target.pos[2], 0);
						thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
						if (!(thing.flags & mobjflag_t.MF_NOGRAVITY))
							thing.pos[1] = sector.floor + (thing.sprite.height / 2);
						thing.tic = 0;
					} else if (!thing.target) {
						thing.sprite = he3d.game.things.getSpriteName(thing.curstate, spdir);
						if (!(thing.flags & mobjflag_t.MF_NOGRAVITY))
							thing.pos[1] = sector.floor + (thing.sprite.height / 2);
					}
					break;
				case "A_BruisAttack":	//Check range and switch between melee or missile
					//If melee do damage (P_Random()%8+1)*10 to target
					if (thing.tic == 0) {
						if (tdist <= 64)
							this.damageThing(thing.target, thing, thing, (he3d.game.random() % 8 + 1) * 10);
						else
							this.spawnMissile(thing, mobjtype_t.MT_BRUISERSHOT);
					}
				case "A_TroopAttack":	//Check range and switch between melee or missile
					//If melee do damage (P_Random()%8+1)*3 to target
					//he3d.game.things.damageThing(thing.target, thing, thing, he3d.game.(random()%8+1)*3)
					
					if (thing.tic == 0) {
						if (tdist <= 64)
							this.damageThing(thing.target, thing, thing, (he3d.game.random() % 8 + 1) * 3);
						else
							this.spawnMissile(thing, mobjtype_t.MT_TROOPSHOT);
					}
					break;
				case "A_HeadAttack":	//Check range and switch between melee or missile
					//If melee do damage (P_Random()%6+1)*10 to target
					//this.damageThing(thing.target, thing, thing, he3d.game.(random()%6+1)*10)
					
					if (thing.tic == 0) {
						if (tdist <= 64)
							this.damageThing(thing.target, thing, thing, (he3d.game.random() % 6 + 1) * 10);
						else
							this.spawnMissile(thing, mobjtype_t.MT_HEADSHOT);
					}
					break;
				case "A_CyberAttack":
					if (thing.tic == 0) {
						this.spawnMissile(thing, mobjtype_t.MT_ROCKET);
					}
					break;
				case "A_SkelMissile":
					if (thing.tic == 0) {
						this.spawnMissile(thing, mobjtype_t.MT_TRACER);
					}
					break;
				case "A_SkelFist":	//Check range for melee
					// damage (P_Random()%10+1)*6
					//this.damageThing(thing.target, thing, thing, he3d.game.(random()%10+1)*6)
					if (thing.tic == 0) {
						if (tdist <= 64)
							this.damageThing(thing.target, thing, thing, (he3d.game.random() % 10 + 1) * 6);	
					}				
					break;
				case "A_CPosAttack":
				case "A_SargAttack":	//Check range for melee				
					// damage (P_Random()%10+1)*4
					//this.damageThing(thing.target, thing, thing, he3d.game.(random()%10+1)*4)
					if (thing.tic == 0) {
						if (tdist <= 64)
							this.damageThing(thing.target, thing, thing, (he3d.game.random()%10+1)*4);	
					}
				case "A_SPosAttack":
				case "A_PosAttack":
					thing.flash = true;
					break;

			}

			// Collision lines
			dist = he3d.m.vec3.dist(he3d.game.player.thing.pos, thing.pos);
			if (he3d.game.player.col.show && dist < 500) {
				he3d.game.hud.tmp.push(t + " [" + thing.sprite.name + "] State: " +
					state_t[thing.curstate].action + " dist: " + dist.toFixed(2) + " ang: " +
					thing.angle.toFixed(2) + " dir: " + thing.dir + " xyz: " + thing.pos[0].toFixed(2) +
					":" + thing.pos[1].toFixed(2) + ":" + thing.pos[2].toFixed(2));
				
				he3d.game.player.col.lines[he3d.game.player.col.count++] = he3d.game.player.thing.pos[0];
				he3d.game.player.col.lines[he3d.game.player.col.count++] = he3d.game.player.thing.pos[1] + 8;
				he3d.game.player.col.lines[he3d.game.player.col.count++] = he3d.game.player.thing.pos[2];
				he3d.game.player.col.lines[he3d.game.player.col.count++] = thing.pos[0]
				he3d.game.player.col.lines[he3d.game.player.col.count++] = thing.pos[1];
				he3d.game.player.col.lines[he3d.game.player.col.count++] = thing.pos[2];
			}
		}
	}
};

//
// Sprite Functions --------------------------------------------------------------------------------
//
he3d.game.things.buildSprites = function() {
	var aname, verts, texcoords, normals, data, vbo, w, h, 
		indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
	for (var s in he3d.game.map.sprites) {
		if (!he3d.game.map.sprites)
			continue;

			h = he3d.game.map.sprites[s].height / 2;
			w = he3d.game.map.sprites[s].width / 2;
			verts = new Float32Array([
				-w, -h, 0, 
				-w,  h, 0, 
				 w,  h, 0,
				 w, -h, 0 
			]);
			texcoords = new Float32Array([
				he3d.game.map.sprites[s].uv[1], he3d.game.map.sprites[s].uv[0], 
				he3d.game.map.sprites[s].uv[3], // Flip Horiz

				he3d.game.map.sprites[s].uv[1], he3d.game.map.sprites[s].uv[2], 
				he3d.game.map.sprites[s].uv[3], // Flip Horiz

				he3d.game.map.sprites[s].uv[3], he3d.game.map.sprites[s].uv[2], 
				he3d.game.map.sprites[s].uv[1], // Flip Horiz

				he3d.game.map.sprites[s].uv[3], he3d.game.map.sprites[s].uv[0], 
				he3d.game.map.sprites[s].uv[1]	// Flip Horiz
			]);
			normals = new Float32Array([
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1
			]);

			data = he3d.tools.interleaveFloat32Arrays([3, 3, 3], [verts, normals, texcoords]);
			he3d.game.map.sprites[s].vbo = {};
			he3d.game.map.sprites[s].vbo.buf_data = he3d.gl.createBuffer();
			he3d.gl.bindBuffer(he3d.gl.ARRAY_BUFFER, he3d.game.map.sprites[s].vbo.buf_data);
			he3d.gl.bufferData(he3d.gl.ARRAY_BUFFER, data, he3d.gl.STATIC_DRAW);

			he3d.game.map.sprites[s].vbo.buf_indices = he3d.gl.createBuffer();
			he3d.game.map.sprites[s].vbo.indices = indices.length;
			he3d.gl.bindBuffer(he3d.gl.ELEMENT_ARRAY_BUFFER, 
				he3d.game.map.sprites[s].vbo.buf_indices);
			he3d.gl.bufferData(he3d.gl.ELEMENT_ARRAY_BUFFER, indices, he3d.gl.STATIC_DRAW);
	}
};

he3d.game.things.getSpriteName = function(state, angle) {
	if (state == 0)
		return null;
		
	short_spr = he3d.game.map.test.spritecache[state_t[state].sprite].spritematch;
	statename = (String.fromCharCode(65 + (state_t[state].frame & FF_FRAMEMASK)));
	if (short_spr) {
		if (short_spr[statename+angle])
			return he3d.game.map.sprites[short_spr[statename + angle].snum] 
		
		if (short_spr[statename+"0"])
			return he3d.game.map.sprites[short_spr[statename+"0"].snum] 
	}
	return null;
};
