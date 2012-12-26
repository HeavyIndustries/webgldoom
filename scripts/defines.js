//
// Doom Data Defines -------------------------------------------------------------------------------
//

//
// Copyright (C) 1993-1996 by id Software, Inc.
//
// This source is available for distribution and/or modification
// only under the terms of the DOOM Source Code License as
// published by id Software. All rights reserved.
//
// The source is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// FITNESS FOR A PARTICULAR PURPOSE. See the DOOM Source Code License
// for more details.
//

//
// This file has been converted from the original Doom info.[c|h] file
// into some Javascript friendly structures.
//
// We're not sure exactly what the licensing situation is with this so
// we've included the original copyright notice just incase. Ofcourse,
// you are welcome to do what you want with this file seeing as its
// already in plain view =P
//

// Some WAD defines
const MAP_SCALE=1.0;
const MAX_THINGS=137;
const NOINDEX=65536;
const SUBSECTOR=(1<<15);
const VERT_IS_GL=(1<<15);
const ANIM_FPS=35.0;
const FF_FRAMEMASK=0x7fff;
const FF_FULLBRIGHT=0x8000;

// Model type ID
var mobjtype_t={
	MT_PLAYER:		0,
	MT_POSSESSED:	1,
	MT_SHOTGUY:		2,
	MT_VILE:		3,
	MT_FIRE:		4,
	MT_UNDEAD:		5,
	MT_TRACER:		6,
	MT_SMOKE:		7,
	MT_FATSO:		8,
	MT_FATSHOT:		9,
	MT_CHAINGUY:	10,
	MT_TROOP:		11,
	MT_SERGEANT:	12,
	MT_SHADOWS:		13,
	MT_HEAD:		14,
	MT_BRUISER:		15,
	MT_BRUISERSHOT:	16,
	MT_KNIGHT:		17,
	MT_SKULL:		18,
	MT_SPIDER:		19,
	MT_BABY:		20,
	MT_CYBORG:		21,
	MT_PAIN:		22,
	MT_WOLFSS:		23,
	MT_KEEN:		24,
	MT_BOSSBRAIN:	25,
	MT_BOSSSPIT:	26,
	MT_BOSSTARGET:	27,
	MT_SPAWNSHOT:	28,
	MT_SPAWNFIRE:	29,
	MT_BARREL:		30,
	MT_TROOPSHOT:	31,
	MT_HEADSHOT:	32,
	MT_ROCKET:		33,
	MT_PLASMA:		34,
	MT_BFG:			35,
	MT_ARACHPLAZ:	36,
	MT_PUFF:		37,
	MT_BLOOD:		38,
	MT_TFOG:		39,
	MT_IFOG:		40,
	MT_TELEPORTMAN:	41,
	MT_EXTRABFG:	42,
	MT_MISC0:		43,
	MT_MISC1:		44,
	MT_MISC2:		45,
	MT_MISC3:		46,
	MT_MISC4:		47,
	MT_MISC5:		48,
	MT_MISC6:		49,
	MT_MISC7:		50,
	MT_MISC8:		51,
	MT_MISC9:		52,
	MT_MISC10:		53,
	MT_MISC11:		54,
	MT_MISC12:		55,
	MT_INV:			56,
	MT_MISC13:		57,
	MT_INS:			58,
	MT_MISC14:		59,
	MT_MISC15:		60,
	MT_MISC16:		61,
	MT_MEGA:		62,
	MT_CLIP:		63,
	MT_MISC17:		64,
	MT_MISC18:		65,
	MT_MISC19:		66,
	MT_MISC20:		67,
	MT_MISC21:		68,
	MT_MISC22:		69,
	MT_MISC23:		70,
	MT_MISC24:		71,
	MT_MISC25:		72,
	MT_CHAINGUN:	73,
	MT_MISC26:		74,
	MT_MISC27:		75,
	MT_MISC28:		76,
	MT_SHOTGUN:		77,
	MT_SUPERSHOTGUN:78,
	MT_MISC29:		79,
	MT_MISC30:		80,
	MT_MISC31:		81,
	MT_MISC32:		82,
	MT_MISC33:		83,
	MT_MISC34:		84,
	MT_MISC35:		85,
	MT_MISC36:		86,
	MT_MISC37:		87,
	MT_MISC38:		88,
	MT_MISC39:		89,
	MT_MISC40:		90,
	MT_MISC41:		91,
	MT_MISC42:		92,
	MT_MISC43:		93,
	MT_MISC44:		94,
	MT_MISC45:		95,
	MT_MISC46:		96,
	MT_MISC47:		97,
	MT_MISC48:		98,
	MT_MISC49:		99,
	MT_MISC50:		100,
	MT_MISC51:		101,
	MT_MISC52:		102,
	MT_MISC53:		103,
	MT_MISC54:		104,
	MT_MISC55:		105,
	MT_MISC56:		106,
	MT_MISC57:		107,
	MT_MISC58:		108,
	MT_MISC59:		109,
	MT_MISC60:		110,
	MT_MISC61:		111,
	MT_MISC62:		112,
	MT_MISC63:		113,
	MT_MISC64:		114,
	MT_MISC65:		115,
	MT_MISC66:		116,
	MT_MISC67:		117,
	MT_MISC68:		118,
	MT_MISC69:		119,
	MT_MISC70:		120,
	MT_MISC71:		121,
	MT_MISC72:		122,
	MT_MISC73:		123,
	MT_MISC74:		124,
	MT_MISC75:		125,
	MT_MISC76:		126,
	MT_MISC77:		127,
	MT_MISC78:		128,
	MT_MISC79:		129,
	MT_MISC80:		130,
	MT_MISC81:		131,
	MT_MISC82:		132,
	MT_MISC83:		133,
	MT_MISC84:		134,
	MT_MISC85:		135,
	MT_MISC86:		136
};

var mobjflag_t={
    MF_SPECIAL		: 1,
    MF_SOLID		: 2,
    MF_SHOOTABLE	: 4,
    MF_NOSECTOR		: 8,
    MF_NOBLOCKMAP	: 16,                    
    MF_AMBUSH		: 32,
    MF_JUSTHIT		: 64,
    MF_JUSTATTACKED	: 128,
    MF_SPAWNCEILING	: 256,
    MF_NOGRAVITY	: 512,
    MF_DROPOFF		: 0x400,
    MF_PICKUP		: 0x800,
    MF_NOCLIP		: 0x1000,
    MF_SLIDE		: 0x2000,
    MF_FLOAT		: 0x4000,
    MF_TELEPORT		: 0x8000,
    MF_MISSILE		: 0x10000,	
    MF_DROPPED		: 0x20000,
    MF_SHADOW		: 0x40000,
    MF_NOBLOOD		: 0x80000,
    MF_CORPSE		: 0x100000,
	MF_INFLOAT		: 0x200000,
    MF_COUNTKILL	: 0x400000,
    MF_COUNTITEM	: 0x800000,
    MF_SKULLFLY		: 0x1000000,
    MF_NOTDMATCH    : 0x2000000,
    MF_TRANSLATION  : 0xc000000,
    MF_TRANSSHIFT	: 26
};

// Sound Effects
var sfxenum_t={
	sfx_None:		0,
	sfx_pistol:		1,
	sfx_shotgn:		2,
	sfx_sgcock:		3,
	sfx_dshtgn:		4,
	sfx_dbopn:		5,
	sfx_dbcls:		6,
	sfx_dbload:		7,
	sfx_plasma:		8,
	sfx_bfg:		9,
	sfx_sawup:		10,
	sfx_sawidl:		11,
	sfx_sawful:		12,
	sfx_sawhit:		13,
	sfx_rlaunc:		14,
	sfx_rxplod:		15,
	sfx_firsht:		16,
	sfx_firxpl:		17,
	sfx_pstart:		18,
	sfx_pstop:		19,
	sfx_doropn:		20,
	sfx_dorcls:		21,
	sfx_stnmov:		22,
	sfx_swtchn:		23,
	sfx_swtchx:		24,
	sfx_plpain:		25,
	sfx_dmpain:		26,
	sfx_popain:		27,
	sfx_vipain:		28,
	sfx_mnpain:		29,
	sfx_pepain:		30,
	sfx_slop:		31,
	sfx_itemup:		32,
	sfx_wpnup:		33,
	sfx_oof:		34,
	sfx_telept:		35,
	sfx_posit1:		36,
	sfx_posit2:		37,
	sfx_posit3:		38,
	sfx_bgsit1:		39,
	sfx_bgsit2:		40,
	sfx_sgtsit:		41,
	sfx_cacsit:		42,
	sfx_brssit:		43,
	sfx_cybsit:		44,
	sfx_spisit:		45,
	sfx_bspsit:		46,
	sfx_kntsit:		47,
	sfx_vilsit:		48,
	sfx_mansit:		49,
	sfx_pesit:		50,
	sfx_sklatk:		51,
	sfx_sgtatk:		52,
	sfx_skepch:		53,
	sfx_vilatk:		54,
	sfx_claw:		55,
	sfx_skeswg:		56,
	sfx_pldeth:		57,
	sfx_pdiehi:		58,
	sfx_podth1:		59,
	sfx_podth2:		60,
	sfx_podth3:		61,
	sfx_bgdth1:		62,
	sfx_bgdth2:		63,
	sfx_sgtdth:		64,
	sfx_cacdth:		65,
	sfx_skldth:		66,
	sfx_brsdth:		67,
	sfx_cybdth:		68,
	sfx_spidth:		69,
	sfx_bspdth:		70,
	sfx_vildth:		71,
	sfx_kntdth:		72,
	sfx_pedth:		73,
	sfx_skedth:		74,
	sfx_posact:		75,
	sfx_bgact:		76,
	sfx_dmact:		77,
	sfx_bspact:		78,
	sfx_bspwlk:		79,
	sfx_vilact:		80,
	sfx_noway:		81,
	sfx_barexp:		82,
	sfx_punch:		83,
	sfx_hoof:		84,
	sfx_metal:		85,
	sfx_chgun:		86,
	sfx_tink:		87,
	sfx_bdopn:		88,
	sfx_bdcls:		89,
	sfx_itmbk:		90,
	sfx_flame:		91,
	sfx_flamst:		92,
	sfx_getpow:		93,
	sfx_bospit:		94,
	sfx_boscub:		95,
	sfx_bossit:		96,
	sfx_bospn:		97,
	sfx_bosdth:		98,
	sfx_manatk:		99,
	sfx_mandth:		100,
	sfx_sssit:		101,
	sfx_ssdth:		102,
	sfx_keenpn:		103,
	sfx_keendt:		104,
	sfx_skeact:		105,
	sfx_skesit:		106,
	sfx_skeatk:		107,
	sfx_radio:		108
};

var spritenames=[
    "TROO","SHTG","PUNG","PISG","PISF","SHTF","SHT2","CHGG","CHGF","MISG",
    "MISF","SAWG","PLSG","PLSF","BFGG","BFGF","BLUD","PUFF","BAL1","BAL2",
    "PLSS","PLSE","MISL","BFS1","BFE1","BFE2","TFOG","IFOG","PLAY","POSS",
    "SPOS","VILE","FIRE","FATB","FBXP","SKEL","MANF","FATT","CPOS","SARG",
    "HEAD","BAL7","BOSS","BOS2","SKUL","SPID","BSPI","APLS","APBX","CYBR",
    "PAIN","SSWV","KEEN","BBRN","BOSF","ARM1","ARM2","BAR1","BEXP","FCAN",
    "BON1","BON2","BKEY","RKEY","YKEY","BSKU","RSKU","YSKU","STIM","MEDI",
    "SOUL","PINV","PSTR","PINS","MEGA","SUIT","PMAP","PVIS","CLIP","AMMO",
    "ROCK","BROK","CELL","CELP","SHEL","SBOX","BPAK","BFUG","MGUN","CSAW",
    "LAUN","PLAS","SHOT","SGN2","COLU","SMT2","GOR1","POL2","POL5","POL4",
    "POL3","POL1","POL6","GOR2","GOR3","GOR4","GOR5","SMIT","COL1","COL2",
    "COL3","COL4","CAND","CBRA","COL6","TRE1","TRE2","ELEC","CEYE","FSKU",
    "COL5","TBLU","TGRN","TRED","SMBT","SMGT","SMRT","HDB1","HDB2","HDB3",
    "HDB4","HDB5","HDB6","POB1","POB2","BRS1","TLMP","TLP2"
];

// Sprites
var spritenum_t={
	SPR_TROO:	0,
	SPR_SHTG:	1,
	SPR_PUNG:	2,
	SPR_PISG:	3,
	SPR_PISF:	4,
	SPR_SHTF:	5,
	SPR_SHT2:	6,
	SPR_CHGG:	7,
	SPR_CHGF:	8,
	SPR_MISG:	9,
	SPR_MISF:	10,
	SPR_SAWG:	11,
	SPR_PLSG:	12,
	SPR_PLSF:	13,
	SPR_BFGG:	14,
	SPR_BFGF:	15,
	SPR_BLUD:	16,
	SPR_PUFF:	17,
	SPR_BAL1:	18,
	SPR_BAL2:	19,
	SPR_PLSS:	20,
	SPR_PLSE:	21,
	SPR_MISL:	22,
	SPR_BFS1:	23,
	SPR_BFE1:	24,
	SPR_BFE2:	25,
	SPR_TFOG:	26,
	SPR_IFOG:	27,
	SPR_PLAY:	28,
	SPR_POSS:	29,
	SPR_SPOS:	30,
	SPR_VILE:	31,
	SPR_FIRE:	32,
	SPR_FATB:	33,
	SPR_FBXP:	34,
	SPR_SKEL:	35,
	SPR_MANF:	36,
	SPR_FATT:	37,
	SPR_CPOS:	38,
	SPR_SARG:	39,
	SPR_HEAD:	40,
	SPR_BAL7:	41,
	SPR_BOSS:	42,
	SPR_BOS2:	43,
	SPR_SKUL:	44,
	SPR_SPID:	45,
	SPR_BSPI:	46,
	SPR_APLS:	47,
	SPR_APBX:	48,
	SPR_CYBR:	49,
	SPR_PAIN:	50,
	SPR_SSWV:	51,
	SPR_KEEN:	52,
	SPR_BBRN:	53,
	SPR_BOSF:	54,
	SPR_ARM1:	55,
	SPR_ARM2:	56,
	SPR_BAR1:	57,
	SPR_BEXP:	58,
	SPR_FCAN:	59,
	SPR_BON1:	60,
	SPR_BON2:	61,
	SPR_BKEY:	62,
	SPR_RKEY:	63,
	SPR_YKEY:	64,
	SPR_BSKU:	65,
	SPR_RSKU:	66,
	SPR_YSKU:	67,
	SPR_STIM:	68,
	SPR_MEDI:	69,
	SPR_SOUL:	70,
	SPR_PINV:	71,
	SPR_PSTR:	72,
	SPR_PINS:	73,
	SPR_MEGA:	74,
	SPR_SUIT:	75,
	SPR_PMAP:	76,
	SPR_PVIS:	77,
	SPR_CLIP:	78,
	SPR_AMMO:	79,
	SPR_ROCK:	80,
	SPR_BROK:	81,
	SPR_CELL:	82,
	SPR_CELP:	83,
	SPR_SHEL:	84,
	SPR_SBOX:	85,
	SPR_BPAK:	86,
	SPR_BFUG:	87,
	SPR_MGUN:	88,
	SPR_CSAW:	89,
	SPR_LAUN:	90,
	SPR_PLAS:	91,
	SPR_SHOT:	92,
	SPR_SGN2:	93,
	SPR_COLU:	94,
	SPR_SMT2:	95,
	SPR_GOR1:	96,
	SPR_POL2:	97,
	SPR_POL5:	98,
	SPR_POL4:	99,
	SPR_POL3:	100,
	SPR_POL1:	101,
	SPR_POL6:	102,
	SPR_GOR2:	103,
	SPR_GOR3:	104,
	SPR_GOR4:	105,
	SPR_GOR5:	106,
	SPR_SMIT:	107,
	SPR_COL1:	108,
	SPR_COL2:	109,
	SPR_COL3:	110,
	SPR_COL4:	111,
	SPR_CAND:	112,
	SPR_CBRA:	113,
	SPR_COL6:	114,
	SPR_TRE1:	115,
	SPR_TRE2:	116,
	SPR_ELEC:	117,
	SPR_CEYE:	118,
	SPR_FSKU:	119,
	SPR_COL5:	120,
	SPR_TBLU:	121,
	SPR_TGRN:	122,
	SPR_TRED:	123,
	SPR_SMBT:	124,
	SPR_SMGT:	125,
	SPR_SMRT:	126,
	SPR_HDB1:	127,
	SPR_HDB2:	128,
	SPR_HDB3:	129,
	SPR_HDB4:	130,
	SPR_HDB5:	131,
	SPR_HDB6:	132,
	SPR_POB1:	133,
	SPR_POB2:	134,
	SPR_BRS1:	135,
	SPR_TLMP:	136,
	SPR_TLP2:	137
};

