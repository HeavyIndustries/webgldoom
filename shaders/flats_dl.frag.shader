precision highp float;

#define MAX_LIGHTS 32

uniform sampler2D texture;
uniform sampler2D texture_ssao;

uniform int ssao;
uniform vec2 ssao_size;
uniform int lines;
uniform int hlSector;

struct light_t {
    vec3 color;
    vec3 position;
    float size;
};
uniform light_t uLight[MAX_LIGHTS];

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vTexId;
varying float vFrame;
varying float vLight;
varying float vType;
varying float vSector;

vec4 fog (vec4 fragmentColor) {
	float depth = gl_FragCoord.z / gl_FragCoord.w;
	const float LOG2 = 1.442695;
	float fogDensity = 0.00075;
	vec3 fogColor = vec3(0.0, 0.0, 0.0);
	float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
	fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);
	return mix(fragmentColor, vec4(fogColor,fragmentColor.a), fogFactor);
}

void main (void){
	vec2 tSize = vec2(512.0, 512.0);
	vec2 fSize = vec2(64.0, 64.0);
	vec2 toff = tSize / fSize;
	// s = horiz / t = vert tile
	vec2 tile = vec2(floor(vTexId.s), floor(vTexId.t));
	
	if (lines == 1) {
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
		return;
	}

	vec2 fPos = vec2(
		(vPos.x / fSize.x) - floor(vPos.x / fSize.x),
		(vPos.z / fSize.y) - floor(vPos.z / fSize.y)
	);

	// Animated Flat
	if (floor(vFrame) > 0.0) {
		tile.x -= floor(vFrame);
		if (tile.x < 0.0) {
			tile.x += 7.0;
			tile.y -= 1.0;
		}
	}

	fPos /= toff;
	
	// Tile id
	fPos.x += tile.x * (1.0 / (tSize.x / fSize.x));
	fPos.y += tile.y * (1.0 / (tSize.y / fSize.y));

	// Tile Padding
	fPos.x += (1.0 / tSize.x) + (tile.x * (1.0 / tSize.x));
	fPos.y += (1.0 / tSize.y) + (tile.y * (1.0 / tSize.y));

	vec4 color = texture2D(texture, fPos);

	if (hlSector > -1 && float(hlSector) == floor(vSector))
		color.rgb += vec3(0.8, 0.8, 0.0);

	// Dynamic Lighting
	for (int l = 0; l < MAX_LIGHTS; l++) {
		if (uLight[l].size < 0.0)
			continue;
		vec3  lDir 		= uLight[l].position - vPos.xyz;
		float lDist 	= length(lDir);
		lDir 			= normalize(lDir);
		float lWeight 	= max(dot(vNormal.xyz, lDir), 0.0);
		float lAttn 	= uLight[l].size / (0.55 + (0.22 * lDist) + (0.20 * lDist * lDist));

		color.rgb += lAttn * (lWeight * uLight[l].color * color.rgb);
	}

	if (ssao == 1)
		color.rgb *= texture2D(texture_ssao, gl_FragCoord.xy / ssao_size).rgb;
	
	gl_FragColor = fog(vec4(vLight * color.rgb, color.a));
}
