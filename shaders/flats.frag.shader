precision mediump float;

uniform sampler2D texture;
uniform int lines;

varying vec3 vPos;
varying vec2 vTexId;
varying float vLight;
varying float vType;

vec4 fog (vec4 fragmentColor){
	float depth=gl_FragCoord.z/gl_FragCoord.w;
	const float LOG2=1.442695;
	float fogDensity=0.00075;
	vec3 fogColor=vec3(0.0,0.0,0.0);
	float fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2);

	fogFactor=1.0-clamp(fogFactor,0.0,1.0);
	return mix(fragmentColor,vec4(fogColor,fragmentColor.a),fogFactor);
}

void main (void){
	vec2 tSize=vec2(512.0,512.0);
	vec2 fSize=vec2(64.0,64.0);
	vec2 toff=tSize/fSize;
	vec2 tile=vec2(floor(vTexId.s),floor(vTexId.t));
	
	if(lines==1){
		gl_FragColor=vec4(0.0,0.0,1.0,1.0);
		return;
	}

	vec2 fPos=vec2(
		(vPos.x/fSize.x)-floor(vPos.x/fSize.x),
		(vPos.z/fSize.y)-floor(vPos.z/fSize.y)
	);

	fPos/=toff;
	
	// Tile id
	fPos.x+=tile.x*(1.0/(tSize.x/fSize.x));
	fPos.y+=tile.y*(1.0/(tSize.y/fSize.y));

	// Tile Padding
	fPos.x+=(1.0/tSize.x)+(tile.x*(1.0/tSize.x));
	fPos.y+=(1.0/tSize.y)+(tile.y*(1.0/tSize.y));

	vec4 color=texture2D(texture,fPos);
	
	gl_FragColor=fog(vec4(vLight*color.rgb,color.a));
}