// States
var statenum_t={
	S_NULL:				0,
	S_LIGHTDONE:		1,
	S_PUNCH:			2,
	S_PUNCHDOWN:		3,
	S_PUNCHUP:			4,
	S_PUNCH1:			5,
	S_PUNCH2:			6,
	S_PUNCH3:			7,
	S_PUNCH4:			8,
	S_PUNCH5:			9,
	S_PISTOL:			10,
	S_PISTOLDOWN:		11,
	S_PISTOLUP:			12,
	S_PISTOL1:			13,
	S_PISTOL2:			14,
	S_PISTOL3:			15,
	S_PISTOL4:			16,
	S_PISTOLFLASH:		17,
	S_SGUN:				18,	
	S_SGUNDOWN:			19,
	S_SGUNUP:			20,
	S_SGUN1:			21,
	S_SGUN2:			22,
	S_SGUN3:			23,
	S_SGUN4:			24,
	S_SGUN5:			25,
	S_SGUN6:			26,
	S_SGUN7:			27,
	S_SGUN8:			28,
	S_SGUN9:			29,
	S_SGUNFLASH1:		30,
	S_SGUNFLASH2:		31,
	S_DSGUN:			32,
	S_DSGUNDOWN:		33,
	S_DSGUNUP:			34,
	S_DSGUN1:			35,
	S_DSGUN2:			36,
	S_DSGUN3:			37,
	S_DSGUN4:			38,
	S_DSGUN5:			39,
	S_DSGUN6:			40,
	S_DSGUN7:			41,
	S_DSGUN8:			42,
	S_DSGUN9:			43,
	S_DSGUN10:			44,
	S_DSNR1:			45,
	S_DSNR2:			46,
	S_DSGUNFLASH1:		47,
	S_DSGUNFLASH2:		48,
	S_CHAIN:			49,
	S_CHAINDOWN:		50,
	S_CHAINUP:			51,
	S_CHAIN1:			52,
	S_CHAIN2:			53,
	S_CHAIN3:			54,
	S_CHAINFLASH1:		55,
	S_CHAINFLASH2:		56,
	S_MISSILE:			57,
	S_MISSILEDOWN:		58,
	S_MISSILEUP:		59,
	S_MISSILE1:			60,
	S_MISSILE2:			61,
	S_MISSILE3:			62,
	S_MISSILEFLASH1:	63,
	S_MISSILEFLASH2:	64,
	S_MISSILEFLASH3:	65,
	S_MISSILEFLASH4:	66,
	S_SAW:				67,
	S_SAWB:				68,
	S_SAWDOWN:			69,
	S_SAWUP:			70,
	S_SAW1:				71,
	S_SAW2:				72,
	S_SAW3:				73,
	S_PLASMA:			74,
	S_PLASMADOWN:		75,
	S_PLASMAUP:			76,
	S_PLASMA1:			77,
	S_PLASMA2:			78,
	S_PLASMAFLASH1:		79,
	S_PLASMAFLASH2:		80,
	S_BFG:				81,
	S_BFGDOWN:			82,
	S_BFGUP:			83,
	S_BFG1:				84,
	S_BFG2:				85,
	S_BFG3:				86,
	S_BFG4:				87,
	S_BFGFLASH1:		88,
	S_BFGFLASH2:		89,
	S_BLOOD1:			90,
	S_BLOOD2:			91,
	S_BLOOD3:			92,
	S_PUFF1:			93,
	S_PUFF2:			94,
	S_PUFF3:			95,
	S_PUFF4:			96,
	S_TBALL1:			97,
	S_TBALL2:			98,
	S_TBALLX1:			99,
	S_TBALLX2:			100,
	S_TBALLX3:			101,
	S_RBALL1:			102,
	S_RBALL2:			103,
	S_RBALLX1:			104,
	S_RBALLX2:			105,
	S_RBALLX3:			106,
	S_PLASBALL:			107,
	S_PLASBALL2:		108,
	S_PLASEXP:			109,
	S_PLASEXP2:			110,
	S_PLASEXP3:			111,
	S_PLASEXP4:			112,
	S_PLASEXP5:			113,
	S_ROCKET:			114,
	S_BFGSHOT:			115,
	S_BFGSHOT2:			116,
	S_BFGLAND:			117,
	S_BFGLAND2:			118,
	S_BFGLAND3:			119,
	S_BFGLAND4:			120,
	S_BFGLAND5:			121,
	S_BFGLAND6:			122,
	S_BFGEXP:			123,
	S_BFGEXP2:			124,
	S_BFGEXP3:			125,
	S_BFGEXP4:			126,
	S_EXPLODE1:			127,
	S_EXPLODE2:			128,
	S_EXPLODE3:			129,
	S_TFOG:				130,
	S_TFOG01:			131,
	S_TFOG02:			132,
	S_TFOG2:			133,
	S_TFOG3:			134,
	S_TFOG4:			135,
	S_TFOG5:			136,
	S_TFOG6:			137,
	S_TFOG7:			138,
	S_TFOG8:			139,
	S_TFOG9:			140,
	S_TFOG10:			141,
	S_IFOG:				142,
	S_IFOG01:			143,
	S_IFOG02:			144,
	S_IFOG2:			145,
	S_IFOG3:			146,
	S_IFOG4:			147,
	S_IFOG5:			148,
	S_PLAY:				149,
	S_PLAY_RUN1:		150,
	S_PLAY_RUN2:		151,
	S_PLAY_RUN3:		152,
	S_PLAY_RUN4:		153,
	S_PLAY_ATK1:		154,
	S_PLAY_ATK2:		155,
	S_PLAY_PAIN:		156,
	S_PLAY_PAIN2:		157,
	S_PLAY_DIE1:		158,
	S_PLAY_DIE2:		159,
	S_PLAY_DIE3:		160,
	S_PLAY_DIE4:		161,
	S_PLAY_DIE5:		162,
	S_PLAY_DIE6:		163,
	S_PLAY_DIE7:		164,
	S_PLAY_XDIE1:		165,
	S_PLAY_XDIE2:		166,
	S_PLAY_XDIE3:		167,
	S_PLAY_XDIE4:		168,
	S_PLAY_XDIE5:		169,
	S_PLAY_XDIE6:		170,
	S_PLAY_XDIE7:		171,
	S_PLAY_XDIE8:		172,
	S_PLAY_XDIE9:		173,
	S_POSS_STND:		174,
	S_POSS_STND2:		175,
	S_POSS_RUN1:		176,
	S_POSS_RUN2:		177,
	S_POSS_RUN3:		178,
	S_POSS_RUN4:		179,
	S_POSS_RUN5:		180,
	S_POSS_RUN6:		181,
	S_POSS_RUN7:		182,
	S_POSS_RUN8:		183,
	S_POSS_ATK1:		184,
	S_POSS_ATK2:		185,
	S_POSS_ATK3:		186,
	S_POSS_PAIN:		187,
	S_POSS_PAIN2:		188,
	S_POSS_DIE1:		189,
	S_POSS_DIE2:		190,
	S_POSS_DIE3:		191,
	S_POSS_DIE4:		192,
	S_POSS_DIE5:		193,
	S_POSS_XDIE1:		194,
	S_POSS_XDIE2:		195,
	S_POSS_XDIE3:		196,
	S_POSS_XDIE4:		197,
	S_POSS_XDIE5:		198,
	S_POSS_XDIE6:		199,
	S_POSS_XDIE7:		200,
	S_POSS_XDIE8:		201,
	S_POSS_XDIE9:		202,
	S_POSS_RAISE1:		203,
	S_POSS_RAISE2:		204,
	S_POSS_RAISE3:		205,
	S_POSS_RAISE4:		206,
	S_SPOS_STND:		207,
	S_SPOS_STND2:		208,
	S_SPOS_RUN1:		209,
	S_SPOS_RUN2:		210,
	S_SPOS_RUN3:		211,
	S_SPOS_RUN4:		212,
	S_SPOS_RUN5:		213,
	S_SPOS_RUN6:		214,
	S_SPOS_RUN7:		215,
	S_SPOS_RUN8:		216,
	S_SPOS_ATK1:		217,
	S_SPOS_ATK2:		218,
	S_SPOS_ATK3:		219,
	S_SPOS_PAIN:		220,
	S_SPOS_PAIN2:		221,
	S_SPOS_DIE1:		222,
	S_SPOS_DIE2:		223,
	S_SPOS_DIE3:		224,
	S_SPOS_DIE4:		225,
	S_SPOS_DIE5:		226,
	S_SPOS_XDIE1:		227,
	S_SPOS_XDIE2:		228,
	S_SPOS_XDIE3:		229,
	S_SPOS_XDIE4:		230,
	S_SPOS_XDIE5:		231,
	S_SPOS_XDIE6:		232,
	S_SPOS_XDIE7:		233,
	S_SPOS_XDIE8:		234,
	S_SPOS_XDIE9:		235,
	S_SPOS_RAISE1:		236,
	S_SPOS_RAISE2:		237,
	S_SPOS_RAISE3:		238,
	S_SPOS_RAISE4:		239,
	S_SPOS_RAISE5:		240,
	S_VILE_STND:		241,
	S_VILE_STND2:		242,
	S_VILE_RUN1:		243,
	S_VILE_RUN2:		244,
	S_VILE_RUN3:		245,
	S_VILE_RUN4:		246,
	S_VILE_RUN5:		247,
	S_VILE_RUN6:		248,
	S_VILE_RUN7:		249,
	S_VILE_RUN8:		250,
	S_VILE_RUN9:		251,
	S_VILE_RUN10:		252,
	S_VILE_RUN11:		253,
	S_VILE_RUN12:		254,
	S_VILE_ATK1:		255,
	S_VILE_ATK2:		256,
	S_VILE_ATK3:		257,
	S_VILE_ATK4:		258,
	S_VILE_ATK5:		259,
	S_VILE_ATK6:		260,
	S_VILE_ATK7:		261,
	S_VILE_ATK8:		262,
	S_VILE_ATK9:		263,
	S_VILE_ATK10:		264,
	S_VILE_ATK11:		265,
	S_VILE_HEAL1:		266,
	S_VILE_HEAL2:		267,
	S_VILE_HEAL3:		268,
	S_VILE_PAIN:		269,
	S_VILE_PAIN2:		270,
	S_VILE_DIE1:		271,
	S_VILE_DIE2:		272,
	S_VILE_DIE3:		273,
	S_VILE_DIE4:		274,
	S_VILE_DIE5:		275,
	S_VILE_DIE6:		276,
	S_VILE_DIE7:		277,
	S_VILE_DIE8:		278,
	S_VILE_DIE9:		279,
	S_VILE_DIE10:		280,
	S_FIRE1:			281,
	S_FIRE2:			282,
	S_FIRE3:			283,
	S_FIRE4:			284,
	S_FIRE5:			285,
	S_FIRE6:			286,
	S_FIRE7:			287,
	S_FIRE8:			288,
	S_FIRE9:			289,
	S_FIRE10:			290,
	S_FIRE11:			291,
	S_FIRE12:			292,
	S_FIRE13:			293,
	S_FIRE14:			294,
	S_FIRE15:			295,
	S_FIRE16:			296,
	S_FIRE17:			297,
	S_FIRE18:			298,
	S_FIRE19:			299,
	S_FIRE20:			300,
	S_FIRE21:			301,
	S_FIRE22:			302,
	S_FIRE23:			303,
	S_FIRE24:			304,
	S_FIRE25:			305,
	S_FIRE26:			306,
	S_FIRE27:			307,
	S_FIRE28:			308,
	S_FIRE29:			309,
	S_FIRE30:			310,
	S_SMOKE1:			311,
	S_SMOKE2:			312,
	S_SMOKE3:			313,
	S_SMOKE4:			314,
	S_SMOKE5:			315,
	S_TRACER:			316,
	S_TRACER2:			317,
	S_TRACEEXP1:		318,
	S_TRACEEXP2:		319,
	S_TRACEEXP3:		320,
	S_SKEL_STND:		321,
	S_SKEL_STND2:		322,
	S_SKEL_RUN1:		323,
	S_SKEL_RUN2:		324,
	S_SKEL_RUN3:		325,
	S_SKEL_RUN4:		326,
	S_SKEL_RUN5:		327,
	S_SKEL_RUN6:		328,
	S_SKEL_RUN7:		329,
	S_SKEL_RUN8:		330,
	S_SKEL_RUN9:		331,
	S_SKEL_RUN10:		332,
	S_SKEL_RUN11:		333,
	S_SKEL_RUN12:		334,
	S_SKEL_FIST1:		335,
	S_SKEL_FIST2:		336,
	S_SKEL_FIST3:		337,
	S_SKEL_FIST4:		338,
	S_SKEL_MISS1:		339,
	S_SKEL_MISS2:		340,
	S_SKEL_MISS3:		341,
	S_SKEL_MISS4:		342,
	S_SKEL_PAIN:		343,
	S_SKEL_PAIN2:		344,
	S_SKEL_DIE1:		345,
	S_SKEL_DIE2:		346,
	S_SKEL_DIE3:		347,
	S_SKEL_DIE4:		348,
	S_SKEL_DIE5:		349,
	S_SKEL_DIE6:		350,
	S_SKEL_RAISE1:		351,
	S_SKEL_RAISE2:		352,
	S_SKEL_RAISE3:		353,
	S_SKEL_RAISE4:		354,
	S_SKEL_RAISE5:		355,
	S_SKEL_RAISE6:		356,
	S_FATSHOT1:			357,
	S_FATSHOT2:			358,
	S_FATSHOTX1:		359,
	S_FATSHOTX2:		360,
	S_FATSHOTX3:		361,
	S_FATT_STND:		362,
	S_FATT_STND2:		363,
	S_FATT_RUN1:		364,
	S_FATT_RUN2:		365,
	S_FATT_RUN3:		366,
	S_FATT_RUN4:		367,
	S_FATT_RUN5:		368,
	S_FATT_RUN6:		369,
	S_FATT_RUN7:		370,
	S_FATT_RUN8:		371,
	S_FATT_RUN9:		372,
	S_FATT_RUN10:		373,
	S_FATT_RUN11:		374,
	S_FATT_RUN12:		375,
	S_FATT_ATK1:		376,
	S_FATT_ATK2:		377,
	S_FATT_ATK3:		378,
	S_FATT_ATK4:		379,
	S_FATT_ATK5:		380,
	S_FATT_ATK6:		381,
	S_FATT_ATK7:		382,
	S_FATT_ATK8:		383,
	S_FATT_ATK9:		384,
	S_FATT_ATK10:		385,
	S_FATT_PAIN:		386,
	S_FATT_PAIN2:		387,
	S_FATT_DIE1:		388,
	S_FATT_DIE2:		389,
	S_FATT_DIE3:		390,
	S_FATT_DIE4:		391,
	S_FATT_DIE5:		392,
	S_FATT_DIE6:		393,
	S_FATT_DIE7:		394,
	S_FATT_DIE8:		395,
	S_FATT_DIE9:		396,
	S_FATT_DIE10:		397,
	S_FATT_RAISE1:		398,
	S_FATT_RAISE2:		399,
	S_FATT_RAISE3:		400,
	S_FATT_RAISE4:		401,
	S_FATT_RAISE5:		402,
	S_FATT_RAISE6:		403,
	S_FATT_RAISE7:		404,
	S_FATT_RAISE8:		405,
	S_CPOS_STND:		406,
	S_CPOS_STND2:		407,
	S_CPOS_RUN1:		408,
	S_CPOS_RUN2:		409,
	S_CPOS_RUN3:		410,
	S_CPOS_RUN4:		411,
	S_CPOS_RUN5:		412,
	S_CPOS_RUN6:		413,
	S_CPOS_RUN7:		414,
	S_CPOS_RUN8:		415,
	S_CPOS_ATK1:		416,
	S_CPOS_ATK2:		417,
	S_CPOS_ATK3:		418,
	S_CPOS_ATK4:		419,
	S_CPOS_PAIN:		420,
	S_CPOS_PAIN2:		421,
	S_CPOS_DIE1:		422,
	S_CPOS_DIE2:		423,
	S_CPOS_DIE3:		424,
	S_CPOS_DIE4:		425,
	S_CPOS_DIE5:		426,
	S_CPOS_DIE6:		427,
	S_CPOS_DIE7:		428,
	S_CPOS_XDIE1:		429,
	S_CPOS_XDIE2:		430,
	S_CPOS_XDIE3:		431,
	S_CPOS_XDIE4:		432,
	S_CPOS_XDIE5:		433,
	S_CPOS_XDIE6:		434,
	S_CPOS_RAISE1:		435,
	S_CPOS_RAISE2:		436,
	S_CPOS_RAISE3:		437,
	S_CPOS_RAISE4:		438,
	S_CPOS_RAISE5:		439,
	S_CPOS_RAISE6:		440,
	S_CPOS_RAISE7:		441,
	S_TROO_STND:		442,
	S_TROO_STND2:		443,
	S_TROO_RUN1:		444,
	S_TROO_RUN2:		445,
	S_TROO_RUN3:		446,
	S_TROO_RUN4:		447,
	S_TROO_RUN5:		448,
	S_TROO_RUN6:		449,
	S_TROO_RUN7:		450,
	S_TROO_RUN8:		451,
	S_TROO_ATK1:		452,
	S_TROO_ATK2:		453,
	S_TROO_ATK3:		454,
	S_TROO_PAIN:		455,
	S_TROO_PAIN2:		456,
	S_TROO_DIE1:		457,
	S_TROO_DIE2:		458,
	S_TROO_DIE3:		459,
	S_TROO_DIE4:		460,
	S_TROO_DIE5:		461,
	S_TROO_XDIE1:		462,
	S_TROO_XDIE2:		463,
	S_TROO_XDIE3:		464,
	S_TROO_XDIE4:		465,
	S_TROO_XDIE5:		466,
	S_TROO_XDIE6:		467,
	S_TROO_XDIE7:		468,
	S_TROO_XDIE8:		469,
	S_TROO_RAISE1:		470,
	S_TROO_RAISE2:		471,
	S_TROO_RAISE3:		472,
	S_TROO_RAISE4:		473,
	S_TROO_RAISE5:		474,
	S_SARG_STND:		475,
	S_SARG_STND2:		476,
	S_SARG_RUN1:		477,
	S_SARG_RUN2:		478,
	S_SARG_RUN3:		479,
	S_SARG_RUN4:		480,
	S_SARG_RUN5:		481,
	S_SARG_RUN6:		482,
	S_SARG_RUN7:		483,
	S_SARG_RUN8:		484,
	S_SARG_ATK1:		485,
	S_SARG_ATK2:		486,
	S_SARG_ATK3:		487,
	S_SARG_PAIN:		488,
	S_SARG_PAIN2:		489,
	S_SARG_DIE1:		490,
	S_SARG_DIE2:		491,
	S_SARG_DIE3:		492,
	S_SARG_DIE4:		493,
	S_SARG_DIE5:		494,
	S_SARG_DIE6:		495,
	S_SARG_RAISE1:		496,
	S_SARG_RAISE2:		497,
	S_SARG_RAISE3:		498,
	S_SARG_RAISE4:		499,
	S_SARG_RAISE5:		500,
	S_SARG_RAISE6:		501,
	S_HEAD_STND:		502,
	S_HEAD_RUN1:		503,
	S_HEAD_ATK1:		504,
	S_HEAD_ATK2:		505,
	S_HEAD_ATK3:		506,
	S_HEAD_PAIN:		507,
	S_HEAD_PAIN2:		508,
	S_HEAD_PAIN3:		509,
	S_HEAD_DIE1:		510,
	S_HEAD_DIE2:		511,
	S_HEAD_DIE3:		512,
	S_HEAD_DIE4:		513,
	S_HEAD_DIE5:		514,
	S_HEAD_DIE6:		515,
	S_HEAD_RAISE1:		516,
	S_HEAD_RAISE2:		517,
	S_HEAD_RAISE3:		518,
	S_HEAD_RAISE4:		519,
	S_HEAD_RAISE5:		520,
	S_HEAD_RAISE6:		521,
	S_BRBALL1:			522,
	S_BRBALL2:			523,
	S_BRBALLX1:			524,
	S_BRBALLX2:			525,
	S_BRBALLX3:			526,
	S_BOSS_STND:		527,
	S_BOSS_STND2:		528,
	S_BOSS_RUN1:		529,
	S_BOSS_RUN2:		530,
	S_BOSS_RUN3:		531,
	S_BOSS_RUN4:		532,
	S_BOSS_RUN5:		533,
	S_BOSS_RUN6:		534,
	S_BOSS_RUN7:		535,
	S_BOSS_RUN8:		536,
	S_BOSS_ATK1:		537,
	S_BOSS_ATK2:		538,
	S_BOSS_ATK3:		539,
	S_BOSS_PAIN:		540,
	S_BOSS_PAIN2:		541,
	S_BOSS_DIE1:		542,
	S_BOSS_DIE2:		543,
	S_BOSS_DIE3:		544,
	S_BOSS_DIE4:		545,
	S_BOSS_DIE5:		546,
	S_BOSS_DIE6:		547,
	S_BOSS_DIE7:		548,
	S_BOSS_RAISE1:		549,
	S_BOSS_RAISE2:		550,
	S_BOSS_RAISE3:		551,
	S_BOSS_RAISE4:		552,
	S_BOSS_RAISE5:		553,
	S_BOSS_RAISE6:		554,
	S_BOSS_RAISE7:		555,
	S_BOS2_STND:		556,
	S_BOS2_STND2:		557,
	S_BOS2_RUN1:		558,
	S_BOS2_RUN2:		559,
	S_BOS2_RUN3:		560,
	S_BOS2_RUN4:		561,
	S_BOS2_RUN5:		562,
	S_BOS2_RUN6:		563,
	S_BOS2_RUN7:		564,
	S_BOS2_RUN8:		565,
	S_BOS2_ATK1:		566,
	S_BOS2_ATK2:		567,
	S_BOS2_ATK3:		568,
	S_BOS2_PAIN:		569,
	S_BOS2_PAIN2:		570,
	S_BOS2_DIE1:		571,
	S_BOS2_DIE2:		572,
	S_BOS2_DIE3:		573,
	S_BOS2_DIE4:		574,
	S_BOS2_DIE5:		575,
	S_BOS2_DIE6:		576,
	S_BOS2_DIE7:		577,
	S_BOS2_RAISE1:		578,
	S_BOS2_RAISE2:		579,
	S_BOS2_RAISE3:		580,
	S_BOS2_RAISE4:		581,
	S_BOS2_RAISE5:		582,
	S_BOS2_RAISE6:		583,
	S_BOS2_RAISE7:		584,
	S_SKULL_STND:		585,
	S_SKULL_STND2:		586,
	S_SKULL_RUN1:		587,
	S_SKULL_RUN2:		588,
	S_SKULL_ATK1:		589,
	S_SKULL_ATK2:		590,
	S_SKULL_ATK3:		591,
	S_SKULL_ATK4:		592,
	S_SKULL_PAIN:		593,
	S_SKULL_PAIN2:		594,
	S_SKULL_DIE1:		595,
	S_SKULL_DIE2:		596,
	S_SKULL_DIE3:		597,
	S_SKULL_DIE4:		598,
	S_SKULL_DIE5:		599,
	S_SKULL_DIE6:		600,
	S_SPID_STND:		601,
	S_SPID_STND2:		602,
	S_SPID_RUN1:		603,
	S_SPID_RUN2:		604,
	S_SPID_RUN3:		605,
	S_SPID_RUN4:		606,
	S_SPID_RUN5:		607,
	S_SPID_RUN6:		608,
	S_SPID_RUN7:		609,
	S_SPID_RUN8:		610,
	S_SPID_RUN9:		611,
	S_SPID_RUN10:		612,
	S_SPID_RUN11:		613,
	S_SPID_RUN12:		614,
	S_SPID_ATK1:		615,
	S_SPID_ATK2:		616,
	S_SPID_ATK3:		617,
	S_SPID_ATK4:		618,
	S_SPID_PAIN:		619,
	S_SPID_PAIN2:		620,
	S_SPID_DIE1:		621,
	S_SPID_DIE2:		622,
	S_SPID_DIE3:		623,
	S_SPID_DIE4:		624,
	S_SPID_DIE5:		625,
	S_SPID_DIE6:		626,
	S_SPID_DIE7:		627,
	S_SPID_DIE8:		628,
	S_SPID_DIE9:		629,
	S_SPID_DIE10:		630,
	S_SPID_DIE11:		631,
	S_BSPI_STND:		632,
	S_BSPI_STND2:		633,
	S_BSPI_SIGHT:		634,
	S_BSPI_RUN1:		635,
	S_BSPI_RUN2:		636,
	S_BSPI_RUN3:		637,
	S_BSPI_RUN4:		638,
	S_BSPI_RUN5:		639,
	S_BSPI_RUN6:		640,
	S_BSPI_RUN7:		641,
	S_BSPI_RUN8:		642,
	S_BSPI_RUN9:		643,
	S_BSPI_RUN10:		644,
	S_BSPI_RUN11:		645,
	S_BSPI_RUN12:		646,
	S_BSPI_ATK1:		647,
	S_BSPI_ATK2:		648,
	S_BSPI_ATK3:		649,
	S_BSPI_ATK4:		650,
	S_BSPI_PAIN:		651,
	S_BSPI_PAIN2:		652,
	S_BSPI_DIE1:		653,
	S_BSPI_DIE2:		654,
	S_BSPI_DIE3:		655,
	S_BSPI_DIE4:		656,
	S_BSPI_DIE5:		657,
	S_BSPI_DIE6:		658,
	S_BSPI_DIE7:		659,
	S_BSPI_RAISE1:		660,
	S_BSPI_RAISE2:		661,
	S_BSPI_RAISE3:		662,
	S_BSPI_RAISE4:		663,
	S_BSPI_RAISE5:		664,
	S_BSPI_RAISE6:		665,
	S_BSPI_RAISE7:		666,
	S_ARACH_PLAZ:		667,
	S_ARACH_PLAZ2:		668,
	S_ARACH_PLEX:		669,
	S_ARACH_PLEX2:		670,
	S_ARACH_PLEX3:		671,
	S_ARACH_PLEX4:		672,
	S_ARACH_PLEX5:		673,
	S_CYBER_STND:		674,
	S_CYBER_STND2:		675,
	S_CYBER_RUN1:		676,
	S_CYBER_RUN2:		677,
	S_CYBER_RUN3:		678,
	S_CYBER_RUN4:		679,
	S_CYBER_RUN5:		680,
	S_CYBER_RUN6:		681,
	S_CYBER_RUN7:		682,
	S_CYBER_RUN8:		683,
	S_CYBER_ATK1:		684,
	S_CYBER_ATK2:		685,
	S_CYBER_ATK3:		686,
	S_CYBER_ATK4:		687,
	S_CYBER_ATK5:		688,
	S_CYBER_ATK6:		689,
	S_CYBER_PAIN:		690,
	S_CYBER_DIE1:		691,
	S_CYBER_DIE2:		692,
	S_CYBER_DIE3:		693,
	S_CYBER_DIE4:		694,
	S_CYBER_DIE5:		695,
	S_CYBER_DIE6:		696,
	S_CYBER_DIE7:		697,
	S_CYBER_DIE8:		698,
	S_CYBER_DIE9:		699,
	S_CYBER_DIE10:		700,
	S_PAIN_STND:		701,
	S_PAIN_RUN1:		702,
	S_PAIN_RUN2:		703,
	S_PAIN_RUN3:		704,
	S_PAIN_RUN4:		705,
	S_PAIN_RUN5:		706,
	S_PAIN_RUN6:		707,
	S_PAIN_ATK1:		708,
	S_PAIN_ATK2:		709,
	S_PAIN_ATK3:		710,
	S_PAIN_ATK4:		711,
	S_PAIN_PAIN:		712,
	S_PAIN_PAIN2:		713,
	S_PAIN_DIE1:		714,
	S_PAIN_DIE2:		715,
	S_PAIN_DIE3:		716,
	S_PAIN_DIE4:		717,
	S_PAIN_DIE5:		718,
	S_PAIN_DIE6:		719,
	S_PAIN_RAISE1:		720,
	S_PAIN_RAISE2:		721,
	S_PAIN_RAISE3:		722,
	S_PAIN_RAISE4:		723,
	S_PAIN_RAISE5:		724,
	S_PAIN_RAISE6:		725,
	S_SSWV_STND:		726,
	S_SSWV_STND2:		727,
	S_SSWV_RUN1:		728,
	S_SSWV_RUN2:		729,
	S_SSWV_RUN3:		730,
	S_SSWV_RUN4:		731,
	S_SSWV_RUN5:		732,
	S_SSWV_RUN6:		733,
	S_SSWV_RUN7:		734,
	S_SSWV_RUN8:		735,
	S_SSWV_ATK1:		736,
	S_SSWV_ATK2:		737,
	S_SSWV_ATK3:		738,
	S_SSWV_ATK4:		739,
	S_SSWV_ATK5:		740,
	S_SSWV_ATK6:		741,
	S_SSWV_PAIN:		742,
	S_SSWV_PAIN2:		743,
	S_SSWV_DIE1:		744,
	S_SSWV_DIE2:		745,
	S_SSWV_DIE3:		746,
	S_SSWV_DIE4:		747,
	S_SSWV_DIE5:		748,
	S_SSWV_XDIE1:		749,
	S_SSWV_XDIE2:		750,
	S_SSWV_XDIE3:		751,
	S_SSWV_XDIE4:		752,
	S_SSWV_XDIE5:		753,
	S_SSWV_XDIE6:		754,
	S_SSWV_XDIE7:		755,
	S_SSWV_XDIE8:		756,
	S_SSWV_XDIE9:		757,
	S_SSWV_RAISE1:		758,
	S_SSWV_RAISE2:		759,
	S_SSWV_RAISE3:		760,
	S_SSWV_RAISE4:		761,
	S_SSWV_RAISE5:		762,
	S_KEENSTND:			763,
	S_COMMKEEN:			764,
	S_COMMKEEN2:		765,
	S_COMMKEEN3:		766,
	S_COMMKEEN4:		767,
	S_COMMKEEN5:		768,
	S_COMMKEEN6:		769,
	S_COMMKEEN7:		770,
	S_COMMKEEN8:		771,
	S_COMMKEEN9:		772,
	S_COMMKEEN10:		773,
	S_COMMKEEN11:		774,
	S_COMMKEEN12:		775,
	S_KEENPAIN:			776,
	S_KEENPAIN2:		777,
	S_BRAIN:			778,
	S_BRAIN_PAIN:		779,
	S_BRAIN_DIE1:		780,
	S_BRAIN_DIE2:		781,
	S_BRAIN_DIE3:		782,
	S_BRAIN_DIE4:		783,
	S_BRAINEYE:			784,
	S_BRAINEYESEE:		785,
	S_BRAINEYE1:		786,
	S_SPAWN1:			787,
	S_SPAWN2:			788,
	S_SPAWN3:			789,
	S_SPAWN4:			790,
	S_SPAWNFIRE1:		791,
	S_SPAWNFIRE2:		792,
	S_SPAWNFIRE3:		793,
	S_SPAWNFIRE4:		794,
	S_SPAWNFIRE5:		795,
	S_SPAWNFIRE6:		796,
	S_SPAWNFIRE7:		797,
	S_SPAWNFIRE8:		798,
	S_BRAINEXPLODE1:	799,
	S_BRAINEXPLODE2:	800,
	S_BRAINEXPLODE3:	801,
	S_ARM1:				802,
	S_ARM1A:			803,
	S_ARM2:				804,
	S_ARM2A:			805,
	S_BAR1:				806,
	S_BAR2:				807,
	S_BEXP:				808,
	S_BEXP2:			809,
	S_BEXP3:			810,
	S_BEXP4:			811,
	S_BEXP5:			812,
	S_BBAR1:			813,
	S_BBAR2:			814,
	S_BBAR3:			815,
	S_BON1:				816,
	S_BON1A:			817,
	S_BON1B:			818,
	S_BON1C:			819,
	S_BON1D:			820,
	S_BON1E:			821,
	S_BON2:				822,
	S_BON2A:			823,
	S_BON2B:			824,
	S_BON2C:			825,
	S_BON2D:			826,
	S_BON2E:			827,
	S_BKEY:				828,
	S_BKEY2:			829,
	S_RKEY:				830,
	S_RKEY2:			831,
	S_YKEY:				832,
	S_YKEY2:			833,
	S_BSKULL:			834,
	S_BSKULL2:			835,
	S_RSKULL:			836,
	S_RSKULL2:			837,
	S_YSKULL:			838,
	S_YSKULL2:			839,
	S_STIM:				840,
	S_MEDI:				841,
	S_SOUL:				842,
	S_SOUL2:			843,
	S_SOUL3:			844,
	S_SOUL4:			845,
	S_SOUL5:			846,
	S_SOUL6:			847,
	S_PINV:				848,
	S_PINV2:			849,
	S_PINV3:			850,
	S_PINV4:			851,
	S_PSTR:				852,
	S_PINS:				853,
	S_PINS2:			854,
	S_PINS3:			855,
	S_PINS4:			856,
	S_MEGA:				857,
	S_MEGA2:			858,
	S_MEGA3:			859,
	S_MEGA4:			860,
	S_SUIT:				861,
	S_PMAP:				862,
	S_PMAP2:			863,
	S_PMAP3:			864,
	S_PMAP4:			865,
	S_PMAP5:			866,
	S_PMAP6:			867,
	S_PVIS:				868,
	S_PVIS2:			869,
	S_CLIP:				870,
	S_AMMO:				871,
	S_ROCK:				872,
	S_BROK:				873,
	S_CELL:				874,
	S_CELP:				875,
	S_SHEL:				876,
	S_SBOX:				877,
	S_BPAK:				878,
	S_BFUG:				879,
	S_MGUN:				880,
	S_CSAW:				881,
	S_LAUN:				882,
	S_PLAS:				883,
	S_SHOT:				884,
	S_SHOT2:			885,
	S_COLU:				886,
	S_STALAG:			887,
	S_BLOODYTWITCH:		888,
	S_BLOODYTWITCH2:	889,
	S_BLOODYTWITCH3:	890,
	S_BLOODYTWITCH4:	891,
	S_DEADTORSO:		892,
	S_DEADBOTTOM:		893,
	S_HEADSONSTICK:		894,
	S_GIBS:				895,
	S_HEADONASTICK:		896,
	S_HEADCANDLES:		897,
	S_HEADCANDLES2:		898,
	S_DEADSTICK:		899,
	S_LIVESTICK:		900,
	S_LIVESTICK2:		901,
	S_MEAT2:			902,
	S_MEAT3:			903,
	S_MEAT4:			904,
	S_MEAT5:			905,
	S_STALAGTITE:		906,
	S_TALLGRNCOL:		907,
	S_SHRTGRNCOL:		908,
	S_TALLREDCOL:		909,
	S_SHRTREDCOL:		910,
	S_CANDLESTIK:		911,
	S_CANDELABRA:		912,
	S_SKULLCOL:			913,
	S_TORCHTREE:		914,
	S_BIGTREE:			915,
	S_TECHPILLAR:		916,
	S_EVILEYE:			917,
	S_EVILEYE2:			918,
	S_EVILEYE3:			919,
	S_EVILEYE4:			920,
	S_FLOATSKULL:		921,
	S_FLOATSKULL2:		922,
	S_FLOATSKULL3:		923,
	S_HEARTCOL:			924,
	S_HEARTCOL2:		925,
	S_BLUETORCH:		926,
	S_BLUETORCH2:		927,
	S_BLUETORCH3:		928,
	S_BLUETORCH4:		929,
	S_GREENTORCH:		930,
	S_GREENTORCH2:		931,
	S_GREENTORCH3:		932,
	S_GREENTORCH4:		933,
	S_REDTORCH:			934,
	S_REDTORCH2:		935,
	S_REDTORCH3:		936,
	S_REDTORCH4:		937,
	S_BTORCHSHRT:		938,
	S_BTORCHSHRT2:		939,
	S_BTORCHSHRT3:		940,
	S_BTORCHSHRT4:		941,
	S_GTORCHSHRT:		942,
	S_GTORCHSHRT2:		943,
	S_GTORCHSHRT3:		944,
	S_GTORCHSHRT4:		945,
	S_RTORCHSHRT:		946,
	S_RTORCHSHRT2:		947,
	S_RTORCHSHRT3:		948,
	S_RTORCHSHRT4:		949,
	S_HANGNOGUTS:		950,
	S_HANGBNOBRAIN:		951,
	S_HANGTLOOKDN:		952,
	S_HANGTSKULL:		953,
	S_HANGTLOOKUP:		954,
	S_HANGTNOBRAIN:		955,
	S_COLONGIBS:		956,
	S_SMALLPOOL:		957,
	S_BRAINSTEM:		958,
	S_TECHLAMP:			959,
	S_TECHLAMP2:		960,
	S_TECHLAMP3:		961,
	S_TECHLAMP4:		962,
	S_TECH2LAMP:		963,
	S_TECH2LAMP2:		964,
	S_TECH2LAMP3:		965,
	S_TECH2LAMP4:		966
};

var state_t=[
    {sprite:spritenum_t.SPR_TROO,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_NULL
    {sprite:spritenum_t.SPR_SHTG,frame:4,tics:0,action:"A_Light0",nextstate:statenum_t.S_NULL},					// S_LIGHTDONE
    {sprite:spritenum_t.SPR_PUNG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_PUNCH},			// S_PUNCH
    {sprite:spritenum_t.SPR_PUNG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_PUNCHDOWN},				// S_PUNCHDOWN
    {sprite:spritenum_t.SPR_PUNG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_PUNCHUP},				// S_PUNCHUP
    {sprite:spritenum_t.SPR_PUNG,frame:1,tics:4,action:"NULL",nextstate:statenum_t.S_PUNCH2},					// S_PUNCH1
    {sprite:spritenum_t.SPR_PUNG,frame:2,tics:4,action:"A_Punch",nextstate:statenum_t.S_PUNCH3},				// S_PUNCH2
    {sprite:spritenum_t.SPR_PUNG,frame:3,tics:5,action:"NULL",nextstate:statenum_t.S_PUNCH4},					// S_PUNCH3
    {sprite:spritenum_t.SPR_PUNG,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_PUNCH5},					// S_PUNCH4
    {sprite:spritenum_t.SPR_PUNG,frame:1,tics:5,action:"A_ReFire",nextstate:statenum_t.S_PUNCH},				// S_PUNCH5
    {sprite:spritenum_t.SPR_PISG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_PISTOL},			// S_PISTOL
    {sprite:spritenum_t.SPR_PISG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_PISTOLDOWN},			// S_PISTOLDOWN
    {sprite:spritenum_t.SPR_PISG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_PISTOLUP},				// S_PISTOLUP
    {sprite:spritenum_t.SPR_PISG,frame:0,tics:4,action:"NULL",nextstate:statenum_t.S_PISTOL2},					// S_PISTOL1
    {sprite:spritenum_t.SPR_PISG,frame:1,tics:6,action:"A_FirePistol",nextstate:statenum_t.S_PISTOL3},			// S_PISTOL2
    {sprite:spritenum_t.SPR_PISG,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_PISTOL4},					// S_PISTOL3
    {sprite:spritenum_t.SPR_PISG,frame:1,tics:5,action:"A_ReFire",nextstate:statenum_t.S_PISTOL},				// S_PISTOL4
    {sprite:spritenum_t.SPR_PISF,frame:32768,tics:7,action:"A_Light1",nextstate:statenum_t.S_LIGHTDONE},		// S_PISTOLFLASH
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_SGUN},			// S_SGUN
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_SGUNDOWN},				// S_SGUNDOWN
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_SGUNUP},				// S_SGUNUP
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:3,action:"NULL",nextstate:statenum_t.S_SGUN2},					// S_SGUN1
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:7,action:"A_FireShotgun",nextstate:statenum_t.S_SGUN3},			// S_SGUN2
    {sprite:spritenum_t.SPR_SHTG,frame:1,tics:5,action:"NULL",nextstate:statenum_t.S_SGUN4},					// S_SGUN3
    {sprite:spritenum_t.SPR_SHTG,frame:2,tics:5,action:"NULL",nextstate:statenum_t.S_SGUN5},					// S_SGUN4
    {sprite:spritenum_t.SPR_SHTG,frame:3,tics:4,action:"NULL",nextstate:statenum_t.S_SGUN6},					// S_SGUN5
    {sprite:spritenum_t.SPR_SHTG,frame:2,tics:5,action:"NULL",nextstate:statenum_t.S_SGUN7},					// S_SGUN6
    {sprite:spritenum_t.SPR_SHTG,frame:1,tics:5,action:"NULL",nextstate:statenum_t.S_SGUN8},					// S_SGUN7
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:3,action:"NULL",nextstate:statenum_t.S_SGUN9},					// S_SGUN8
    {sprite:spritenum_t.SPR_SHTG,frame:0,tics:7,action:"A_ReFire",nextstate:statenum_t.S_SGUN},					// S_SGUN9
    {sprite:spritenum_t.SPR_SHTF,frame:32768,tics:4,action:"A_Light1",nextstate:statenum_t.S_SGUNFLASH2},		// S_SGUNFLASH1
    {sprite:spritenum_t.SPR_SHTF,frame:32769,tics:3,action:"A_Light2",nextstate:statenum_t.S_LIGHTDONE},		// S_SGUNFLASH2
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_DSGUN},			// S_DSGUN
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_DSGUNDOWN},				// S_DSGUNDOWN
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_DSGUNUP},				// S_DSGUNUP
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:3,action:"NULL",nextstate:statenum_t.S_DSGUN2},					// S_DSGUN1
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:7,action:"A_FireShotgun2",nextstate:statenum_t.S_DSGUN3},			// S_DSGUN2
    {sprite:spritenum_t.SPR_SHT2,frame:1,tics:7,action:"NULL",nextstate:statenum_t.S_DSGUN4},					// S_DSGUN3
    {sprite:spritenum_t.SPR_SHT2,frame:2,tics:7,action:"A_CheckReload",nextstate:statenum_t.S_DSGUN5},			// S_DSGUN4
    {sprite:spritenum_t.SPR_SHT2,frame:3,tics:7,action:"A_OpenShotgun2",nextstate:statenum_t.S_DSGUN6},			// S_DSGUN5
    {sprite:spritenum_t.SPR_SHT2,frame:4,tics:7,action:"NULL",nextstate:statenum_t.S_DSGUN7},					// S_DSGUN6
    {sprite:spritenum_t.SPR_SHT2,frame:5,tics:7,action:"A_LoadShotgun2",nextstate:statenum_t.S_DSGUN8},			// S_DSGUN7
    {sprite:spritenum_t.SPR_SHT2,frame:6,tics:6,action:"NULL",nextstate:statenum_t.S_DSGUN9},					// S_DSGUN8
    {sprite:spritenum_t.SPR_SHT2,frame:7,tics:6,action:"A_CloseShotgun2",nextstate:statenum_t.S_DSGUN10},		// S_DSGUN9
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:5,action:"A_ReFire",nextstate:statenum_t.S_DSGUN},				// S_DSGUN10
    {sprite:spritenum_t.SPR_SHT2,frame:1,tics:7,action:"NULL",nextstate:statenum_t.S_DSNR2},					// S_DSNR1
    {sprite:spritenum_t.SPR_SHT2,frame:0,tics:3,action:"NULL",nextstate:statenum_t.S_DSGUNDOWN},				// S_DSNR2
    {sprite:spritenum_t.SPR_SHT2,frame:32776,tics:5,action:"A_Light1",nextstate:statenum_t.S_DSGUNFLASH2},		// S_DSGUNFLASH1
    {sprite:spritenum_t.SPR_SHT2,frame:32777,tics:4,action:"A_Light2",nextstate:statenum_t.S_LIGHTDONE},		// S_DSGUNFLASH2
    {sprite:spritenum_t.SPR_CHGG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_CHAIN},			// S_CHAIN
    {sprite:spritenum_t.SPR_CHGG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_CHAINDOWN},				// S_CHAINDOWN
    {sprite:spritenum_t.SPR_CHGG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_CHAINUP},				// S_CHAINUP
    {sprite:spritenum_t.SPR_CHGG,frame:0,tics:4,action:"A_FireCGun",nextstate:statenum_t.S_CHAIN2},				// S_CHAIN1
    {sprite:spritenum_t.SPR_CHGG,frame:1,tics:4,action:"A_FireCGun",nextstate:statenum_t.S_CHAIN3},				// S_CHAIN2
    {sprite:spritenum_t.SPR_CHGG,frame:1,tics:0,action:"A_ReFire",nextstate:statenum_t.S_CHAIN},				// S_CHAIN3
    {sprite:spritenum_t.SPR_CHGF,frame:32768,tics:5,action:"A_Light1",nextstate:statenum_t.S_LIGHTDONE},		// S_CHAINFLASH1
    {sprite:spritenum_t.SPR_CHGF,frame:32769,tics:5,action:"A_Light2",nextstate:statenum_t.S_LIGHTDONE},		// S_CHAINFLASH2
    {sprite:spritenum_t.SPR_MISG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_MISSILE},			// S_MISSILE
    {sprite:spritenum_t.SPR_MISG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_MISSILEDOWN},			// S_MISSILEDOWN
    {sprite:spritenum_t.SPR_MISG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_MISSILEUP},				// S_MISSILEUP
    {sprite:spritenum_t.SPR_MISG,frame:1,tics:8,action:"A_GunFlash",nextstate:statenum_t.S_MISSILE2},			// S_MISSILE1
    {sprite:spritenum_t.SPR_MISG,frame:1,tics:12,action:"A_FireMissile",nextstate:statenum_t.S_MISSILE3},		// S_MISSILE2
    {sprite:spritenum_t.SPR_MISG,frame:1,tics:0,action:"A_ReFire",nextstate:statenum_t.S_MISSILE},				// S_MISSILE3
    {sprite:spritenum_t.SPR_MISF,frame:32768,tics:3,action:"A_Light1",nextstate:statenum_t.S_MISSILEFLASH2},	// S_MISSILEFLASH1
    {sprite:spritenum_t.SPR_MISF,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_MISSILEFLASH3},		// S_MISSILEFLASH2
    {sprite:spritenum_t.SPR_MISF,frame:32770,tics:4,action:"A_Light2",nextstate:statenum_t.S_MISSILEFLASH4},	// S_MISSILEFLASH3
    {sprite:spritenum_t.SPR_MISF,frame:32771,tics:4,action:"A_Light2",nextstate:statenum_t.S_LIGHTDONE},		// S_MISSILEFLASH4
    {sprite:spritenum_t.SPR_SAWG,frame:2,tics:4,action:"A_WeaponReady",nextstate:statenum_t.S_SAWB},			// S_SAW
    {sprite:spritenum_t.SPR_SAWG,frame:3,tics:4,action:"A_WeaponReady",nextstate:statenum_t.S_SAW},				// S_SAWB
    {sprite:spritenum_t.SPR_SAWG,frame:2,tics:1,action:"A_Lower",nextstate:statenum_t.S_SAWDOWN},				// S_SAWDOWN
    {sprite:spritenum_t.SPR_SAWG,frame:2,tics:1,action:"A_Raise",nextstate:statenum_t.S_SAWUP},					// S_SAWUP
    {sprite:spritenum_t.SPR_SAWG,frame:0,tics:4,action:"A_Saw",nextstate:statenum_t.S_SAW2},					// S_SAW1
    {sprite:spritenum_t.SPR_SAWG,frame:1,tics:4,action:"A_Saw",nextstate:statenum_t.S_SAW3},					// S_SAW2
    {sprite:spritenum_t.SPR_SAWG,frame:1,tics:0,action:"A_ReFire",nextstate:statenum_t.S_SAW},					// S_SAW3
    {sprite:spritenum_t.SPR_PLSG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_PLASMA},			// S_PLASMA
    {sprite:spritenum_t.SPR_PLSG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_PLASMADOWN},			// S_PLASMADOWN
    {sprite:spritenum_t.SPR_PLSG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_PLASMAUP},				// S_PLASMAUP
    {sprite:spritenum_t.SPR_PLSG,frame:0,tics:3,action:"A_FirePlasma",nextstate:statenum_t.S_PLASMA2},			// S_PLASMA1
    {sprite:spritenum_t.SPR_PLSG,frame:1,tics:20,action:"A_ReFire",nextstate:statenum_t.S_PLASMA},				// S_PLASMA2
    {sprite:spritenum_t.SPR_PLSF,frame:32768,tics:4,action:"A_Light1",nextstate:statenum_t.S_LIGHTDONE},		// S_PLASMAFLASH1
    {sprite:spritenum_t.SPR_PLSF,frame:32769,tics:4,action:"A_Light1",nextstate:statenum_t.S_LIGHTDONE},		// S_PLASMAFLASH2
    {sprite:spritenum_t.SPR_BFGG,frame:0,tics:1,action:"A_WeaponReady",nextstate:statenum_t.S_BFG},				// S_BFG
    {sprite:spritenum_t.SPR_BFGG,frame:0,tics:1,action:"A_Lower",nextstate:statenum_t.S_BFGDOWN},				// S_BFGDOWN
    {sprite:spritenum_t.SPR_BFGG,frame:0,tics:1,action:"A_Raise",nextstate:statenum_t.S_BFGUP},					// S_BFGUP
    {sprite:spritenum_t.SPR_BFGG,frame:0,tics:20,action:"A_BFGsound",nextstate:statenum_t.S_BFG2},				// S_BFG1
    {sprite:spritenum_t.SPR_BFGG,frame:1,tics:10,action:"A_GunFlash",nextstate:statenum_t.S_BFG3},				// S_BFG2
    {sprite:spritenum_t.SPR_BFGG,frame:1,tics:10,action:"A_FireBFG",nextstate:statenum_t.S_BFG4},				// S_BFG3
    {sprite:spritenum_t.SPR_BFGG,frame:1,tics:20,action:"A_ReFire",nextstate:statenum_t.S_BFG},					// S_BFG4
    {sprite:spritenum_t.SPR_BFGF,frame:32768,tics:11,action:"A_Light1",nextstate:statenum_t.S_BFGFLASH2},		// S_BFGFLASH1
    {sprite:spritenum_t.SPR_BFGF,frame:32769,tics:6,action:"A_Light2",nextstate:statenum_t.S_LIGHTDONE},		// S_BFGFLASH2
    {sprite:spritenum_t.SPR_BLUD,frame:2,tics:8,action:"NULL",nextstate:statenum_t.S_BLOOD2},					// S_BLOOD1
    {sprite:spritenum_t.SPR_BLUD,frame:1,tics:8,action:"NULL",nextstate:statenum_t.S_BLOOD3},					// S_BLOOD2
    {sprite:spritenum_t.SPR_BLUD,frame:0,tics:8,action:"NULL",nextstate:statenum_t.S_NULL},						// S_BLOOD3
    {sprite:spritenum_t.SPR_PUFF,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_PUFF2},				// S_PUFF1
    {sprite:spritenum_t.SPR_PUFF,frame:1,tics:4,action:"NULL",nextstate:statenum_t.S_PUFF3},					// S_PUFF2
    {sprite:spritenum_t.SPR_PUFF,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_PUFF4},					// S_PUFF3
    {sprite:spritenum_t.SPR_PUFF,frame:3,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},						// S_PUFF4
    {sprite:spritenum_t.SPR_BAL1,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_TBALL2},				// S_TBALL1
    {sprite:spritenum_t.SPR_BAL1,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_TBALL1},				// S_TBALL2
    {sprite:spritenum_t.SPR_BAL1,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_TBALLX2},				// S_TBALLX1
    {sprite:spritenum_t.SPR_BAL1,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_TBALLX3},				// S_TBALLX2
    {sprite:spritenum_t.SPR_BAL1,frame:32772,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TBALLX3
    {sprite:spritenum_t.SPR_BAL2,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_RBALL2},				// S_RBALL1
    {sprite:spritenum_t.SPR_BAL2,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_RBALL1},				// S_RBALL2
    {sprite:spritenum_t.SPR_BAL2,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_RBALLX2},				// S_RBALLX1
    {sprite:spritenum_t.SPR_BAL2,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_RBALLX3},				// S_RBALLX2
    {sprite:spritenum_t.SPR_BAL2,frame:32772,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_RBALLX3
    {sprite:spritenum_t.SPR_PLSS,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_PLASBALL2},			// S_PLASBALL
    {sprite:spritenum_t.SPR_PLSS,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_PLASBALL},				// S_PLASBALL2
    {sprite:spritenum_t.SPR_PLSE,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_PLASEXP2},				// S_PLASEXP
    {sprite:spritenum_t.SPR_PLSE,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_PLASEXP3},				// S_PLASEXP2
    {sprite:spritenum_t.SPR_PLSE,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_PLASEXP4},				// S_PLASEXP3
    {sprite:spritenum_t.SPR_PLSE,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_PLASEXP5},				// S_PLASEXP4
    {sprite:spritenum_t.SPR_PLSE,frame:32772,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PLASEXP5
    {sprite:spritenum_t.SPR_MISL,frame:32768,tics:1,action:"NULL",nextstate:statenum_t.S_ROCKET},				// S_ROCKET
    {sprite:spritenum_t.SPR_BFS1,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_BFGSHOT2},				// S_BFGSHOT
    {sprite:spritenum_t.SPR_BFS1,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_BFGSHOT},				// S_BFGSHOT2
    {sprite:spritenum_t.SPR_BFE1,frame:32768,tics:8,action:"NULL",nextstate:statenum_t.S_BFGLAND2},				// S_BFGLAND
    {sprite:spritenum_t.SPR_BFE1,frame:32769,tics:8,action:"NULL",nextstate:statenum_t.S_BFGLAND3},				// S_BFGLAND2
    {sprite:spritenum_t.SPR_BFE1,frame:32770,tics:8,action:"A_BFGSpray",nextstate:statenum_t.S_BFGLAND4},		// S_BFGLAND3
    {sprite:spritenum_t.SPR_BFE1,frame:32771,tics:8,action:"NULL",nextstate:statenum_t.S_BFGLAND5},				// S_BFGLAND4
    {sprite:spritenum_t.SPR_BFE1,frame:32772,tics:8,action:"NULL",nextstate:statenum_t.S_BFGLAND6},				// S_BFGLAND5
    {sprite:spritenum_t.SPR_BFE1,frame:32773,tics:8,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BFGLAND6
    {sprite:spritenum_t.SPR_BFE2,frame:32768,tics:8,action:"NULL",nextstate:statenum_t.S_BFGEXP2},				// S_BFGEXP
    {sprite:spritenum_t.SPR_BFE2,frame:32769,tics:8,action:"NULL",nextstate:statenum_t.S_BFGEXP3},				// S_BFGEXP2
    {sprite:spritenum_t.SPR_BFE2,frame:32770,tics:8,action:"NULL",nextstate:statenum_t.S_BFGEXP4},				// S_BFGEXP3
    {sprite:spritenum_t.SPR_BFE2,frame:32771,tics:8,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BFGEXP4
    {sprite:spritenum_t.SPR_MISL,frame:32769,tics:8,action:"A_Explode",nextstate:statenum_t.S_EXPLODE2},		// S_EXPLODE1
    {sprite:spritenum_t.SPR_MISL,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_EXPLODE3},				// S_EXPLODE2
    {sprite:spritenum_t.SPR_MISL,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},					// S_EXPLODE3
    {sprite:spritenum_t.SPR_TFOG,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG01},				// S_TFOG
    {sprite:spritenum_t.SPR_TFOG,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG02},				// S_TFOG01
    {sprite:spritenum_t.SPR_TFOG,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG2},				// S_TFOG02
    {sprite:spritenum_t.SPR_TFOG,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG3},				// S_TFOG2
    {sprite:spritenum_t.SPR_TFOG,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG4},				// S_TFOG3
    {sprite:spritenum_t.SPR_TFOG,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG5},				// S_TFOG4
    {sprite:spritenum_t.SPR_TFOG,frame:32772,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG6},				// S_TFOG5
    {sprite:spritenum_t.SPR_TFOG,frame:32773,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG7},				// S_TFOG6
    {sprite:spritenum_t.SPR_TFOG,frame:32774,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG8},				// S_TFOG7
    {sprite:spritenum_t.SPR_TFOG,frame:32775,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG9},				// S_TFOG8
    {sprite:spritenum_t.SPR_TFOG,frame:32776,tics:6,action:"NULL",nextstate:statenum_t.S_TFOG10},				// S_TFOG9
    {sprite:spritenum_t.SPR_TFOG,frame:32777,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TFOG10
    {sprite:spritenum_t.SPR_IFOG,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG01},				// S_IFOG
    {sprite:spritenum_t.SPR_IFOG,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG02},				// S_IFOG01
    {sprite:spritenum_t.SPR_IFOG,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG2},				// S_IFOG02
    {sprite:spritenum_t.SPR_IFOG,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG3},				// S_IFOG2
    {sprite:spritenum_t.SPR_IFOG,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG4},				// S_IFOG3
    {sprite:spritenum_t.SPR_IFOG,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_IFOG5},				// S_IFOG4
    {sprite:spritenum_t.SPR_IFOG,frame:32772,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_IFOG5
    {sprite:spritenum_t.SPR_PLAY,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PLAY
    {sprite:spritenum_t.SPR_PLAY,frame:0,tics:4,action:"NULL",nextstate:statenum_t.S_PLAY_RUN2},				// S_PLAY_RUN1
    {sprite:spritenum_t.SPR_PLAY,frame:1,tics:4,action:"NULL",nextstate:statenum_t.S_PLAY_RUN3},				// S_PLAY_RUN2
    {sprite:spritenum_t.SPR_PLAY,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_PLAY_RUN4},				// S_PLAY_RUN3
    {sprite:spritenum_t.SPR_PLAY,frame:3,tics:4,action:"NULL",nextstate:statenum_t.S_PLAY_RUN1},				// S_PLAY_RUN4
    {sprite:spritenum_t.SPR_PLAY,frame:4,tics:12,action:"NULL",nextstate:statenum_t.S_PLAY},					// S_PLAY_ATK1
    {sprite:spritenum_t.SPR_PLAY,frame:32773,tics:6,action:"NULL",nextstate:statenum_t.S_PLAY_ATK1},			// S_PLAY_ATK2
    {sprite:spritenum_t.SPR_PLAY,frame:6,tics:4,action:"NULL",nextstate:statenum_t.S_PLAY_PAIN2},				// S_PLAY_PAIN
    {sprite:spritenum_t.SPR_PLAY,frame:6,tics:4,action:"A_Pain",nextstate:statenum_t.S_PLAY},					// S_PLAY_PAIN2
    {sprite:spritenum_t.SPR_PLAY,frame:7,tics:10,action:"NULL",nextstate:statenum_t.S_PLAY_DIE2},				// S_PLAY_DIE1
    {sprite:spritenum_t.SPR_PLAY,frame:8,tics:10,action:"A_PlayerScream",nextstate:statenum_t.S_PLAY_DIE3},		// S_PLAY_DIE2
    {sprite:spritenum_t.SPR_PLAY,frame:9,tics:10,action:"A_Fall",nextstate:statenum_t.S_PLAY_DIE4},				// S_PLAY_DIE3
    {sprite:spritenum_t.SPR_PLAY,frame:10,tics:10,action:"NULL",nextstate:statenum_t.S_PLAY_DIE5},				// S_PLAY_DIE4
    {sprite:spritenum_t.SPR_PLAY,frame:11,tics:10,action:"NULL",nextstate:statenum_t.S_PLAY_DIE6},				// S_PLAY_DIE5
    {sprite:spritenum_t.SPR_PLAY,frame:12,tics:10,action:"NULL",nextstate:statenum_t.S_PLAY_DIE7},				// S_PLAY_DIE6
    {sprite:spritenum_t.SPR_PLAY,frame:13,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PLAY_DIE7
    {sprite:spritenum_t.SPR_PLAY,frame:14,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE2},				// S_PLAY_XDIE1
    {sprite:spritenum_t.SPR_PLAY,frame:15,tics:5,action:"A_XScream",nextstate:statenum_t.S_PLAY_XDIE3},			// S_PLAY_XDIE2
    {sprite:spritenum_t.SPR_PLAY,frame:16,tics:5,action:"A_Fall",nextstate:statenum_t.S_PLAY_XDIE4},			// S_PLAY_XDIE3
    {sprite:spritenum_t.SPR_PLAY,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE5},				// S_PLAY_XDIE4
    {sprite:spritenum_t.SPR_PLAY,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE6},				// S_PLAY_XDIE5
    {sprite:spritenum_t.SPR_PLAY,frame:19,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE7},				// S_PLAY_XDIE6
    {sprite:spritenum_t.SPR_PLAY,frame:20,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE8},				// S_PLAY_XDIE7
    {sprite:spritenum_t.SPR_PLAY,frame:21,tics:5,action:"NULL",nextstate:statenum_t.S_PLAY_XDIE9},				// S_PLAY_XDIE8
    {sprite:spritenum_t.SPR_PLAY,frame:22,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PLAY_XDIE9
    {sprite:spritenum_t.SPR_POSS,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_POSS_STND2},			// S_POSS_STND
    {sprite:spritenum_t.SPR_POSS,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_POSS_STND},				// S_POSS_STND2
    {sprite:spritenum_t.SPR_POSS,frame:0,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN2},				// S_POSS_RUN1
    {sprite:spritenum_t.SPR_POSS,frame:0,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN3},				// S_POSS_RUN2
    {sprite:spritenum_t.SPR_POSS,frame:1,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN4},				// S_POSS_RUN3
    {sprite:spritenum_t.SPR_POSS,frame:1,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN5},				// S_POSS_RUN4
    {sprite:spritenum_t.SPR_POSS,frame:2,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN6},				// S_POSS_RUN5
    {sprite:spritenum_t.SPR_POSS,frame:2,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN7},				// S_POSS_RUN6
    {sprite:spritenum_t.SPR_POSS,frame:3,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN8},				// S_POSS_RUN7
    {sprite:spritenum_t.SPR_POSS,frame:3,tics:4,action:"A_Chase",nextstate:statenum_t.S_POSS_RUN1},				// S_POSS_RUN8
    {sprite:spritenum_t.SPR_POSS,frame:4,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_POSS_ATK2},		// S_POSS_ATK1
    {sprite:spritenum_t.SPR_POSS,frame:5,tics:8,action:"A_PosAttack",nextstate:statenum_t.S_POSS_ATK3},			// S_POSS_ATK2
    {sprite:spritenum_t.SPR_POSS,frame:4,tics:8,action:"NULL",nextstate:statenum_t.S_POSS_RUN1},				// S_POSS_ATK3
    {sprite:spritenum_t.SPR_POSS,frame:6,tics:3,action:"NULL",nextstate:statenum_t.S_POSS_PAIN2},				// S_POSS_PAIN
    {sprite:spritenum_t.SPR_POSS,frame:6,tics:3,action:"A_Pain",nextstate:statenum_t.S_POSS_RUN1},				// S_POSS_PAIN2
    {sprite:spritenum_t.SPR_POSS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_DIE2},				// S_POSS_DIE1
    {sprite:spritenum_t.SPR_POSS,frame:8,tics:5,action:"A_Scream",nextstate:statenum_t.S_POSS_DIE3},			// S_POSS_DIE2
    {sprite:spritenum_t.SPR_POSS,frame:9,tics:5,action:"A_Fall",nextstate:statenum_t.S_POSS_DIE4},				// S_POSS_DIE3
    {sprite:spritenum_t.SPR_POSS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_DIE5},				// S_POSS_DIE4
    {sprite:spritenum_t.SPR_POSS,frame:11,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_POSS_DIE5
    {sprite:spritenum_t.SPR_POSS,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE2},				// S_POSS_XDIE1
    {sprite:spritenum_t.SPR_POSS,frame:13,tics:5,action:"A_XScream",nextstate:statenum_t.S_POSS_XDIE3},			// S_POSS_XDIE2
    {sprite:spritenum_t.SPR_POSS,frame:14,tics:5,action:"A_Fall",nextstate:statenum_t.S_POSS_XDIE4},			// S_POSS_XDIE3
    {sprite:spritenum_t.SPR_POSS,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE5},				// S_POSS_XDIE4
    {sprite:spritenum_t.SPR_POSS,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE6},				// S_POSS_XDIE5
    {sprite:spritenum_t.SPR_POSS,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE7},				// S_POSS_XDIE6
    {sprite:spritenum_t.SPR_POSS,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE8},				// S_POSS_XDIE7
    {sprite:spritenum_t.SPR_POSS,frame:19,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_XDIE9},				// S_POSS_XDIE8
    {sprite:spritenum_t.SPR_POSS,frame:20,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_POSS_XDIE9
    {sprite:spritenum_t.SPR_POSS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_RAISE2},				// S_POSS_RAISE1
    {sprite:spritenum_t.SPR_POSS,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_RAISE3},				// S_POSS_RAISE2
    {sprite:spritenum_t.SPR_POSS,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_RAISE4},				// S_POSS_RAISE3
    {sprite:spritenum_t.SPR_POSS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_POSS_RUN1},				// S_POSS_RAISE4
    {sprite:spritenum_t.SPR_SPOS,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_SPOS_STND2},			// S_SPOS_STND
    {sprite:spritenum_t.SPR_SPOS,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_SPOS_STND},				// S_SPOS_STND2
    {sprite:spritenum_t.SPR_SPOS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN2},				// S_SPOS_RUN1
    {sprite:spritenum_t.SPR_SPOS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN3},				// S_SPOS_RUN2
    {sprite:spritenum_t.SPR_SPOS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN4},				// S_SPOS_RUN3
    {sprite:spritenum_t.SPR_SPOS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN5},				// S_SPOS_RUN4
    {sprite:spritenum_t.SPR_SPOS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN6},				// S_SPOS_RUN5
    {sprite:spritenum_t.SPR_SPOS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN7},				// S_SPOS_RUN6
    {sprite:spritenum_t.SPR_SPOS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN8},				// S_SPOS_RUN7
    {sprite:spritenum_t.SPR_SPOS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPOS_RUN1},				// S_SPOS_RUN8
    {sprite:spritenum_t.SPR_SPOS,frame:4,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SPOS_ATK2},		// S_SPOS_ATK1
    {sprite:spritenum_t.SPR_SPOS,frame:32773,tics:10,action:"A_SPosAttack",nextstate:statenum_t.S_SPOS_ATK3},	// S_SPOS_ATK2
    {sprite:spritenum_t.SPR_SPOS,frame:4,tics:10,action:"NULL",nextstate:statenum_t.S_SPOS_RUN1},				// S_SPOS_ATK3
    {sprite:spritenum_t.SPR_SPOS,frame:6,tics:3,action:"NULL",nextstate:statenum_t.S_SPOS_PAIN2},				// S_SPOS_PAIN
    {sprite:spritenum_t.SPR_SPOS,frame:6,tics:3,action:"A_Pain",nextstate:statenum_t.S_SPOS_RUN1},				// S_SPOS_PAIN2
    {sprite:spritenum_t.SPR_SPOS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_DIE2},				// S_SPOS_DIE1
    {sprite:spritenum_t.SPR_SPOS,frame:8,tics:5,action:"A_Scream",nextstate:statenum_t.S_SPOS_DIE3},			// S_SPOS_DIE2
    {sprite:spritenum_t.SPR_SPOS,frame:9,tics:5,action:"A_Fall",nextstate:statenum_t.S_SPOS_DIE4},				// S_SPOS_DIE3
    {sprite:spritenum_t.SPR_SPOS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_DIE5},				// S_SPOS_DIE4
    {sprite:spritenum_t.SPR_SPOS,frame:11,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SPOS_DIE5
    {sprite:spritenum_t.SPR_SPOS,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE2},				// S_SPOS_XDIE1
    {sprite:spritenum_t.SPR_SPOS,frame:13,tics:5,action:"A_XScream",nextstate:statenum_t.S_SPOS_XDIE3},			// S_SPOS_XDIE2
    {sprite:spritenum_t.SPR_SPOS,frame:14,tics:5,action:"A_Fall",nextstate:statenum_t.S_SPOS_XDIE4},			// S_SPOS_XDIE3
    {sprite:spritenum_t.SPR_SPOS,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE5},				// S_SPOS_XDIE4
    {sprite:spritenum_t.SPR_SPOS,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE6},				// S_SPOS_XDIE5
    {sprite:spritenum_t.SPR_SPOS,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE7},				// S_SPOS_XDIE6
    {sprite:spritenum_t.SPR_SPOS,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE8},				// S_SPOS_XDIE7
    {sprite:spritenum_t.SPR_SPOS,frame:19,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_XDIE9},				// S_SPOS_XDIE8
    {sprite:spritenum_t.SPR_SPOS,frame:20,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SPOS_XDIE9
    {sprite:spritenum_t.SPR_SPOS,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_RAISE2},				// S_SPOS_RAISE1
    {sprite:spritenum_t.SPR_SPOS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_RAISE3},				// S_SPOS_RAISE2
    {sprite:spritenum_t.SPR_SPOS,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_RAISE4},				// S_SPOS_RAISE3
    {sprite:spritenum_t.SPR_SPOS,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_RAISE5},				// S_SPOS_RAISE4
    {sprite:spritenum_t.SPR_SPOS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_SPOS_RUN1},				// S_SPOS_RAISE5
    {sprite:spritenum_t.SPR_VILE,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_VILE_STND2},			// S_VILE_STND
    {sprite:spritenum_t.SPR_VILE,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_VILE_STND},				// S_VILE_STND2
    {sprite:spritenum_t.SPR_VILE,frame:0,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN2},			// S_VILE_RUN1
    {sprite:spritenum_t.SPR_VILE,frame:0,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN3},			// S_VILE_RUN2
    {sprite:spritenum_t.SPR_VILE,frame:1,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN4},			// S_VILE_RUN3
    {sprite:spritenum_t.SPR_VILE,frame:1,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN5},			// S_VILE_RUN4
    {sprite:spritenum_t.SPR_VILE,frame:2,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN6},			// S_VILE_RUN5
    {sprite:spritenum_t.SPR_VILE,frame:2,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN7},			// S_VILE_RUN6
    {sprite:spritenum_t.SPR_VILE,frame:3,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN8},			// S_VILE_RUN7
    {sprite:spritenum_t.SPR_VILE,frame:3,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN9},			// S_VILE_RUN8
    {sprite:spritenum_t.SPR_VILE,frame:4,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN10},		// S_VILE_RUN9
    {sprite:spritenum_t.SPR_VILE,frame:4,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN11},		// S_VILE_RUN10
    {sprite:spritenum_t.SPR_VILE,frame:5,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN12},		// S_VILE_RUN11
    {sprite:spritenum_t.SPR_VILE,frame:5,tics:2,action:"A_VileChase",nextstate:statenum_t.S_VILE_RUN1},			// S_VILE_RUN12
    {sprite:spritenum_t.SPR_VILE,frame:32774,tics:0,action:"A_VileStart",nextstate:statenum_t.S_VILE_ATK2},		// S_VILE_ATK1
    {sprite:spritenum_t.SPR_VILE,frame:32774,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK3},	// S_VILE_ATK2
    {sprite:spritenum_t.SPR_VILE,frame:32775,tics:8,action:"A_VileTarget",nextstate:statenum_t.S_VILE_ATK4},	// S_VILE_ATK3
    {sprite:spritenum_t.SPR_VILE,frame:32776,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK5},	// S_VILE_ATK4
    {sprite:spritenum_t.SPR_VILE,frame:32777,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK6},	// S_VILE_ATK5
    {sprite:spritenum_t.SPR_VILE,frame:32778,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK7},	// S_VILE_ATK6
    {sprite:spritenum_t.SPR_VILE,frame:32779,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK8},	// S_VILE_ATK7
    {sprite:spritenum_t.SPR_VILE,frame:32780,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK9},	// S_VILE_ATK8
    {sprite:spritenum_t.SPR_VILE,frame:32781,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_VILE_ATK10},	// S_VILE_ATK9
    {sprite:spritenum_t.SPR_VILE,frame:32782,tics:8,action:"A_VileAttack",nextstate:statenum_t.S_VILE_ATK11},	// S_VILE_ATK10
    {sprite:spritenum_t.SPR_VILE,frame:32783,tics:20,action:"NULL",nextstate:statenum_t.S_VILE_RUN1},			// S_VILE_ATK11
    {sprite:spritenum_t.SPR_VILE,frame:32794,tics:10,action:"NULL",nextstate:statenum_t.S_VILE_HEAL2},			// S_VILE_HEAL1
    {sprite:spritenum_t.SPR_VILE,frame:32795,tics:10,action:"NULL",nextstate:statenum_t.S_VILE_HEAL3},			// S_VILE_HEAL2
    {sprite:spritenum_t.SPR_VILE,frame:32796,tics:10,action:"NULL",nextstate:statenum_t.S_VILE_RUN1},			// S_VILE_HEAL3
    {sprite:spritenum_t.SPR_VILE,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_VILE_PAIN2},				// S_VILE_PAIN
    {sprite:spritenum_t.SPR_VILE,frame:16,tics:5,action:"A_Pain",nextstate:statenum_t.S_VILE_RUN1},				// S_VILE_PAIN2
    {sprite:spritenum_t.SPR_VILE,frame:16,tics:7,action:"NULL",nextstate:statenum_t.S_VILE_DIE2},				// S_VILE_DIE1
    {sprite:spritenum_t.SPR_VILE,frame:17,tics:7,action:"A_Scream",nextstate:statenum_t.S_VILE_DIE3},			// S_VILE_DIE2
    {sprite:spritenum_t.SPR_VILE,frame:18,tics:7,action:"A_Fall",nextstate:statenum_t.S_VILE_DIE4},				// S_VILE_DIE3
    {sprite:spritenum_t.SPR_VILE,frame:19,tics:7,action:"NULL",nextstate:statenum_t.S_VILE_DIE5},				// S_VILE_DIE4
    {sprite:spritenum_t.SPR_VILE,frame:20,tics:7,action:"NULL",nextstate:statenum_t.S_VILE_DIE6},				// S_VILE_DIE5
    {sprite:spritenum_t.SPR_VILE,frame:21,tics:7,action:"NULL",nextstate:statenum_t.S_VILE_DIE7},				// S_VILE_DIE6
    {sprite:spritenum_t.SPR_VILE,frame:22,tics:7,action:"NULL",nextstate:statenum_t.S_VILE_DIE8},				// S_VILE_DIE7
    {sprite:spritenum_t.SPR_VILE,frame:23,tics:5,action:"NULL",nextstate:statenum_t.S_VILE_DIE9},				// S_VILE_DIE8
    {sprite:spritenum_t.SPR_VILE,frame:24,tics:5,action:"NULL",nextstate:statenum_t.S_VILE_DIE10},				// S_VILE_DIE9
    {sprite:spritenum_t.SPR_VILE,frame:25,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_VILE_DIE10
    {sprite:spritenum_t.SPR_FIRE,frame:32768,tics:2,action:"A_StartFire",nextstate:statenum_t.S_FIRE2},			// S_FIRE1
    {sprite:spritenum_t.SPR_FIRE,frame:32769,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE3},				// S_FIRE2
    {sprite:spritenum_t.SPR_FIRE,frame:32768,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE4},				// S_FIRE3
    {sprite:spritenum_t.SPR_FIRE,frame:32769,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE5},				// S_FIRE4
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:2,action:"A_FireCrackle",nextstate:statenum_t.S_FIRE6},		// S_FIRE5
    {sprite:spritenum_t.SPR_FIRE,frame:32769,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE7},				// S_FIRE6
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE8},				// S_FIRE7
    {sprite:spritenum_t.SPR_FIRE,frame:32769,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE9},				// S_FIRE8
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE10},				// S_FIRE9
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE11},				// S_FIRE10
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE12},				// S_FIRE11
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE13},				// S_FIRE12
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE14},				// S_FIRE13
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE15},				// S_FIRE14
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE16},				// S_FIRE15
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE17},				// S_FIRE16
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE18},				// S_FIRE17
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE19},				// S_FIRE18
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:2,action:"A_FireCrackle",nextstate:statenum_t.S_FIRE20},		// S_FIRE19
    {sprite:spritenum_t.SPR_FIRE,frame:32773,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE21},				// S_FIRE20
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE22},				// S_FIRE21
    {sprite:spritenum_t.SPR_FIRE,frame:32773,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE23},				// S_FIRE22
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE24},				// S_FIRE23
    {sprite:spritenum_t.SPR_FIRE,frame:32773,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE25},				// S_FIRE24
    {sprite:spritenum_t.SPR_FIRE,frame:32774,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE26},				// S_FIRE25
    {sprite:spritenum_t.SPR_FIRE,frame:32775,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE27},				// S_FIRE26
    {sprite:spritenum_t.SPR_FIRE,frame:32774,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE28},				// S_FIRE27
    {sprite:spritenum_t.SPR_FIRE,frame:32775,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE29},				// S_FIRE28
    {sprite:spritenum_t.SPR_FIRE,frame:32774,tics:2,action:"A_Fire",nextstate:statenum_t.S_FIRE30},				// S_FIRE29
    {sprite:spritenum_t.SPR_FIRE,frame:32775,tics:2,action:"A_Fire",nextstate:statenum_t.S_NULL},				// S_FIRE30
    {sprite:spritenum_t.SPR_PUFF,frame:1,tics:4,action:"NULL",nextstate:statenum_t.S_SMOKE2},					// S_SMOKE1
    {sprite:spritenum_t.SPR_PUFF,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_SMOKE3},					// S_SMOKE2
    {sprite:spritenum_t.SPR_PUFF,frame:1,tics:4,action:"NULL",nextstate:statenum_t.S_SMOKE4},					// S_SMOKE3
    {sprite:spritenum_t.SPR_PUFF,frame:2,tics:4,action:"NULL",nextstate:statenum_t.S_SMOKE5},					// S_SMOKE4
    {sprite:spritenum_t.SPR_PUFF,frame:3,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},						// S_SMOKE5
    {sprite:spritenum_t.SPR_FATB,frame:32768,tics:2,action:"A_Tracer",nextstate:statenum_t.S_TRACER2},			// S_TRACER
    {sprite:spritenum_t.SPR_FATB,frame:32769,tics:2,action:"A_Tracer",nextstate:statenum_t.S_TRACER},			// S_TRACER2
    {sprite:spritenum_t.SPR_FBXP,frame:32768,tics:8,action:"NULL",nextstate:statenum_t.S_TRACEEXP2},			// S_TRACEEXP1
    {sprite:spritenum_t.SPR_FBXP,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_TRACEEXP3},			// S_TRACEEXP2
    {sprite:spritenum_t.SPR_FBXP,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TRACEEXP3
    {sprite:spritenum_t.SPR_SKEL,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_SKEL_STND2},			// S_SKEL_STND
    {sprite:spritenum_t.SPR_SKEL,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_SKEL_STND},				// S_SKEL_STND2
    {sprite:spritenum_t.SPR_SKEL,frame:0,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN2},				// S_SKEL_RUN1
    {sprite:spritenum_t.SPR_SKEL,frame:0,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN3},				// S_SKEL_RUN2
    {sprite:spritenum_t.SPR_SKEL,frame:1,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN4},				// S_SKEL_RUN3
    {sprite:spritenum_t.SPR_SKEL,frame:1,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN5},				// S_SKEL_RUN4
    {sprite:spritenum_t.SPR_SKEL,frame:2,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN6},				// S_SKEL_RUN5
    {sprite:spritenum_t.SPR_SKEL,frame:2,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN7},				// S_SKEL_RUN6
    {sprite:spritenum_t.SPR_SKEL,frame:3,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN8},				// S_SKEL_RUN7
    {sprite:spritenum_t.SPR_SKEL,frame:3,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN9},				// S_SKEL_RUN8
    {sprite:spritenum_t.SPR_SKEL,frame:4,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN10},			// S_SKEL_RUN9
    {sprite:spritenum_t.SPR_SKEL,frame:4,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN11},			// S_SKEL_RUN10
    {sprite:spritenum_t.SPR_SKEL,frame:5,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN12},			// S_SKEL_RUN11
    {sprite:spritenum_t.SPR_SKEL,frame:5,tics:2,action:"A_Chase",nextstate:statenum_t.S_SKEL_RUN1},				// S_SKEL_RUN12
    {sprite:spritenum_t.SPR_SKEL,frame:6,tics:0,action:"A_FaceTarget",nextstate:statenum_t.S_SKEL_FIST2},		// S_SKEL_FIST1
    {sprite:spritenum_t.SPR_SKEL,frame:6,tics:6,action:"A_SkelWhoosh",nextstate:statenum_t.S_SKEL_FIST3},		// S_SKEL_FIST2
    {sprite:spritenum_t.SPR_SKEL,frame:7,tics:6,action:"A_FaceTarget",nextstate:statenum_t.S_SKEL_FIST4},		// S_SKEL_FIST3
    {sprite:spritenum_t.SPR_SKEL,frame:8,tics:6,action:"A_SkelFist",nextstate:statenum_t.S_SKEL_RUN1},			// S_SKEL_FIST4
    {sprite:spritenum_t.SPR_SKEL,frame:32777,tics:0,action:"A_FaceTarget",nextstate:statenum_t.S_SKEL_MISS2},	// S_SKEL_MISS1
    {sprite:spritenum_t.SPR_SKEL,frame:32777,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SKEL_MISS3},	// S_SKEL_MISS2
    {sprite:spritenum_t.SPR_SKEL,frame:10,tics:10,action:"A_SkelMissile",nextstate:statenum_t.S_SKEL_MISS4},	// S_SKEL_MISS3
    {sprite:spritenum_t.SPR_SKEL,frame:10,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SKEL_RUN1},		// S_SKEL_MISS4
    {sprite:spritenum_t.SPR_SKEL,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_PAIN2},				// S_SKEL_PAIN
    {sprite:spritenum_t.SPR_SKEL,frame:11,tics:5,action:"A_Pain",nextstate:statenum_t.S_SKEL_RUN1},				// S_SKEL_PAIN2
    {sprite:spritenum_t.SPR_SKEL,frame:11,tics:7,action:"NULL",nextstate:statenum_t.S_SKEL_DIE2},				// S_SKEL_DIE1
    {sprite:spritenum_t.SPR_SKEL,frame:12,tics:7,action:"NULL",nextstate:statenum_t.S_SKEL_DIE3},				// S_SKEL_DIE2
    {sprite:spritenum_t.SPR_SKEL,frame:13,tics:7,action:"A_Scream",nextstate:statenum_t.S_SKEL_DIE4},			// S_SKEL_DIE3
    {sprite:spritenum_t.SPR_SKEL,frame:14,tics:7,action:"A_Fall",nextstate:statenum_t.S_SKEL_DIE5},				// S_SKEL_DIE4
    {sprite:spritenum_t.SPR_SKEL,frame:15,tics:7,action:"NULL",nextstate:statenum_t.S_SKEL_DIE6},				// S_SKEL_DIE5
    {sprite:spritenum_t.SPR_SKEL,frame:16,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SKEL_DIE6
    {sprite:spritenum_t.SPR_SKEL,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RAISE2},				// S_SKEL_RAISE1
    {sprite:spritenum_t.SPR_SKEL,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RAISE3},				// S_SKEL_RAISE2
    {sprite:spritenum_t.SPR_SKEL,frame:14,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RAISE4},				// S_SKEL_RAISE3
    {sprite:spritenum_t.SPR_SKEL,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RAISE5},				// S_SKEL_RAISE4
    {sprite:spritenum_t.SPR_SKEL,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RAISE6},				// S_SKEL_RAISE5
    {sprite:spritenum_t.SPR_SKEL,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SKEL_RUN1},				// S_SKEL_RAISE6
    {sprite:spritenum_t.SPR_MANF,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_FATSHOT2},				// S_FATSHOT1
    {sprite:spritenum_t.SPR_MANF,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_FATSHOT1},				// S_FATSHOT2
    {sprite:spritenum_t.SPR_MISL,frame:32769,tics:8,action:"NULL",nextstate:statenum_t.S_FATSHOTX2},			// S_FATSHOTX1
    {sprite:spritenum_t.SPR_MISL,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_FATSHOTX3},			// S_FATSHOTX2
    {sprite:spritenum_t.SPR_MISL,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_NULL},					// S_FATSHOTX3
    {sprite:spritenum_t.SPR_FATT,frame:0,tics:15,action:"A_Look",nextstate:statenum_t.S_FATT_STND2},			// S_FATT_STND
    {sprite:spritenum_t.SPR_FATT,frame:1,tics:15,action:"A_Look",nextstate:statenum_t.S_FATT_STND},				// S_FATT_STND2
    {sprite:spritenum_t.SPR_FATT,frame:0,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN2},				// S_FATT_RUN1
    {sprite:spritenum_t.SPR_FATT,frame:0,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN3},				// S_FATT_RUN2
    {sprite:spritenum_t.SPR_FATT,frame:1,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN4},				// S_FATT_RUN3
    {sprite:spritenum_t.SPR_FATT,frame:1,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN5},				// S_FATT_RUN4
    {sprite:spritenum_t.SPR_FATT,frame:2,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN6},				// S_FATT_RUN5
    {sprite:spritenum_t.SPR_FATT,frame:2,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN7},				// S_FATT_RUN6
    {sprite:spritenum_t.SPR_FATT,frame:3,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN8},				// S_FATT_RUN7
    {sprite:spritenum_t.SPR_FATT,frame:3,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN9},				// S_FATT_RUN8
    {sprite:spritenum_t.SPR_FATT,frame:4,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN10},			// S_FATT_RUN9
    {sprite:spritenum_t.SPR_FATT,frame:4,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN11},			// S_FATT_RUN10
    {sprite:spritenum_t.SPR_FATT,frame:5,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN12},			// S_FATT_RUN11
    {sprite:spritenum_t.SPR_FATT,frame:5,tics:4,action:"A_Chase",nextstate:statenum_t.S_FATT_RUN1},				// S_FATT_RUN12
    {sprite:spritenum_t.SPR_FATT,frame:6,tics:20,action:"A_FatRaise",nextstate:statenum_t.S_FATT_ATK2},			// S_FATT_ATK1
    {sprite:spritenum_t.SPR_FATT,frame:32775,tics:10,action:"A_FatAttack1",nextstate:statenum_t.S_FATT_ATK3},	// S_FATT_ATK2
    {sprite:spritenum_t.SPR_FATT,frame:8,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_ATK4},		// S_FATT_ATK3
    {sprite:spritenum_t.SPR_FATT,frame:6,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_ATK5},		// S_FATT_ATK4
    {sprite:spritenum_t.SPR_FATT,frame:32775,tics:10,action:"A_FatAttack2",nextstate:statenum_t.S_FATT_ATK6},	// S_FATT_ATK5
    {sprite:spritenum_t.SPR_FATT,frame:8,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_ATK7},		// S_FATT_ATK6
    {sprite:spritenum_t.SPR_FATT,frame:6,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_ATK8},		// S_FATT_ATK7
    {sprite:spritenum_t.SPR_FATT,frame:32775,tics:10,action:"A_FatAttack3",nextstate:statenum_t.S_FATT_ATK9},	// S_FATT_ATK8
    {sprite:spritenum_t.SPR_FATT,frame:8,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_ATK10},		// S_FATT_ATK9
    {sprite:spritenum_t.SPR_FATT,frame:6,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_FATT_RUN1},		// S_FATT_ATK10
    {sprite:spritenum_t.SPR_FATT,frame:9,tics:3,action:"NULL",nextstate:statenum_t.S_FATT_PAIN2},				// S_FATT_PAIN
    {sprite:spritenum_t.SPR_FATT,frame:9,tics:3,action:"A_Pain",nextstate:statenum_t.S_FATT_RUN1},				// S_FATT_PAIN2
    {sprite:spritenum_t.SPR_FATT,frame:10,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE2},				// S_FATT_DIE1
    {sprite:spritenum_t.SPR_FATT,frame:11,tics:6,action:"A_Scream",nextstate:statenum_t.S_FATT_DIE3},			// S_FATT_DIE2
    {sprite:spritenum_t.SPR_FATT,frame:12,tics:6,action:"A_Fall",nextstate:statenum_t.S_FATT_DIE4},				// S_FATT_DIE3
    {sprite:spritenum_t.SPR_FATT,frame:13,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE5},				// S_FATT_DIE4
    {sprite:spritenum_t.SPR_FATT,frame:14,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE6},				// S_FATT_DIE5
    {sprite:spritenum_t.SPR_FATT,frame:15,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE7},				// S_FATT_DIE6
    {sprite:spritenum_t.SPR_FATT,frame:16,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE8},				// S_FATT_DIE7
    {sprite:spritenum_t.SPR_FATT,frame:17,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE9},				// S_FATT_DIE8
    {sprite:spritenum_t.SPR_FATT,frame:18,tics:6,action:"NULL",nextstate:statenum_t.S_FATT_DIE10},				// S_FATT_DIE9
    {sprite:spritenum_t.SPR_FATT,frame:19,tics:-1,action:"A_BossDeath",nextstate:statenum_t.S_NULL},			// S_FATT_DIE10
    {sprite:spritenum_t.SPR_FATT,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE2},				// S_FATT_RAISE1
    {sprite:spritenum_t.SPR_FATT,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE3},				// S_FATT_RAISE2
    {sprite:spritenum_t.SPR_FATT,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE4},				// S_FATT_RAISE3
    {sprite:spritenum_t.SPR_FATT,frame:14,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE5},				// S_FATT_RAISE4
    {sprite:spritenum_t.SPR_FATT,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE6},				// S_FATT_RAISE5
    {sprite:spritenum_t.SPR_FATT,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE7},				// S_FATT_RAISE6
    {sprite:spritenum_t.SPR_FATT,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RAISE8},				// S_FATT_RAISE7
    {sprite:spritenum_t.SPR_FATT,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_FATT_RUN1},				// S_FATT_RAISE8
    {sprite:spritenum_t.SPR_CPOS,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_CPOS_STND2},			// S_CPOS_STND
    {sprite:spritenum_t.SPR_CPOS,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_CPOS_STND},				// S_CPOS_STND2
    {sprite:spritenum_t.SPR_CPOS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN2},				// S_CPOS_RUN1
    {sprite:spritenum_t.SPR_CPOS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN3},				// S_CPOS_RUN2
    {sprite:spritenum_t.SPR_CPOS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN4},				// S_CPOS_RUN3
    {sprite:spritenum_t.SPR_CPOS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN5},				// S_CPOS_RUN4
    {sprite:spritenum_t.SPR_CPOS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN6},				// S_CPOS_RUN5
    {sprite:spritenum_t.SPR_CPOS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN7},				// S_CPOS_RUN6
    {sprite:spritenum_t.SPR_CPOS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN8},				// S_CPOS_RUN7
    {sprite:spritenum_t.SPR_CPOS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_CPOS_RUN1},				// S_CPOS_RUN8
    {sprite:spritenum_t.SPR_CPOS,frame:4,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_CPOS_ATK2},		// S_CPOS_ATK1
    {sprite:spritenum_t.SPR_CPOS,frame:32773,tics:4,action:"A_CPosAttack",nextstate:statenum_t.S_CPOS_ATK3},	// S_CPOS_ATK2
    {sprite:spritenum_t.SPR_CPOS,frame:32772,tics:4,action:"A_CPosAttack",nextstate:statenum_t.S_CPOS_ATK4},	// S_CPOS_ATK3
    {sprite:spritenum_t.SPR_CPOS,frame:5,tics:1,action:"A_CPosRefire",nextstate:statenum_t.S_CPOS_ATK2},		// S_CPOS_ATK4
    {sprite:spritenum_t.SPR_CPOS,frame:6,tics:3,action:"NULL",nextstate:statenum_t.S_CPOS_PAIN2},				// S_CPOS_PAIN
    {sprite:spritenum_t.SPR_CPOS,frame:6,tics:3,action:"A_Pain",nextstate:statenum_t.S_CPOS_RUN1},				// S_CPOS_PAIN2
    {sprite:spritenum_t.SPR_CPOS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_DIE2},				// S_CPOS_DIE1
    {sprite:spritenum_t.SPR_CPOS,frame:8,tics:5,action:"A_Scream",nextstate:statenum_t.S_CPOS_DIE3},			// S_CPOS_DIE2
    {sprite:spritenum_t.SPR_CPOS,frame:9,tics:5,action:"A_Fall",nextstate:statenum_t.S_CPOS_DIE4},				// S_CPOS_DIE3
    {sprite:spritenum_t.SPR_CPOS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_DIE5},				// S_CPOS_DIE4
    {sprite:spritenum_t.SPR_CPOS,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_DIE6},				// S_CPOS_DIE5
    {sprite:spritenum_t.SPR_CPOS,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_DIE7},				// S_CPOS_DIE6
    {sprite:spritenum_t.SPR_CPOS,frame:13,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CPOS_DIE7
    {sprite:spritenum_t.SPR_CPOS,frame:14,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_XDIE2},				// S_CPOS_XDIE1
    {sprite:spritenum_t.SPR_CPOS,frame:15,tics:5,action:"A_XScream",nextstate:statenum_t.S_CPOS_XDIE3},			// S_CPOS_XDIE2
    {sprite:spritenum_t.SPR_CPOS,frame:16,tics:5,action:"A_Fall",nextstate:statenum_t.S_CPOS_XDIE4},			// S_CPOS_XDIE3
    {sprite:spritenum_t.SPR_CPOS,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_XDIE5},				// S_CPOS_XDIE4
    {sprite:spritenum_t.SPR_CPOS,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_XDIE6},				// S_CPOS_XDIE5
    {sprite:spritenum_t.SPR_CPOS,frame:19,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CPOS_XDIE6
    {sprite:spritenum_t.SPR_CPOS,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE2},				// S_CPOS_RAISE1
    {sprite:spritenum_t.SPR_CPOS,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE3},				// S_CPOS_RAISE2
    {sprite:spritenum_t.SPR_CPOS,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE4},				// S_CPOS_RAISE3
    {sprite:spritenum_t.SPR_CPOS,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE5},				// S_CPOS_RAISE4
    {sprite:spritenum_t.SPR_CPOS,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE6},				// S_CPOS_RAISE5
    {sprite:spritenum_t.SPR_CPOS,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RAISE7},				// S_CPOS_RAISE6
    {sprite:spritenum_t.SPR_CPOS,frame:7,tics:5,action:"NULL",nextstate:statenum_t.S_CPOS_RUN1},				// S_CPOS_RAISE7
    {sprite:spritenum_t.SPR_TROO,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_TROO_STND2},			// S_TROO_STND
    {sprite:spritenum_t.SPR_TROO,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_TROO_STND},				// S_TROO_STND2
    {sprite:spritenum_t.SPR_TROO,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN2},				// S_TROO_RUN1
    {sprite:spritenum_t.SPR_TROO,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN3},				// S_TROO_RUN2
    {sprite:spritenum_t.SPR_TROO,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN4},				// S_TROO_RUN3
    {sprite:spritenum_t.SPR_TROO,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN5},				// S_TROO_RUN4
    {sprite:spritenum_t.SPR_TROO,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN6},				// S_TROO_RUN5
    {sprite:spritenum_t.SPR_TROO,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN7},				// S_TROO_RUN6
    {sprite:spritenum_t.SPR_TROO,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN8},				// S_TROO_RUN7
    {sprite:spritenum_t.SPR_TROO,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_TROO_RUN1},				// S_TROO_RUN8
    {sprite:spritenum_t.SPR_TROO,frame:4,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_TROO_ATK2},		// S_TROO_ATK1
    {sprite:spritenum_t.SPR_TROO,frame:5,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_TROO_ATK3},		// S_TROO_ATK2
    {sprite:spritenum_t.SPR_TROO,frame:6,tics:6,action:"A_TroopAttack",nextstate:statenum_t.S_TROO_RUN1},		// S_TROO_ATK3
    {sprite:spritenum_t.SPR_TROO,frame:7,tics:2,action:"NULL",nextstate:statenum_t.S_TROO_PAIN2},				// S_TROO_PAIN
    {sprite:spritenum_t.SPR_TROO,frame:7,tics:2,action:"A_Pain",nextstate:statenum_t.S_TROO_RUN1},				// S_TROO_PAIN2
    {sprite:spritenum_t.SPR_TROO,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_TROO_DIE2},				// S_TROO_DIE1
    {sprite:spritenum_t.SPR_TROO,frame:9,tics:8,action:"A_Scream",nextstate:statenum_t.S_TROO_DIE3},			// S_TROO_DIE2
    {sprite:spritenum_t.SPR_TROO,frame:10,tics:6,action:"NULL",nextstate:statenum_t.S_TROO_DIE4},				// S_TROO_DIE3
    {sprite:spritenum_t.SPR_TROO,frame:11,tics:6,action:"A_Fall",nextstate:statenum_t.S_TROO_DIE5},				// S_TROO_DIE4
    {sprite:spritenum_t.SPR_TROO,frame:12,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TROO_DIE5
    {sprite:spritenum_t.SPR_TROO,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_TROO_XDIE2},				// S_TROO_XDIE1
    {sprite:spritenum_t.SPR_TROO,frame:14,tics:5,action:"A_XScream",nextstate:statenum_t.S_TROO_XDIE3},			// S_TROO_XDIE2
    {sprite:spritenum_t.SPR_TROO,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_TROO_XDIE4},				// S_TROO_XDIE3
    {sprite:spritenum_t.SPR_TROO,frame:16,tics:5,action:"A_Fall",nextstate:statenum_t.S_TROO_XDIE5},			// S_TROO_XDIE4
    {sprite:spritenum_t.SPR_TROO,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_TROO_XDIE6},				// S_TROO_XDIE5
    {sprite:spritenum_t.SPR_TROO,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_TROO_XDIE7},				// S_TROO_XDIE6
    {sprite:spritenum_t.SPR_TROO,frame:19,tics:5,action:"NULL",nextstate:statenum_t.S_TROO_XDIE8},				// S_TROO_XDIE7
    {sprite:spritenum_t.SPR_TROO,frame:20,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TROO_XDIE8
    {sprite:spritenum_t.SPR_TROO,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_TROO_RAISE2},				// S_TROO_RAISE1
    {sprite:spritenum_t.SPR_TROO,frame:11,tics:8,action:"NULL",nextstate:statenum_t.S_TROO_RAISE3},				// S_TROO_RAISE2
    {sprite:spritenum_t.SPR_TROO,frame:10,tics:6,action:"NULL",nextstate:statenum_t.S_TROO_RAISE4},				// S_TROO_RAISE3
    {sprite:spritenum_t.SPR_TROO,frame:9,tics:6,action:"NULL",nextstate:statenum_t.S_TROO_RAISE5},				// S_TROO_RAISE4
    {sprite:spritenum_t.SPR_TROO,frame:8,tics:6,action:"NULL",nextstate:statenum_t.S_TROO_RUN1},				// S_TROO_RAISE5
    {sprite:spritenum_t.SPR_SARG,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_SARG_STND2},			// S_SARG_STND
    {sprite:spritenum_t.SPR_SARG,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_SARG_STND},				// S_SARG_STND2
    {sprite:spritenum_t.SPR_SARG,frame:0,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN2},				// S_SARG_RUN1
    {sprite:spritenum_t.SPR_SARG,frame:0,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN3},				// S_SARG_RUN2
    {sprite:spritenum_t.SPR_SARG,frame:1,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN4},				// S_SARG_RUN3
    {sprite:spritenum_t.SPR_SARG,frame:1,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN5},				// S_SARG_RUN4
    {sprite:spritenum_t.SPR_SARG,frame:2,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN6},				// S_SARG_RUN5
    {sprite:spritenum_t.SPR_SARG,frame:2,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN7},				// S_SARG_RUN6
    {sprite:spritenum_t.SPR_SARG,frame:3,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN8},				// S_SARG_RUN7
    {sprite:spritenum_t.SPR_SARG,frame:3,tics:2,action:"A_Chase",nextstate:statenum_t.S_SARG_RUN1},				// S_SARG_RUN8
    {sprite:spritenum_t.SPR_SARG,frame:4,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_SARG_ATK2},		// S_SARG_ATK1
    {sprite:spritenum_t.SPR_SARG,frame:5,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_SARG_ATK3},		// S_SARG_ATK2
    {sprite:spritenum_t.SPR_SARG,frame:6,tics:8,action:"A_SargAttack",nextstate:statenum_t.S_SARG_RUN1},		// S_SARG_ATK3
    {sprite:spritenum_t.SPR_SARG,frame:7,tics:2,action:"NULL",nextstate:statenum_t.S_SARG_PAIN2},				// S_SARG_PAIN
    {sprite:spritenum_t.SPR_SARG,frame:7,tics:2,action:"A_Pain",nextstate:statenum_t.S_SARG_RUN1},				// S_SARG_PAIN2
    {sprite:spritenum_t.SPR_SARG,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_SARG_DIE2},				// S_SARG_DIE1
    {sprite:spritenum_t.SPR_SARG,frame:9,tics:8,action:"A_Scream",nextstate:statenum_t.S_SARG_DIE3},			// S_SARG_DIE2
    {sprite:spritenum_t.SPR_SARG,frame:10,tics:4,action:"NULL",nextstate:statenum_t.S_SARG_DIE4},				// S_SARG_DIE3
    {sprite:spritenum_t.SPR_SARG,frame:11,tics:4,action:"A_Fall",nextstate:statenum_t.S_SARG_DIE5},				// S_SARG_DIE4
    {sprite:spritenum_t.SPR_SARG,frame:12,tics:4,action:"NULL",nextstate:statenum_t.S_SARG_DIE6},				// S_SARG_DIE5
    {sprite:spritenum_t.SPR_SARG,frame:13,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SARG_DIE6
    {sprite:spritenum_t.SPR_SARG,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RAISE2},				// S_SARG_RAISE1
    {sprite:spritenum_t.SPR_SARG,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RAISE3},				// S_SARG_RAISE2
    {sprite:spritenum_t.SPR_SARG,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RAISE4},				// S_SARG_RAISE3
    {sprite:spritenum_t.SPR_SARG,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RAISE5},				// S_SARG_RAISE4
    {sprite:spritenum_t.SPR_SARG,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RAISE6},				// S_SARG_RAISE5
    {sprite:spritenum_t.SPR_SARG,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_SARG_RUN1},				// S_SARG_RAISE6
    {sprite:spritenum_t.SPR_HEAD,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_HEAD_STND},				// S_HEAD_STND
    {sprite:spritenum_t.SPR_HEAD,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_HEAD_RUN1},				// S_HEAD_RUN1
    {sprite:spritenum_t.SPR_HEAD,frame:1,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_HEAD_ATK2},		// S_HEAD_ATK1
    {sprite:spritenum_t.SPR_HEAD,frame:2,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_HEAD_ATK3},		// S_HEAD_ATK2
    {sprite:spritenum_t.SPR_HEAD,frame:32771,tics:5,action:"A_HeadAttack",nextstate:statenum_t.S_HEAD_RUN1},	// S_HEAD_ATK3
    {sprite:spritenum_t.SPR_HEAD,frame:4,tics:3,action:"NULL",nextstate:statenum_t.S_HEAD_PAIN2},				// S_HEAD_PAIN
    {sprite:spritenum_t.SPR_HEAD,frame:4,tics:3,action:"A_Pain",nextstate:statenum_t.S_HEAD_PAIN3},				// S_HEAD_PAIN2
    {sprite:spritenum_t.SPR_HEAD,frame:5,tics:6,action:"NULL",nextstate:statenum_t.S_HEAD_RUN1},				// S_HEAD_PAIN3
    {sprite:spritenum_t.SPR_HEAD,frame:6,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_DIE2},				// S_HEAD_DIE1
    {sprite:spritenum_t.SPR_HEAD,frame:7,tics:8,action:"A_Scream",nextstate:statenum_t.S_HEAD_DIE3},			// S_HEAD_DIE2
    {sprite:spritenum_t.SPR_HEAD,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_DIE4},				// S_HEAD_DIE3
    {sprite:spritenum_t.SPR_HEAD,frame:9,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_DIE5},				// S_HEAD_DIE4
    {sprite:spritenum_t.SPR_HEAD,frame:10,tics:8,action:"A_Fall",nextstate:statenum_t.S_HEAD_DIE6},				// S_HEAD_DIE5
    {sprite:spritenum_t.SPR_HEAD,frame:11,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HEAD_DIE6
    {sprite:spritenum_t.SPR_HEAD,frame:11,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RAISE2},				// S_HEAD_RAISE1
    {sprite:spritenum_t.SPR_HEAD,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RAISE3},				// S_HEAD_RAISE2
    {sprite:spritenum_t.SPR_HEAD,frame:9,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RAISE4},				// S_HEAD_RAISE3
    {sprite:spritenum_t.SPR_HEAD,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RAISE5},				// S_HEAD_RAISE4
    {sprite:spritenum_t.SPR_HEAD,frame:7,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RAISE6},				// S_HEAD_RAISE5
    {sprite:spritenum_t.SPR_HEAD,frame:6,tics:8,action:"NULL",nextstate:statenum_t.S_HEAD_RUN1},				// S_HEAD_RAISE6
    {sprite:spritenum_t.SPR_BAL7,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_BRBALL2},				// S_BRBALL1
    {sprite:spritenum_t.SPR_BAL7,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_BRBALL1},				// S_BRBALL2
    {sprite:spritenum_t.SPR_BAL7,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_BRBALLX2},				// S_BRBALLX1
    {sprite:spritenum_t.SPR_BAL7,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_BRBALLX3},				// S_BRBALLX2
    {sprite:spritenum_t.SPR_BAL7,frame:32772,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BRBALLX3
    {sprite:spritenum_t.SPR_BOSS,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_BOSS_STND2},			// S_BOSS_STND
    {sprite:spritenum_t.SPR_BOSS,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_BOSS_STND},				// S_BOSS_STND2
    {sprite:spritenum_t.SPR_BOSS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN2},				// S_BOSS_RUN1
    {sprite:spritenum_t.SPR_BOSS,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN3},				// S_BOSS_RUN2
    {sprite:spritenum_t.SPR_BOSS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN4},				// S_BOSS_RUN3
    {sprite:spritenum_t.SPR_BOSS,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN5},				// S_BOSS_RUN4
    {sprite:spritenum_t.SPR_BOSS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN6},				// S_BOSS_RUN5
    {sprite:spritenum_t.SPR_BOSS,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN7},				// S_BOSS_RUN6
    {sprite:spritenum_t.SPR_BOSS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN8},				// S_BOSS_RUN7
    {sprite:spritenum_t.SPR_BOSS,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOSS_RUN1},				// S_BOSS_RUN8
    {sprite:spritenum_t.SPR_BOSS,frame:4,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_BOSS_ATK2},		// S_BOSS_ATK1
    {sprite:spritenum_t.SPR_BOSS,frame:5,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_BOSS_ATK3},		// S_BOSS_ATK2
    {sprite:spritenum_t.SPR_BOSS,frame:6,tics:8,action:"A_BruisAttack",nextstate:statenum_t.S_BOSS_RUN1},		// S_BOSS_ATK3
    {sprite:spritenum_t.SPR_BOSS,frame:7,tics:2,action:"NULL",nextstate:statenum_t.S_BOSS_PAIN2},				// S_BOSS_PAIN
    {sprite:spritenum_t.SPR_BOSS,frame:7,tics:2,action:"A_Pain",nextstate:statenum_t.S_BOSS_RUN1},				// S_BOSS_PAIN2
    {sprite:spritenum_t.SPR_BOSS,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_DIE2},				// S_BOSS_DIE1
    {sprite:spritenum_t.SPR_BOSS,frame:9,tics:8,action:"A_Scream",nextstate:statenum_t.S_BOSS_DIE3},			// S_BOSS_DIE2
    {sprite:spritenum_t.SPR_BOSS,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_DIE4},				// S_BOSS_DIE3
    {sprite:spritenum_t.SPR_BOSS,frame:11,tics:8,action:"A_Fall",nextstate:statenum_t.S_BOSS_DIE5},				// S_BOSS_DIE4
    {sprite:spritenum_t.SPR_BOSS,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_DIE6},				// S_BOSS_DIE5
    {sprite:spritenum_t.SPR_BOSS,frame:13,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_DIE7},				// S_BOSS_DIE6
    {sprite:spritenum_t.SPR_BOSS,frame:14,tics:-1,action:"A_BossDeath",nextstate:statenum_t.S_NULL},			// S_BOSS_DIE7
    {sprite:spritenum_t.SPR_BOSS,frame:14,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE2},				// S_BOSS_RAISE1
    {sprite:spritenum_t.SPR_BOSS,frame:13,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE3},				// S_BOSS_RAISE2
    {sprite:spritenum_t.SPR_BOSS,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE4},				// S_BOSS_RAISE3
    {sprite:spritenum_t.SPR_BOSS,frame:11,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE5},				// S_BOSS_RAISE4
    {sprite:spritenum_t.SPR_BOSS,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE6},				// S_BOSS_RAISE5
    {sprite:spritenum_t.SPR_BOSS,frame:9,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RAISE7},				// S_BOSS_RAISE6
    {sprite:spritenum_t.SPR_BOSS,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_BOSS_RUN1},				// S_BOSS_RAISE7
    {sprite:spritenum_t.SPR_BOS2,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_BOS2_STND2},			// S_BOS2_STND
    {sprite:spritenum_t.SPR_BOS2,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_BOS2_STND},				// S_BOS2_STND2
    {sprite:spritenum_t.SPR_BOS2,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN2},				// S_BOS2_RUN1
    {sprite:spritenum_t.SPR_BOS2,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN3},				// S_BOS2_RUN2
    {sprite:spritenum_t.SPR_BOS2,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN4},				// S_BOS2_RUN3
    {sprite:spritenum_t.SPR_BOS2,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN5},				// S_BOS2_RUN4
    {sprite:spritenum_t.SPR_BOS2,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN6},				// S_BOS2_RUN5
    {sprite:spritenum_t.SPR_BOS2,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN7},				// S_BOS2_RUN6
    {sprite:spritenum_t.SPR_BOS2,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN8},				// S_BOS2_RUN7
    {sprite:spritenum_t.SPR_BOS2,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_BOS2_RUN1},				// S_BOS2_RUN8
    {sprite:spritenum_t.SPR_BOS2,frame:4,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_BOS2_ATK2},		// S_BOS2_ATK1
    {sprite:spritenum_t.SPR_BOS2,frame:5,tics:8,action:"A_FaceTarget",nextstate:statenum_t.S_BOS2_ATK3},		// S_BOS2_ATK2
    {sprite:spritenum_t.SPR_BOS2,frame:6,tics:8,action:"A_BruisAttack",nextstate:statenum_t.S_BOS2_RUN1},		// S_BOS2_ATK3
    {sprite:spritenum_t.SPR_BOS2,frame:7,tics:2,action:"NULL",nextstate:statenum_t.S_BOS2_PAIN2},				// S_BOS2_PAIN
    {sprite:spritenum_t.SPR_BOS2,frame:7,tics:2,action:"A_Pain",nextstate:statenum_t.S_BOS2_RUN1},				// S_BOS2_PAIN2
    {sprite:spritenum_t.SPR_BOS2,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_DIE2},				// S_BOS2_DIE1
    {sprite:spritenum_t.SPR_BOS2,frame:9,tics:8,action:"A_Scream",nextstate:statenum_t.S_BOS2_DIE3},			// S_BOS2_DIE2
    {sprite:spritenum_t.SPR_BOS2,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_DIE4},				// S_BOS2_DIE3
    {sprite:spritenum_t.SPR_BOS2,frame:11,tics:8,action:"A_Fall",nextstate:statenum_t.S_BOS2_DIE5},				// S_BOS2_DIE4
    {sprite:spritenum_t.SPR_BOS2,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_DIE6},				// S_BOS2_DIE5
    {sprite:spritenum_t.SPR_BOS2,frame:13,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_DIE7},				// S_BOS2_DIE6
    {sprite:spritenum_t.SPR_BOS2,frame:14,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BOS2_DIE7
    {sprite:spritenum_t.SPR_BOS2,frame:14,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE2},				// S_BOS2_RAISE1
    {sprite:spritenum_t.SPR_BOS2,frame:13,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE3},				// S_BOS2_RAISE2
    {sprite:spritenum_t.SPR_BOS2,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE4},				// S_BOS2_RAISE3
    {sprite:spritenum_t.SPR_BOS2,frame:11,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE5},				// S_BOS2_RAISE4
    {sprite:spritenum_t.SPR_BOS2,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE6},				// S_BOS2_RAISE5
    {sprite:spritenum_t.SPR_BOS2,frame:9,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RAISE7},				// S_BOS2_RAISE6
    {sprite:spritenum_t.SPR_BOS2,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_BOS2_RUN1},				// S_BOS2_RAISE7
    {sprite:spritenum_t.SPR_SKUL,frame:32768,tics:10,action:"A_Look",nextstate:statenum_t.S_SKULL_STND2},		// S_SKULL_STND
    {sprite:spritenum_t.SPR_SKUL,frame:32769,tics:10,action:"A_Look",nextstate:statenum_t.S_SKULL_STND},		// S_SKULL_STND2
    {sprite:spritenum_t.SPR_SKUL,frame:32768,tics:6,action:"A_Chase",nextstate:statenum_t.S_SKULL_RUN2},		// S_SKULL_RUN1
    {sprite:spritenum_t.SPR_SKUL,frame:32769,tics:6,action:"A_Chase",nextstate:statenum_t.S_SKULL_RUN1},		// S_SKULL_RUN2
    {sprite:spritenum_t.SPR_SKUL,frame:32770,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SKULL_ATK2},	// S_SKULL_ATK1
    {sprite:spritenum_t.SPR_SKUL,frame:32771,tics:4,action:"A_SkullAttack",nextstate:statenum_t.S_SKULL_ATK3},	// S_SKULL_ATK2
    {sprite:spritenum_t.SPR_SKUL,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_SKULL_ATK4},			// S_SKULL_ATK3
    {sprite:spritenum_t.SPR_SKUL,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_SKULL_ATK3},			// S_SKULL_ATK4
    {sprite:spritenum_t.SPR_SKUL,frame:32772,tics:3,action:"NULL",nextstate:statenum_t.S_SKULL_PAIN2},			// S_SKULL_PAIN
    {sprite:spritenum_t.SPR_SKUL,frame:32772,tics:3,action:"A_Pain",nextstate:statenum_t.S_SKULL_RUN1},			// S_SKULL_PAIN2
    {sprite:spritenum_t.SPR_SKUL,frame:32773,tics:6,action:"NULL",nextstate:statenum_t.S_SKULL_DIE2},			// S_SKULL_DIE1
    {sprite:spritenum_t.SPR_SKUL,frame:32774,tics:6,action:"A_Scream",nextstate:statenum_t.S_SKULL_DIE3},		// S_SKULL_DIE2
    {sprite:spritenum_t.SPR_SKUL,frame:32775,tics:6,action:"NULL",nextstate:statenum_t.S_SKULL_DIE4},			// S_SKULL_DIE3
    {sprite:spritenum_t.SPR_SKUL,frame:32776,tics:6,action:"A_Fall",nextstate:statenum_t.S_SKULL_DIE5},			// S_SKULL_DIE4
    {sprite:spritenum_t.SPR_SKUL,frame:9,tics:6,action:"NULL",nextstate:statenum_t.S_SKULL_DIE6},				// S_SKULL_DIE5
    {sprite:spritenum_t.SPR_SKUL,frame:10,tics:6,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SKULL_DIE6
    {sprite:spritenum_t.SPR_SPID,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_SPID_STND2},			// S_SPID_STND
    {sprite:spritenum_t.SPR_SPID,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_SPID_STND},				// S_SPID_STND2
    {sprite:spritenum_t.SPR_SPID,frame:0,tics:3,action:"A_Metal",nextstate:statenum_t.S_SPID_RUN2},				// S_SPID_RUN1
    {sprite:spritenum_t.SPR_SPID,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN3},				// S_SPID_RUN2
    {sprite:spritenum_t.SPR_SPID,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN4},				// S_SPID_RUN3
    {sprite:spritenum_t.SPR_SPID,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN5},				// S_SPID_RUN4
    {sprite:spritenum_t.SPR_SPID,frame:2,tics:3,action:"A_Metal",nextstate:statenum_t.S_SPID_RUN6},				// S_SPID_RUN5
    {sprite:spritenum_t.SPR_SPID,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN7},				// S_SPID_RUN6
    {sprite:spritenum_t.SPR_SPID,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN8},				// S_SPID_RUN7
    {sprite:spritenum_t.SPR_SPID,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN9},				// S_SPID_RUN8
    {sprite:spritenum_t.SPR_SPID,frame:4,tics:3,action:"A_Metal",nextstate:statenum_t.S_SPID_RUN10},			// S_SPID_RUN9
    {sprite:spritenum_t.SPR_SPID,frame:4,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN11},			// S_SPID_RUN10
    {sprite:spritenum_t.SPR_SPID,frame:5,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN12},			// S_SPID_RUN11
    {sprite:spritenum_t.SPR_SPID,frame:5,tics:3,action:"A_Chase",nextstate:statenum_t.S_SPID_RUN1},				// S_SPID_RUN12
    {sprite:spritenum_t.SPR_SPID,frame:32768,tics:20,action:"A_FaceTarget",nextstate:statenum_t.S_SPID_ATK2},	// S_SPID_ATK1
    {sprite:spritenum_t.SPR_SPID,frame:32774,tics:4,action:"A_SPosAttack",nextstate:statenum_t.S_SPID_ATK3},	// S_SPID_ATK2
    {sprite:spritenum_t.SPR_SPID,frame:32775,tics:4,action:"A_SPosAttack",nextstate:statenum_t.S_SPID_ATK4},	// S_SPID_ATK3
    {sprite:spritenum_t.SPR_SPID,frame:32775,tics:1,action:"A_SpidRefire",nextstate:statenum_t.S_SPID_ATK2},	// S_SPID_ATK4
    {sprite:spritenum_t.SPR_SPID,frame:8,tics:3,action:"NULL",nextstate:statenum_t.S_SPID_PAIN2},				// S_SPID_PAIN
    {sprite:spritenum_t.SPR_SPID,frame:8,tics:3,action:"A_Pain",nextstate:statenum_t.S_SPID_RUN1},				// S_SPID_PAIN2
    {sprite:spritenum_t.SPR_SPID,frame:9,tics:20,action:"A_Scream",nextstate:statenum_t.S_SPID_DIE2},			// S_SPID_DIE1
    {sprite:spritenum_t.SPR_SPID,frame:10,tics:10,action:"A_Fall",nextstate:statenum_t.S_SPID_DIE3},			// S_SPID_DIE2
    {sprite:spritenum_t.SPR_SPID,frame:11,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE4},				// S_SPID_DIE3
    {sprite:spritenum_t.SPR_SPID,frame:12,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE5},				// S_SPID_DIE4
    {sprite:spritenum_t.SPR_SPID,frame:13,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE6},				// S_SPID_DIE5
    {sprite:spritenum_t.SPR_SPID,frame:14,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE7},				// S_SPID_DIE6
    {sprite:spritenum_t.SPR_SPID,frame:15,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE8},				// S_SPID_DIE7
    {sprite:spritenum_t.SPR_SPID,frame:16,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE9},				// S_SPID_DIE8
    {sprite:spritenum_t.SPR_SPID,frame:17,tics:10,action:"NULL",nextstate:statenum_t.S_SPID_DIE10},				// S_SPID_DIE9
    {sprite:spritenum_t.SPR_SPID,frame:18,tics:30,action:"NULL",nextstate:statenum_t.S_SPID_DIE11},				// S_SPID_DIE10
    {sprite:spritenum_t.SPR_SPID,frame:18,tics:-1,action:"A_BossDeath",nextstate:statenum_t.S_NULL},			// S_SPID_DIE11
    {sprite:spritenum_t.SPR_BSPI,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_BSPI_STND2},			// S_BSPI_STND
    {sprite:spritenum_t.SPR_BSPI,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_BSPI_STND},				// S_BSPI_STND2
    {sprite:spritenum_t.SPR_BSPI,frame:0,tics:20,action:"NULL",nextstate:statenum_t.S_BSPI_RUN1},				// S_BSPI_SIGHT
    {sprite:spritenum_t.SPR_BSPI,frame:0,tics:3,action:"A_BabyMetal",nextstate:statenum_t.S_BSPI_RUN2},			// S_BSPI_RUN1
    {sprite:spritenum_t.SPR_BSPI,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN3},				// S_BSPI_RUN2
    {sprite:spritenum_t.SPR_BSPI,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN4},				// S_BSPI_RUN3
    {sprite:spritenum_t.SPR_BSPI,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN5},				// S_BSPI_RUN4
    {sprite:spritenum_t.SPR_BSPI,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN6},				// S_BSPI_RUN5
    {sprite:spritenum_t.SPR_BSPI,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN7},				// S_BSPI_RUN6
    {sprite:spritenum_t.SPR_BSPI,frame:3,tics:3,action:"A_BabyMetal",nextstate:statenum_t.S_BSPI_RUN8},			// S_BSPI_RUN7
    {sprite:spritenum_t.SPR_BSPI,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN9},				// S_BSPI_RUN8
    {sprite:spritenum_t.SPR_BSPI,frame:4,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN10},			// S_BSPI_RUN9
    {sprite:spritenum_t.SPR_BSPI,frame:4,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN11},			// S_BSPI_RUN10
    {sprite:spritenum_t.SPR_BSPI,frame:5,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN12},			// S_BSPI_RUN11
    {sprite:spritenum_t.SPR_BSPI,frame:5,tics:3,action:"A_Chase",nextstate:statenum_t.S_BSPI_RUN1},				// S_BSPI_RUN12
    {sprite:spritenum_t.SPR_BSPI,frame:32768,tics:20,action:"A_FaceTarget",nextstate:statenum_t.S_BSPI_ATK2},	// S_BSPI_ATK1
    {sprite:spritenum_t.SPR_BSPI,frame:32774,tics:4,action:"A_BspiAttack",nextstate:statenum_t.S_BSPI_ATK3},	// S_BSPI_ATK2
    {sprite:spritenum_t.SPR_BSPI,frame:32775,tics:4,action:"NULL",nextstate:statenum_t.S_BSPI_ATK4},			// S_BSPI_ATK3
    {sprite:spritenum_t.SPR_BSPI,frame:32775,tics:1,action:"A_SpidRefire",nextstate:statenum_t.S_BSPI_ATK2},	// S_BSPI_ATK4
    {sprite:spritenum_t.SPR_BSPI,frame:8,tics:3,action:"NULL",nextstate:statenum_t.S_BSPI_PAIN2},				// S_BSPI_PAIN
    {sprite:spritenum_t.SPR_BSPI,frame:8,tics:3,action:"A_Pain",nextstate:statenum_t.S_BSPI_RUN1},				// S_BSPI_PAIN2
    {sprite:spritenum_t.SPR_BSPI,frame:9,tics:20,action:"A_Scream",nextstate:statenum_t.S_BSPI_DIE2},			// S_BSPI_DIE1
    {sprite:spritenum_t.SPR_BSPI,frame:10,tics:7,action:"A_Fall",nextstate:statenum_t.S_BSPI_DIE3},				// S_BSPI_DIE2
    {sprite:spritenum_t.SPR_BSPI,frame:11,tics:7,action:"NULL",nextstate:statenum_t.S_BSPI_DIE4},				// S_BSPI_DIE3
    {sprite:spritenum_t.SPR_BSPI,frame:12,tics:7,action:"NULL",nextstate:statenum_t.S_BSPI_DIE5},				// S_BSPI_DIE4
    {sprite:spritenum_t.SPR_BSPI,frame:13,tics:7,action:"NULL",nextstate:statenum_t.S_BSPI_DIE6},				// S_BSPI_DIE5
    {sprite:spritenum_t.SPR_BSPI,frame:14,tics:7,action:"NULL",nextstate:statenum_t.S_BSPI_DIE7},				// S_BSPI_DIE6
    {sprite:spritenum_t.SPR_BSPI,frame:15,tics:-1,action:"A_BossDeath",nextstate:statenum_t.S_NULL},			// S_BSPI_DIE7
    {sprite:spritenum_t.SPR_BSPI,frame:15,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE2},				// S_BSPI_RAISE1
    {sprite:spritenum_t.SPR_BSPI,frame:14,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE3},				// S_BSPI_RAISE2
    {sprite:spritenum_t.SPR_BSPI,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE4},				// S_BSPI_RAISE3
    {sprite:spritenum_t.SPR_BSPI,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE5},				// S_BSPI_RAISE4
    {sprite:spritenum_t.SPR_BSPI,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE6},				// S_BSPI_RAISE5
    {sprite:spritenum_t.SPR_BSPI,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RAISE7},				// S_BSPI_RAISE6
    {sprite:spritenum_t.SPR_BSPI,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_BSPI_RUN1},				// S_BSPI_RAISE7
    {sprite:spritenum_t.SPR_APLS,frame:32768,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLAZ2},			// S_ARACH_PLAZ
    {sprite:spritenum_t.SPR_APLS,frame:32769,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLAZ},			// S_ARACH_PLAZ2
    {sprite:spritenum_t.SPR_APBX,frame:32768,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLEX2},			// S_ARACH_PLEX
    {sprite:spritenum_t.SPR_APBX,frame:32769,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLEX3},			// S_ARACH_PLEX2
    {sprite:spritenum_t.SPR_APBX,frame:32770,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLEX4},			// S_ARACH_PLEX3
    {sprite:spritenum_t.SPR_APBX,frame:32771,tics:5,action:"NULL",nextstate:statenum_t.S_ARACH_PLEX5},			// S_ARACH_PLEX4
    {sprite:spritenum_t.SPR_APBX,frame:32772,tics:5,action:"NULL",nextstate:statenum_t.S_NULL},					// S_ARACH_PLEX5
    {sprite:spritenum_t.SPR_CYBR,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_CYBER_STND2},			// S_CYBER_STND
    {sprite:spritenum_t.SPR_CYBR,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_CYBER_STND},			// S_CYBER_STND2
    {sprite:spritenum_t.SPR_CYBR,frame:0,tics:3,action:"A_Hoof",nextstate:statenum_t.S_CYBER_RUN2},				// S_CYBER_RUN1
    {sprite:spritenum_t.SPR_CYBR,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN3},			// S_CYBER_RUN2
    {sprite:spritenum_t.SPR_CYBR,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN4},			// S_CYBER_RUN3
    {sprite:spritenum_t.SPR_CYBR,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN5},			// S_CYBER_RUN4
    {sprite:spritenum_t.SPR_CYBR,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN6},			// S_CYBER_RUN5
    {sprite:spritenum_t.SPR_CYBR,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN7},			// S_CYBER_RUN6
    {sprite:spritenum_t.SPR_CYBR,frame:3,tics:3,action:"A_Metal",nextstate:statenum_t.S_CYBER_RUN8},			// S_CYBER_RUN7
    {sprite:spritenum_t.SPR_CYBR,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_CYBER_RUN1},			// S_CYBER_RUN8
    {sprite:spritenum_t.SPR_CYBR,frame:4,tics:6,action:"A_FaceTarget",nextstate:statenum_t.S_CYBER_ATK2},		// S_CYBER_ATK1
    {sprite:spritenum_t.SPR_CYBR,frame:5,tics:12,action:"A_CyberAttack",nextstate:statenum_t.S_CYBER_ATK3},		// S_CYBER_ATK2
    {sprite:spritenum_t.SPR_CYBR,frame:4,tics:12,action:"A_FaceTarget",nextstate:statenum_t.S_CYBER_ATK4},		// S_CYBER_ATK3
    {sprite:spritenum_t.SPR_CYBR,frame:5,tics:12,action:"A_CyberAttack",nextstate:statenum_t.S_CYBER_ATK5},		// S_CYBER_ATK4
    {sprite:spritenum_t.SPR_CYBR,frame:4,tics:12,action:"A_FaceTarget",nextstate:statenum_t.S_CYBER_ATK6},		// S_CYBER_ATK5
    {sprite:spritenum_t.SPR_CYBR,frame:5,tics:12,action:"A_CyberAttack",nextstate:statenum_t.S_CYBER_RUN1},		// S_CYBER_ATK6
    {sprite:spritenum_t.SPR_CYBR,frame:6,tics:10,action:"A_Pain",nextstate:statenum_t.S_CYBER_RUN1},			// S_CYBER_PAIN
    {sprite:spritenum_t.SPR_CYBR,frame:7,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE2},				// S_CYBER_DIE1
    {sprite:spritenum_t.SPR_CYBR,frame:8,tics:10,action:"A_Scream",nextstate:statenum_t.S_CYBER_DIE3},			// S_CYBER_DIE2
    {sprite:spritenum_t.SPR_CYBR,frame:9,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE4},				// S_CYBER_DIE3
    {sprite:spritenum_t.SPR_CYBR,frame:10,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE5},				// S_CYBER_DIE4
    {sprite:spritenum_t.SPR_CYBR,frame:11,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE6},				// S_CYBER_DIE5
    {sprite:spritenum_t.SPR_CYBR,frame:12,tics:10,action:"A_Fall",nextstate:statenum_t.S_CYBER_DIE7},			// S_CYBER_DIE6
    {sprite:spritenum_t.SPR_CYBR,frame:13,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE8},				// S_CYBER_DIE7
    {sprite:spritenum_t.SPR_CYBR,frame:14,tics:10,action:"NULL",nextstate:statenum_t.S_CYBER_DIE9},				// S_CYBER_DIE8
    {sprite:spritenum_t.SPR_CYBR,frame:15,tics:30,action:"NULL",nextstate:statenum_t.S_CYBER_DIE10},			// S_CYBER_DIE9
    {sprite:spritenum_t.SPR_CYBR,frame:15,tics:-1,action:"A_BossDeath",nextstate:statenum_t.S_NULL},			// S_CYBER_DIE10
    {sprite:spritenum_t.SPR_PAIN,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_PAIN_STND},				// S_PAIN_STND
    {sprite:spritenum_t.SPR_PAIN,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN2},				// S_PAIN_RUN1
    {sprite:spritenum_t.SPR_PAIN,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN3},				// S_PAIN_RUN2
    {sprite:spritenum_t.SPR_PAIN,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN4},				// S_PAIN_RUN3
    {sprite:spritenum_t.SPR_PAIN,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN5},				// S_PAIN_RUN4
    {sprite:spritenum_t.SPR_PAIN,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN6},				// S_PAIN_RUN5
    {sprite:spritenum_t.SPR_PAIN,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_PAIN_RUN1},				// S_PAIN_RUN6
    {sprite:spritenum_t.SPR_PAIN,frame:3,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_PAIN_ATK2},		// S_PAIN_ATK1
    {sprite:spritenum_t.SPR_PAIN,frame:4,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_PAIN_ATK3},		// S_PAIN_ATK2
    {sprite:spritenum_t.SPR_PAIN,frame:32773,tics:5,action:"A_FaceTarget",nextstate:statenum_t.S_PAIN_ATK4},	// S_PAIN_ATK3
    {sprite:spritenum_t.SPR_PAIN,frame:32773,tics:0,action:"A_PainAttack",nextstate:statenum_t.S_PAIN_RUN1},	// S_PAIN_ATK4
    {sprite:spritenum_t.SPR_PAIN,frame:6,tics:6,action:"NULL",nextstate:statenum_t.S_PAIN_PAIN2},				// S_PAIN_PAIN
    {sprite:spritenum_t.SPR_PAIN,frame:6,tics:6,action:"A_Pain",nextstate:statenum_t.S_PAIN_RUN1},				// S_PAIN_PAIN2
    {sprite:spritenum_t.SPR_PAIN,frame:32775,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_DIE2},			// S_PAIN_DIE1
    {sprite:spritenum_t.SPR_PAIN,frame:32776,tics:8,action:"A_Scream",nextstate:statenum_t.S_PAIN_DIE3},		// S_PAIN_DIE2
    {sprite:spritenum_t.SPR_PAIN,frame:32777,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_DIE4},			// S_PAIN_DIE3
    {sprite:spritenum_t.SPR_PAIN,frame:32778,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_DIE5},			// S_PAIN_DIE4
    {sprite:spritenum_t.SPR_PAIN,frame:32779,tics:8,action:"A_PainDie",nextstate:statenum_t.S_PAIN_DIE6},		// S_PAIN_DIE5
    {sprite:spritenum_t.SPR_PAIN,frame:32780,tics:8,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PAIN_DIE6
    {sprite:spritenum_t.SPR_PAIN,frame:12,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RAISE2},				// S_PAIN_RAISE1
    {sprite:spritenum_t.SPR_PAIN,frame:11,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RAISE3},				// S_PAIN_RAISE2
    {sprite:spritenum_t.SPR_PAIN,frame:10,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RAISE4},				// S_PAIN_RAISE3
    {sprite:spritenum_t.SPR_PAIN,frame:9,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RAISE5},				// S_PAIN_RAISE4
    {sprite:spritenum_t.SPR_PAIN,frame:8,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RAISE6},				// S_PAIN_RAISE5
    {sprite:spritenum_t.SPR_PAIN,frame:7,tics:8,action:"NULL",nextstate:statenum_t.S_PAIN_RUN1},				// S_PAIN_RAISE6
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_SSWV_STND2},			// S_SSWV_STND
    {sprite:spritenum_t.SPR_SSWV,frame:1,tics:10,action:"A_Look",nextstate:statenum_t.S_SSWV_STND},				// S_SSWV_STND2
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN2},				// S_SSWV_RUN1
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN3},				// S_SSWV_RUN2
    {sprite:spritenum_t.SPR_SSWV,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN4},				// S_SSWV_RUN3
    {sprite:spritenum_t.SPR_SSWV,frame:1,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN5},				// S_SSWV_RUN4
    {sprite:spritenum_t.SPR_SSWV,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN6},				// S_SSWV_RUN5
    {sprite:spritenum_t.SPR_SSWV,frame:2,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN7},				// S_SSWV_RUN6
    {sprite:spritenum_t.SPR_SSWV,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN8},				// S_SSWV_RUN7
    {sprite:spritenum_t.SPR_SSWV,frame:3,tics:3,action:"A_Chase",nextstate:statenum_t.S_SSWV_RUN1},				// S_SSWV_RUN8
    {sprite:spritenum_t.SPR_SSWV,frame:4,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SSWV_ATK2},		// S_SSWV_ATK1
    {sprite:spritenum_t.SPR_SSWV,frame:5,tics:10,action:"A_FaceTarget",nextstate:statenum_t.S_SSWV_ATK3},		// S_SSWV_ATK2
    {sprite:spritenum_t.SPR_SSWV,frame:32774,tics:4,action:"A_CPosAttack",nextstate:statenum_t.S_SSWV_ATK4},	// S_SSWV_ATK3
    {sprite:spritenum_t.SPR_SSWV,frame:5,tics:6,action:"A_FaceTarget",nextstate:statenum_t.S_SSWV_ATK5},		// S_SSWV_ATK4
    {sprite:spritenum_t.SPR_SSWV,frame:32774,tics:4,action:"A_CPosAttack",nextstate:statenum_t.S_SSWV_ATK6},	// S_SSWV_ATK5
    {sprite:spritenum_t.SPR_SSWV,frame:5,tics:1,action:"A_CPosRefire",nextstate:statenum_t.S_SSWV_ATK2},		// S_SSWV_ATK6
    {sprite:spritenum_t.SPR_SSWV,frame:7,tics:3,action:"NULL",nextstate:statenum_t.S_SSWV_PAIN2},				// S_SSWV_PAIN
    {sprite:spritenum_t.SPR_SSWV,frame:7,tics:3,action:"A_Pain",nextstate:statenum_t.S_SSWV_RUN1},				// S_SSWV_PAIN2
    {sprite:spritenum_t.SPR_SSWV,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_DIE2},				// S_SSWV_DIE1
    {sprite:spritenum_t.SPR_SSWV,frame:9,tics:5,action:"A_Scream",nextstate:statenum_t.S_SSWV_DIE3},			// S_SSWV_DIE2
    {sprite:spritenum_t.SPR_SSWV,frame:10,tics:5,action:"A_Fall",nextstate:statenum_t.S_SSWV_DIE4},				// S_SSWV_DIE3
    {sprite:spritenum_t.SPR_SSWV,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_DIE5},				// S_SSWV_DIE4
    {sprite:spritenum_t.SPR_SSWV,frame:12,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SSWV_DIE5
    {sprite:spritenum_t.SPR_SSWV,frame:13,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE2},				// S_SSWV_XDIE1
    {sprite:spritenum_t.SPR_SSWV,frame:14,tics:5,action:"A_XScream",nextstate:statenum_t.S_SSWV_XDIE3},			// S_SSWV_XDIE2
    {sprite:spritenum_t.SPR_SSWV,frame:15,tics:5,action:"A_Fall",nextstate:statenum_t.S_SSWV_XDIE4},			// S_SSWV_XDIE3
    {sprite:spritenum_t.SPR_SSWV,frame:16,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE5},				// S_SSWV_XDIE4
    {sprite:spritenum_t.SPR_SSWV,frame:17,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE6},				// S_SSWV_XDIE5
    {sprite:spritenum_t.SPR_SSWV,frame:18,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE7},				// S_SSWV_XDIE6
    {sprite:spritenum_t.SPR_SSWV,frame:19,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE8},				// S_SSWV_XDIE7
    {sprite:spritenum_t.SPR_SSWV,frame:20,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_XDIE9},				// S_SSWV_XDIE8
    {sprite:spritenum_t.SPR_SSWV,frame:21,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SSWV_XDIE9
    {sprite:spritenum_t.SPR_SSWV,frame:12,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_RAISE2},				// S_SSWV_RAISE1
    {sprite:spritenum_t.SPR_SSWV,frame:11,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_RAISE3},				// S_SSWV_RAISE2
    {sprite:spritenum_t.SPR_SSWV,frame:10,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_RAISE4},				// S_SSWV_RAISE3
    {sprite:spritenum_t.SPR_SSWV,frame:9,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_RAISE5},				// S_SSWV_RAISE4
    {sprite:spritenum_t.SPR_SSWV,frame:8,tics:5,action:"NULL",nextstate:statenum_t.S_SSWV_RUN1},				// S_SSWV_RAISE5
    {sprite:spritenum_t.SPR_KEEN,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_KEENSTND},				// S_KEENSTND
    {sprite:spritenum_t.SPR_KEEN,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN2},				// S_COMMKEEN
    {sprite:spritenum_t.SPR_KEEN,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN3},				// S_COMMKEEN2
    {sprite:spritenum_t.SPR_KEEN,frame:2,tics:6,action:"A_Scream",nextstate:statenum_t.S_COMMKEEN4},			// S_COMMKEEN3
    {sprite:spritenum_t.SPR_KEEN,frame:3,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN5},				// S_COMMKEEN4
    {sprite:spritenum_t.SPR_KEEN,frame:4,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN6},				// S_COMMKEEN5
    {sprite:spritenum_t.SPR_KEEN,frame:5,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN7},				// S_COMMKEEN6
    {sprite:spritenum_t.SPR_KEEN,frame:6,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN8},				// S_COMMKEEN7
    {sprite:spritenum_t.SPR_KEEN,frame:7,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN9},				// S_COMMKEEN8
    {sprite:spritenum_t.SPR_KEEN,frame:8,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN10},				// S_COMMKEEN9
    {sprite:spritenum_t.SPR_KEEN,frame:9,tics:6,action:"NULL",nextstate:statenum_t.S_COMMKEEN11},				// S_COMMKEEN10
    {sprite:spritenum_t.SPR_KEEN,frame:10,tics:6,action:"A_KeenDie",nextstate:statenum_t.S_COMMKEEN12},			// S_COMMKEEN11
    {sprite:spritenum_t.SPR_KEEN,frame:11,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_COMMKEEN12
    {sprite:spritenum_t.SPR_KEEN,frame:12,tics:4,action:"NULL",nextstate:statenum_t.S_KEENPAIN2},				// S_KEENPAIN
    {sprite:spritenum_t.SPR_KEEN,frame:12,tics:8,action:"A_Pain",nextstate:statenum_t.S_KEENSTND},				// S_KEENPAIN2
    {sprite:spritenum_t.SPR_BBRN,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BRAIN
    {sprite:spritenum_t.SPR_BBRN,frame:1,tics:36,action:"A_BrainPain",nextstate:statenum_t.S_BRAIN},			// S_BRAIN_PAIN
    {sprite:spritenum_t.SPR_BBRN,frame:0,tics:100,action:"A_BrainScream",nextstate:statenum_t.S_BRAIN_DIE2},	// S_BRAIN_DIE1
    {sprite:spritenum_t.SPR_BBRN,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_BRAIN_DIE3},				// S_BRAIN_DIE2
    {sprite:spritenum_t.SPR_BBRN,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_BRAIN_DIE4},				// S_BRAIN_DIE3
    {sprite:spritenum_t.SPR_BBRN,frame:0,tics:-1,action:"A_BrainDie",nextstate:statenum_t.S_NULL},				// S_BRAIN_DIE4
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:10,action:"A_Look",nextstate:statenum_t.S_BRAINEYE},				// S_BRAINEYE
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:181,action:"A_BrainAwake",nextstate:statenum_t.S_BRAINEYE1},		// S_BRAINEYESEE
    {sprite:spritenum_t.SPR_SSWV,frame:0,tics:150,action:"A_BrainSpit",nextstate:statenum_t.S_BRAINEYE1},		// S_BRAINEYE1
    {sprite:spritenum_t.SPR_BOSF,frame:32768,tics:3,action:"A_SpawnSound",nextstate:statenum_t.S_SPAWN2},		// S_SPAWN1
    {sprite:spritenum_t.SPR_BOSF,frame:32769,tics:3,action:"A_SpawnFly",nextstate:statenum_t.S_SPAWN3},			// S_SPAWN2
    {sprite:spritenum_t.SPR_BOSF,frame:32770,tics:3,action:"A_SpawnFly",nextstate:statenum_t.S_SPAWN4},			// S_SPAWN3
    {sprite:spritenum_t.SPR_BOSF,frame:32771,tics:3,action:"A_SpawnFly",nextstate:statenum_t.S_SPAWN1},			// S_SPAWN4
    {sprite:spritenum_t.SPR_FIRE,frame:32768,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE2},			// S_SPAWNFIRE1
    {sprite:spritenum_t.SPR_FIRE,frame:32769,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE3},			// S_SPAWNFIRE2
    {sprite:spritenum_t.SPR_FIRE,frame:32770,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE4},			// S_SPAWNFIRE3
    {sprite:spritenum_t.SPR_FIRE,frame:32771,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE5},			// S_SPAWNFIRE4
    {sprite:spritenum_t.SPR_FIRE,frame:32772,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE6},			// S_SPAWNFIRE5
    {sprite:spritenum_t.SPR_FIRE,frame:32773,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE7},			// S_SPAWNFIRE6
    {sprite:spritenum_t.SPR_FIRE,frame:32774,tics:4,action:"A_Fire",nextstate:statenum_t.S_SPAWNFIRE8},			// S_SPAWNFIRE7
    {sprite:spritenum_t.SPR_FIRE,frame:32775,tics:4,action:"A_Fire",nextstate:statenum_t.S_NULL},				// S_SPAWNFIRE8
    {sprite:spritenum_t.SPR_MISL,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_BRAINEXPLODE2},		// S_BRAINEXPLODE1
    {sprite:spritenum_t.SPR_MISL,frame:32770,tics:10,action:"NULL",nextstate:statenum_t.S_BRAINEXPLODE3},		// S_BRAINEXPLODE2
    {sprite:spritenum_t.SPR_MISL,frame:32771,tics:10,action:"A_BrainExplode",nextstate:statenum_t.S_NULL},		// S_BRAINEXPLODE3
    {sprite:spritenum_t.SPR_ARM1,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_ARM1A},					// S_ARM1
    {sprite:spritenum_t.SPR_ARM1,frame:32769,tics:7,action:"NULL",nextstate:statenum_t.S_ARM1},					// S_ARM1A
    {sprite:spritenum_t.SPR_ARM2,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_ARM2A},					// S_ARM2
    {sprite:spritenum_t.SPR_ARM2,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_ARM2},					// S_ARM2A
    {sprite:spritenum_t.SPR_BAR1,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_BAR2},						// S_BAR1
    {sprite:spritenum_t.SPR_BAR1,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BAR1},						// S_BAR2
    {sprite:spritenum_t.SPR_BEXP,frame:32768,tics:5,action:"NULL",nextstate:statenum_t.S_BEXP2},				// S_BEXP
    {sprite:spritenum_t.SPR_BEXP,frame:32769,tics:5,action:"A_Scream",nextstate:statenum_t.S_BEXP3},			// S_BEXP2
    {sprite:spritenum_t.SPR_BEXP,frame:32770,tics:5,action:"NULL",nextstate:statenum_t.S_BEXP4},				// S_BEXP3
    {sprite:spritenum_t.SPR_BEXP,frame:32771,tics:10,action:"A_Explode",nextstate:statenum_t.S_BEXP5},			// S_BEXP4
    {sprite:spritenum_t.SPR_BEXP,frame:32772,tics:10,action:"NULL",nextstate:statenum_t.S_NULL},				// S_BEXP5
    {sprite:spritenum_t.SPR_FCAN,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_BBAR2},				// S_BBAR1
    {sprite:spritenum_t.SPR_FCAN,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_BBAR3},				// S_BBAR2
    {sprite:spritenum_t.SPR_FCAN,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_BBAR1},				// S_BBAR3
    {sprite:spritenum_t.SPR_BON1,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_BON1A},					// S_BON1
    {sprite:spritenum_t.SPR_BON1,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BON1B},					// S_BON1A
    {sprite:spritenum_t.SPR_BON1,frame:2,tics:6,action:"NULL",nextstate:statenum_t.S_BON1C},					// S_BON1B
    {sprite:spritenum_t.SPR_BON1,frame:3,tics:6,action:"NULL",nextstate:statenum_t.S_BON1D},					// S_BON1C
    {sprite:spritenum_t.SPR_BON1,frame:2,tics:6,action:"NULL",nextstate:statenum_t.S_BON1E},					// S_BON1D
    {sprite:spritenum_t.SPR_BON1,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BON1},						// S_BON1E
    {sprite:spritenum_t.SPR_BON2,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_BON2A},					// S_BON2
    {sprite:spritenum_t.SPR_BON2,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BON2B},					// S_BON2A
    {sprite:spritenum_t.SPR_BON2,frame:2,tics:6,action:"NULL",nextstate:statenum_t.S_BON2C},					// S_BON2B
    {sprite:spritenum_t.SPR_BON2,frame:3,tics:6,action:"NULL",nextstate:statenum_t.S_BON2D},					// S_BON2C
    {sprite:spritenum_t.SPR_BON2,frame:2,tics:6,action:"NULL",nextstate:statenum_t.S_BON2E},					// S_BON2D
    {sprite:spritenum_t.SPR_BON2,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BON2},						// S_BON2E
    {sprite:spritenum_t.SPR_BKEY,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_BKEY2},					// S_BKEY
    {sprite:spritenum_t.SPR_BKEY,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_BKEY},				// S_BKEY2
    {sprite:spritenum_t.SPR_RKEY,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_RKEY2},					// S_RKEY
    {sprite:spritenum_t.SPR_RKEY,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_RKEY},				// S_RKEY2
    {sprite:spritenum_t.SPR_YKEY,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_YKEY2},					// S_YKEY
    {sprite:spritenum_t.SPR_YKEY,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_YKEY},				// S_YKEY2
    {sprite:spritenum_t.SPR_BSKU,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_BSKULL2},					// S_BSKULL
    {sprite:spritenum_t.SPR_BSKU,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_BSKULL},				// S_BSKULL2
    {sprite:spritenum_t.SPR_RSKU,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_RSKULL2},					// S_RSKULL
    {sprite:spritenum_t.SPR_RSKU,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_RSKULL},				// S_RSKULL2
    {sprite:spritenum_t.SPR_YSKU,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_YSKULL2},					// S_YSKULL
    {sprite:spritenum_t.SPR_YSKU,frame:32769,tics:10,action:"NULL",nextstate:statenum_t.S_YSKULL},				// S_YSKULL2
    {sprite:spritenum_t.SPR_STIM,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_STIM
    {sprite:spritenum_t.SPR_MEDI,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MEDI
    {sprite:spritenum_t.SPR_SOUL,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL2},				// S_SOUL
    {sprite:spritenum_t.SPR_SOUL,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL3},				// S_SOUL2
    {sprite:spritenum_t.SPR_SOUL,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL4},				// S_SOUL3
    {sprite:spritenum_t.SPR_SOUL,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL5},				// S_SOUL4
    {sprite:spritenum_t.SPR_SOUL,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL6},				// S_SOUL5
    {sprite:spritenum_t.SPR_SOUL,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_SOUL},					// S_SOUL6
    {sprite:spritenum_t.SPR_PINV,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_PINV2},				// S_PINV
    {sprite:spritenum_t.SPR_PINV,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_PINV3},				// S_PINV2
    {sprite:spritenum_t.SPR_PINV,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_PINV4},				// S_PINV3
    {sprite:spritenum_t.SPR_PINV,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_PINV},					// S_PINV4
    {sprite:spritenum_t.SPR_PSTR,frame:32768,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},				// S_PSTR
    {sprite:spritenum_t.SPR_PINS,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_PINS2},				// S_PINS
    {sprite:spritenum_t.SPR_PINS,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_PINS3},				// S_PINS2
    {sprite:spritenum_t.SPR_PINS,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_PINS4},				// S_PINS3
    {sprite:spritenum_t.SPR_PINS,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_PINS},					// S_PINS4
    {sprite:spritenum_t.SPR_MEGA,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_MEGA2},				// S_MEGA
    {sprite:spritenum_t.SPR_MEGA,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_MEGA3},				// S_MEGA2
    {sprite:spritenum_t.SPR_MEGA,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_MEGA4},				// S_MEGA3
    {sprite:spritenum_t.SPR_MEGA,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_MEGA},					// S_MEGA4
    {sprite:spritenum_t.SPR_SUIT,frame:32768,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},				// S_SUIT
    {sprite:spritenum_t.SPR_PMAP,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP2},				// S_PMAP
    {sprite:spritenum_t.SPR_PMAP,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP3},				// S_PMAP2
    {sprite:spritenum_t.SPR_PMAP,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP4},				// S_PMAP3
    {sprite:spritenum_t.SPR_PMAP,frame:32771,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP5},				// S_PMAP4
    {sprite:spritenum_t.SPR_PMAP,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP6},				// S_PMAP5
    {sprite:spritenum_t.SPR_PMAP,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_PMAP},					// S_PMAP6
    {sprite:spritenum_t.SPR_PVIS,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_PVIS2},				// S_PVIS
    {sprite:spritenum_t.SPR_PVIS,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_PVIS},						// S_PVIS2
    {sprite:spritenum_t.SPR_CLIP,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CLIP
    {sprite:spritenum_t.SPR_AMMO,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_AMMO
    {sprite:spritenum_t.SPR_ROCK,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_ROCK
    {sprite:spritenum_t.SPR_BROK,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BROK
    {sprite:spritenum_t.SPR_CELL,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CELL
    {sprite:spritenum_t.SPR_CELP,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CELP
    {sprite:spritenum_t.SPR_SHEL,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SHEL
    {sprite:spritenum_t.SPR_SBOX,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SBOX
    {sprite:spritenum_t.SPR_BPAK,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BPAK
    {sprite:spritenum_t.SPR_BFUG,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BFUG
    {sprite:spritenum_t.SPR_MGUN,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MGUN
    {sprite:spritenum_t.SPR_CSAW,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_CSAW
    {sprite:spritenum_t.SPR_LAUN,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_LAUN
    {sprite:spritenum_t.SPR_PLAS,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_PLAS
    {sprite:spritenum_t.SPR_SHOT,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SHOT
    {sprite:spritenum_t.SPR_SGN2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SHOT2
    {sprite:spritenum_t.SPR_COLU,frame:32768,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},				// S_COLU
    {sprite:spritenum_t.SPR_SMT2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_STALAG
    {sprite:spritenum_t.SPR_GOR1,frame:0,tics:10,action:"NULL",nextstate:statenum_t.S_BLOODYTWITCH2},			// S_BLOODYTWITCH
    {sprite:spritenum_t.SPR_GOR1,frame:1,tics:15,action:"NULL",nextstate:statenum_t.S_BLOODYTWITCH3},			// S_BLOODYTWITCH2
    {sprite:spritenum_t.SPR_GOR1,frame:2,tics:8,action:"NULL",nextstate:statenum_t.S_BLOODYTWITCH4},			// S_BLOODYTWITCH3
    {sprite:spritenum_t.SPR_GOR1,frame:1,tics:6,action:"NULL",nextstate:statenum_t.S_BLOODYTWITCH},				// S_BLOODYTWITCH4
    {sprite:spritenum_t.SPR_PLAY,frame:13,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_DEADTORSO
    {sprite:spritenum_t.SPR_PLAY,frame:18,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_DEADBOTTOM
    {sprite:spritenum_t.SPR_POL2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HEADSONSTICK
    {sprite:spritenum_t.SPR_POL5,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_GIBS
    {sprite:spritenum_t.SPR_POL4,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HEADONASTICK
    {sprite:spritenum_t.SPR_POL3,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_HEADCANDLES2},			// S_HEADCANDLES
    {sprite:spritenum_t.SPR_POL3,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_HEADCANDLES},			// S_HEADCANDLES2
    {sprite:spritenum_t.SPR_POL1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_DEADSTICK
    {sprite:spritenum_t.SPR_POL6,frame:0,tics:6,action:"NULL",nextstate:statenum_t.S_LIVESTICK2},				// S_LIVESTICK
    {sprite:spritenum_t.SPR_POL6,frame:1,tics:8,action:"NULL",nextstate:statenum_t.S_LIVESTICK},				// S_LIVESTICK2
    {sprite:spritenum_t.SPR_GOR2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MEAT2
    {sprite:spritenum_t.SPR_GOR3,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MEAT3
    {sprite:spritenum_t.SPR_GOR4,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MEAT4
    {sprite:spritenum_t.SPR_GOR5,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_MEAT5
    {sprite:spritenum_t.SPR_SMIT,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_STALAGTITE
    {sprite:spritenum_t.SPR_COL1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TALLGRNCOL
    {sprite:spritenum_t.SPR_COL2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SHRTGRNCOL
    {sprite:spritenum_t.SPR_COL3,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TALLREDCOL
    {sprite:spritenum_t.SPR_COL4,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SHRTREDCOL
    {sprite:spritenum_t.SPR_CAND,frame:32768,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},				// S_CANDLESTIK
    {sprite:spritenum_t.SPR_CBRA,frame:32768,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},				// S_CANDELABRA
    {sprite:spritenum_t.SPR_COL6,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SKULLCOL
    {sprite:spritenum_t.SPR_TRE1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TORCHTREE
    {sprite:spritenum_t.SPR_TRE2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BIGTREE
    {sprite:spritenum_t.SPR_ELEC,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_TECHPILLAR
    {sprite:spritenum_t.SPR_CEYE,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_EVILEYE2},				// S_EVILEYE
    {sprite:spritenum_t.SPR_CEYE,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_EVILEYE3},				// S_EVILEYE2
    {sprite:spritenum_t.SPR_CEYE,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_EVILEYE4},				// S_EVILEYE3
    {sprite:spritenum_t.SPR_CEYE,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_EVILEYE},				// S_EVILEYE4
    {sprite:spritenum_t.SPR_FSKU,frame:32768,tics:6,action:"NULL",nextstate:statenum_t.S_FLOATSKULL2},			// S_FLOATSKULL
    {sprite:spritenum_t.SPR_FSKU,frame:32769,tics:6,action:"NULL",nextstate:statenum_t.S_FLOATSKULL3},			// S_FLOATSKULL2
    {sprite:spritenum_t.SPR_FSKU,frame:32770,tics:6,action:"NULL",nextstate:statenum_t.S_FLOATSKULL},			// S_FLOATSKULL3
    {sprite:spritenum_t.SPR_COL5,frame:0,tics:14,action:"NULL",nextstate:statenum_t.S_HEARTCOL2},				// S_HEARTCOL
    {sprite:spritenum_t.SPR_COL5,frame:1,tics:14,action:"NULL",nextstate:statenum_t.S_HEARTCOL},				// S_HEARTCOL2
    {sprite:spritenum_t.SPR_TBLU,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_BLUETORCH2},			// S_BLUETORCH
    {sprite:spritenum_t.SPR_TBLU,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_BLUETORCH3},			// S_BLUETORCH2
    {sprite:spritenum_t.SPR_TBLU,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_BLUETORCH4},			// S_BLUETORCH3
    {sprite:spritenum_t.SPR_TBLU,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_BLUETORCH},			// S_BLUETORCH4
    {sprite:spritenum_t.SPR_TGRN,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_GREENTORCH2},			// S_GREENTORCH
    {sprite:spritenum_t.SPR_TGRN,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_GREENTORCH3},			// S_GREENTORCH2
    {sprite:spritenum_t.SPR_TGRN,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_GREENTORCH4},			// S_GREENTORCH3
    {sprite:spritenum_t.SPR_TGRN,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_GREENTORCH},			// S_GREENTORCH4
    {sprite:spritenum_t.SPR_TRED,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_REDTORCH2},			// S_REDTORCH
    {sprite:spritenum_t.SPR_TRED,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_REDTORCH3},			// S_REDTORCH2
    {sprite:spritenum_t.SPR_TRED,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_REDTORCH4},			// S_REDTORCH3
    {sprite:spritenum_t.SPR_TRED,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_REDTORCH},				// S_REDTORCH4
    {sprite:spritenum_t.SPR_SMBT,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_BTORCHSHRT2},			// S_BTORCHSHRT
    {sprite:spritenum_t.SPR_SMBT,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_BTORCHSHRT3},			// S_BTORCHSHRT2
    {sprite:spritenum_t.SPR_SMBT,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_BTORCHSHRT4},			// S_BTORCHSHRT3
    {sprite:spritenum_t.SPR_SMBT,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_BTORCHSHRT},			// S_BTORCHSHRT4
    {sprite:spritenum_t.SPR_SMGT,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_GTORCHSHRT2},			// S_GTORCHSHRT
    {sprite:spritenum_t.SPR_SMGT,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_GTORCHSHRT3},			// S_GTORCHSHRT2
    {sprite:spritenum_t.SPR_SMGT,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_GTORCHSHRT4},			// S_GTORCHSHRT3
    {sprite:spritenum_t.SPR_SMGT,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_GTORCHSHRT},			// S_GTORCHSHRT4
    {sprite:spritenum_t.SPR_SMRT,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_RTORCHSHRT2},			// S_RTORCHSHRT
    {sprite:spritenum_t.SPR_SMRT,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_RTORCHSHRT3},			// S_RTORCHSHRT2
    {sprite:spritenum_t.SPR_SMRT,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_RTORCHSHRT4},			// S_RTORCHSHRT3
    {sprite:spritenum_t.SPR_SMRT,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_RTORCHSHRT},			// S_RTORCHSHRT4
    {sprite:spritenum_t.SPR_HDB1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGNOGUTS
    {sprite:spritenum_t.SPR_HDB2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGBNOBRAIN
    {sprite:spritenum_t.SPR_HDB3,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGTLOOKDN
    {sprite:spritenum_t.SPR_HDB4,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGTSKULL
    {sprite:spritenum_t.SPR_HDB5,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGTLOOKUP
    {sprite:spritenum_t.SPR_HDB6,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_HANGTNOBRAIN
    {sprite:spritenum_t.SPR_POB1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_COLONGIBS
    {sprite:spritenum_t.SPR_POB2,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_SMALLPOOL
    {sprite:spritenum_t.SPR_BRS1,frame:0,tics:-1,action:"NULL",nextstate:statenum_t.S_NULL},					// S_BRAINSTEM
    {sprite:spritenum_t.SPR_TLMP,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_TECHLAMP2},			// S_TECHLAMP
    {sprite:spritenum_t.SPR_TLMP,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_TECHLAMP3},			// S_TECHLAMP2
    {sprite:spritenum_t.SPR_TLMP,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_TECHLAMP4},			// S_TECHLAMP3
    {sprite:spritenum_t.SPR_TLMP,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_TECHLAMP},				// S_TECHLAMP4
    {sprite:spritenum_t.SPR_TLP2,frame:32768,tics:4,action:"NULL",nextstate:statenum_t.S_TECH2LAMP2},			// S_TECH2LAMP
    {sprite:spritenum_t.SPR_TLP2,frame:32769,tics:4,action:"NULL",nextstate:statenum_t.S_TECH2LAMP3},			// S_TECH2LAMP2
    {sprite:spritenum_t.SPR_TLP2,frame:32770,tics:4,action:"NULL",nextstate:statenum_t.S_TECH2LAMP4},			// S_TECH2LAMP3
    {sprite:spritenum_t.SPR_TLP2,frame:32771,tics:4,action:"NULL",nextstate:statenum_t.S_TECH2LAMP}				// S_TECH2LAMP4
];

// Things
var THINGS=new Array(MAX_THINGS);
THINGS[mobjtype_t.MT_PLAYER]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_PLAY,
	spawnhealth:	100,
	seestate:		statenum_t.S_PLAY_RUN1,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	0,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_PLAY_PAIN,
	painchance:		255,
	painsound:		sfxenum_t.sfx_plpain,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_PLAY_ATK1,
	deathstate:		statenum_t.S_PLAY_DIE1,
	xdeathstate:	statenum_t.S_PLAY_XDIE1,
	deathsound:		sfxenum_t.sfx_pldeth,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_PICKUP|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_POSSESSED]={
	doomednum:		3004,
	spawnstate:		statenum_t.S_POSS_STND,
	spawnhealth:	20,
	seestate:		statenum_t.S_POSS_RUN1,
	seesound:		sfxenum_t.sfx_posit1,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_pistol,
	painstate:		statenum_t.S_POSS_PAIN,
	painchance:		200,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		0,
	missilestate:	statenum_t.S_POSS_ATK1,
	deathstate:		statenum_t.S_POSS_DIE1,
	xdeathstate:	statenum_t.S_POSS_XDIE1,
	deathsound:		sfxenum_t.sfx_podth1,
	speed:			8,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_posact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_POSS_RAISE1
};

THINGS[mobjtype_t.MT_SHOTGUY]={
	doomednum:		9,
	spawnstate:		statenum_t.S_SPOS_STND,
	spawnhealth:	30,
	seestate:		statenum_t.S_SPOS_RUN1,
	seesound:		sfxenum_t.sfx_posit2,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_SPOS_PAIN,
	painchance:		170,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		0,
	missilestate:	statenum_t.S_SPOS_ATK1,
	deathstate:		statenum_t.S_SPOS_DIE1,
	xdeathstate:	statenum_t.S_SPOS_XDIE1,
	deathsound:		sfxenum_t.sfx_podth2,
	speed:			8,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_posact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_SPOS_RAISE1
};

THINGS[mobjtype_t.MT_VILE]={
	doomednum:		64,
	spawnstate:		statenum_t.S_VILE_STND,
	spawnhealth:	700,
	seestate:		statenum_t.S_VILE_RUN1,
	seesound:		sfxenum_t.sfx_vilsit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_VILE_PAIN,
	painchance:		10,
	painsound:		sfxenum_t.sfx_vipain,
	meleestate:		0,
	missilestate:	statenum_t.S_VILE_ATK1,
	deathstate:		statenum_t.S_VILE_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_vildth,
	speed:			15,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			500,
	damage:			0,
	activesound:	sfxenum_t.sfx_vilact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_FIRE]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_FIRE1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_UNDEAD]={
	doomednum:		66,
	spawnstate:		statenum_t.S_SKEL_STND,
	spawnhealth:	300,
	seestate:		statenum_t.S_SKEL_RUN1,
	seesound:		sfxenum_t.sfx_skesit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_SKEL_PAIN,
	painchance:		100,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		statenum_t.S_SKEL_FIST1,
	missilestate:	statenum_t.S_SKEL_MISS1,
	deathstate:		statenum_t.S_SKEL_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_skedth,
	speed:			10,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			500,
	damage:			0,
	activesound:	sfxenum_t.sfx_skeact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_SKEL_RAISE1
};

THINGS[mobjtype_t.MT_TRACER]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_TRACER,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_skeatk,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_TRACEEXP1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_barexp,
	speed:			10*MAP_SCALE,
	radius:			11*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			10,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SMOKE]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_SMOKE1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_FATSO]={
	doomednum:		67,
	spawnstate:		statenum_t.S_FATT_STND,
	spawnhealth:	600,
	seestate:		statenum_t.S_FATT_RUN1,
	seesound:		sfxenum_t.sfx_mansit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_FATT_PAIN,
	painchance:		80,
	painsound:		sfxenum_t.sfx_mnpain,
	meleestate:		0,
	missilestate:	statenum_t.S_FATT_ATK1,
	deathstate:		statenum_t.S_FATT_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_mandth,
	speed:			8,
	radius:			48*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			1000,
	damage:			0,
	activesound:	sfxenum_t.sfx_posact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_FATT_RAISE1
};

THINGS[mobjtype_t.MT_FATSHOT]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_FATSHOT1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_firsht,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_FATSHOTX1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			20*MAP_SCALE,
	radius:			6*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			8,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_CHAINGUY]={
	doomednum:		65,
	spawnstate:		statenum_t.S_CPOS_STND,
	spawnhealth:	70,
	seestate:		statenum_t.S_CPOS_RUN1,
	seesound:		sfxenum_t.sfx_posit2,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_CPOS_PAIN,
	painchance:		170,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		0,
	missilestate:	statenum_t.S_CPOS_ATK1,
	deathstate:		statenum_t.S_CPOS_DIE1,
	xdeathstate:	statenum_t.S_CPOS_XDIE1,
	deathsound:		sfxenum_t.sfx_podth2,
	speed:			8,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_posact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_CPOS_RAISE1
};

THINGS[mobjtype_t.MT_TROOP]={
	doomednum:		3001,
	spawnstate:		statenum_t.S_TROO_STND,
	spawnhealth:	60,
	seestate:		statenum_t.S_TROO_RUN1,
	seesound:		sfxenum_t.sfx_bgsit1,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_TROO_PAIN,
	painchance:		200,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		statenum_t.S_TROO_ATK1,
	missilestate:	statenum_t.S_TROO_ATK1,
	deathstate:		statenum_t.S_TROO_DIE1,
	xdeathstate:	statenum_t.S_TROO_XDIE1,
	deathsound:		sfxenum_t.sfx_bgdth1,
	speed:			8,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_bgact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_TROO_RAISE1
};

THINGS[mobjtype_t.MT_SERGEANT]={
	doomednum:		3002,
	spawnstate:		statenum_t.S_SARG_STND,
	spawnhealth:	150,
	seestate:		statenum_t.S_SARG_RUN1,
	seesound:		sfxenum_t.sfx_sgtsit,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_sgtatk,
	painstate:		statenum_t.S_SARG_PAIN,
	painchance:		180,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		statenum_t.S_SARG_ATK1,
	missilestate:	0,
	deathstate:		statenum_t.S_SARG_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_sgtdth,
	speed:			10,
	radius:			30*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			400,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_SARG_RAISE1
};

THINGS[mobjtype_t.MT_SHADOWS]={
	doomednum:		58,
	spawnstate:		statenum_t.S_SARG_STND,
	spawnhealth:	150,
	seestate:		statenum_t.S_SARG_RUN1,
	seesound:		sfxenum_t.sfx_sgtsit,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_sgtatk,
	painstate:		statenum_t.S_SARG_PAIN,
	painchance:		180,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		statenum_t.S_SARG_ATK1,
	missilestate:	0,
	deathstate:		statenum_t.S_SARG_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_sgtdth,
	speed:			10,
	radius:			30*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			400,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_SHADOW|
					mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_SARG_RAISE1
};

THINGS[mobjtype_t.MT_HEAD]={
	doomednum:		3005,
	spawnstate:		statenum_t.S_HEAD_STND,
	spawnhealth:	400,
	seestate:		statenum_t.S_HEAD_RUN1,
	seesound:		sfxenum_t.sfx_cacsit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_HEAD_PAIN,
	painchance:		128,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		0,
	missilestate:	statenum_t.S_HEAD_ATK1,
	deathstate:		statenum_t.S_HEAD_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_cacdth,
	speed:			8,
	radius:			31*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			400,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_FLOAT|
					mobjflag_t.MF_NOGRAVITY|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_HEAD_RAISE1
};

THINGS[mobjtype_t.MT_BRUISER]={
	doomednum:		3003,
	spawnstate:		statenum_t.S_BOSS_STND,
	spawnhealth:	1000,
	seestate:		statenum_t.S_BOSS_RUN1,
	seesound:		sfxenum_t.sfx_brssit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_BOSS_PAIN,
	painchance:		50,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		statenum_t.S_BOSS_ATK1,
	missilestate:	statenum_t.S_BOSS_ATK1,
	deathstate:		statenum_t.S_BOSS_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_brsdth,
	speed:			8,
	radius:			24*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			1000,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_BOSS_RAISE1
};

THINGS[mobjtype_t.MT_BRUISERSHOT]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_BRBALL1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_firsht,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_BRBALLX1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			15*MAP_SCALE,
	radius:			6*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			8,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_KNIGHT]={
	doomednum:		69,
	spawnstate:		statenum_t.S_BOS2_STND,
	spawnhealth:	500,
	seestate:		statenum_t.S_BOS2_RUN1,
	seesound:		sfxenum_t.sfx_kntsit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_BOS2_PAIN,
	painchance:		50,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		statenum_t.S_BOS2_ATK1,
	missilestate:	statenum_t.S_BOS2_ATK1,
	deathstate:		statenum_t.S_BOS2_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_kntdth,
	speed:			8,
	radius:			24*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			1000,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_BOS2_RAISE1
};

THINGS[mobjtype_t.MT_SKULL]={
	doomednum:		3006,
	spawnstate:		statenum_t.S_SKULL_STND,
	spawnhealth:	100,
	seestate:		statenum_t.S_SKULL_RUN1,
	seesound:		0,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_sklatk,
	painstate:		statenum_t.S_SKULL_PAIN,
	painchance:		256,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		0,
	missilestate:	statenum_t.S_SKULL_ATK1,
	deathstate:		statenum_t.S_SKULL_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			8,
	radius:			16*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			50,
	damage:			3,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|
					mobjflag_t.MF_FLOAT|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SPIDER]={
	doomednum:		7,
	spawnstate:		statenum_t.S_SPID_STND,
	spawnhealth:	3000,
	seestate:		statenum_t.S_SPID_RUN1,
	seesound:		sfxenum_t.sfx_spisit,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_shotgn,
	painstate:		statenum_t.S_SPID_PAIN,
	painchance:		40,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		0,
	missilestate:	statenum_t.S_SPID_ATK1,
	deathstate:		statenum_t.S_SPID_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_spidth,
	speed:			12,
	radius:			128*MAP_SCALE,
	height:			100*MAP_SCALE,
	mass:			1000,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BABY]={
	doomednum:		68,
	spawnstate:		statenum_t.S_BSPI_STND,
	spawnhealth:	500,
	seestate:		statenum_t.S_BSPI_SIGHT,
	seesound:		sfxenum_t.sfx_bspsit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_BSPI_PAIN,
	painchance:		128,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		0,
	missilestate:	statenum_t.S_BSPI_ATK1,
	deathstate:		statenum_t.S_BSPI_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_bspdth,
	speed:			12,
	radius:			64*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			600,
	damage:			0,
	activesound:	sfxenum_t.sfx_bspact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_BSPI_RAISE1
};

THINGS[mobjtype_t.MT_CYBORG]={
	doomednum:		16,
	spawnstate:		statenum_t.S_CYBER_STND,
	spawnhealth:	4000,
	seestate:		statenum_t.S_CYBER_RUN1,
	seesound:		sfxenum_t.sfx_cybsit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_CYBER_PAIN,
	painchance:		20,
	painsound:		sfxenum_t.sfx_dmpain,
	meleestate:		0,
	missilestate:	statenum_t.S_CYBER_ATK1,
	deathstate:		statenum_t.S_CYBER_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_cybdth,
	speed:			16,
	radius:			40*MAP_SCALE,
	height:			110*MAP_SCALE,
	mass:			1000,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_PAIN]={
	doomednum:		71,
	spawnstate:		statenum_t.S_PAIN_STND,
	spawnhealth:	400,
	seestate:		statenum_t.S_PAIN_RUN1,
	seesound:		sfxenum_t.sfx_pesit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_PAIN_PAIN,
	painchance:		128,
	painsound:		sfxenum_t.sfx_pepain,
	meleestate:		0,
	missilestate:	statenum_t.S_PAIN_ATK1,
	deathstate:		statenum_t.S_PAIN_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_pedth,
	speed:			8,
	radius:			31*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			400,
	damage:			0,
	activesound:	sfxenum_t.sfx_dmact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_FLOAT|
					mobjflag_t.MF_NOGRAVITY|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_PAIN_RAISE1
};

THINGS[mobjtype_t.MT_WOLFSS]={
	doomednum:		84,
	spawnstate:		statenum_t.S_SSWV_STND,
	spawnhealth:	50,
	seestate:		statenum_t.S_SSWV_RUN1,
	seesound:		sfxenum_t.sfx_sssit,
	reactiontime:	8,
	attacksound:	0,
	painstate:		statenum_t.S_SSWV_PAIN,
	painchance:		170,
	painsound:		sfxenum_t.sfx_popain,
	meleestate:		0,
	missilestate:	statenum_t.S_SSWV_ATK1,
	deathstate:		statenum_t.S_SSWV_DIE1,
	xdeathstate:	statenum_t.S_SSWV_XDIE1,
	deathsound:		sfxenum_t.sfx_ssdth,
	speed:			8,
	radius:			20*MAP_SCALE,
	height:			56*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_posact,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_SSWV_RAISE1
};

THINGS[mobjtype_t.MT_KEEN]={
	doomednum:		72,
	spawnstate:		statenum_t.S_KEENSTND,
	spawnhealth:	100,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_KEENPAIN,
	painchance:		256,
	painsound:		sfxenum_t.sfx_keenpn,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_COMMKEEN,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_keendt,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			72*MAP_SCALE,
	mass:			10000000,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY|
					mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_COUNTKILL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BOSSBRAIN]={
	doomednum:		88,
	spawnstate:		statenum_t.S_BRAIN,
	spawnhealth:	250,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_BRAIN_PAIN,
	painchance:		255,
	painsound:		sfxenum_t.sfx_bospn,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_BRAIN_DIE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_bosdth,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			10000000,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BOSSSPIT]={
	doomednum:		89,
	spawnstate:		statenum_t.S_BRAINEYE,
	spawnhealth:	1000,
	seestate:		statenum_t.S_BRAINEYESEE,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			32*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOSECTOR,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BOSSTARGET]={
	doomednum:		87,
	spawnstate:		statenum_t.S_NULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			32*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOSECTOR,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SPAWNSHOT]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_SPAWN1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_bospit,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			10*MAP_SCALE,
	radius:			6*MAP_SCALE,
	height:			32*MAP_SCALE,
	mass:			100,
	damage:			3,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|mobjflag_t.MF_DROPOFF|
					mobjflag_t.MF_NOGRAVITY|mobjflag_t.MF_NOCLIP,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SPAWNFIRE]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_SPAWNFIRE1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BARREL]={
	doomednum:		2035,
	spawnstate:		statenum_t.S_BAR1,
	spawnhealth:	20,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_BEXP,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_barexp,
	speed:			0,
	radius:			10*MAP_SCALE,
	height:			42*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SHOOTABLE|mobjflag_t.MF_NOBLOOD,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_TROOPSHOT]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_TBALL1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_firsht,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_TBALLX1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			10*MAP_SCALE,
	radius:			6*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			3,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_HEADSHOT]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_RBALL1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_firsht,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_RBALLX1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			10*MAP_SCALE,
	radius:			6*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			5,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_ROCKET]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_ROCKET,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_rlaunc,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_EXPLODE1,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_barexp,
	speed:			20*MAP_SCALE,
	radius:			11*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			20,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_PLASMA]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_PLASBALL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_plasma,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_PLASEXP,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			25*MAP_SCALE,
	radius:			13*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			5,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BFG]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_BFGSHOT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		0,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_BFGLAND,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_rxplod,
	speed:			25*MAP_SCALE,
	radius:			13*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			100,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_ARACHPLAZ]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_ARACH_PLAZ,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_plasma,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_ARACH_PLEX,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_firxpl,
	speed:			25*MAP_SCALE,
	radius:			13*MAP_SCALE,
	height:			8*MAP_SCALE,
	mass:			100,
	damage:			5,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_MISSILE|
					mobjflag_t.MF_DROPOFF|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_PUFF]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_PUFF1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_BLOOD]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_BLOOD1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_TFOG]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_TFOG,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_IFOG]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_IFOG,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_TELEPORTMAN]={
	doomednum:		14,
	spawnstate:		statenum_t.S_NULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOSECTOR,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_EXTRABFG]={
	doomednum:		-1,
	spawnstate:		statenum_t.S_BFGEXP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC0]={
	doomednum:		2018,
	spawnstate:		statenum_t.S_ARM1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC1]={
	doomednum:		2019,
	spawnstate:		statenum_t.S_ARM2,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC2]={
	doomednum:		2014,
	spawnstate:		statenum_t.S_BON1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC3]={
	doomednum:		2015,
	spawnstate:		statenum_t.S_BON2,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC4]={
	doomednum:		5,
	spawnstate:		statenum_t.S_BKEY,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC5]={
	doomednum:		13,
	spawnstate:		statenum_t.S_RKEY,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC6]={
	doomednum:		6,
	spawnstate:		statenum_t.S_YKEY,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC7]={
	doomednum:		39,
	spawnstate:		statenum_t.S_YSKULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC8]={
	doomednum:		38,
	spawnstate:		statenum_t.S_RSKULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC9]={
	doomednum:		40,
	spawnstate:		statenum_t.S_BSKULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_NOTDMATCH,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC10]={
	doomednum:		2011,
	spawnstate:		statenum_t.S_STIM,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC11]={
	doomednum:		2012,
	spawnstate:		statenum_t.S_MEDI,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC12]={
	doomednum:		2013,
	spawnstate:		statenum_t.S_SOUL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_INV]={
	doomednum:		2022,
	spawnstate:		statenum_t.S_PINV,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC13]={
	doomednum:		2023,
	spawnstate:		statenum_t.S_PSTR,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_INS]={
	doomednum:		2024,
	spawnstate:		statenum_t.S_PINS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC14]={
	doomednum:		2025,
	spawnstate:		statenum_t.S_SUIT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC15]={
	doomednum:		2026,
	spawnstate:		statenum_t.S_PMAP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC16]={
	doomednum:		2045,
	spawnstate:		statenum_t.S_PVIS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MEGA]={
	doomednum:		83,
	spawnstate:		statenum_t.S_MEGA,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL|mobjflag_t.MF_COUNTITEM,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_CLIP]={
	doomednum:		2007,
	spawnstate:		statenum_t.S_CLIP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC17]={
	doomednum:		2048,
	spawnstate:		statenum_t.S_AMMO,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC18]={
	doomednum:		2010,
	spawnstate:		statenum_t.S_ROCK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC19]={
	doomednum:		2046,
	spawnstate:		statenum_t.S_BROK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC20]={
	doomednum:		2047,
	spawnstate:		statenum_t.S_CELL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC21]={
	doomednum:		17,
	spawnstate:		statenum_t.S_CELP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC22]={
	doomednum:		2008,
	spawnstate:		statenum_t.S_SHEL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC23]={
	doomednum:		2049,
	spawnstate:		statenum_t.S_SBOX,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC24]={
	doomednum:		8,
	spawnstate:		statenum_t.S_BPAK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC25]={
	doomednum:		2006,
	spawnstate:		statenum_t.S_BFUG,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_CHAINGUN]={
	doomednum:		2002,
	spawnstate:		statenum_t.S_MGUN,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC26]={
	doomednum:		2005,
	spawnstate:		statenum_t.S_CSAW,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC27]={
	doomednum:		2003,
	spawnstate:		statenum_t.S_LAUN,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC28]={
	doomednum:		2004,
	spawnstate:		statenum_t.S_PLAS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SHOTGUN]={
	doomednum:		2001,
	spawnstate:		statenum_t.S_SHOT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_SUPERSHOTGUN]={
	doomednum:		82,
	spawnstate:		statenum_t.S_SHOT2,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPECIAL,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC29]={
	doomednum:		85,
	spawnstate:		statenum_t.S_TECHLAMP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC30]={
	doomednum:		86,
	spawnstate:		statenum_t.S_TECH2LAMP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC31]={
	doomednum:		2028,
	spawnstate:		statenum_t.S_COLU,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC32]={
	doomednum:		30,
	spawnstate:		statenum_t.S_TALLGRNCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC33]={
	doomednum:		31,
	spawnstate:		statenum_t.S_SHRTGRNCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC34]={
	doomednum:		32,
	spawnstate:		statenum_t.S_TALLREDCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC35]={
	doomednum:		33,
	spawnstate:		statenum_t.S_SHRTREDCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC36]={
	doomednum:		37,
	spawnstate:		statenum_t.S_SKULLCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC37]={
	doomednum:		36,
	spawnstate:		statenum_t.S_HEARTCOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC38]={
	doomednum:		41,
	spawnstate:		statenum_t.S_EVILEYE,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC39]={
	doomednum:		42,
	spawnstate:		statenum_t.S_FLOATSKULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC40]={
	doomednum:		43,
	spawnstate:		statenum_t.S_TORCHTREE,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC41]={
	doomednum:		44,
	spawnstate:		statenum_t.S_BLUETORCH,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC42]={
	doomednum:		45,
	spawnstate:		statenum_t.S_GREENTORCH,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC43]={
	doomednum:		46,
	spawnstate:		statenum_t.S_REDTORCH,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC44]={
	doomednum:		55,
	spawnstate:		statenum_t.S_BTORCHSHRT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC45]={
	doomednum:		56,
	spawnstate:		statenum_t.S_GTORCHSHRT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC46]={
	doomednum:		57,
	spawnstate:		statenum_t.S_RTORCHSHRT,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC47]={
	doomednum:		47,
	spawnstate:		statenum_t.S_STALAGTITE,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC48]={
	doomednum:		48,
	spawnstate:		statenum_t.S_TECHPILLAR,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC49]={
	doomednum:		34,
	spawnstate:		statenum_t.S_CANDLESTIK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC50]={
	doomednum:		35,
	spawnstate:		statenum_t.S_CANDELABRA,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC51]={
	doomednum:		49,
	spawnstate:		statenum_t.S_BLOODYTWITCH,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			68*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC52]={
	doomednum:		50,
	spawnstate:		statenum_t.S_MEAT2,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			84*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC53]={
	doomednum:		51,
	spawnstate:		statenum_t.S_MEAT3,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			84*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC54]={
	doomednum:		52,
	spawnstate:		statenum_t.S_MEAT4,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			68*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC55]={
	doomednum:		53,
	spawnstate:		statenum_t.S_MEAT5,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			52*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC56]={
	doomednum:		59,
	spawnstate:		statenum_t.S_MEAT2,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			84*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC57]={
	doomednum:		60,
	spawnstate:		statenum_t.S_MEAT4,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			68*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC58]={
	doomednum:		61,
	spawnstate:		statenum_t.S_MEAT3,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			52*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC59]={
	doomednum:		62,
	spawnstate:		statenum_t.S_MEAT5,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			52*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC60]={
	doomednum:		63,
	spawnstate:		statenum_t.S_BLOODYTWITCH,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			68*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC61]={
	doomednum:		22,
	spawnstate:		statenum_t.S_HEAD_DIE6,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC62]={
	doomednum:		15,
	spawnstate:		statenum_t.S_PLAY_DIE7,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC63]={
	doomednum:		18,
	spawnstate:		statenum_t.S_POSS_DIE5,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC64]={
	doomednum:		21,
	spawnstate:		statenum_t.S_SARG_DIE6,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC65]={
	doomednum:		23,
	spawnstate:		statenum_t.S_SKULL_DIE6,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC66]={
	doomednum:		20,
	spawnstate:		statenum_t.S_TROO_DIE5,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC67]={
	doomednum:		19,
	spawnstate:		statenum_t.S_SPOS_DIE5,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC68]={
	doomednum:		10,
	spawnstate:		statenum_t.S_PLAY_XDIE9,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC69]={
	doomednum:		12,
	spawnstate:		statenum_t.S_PLAY_XDIE9,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC70]={
	doomednum:		28,
	spawnstate:		statenum_t.S_HEADSONSTICK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC71]={
	doomednum:		24,
	spawnstate:		statenum_t.S_GIBS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			0,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC72]={
	doomednum:		27,
	spawnstate:		statenum_t.S_HEADONASTICK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC73]={
	doomednum:		29,
	spawnstate:		statenum_t.S_HEADCANDLES,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC74]={
	doomednum:		25,
	spawnstate:		statenum_t.S_DEADSTICK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC75]={
	doomednum:		26,
	spawnstate:		statenum_t.S_LIVESTICK,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC76]={
	doomednum:		54,
	spawnstate:		statenum_t.S_BIGTREE,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			32*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC77]={
	doomednum:		70,
	spawnstate:		statenum_t.S_BBAR1,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC78]={
	doomednum:		73,
	spawnstate:		statenum_t.S_HANGNOGUTS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			88*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC79]={
	doomednum:		74,
	spawnstate:		statenum_t.S_HANGBNOBRAIN,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			88*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC80]={
	doomednum:		75,
	spawnstate:		statenum_t.S_HANGTLOOKDN,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC81]={
	doomednum:		76,
	spawnstate:		statenum_t.S_HANGTSKULL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC82]={
	doomednum:		77,
	spawnstate:		statenum_t.S_HANGTLOOKUP,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC83]={
	doomednum:		78,
	spawnstate:		statenum_t.S_HANGTNOBRAIN,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			16*MAP_SCALE,
	height:			64*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_SOLID|mobjflag_t.MF_SPAWNCEILING|mobjflag_t.MF_NOGRAVITY,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC84]={
	doomednum:		79,
	spawnstate:		statenum_t.S_COLONGIBS,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC85]={
	doomednum:		80,
	spawnstate:		statenum_t.S_SMALLPOOL,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP,
	raisestate:		statenum_t.S_NULL
};

THINGS[mobjtype_t.MT_MISC86]={
	doomednum:		81,
	spawnstate:		statenum_t.S_BRAINSTEM,
	spawnhealth:	1000,
	seestate:		statenum_t.S_NULL,
	seesound:		sfxenum_t.sfx_None,
	reactiontime:	8,
	attacksound:	sfxenum_t.sfx_None,
	painstate:		statenum_t.S_NULL,
	painchance:		0,
	painsound:		sfxenum_t.sfx_None,
	meleestate:		statenum_t.S_NULL,
	missilestate:	statenum_t.S_NULL,
	deathstate:		statenum_t.S_NULL,
	xdeathstate:	statenum_t.S_NULL,
	deathsound:		sfxenum_t.sfx_None,
	speed:			0,
	radius:			20*MAP_SCALE,
	height:			16*MAP_SCALE,
	mass:			100,
	damage:			0,
	activesound:	sfxenum_t.sfx_None,
	flags:			mobjflag_t.MF_NOBLOCKMAP,
	raisestate:		statenum_t.S_NULL
};
