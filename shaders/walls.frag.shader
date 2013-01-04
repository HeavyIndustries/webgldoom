precision mediump float;

uniform sampler2D texture;
uniform int lines;

varying vec2 vTexCoord;
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
	if(lines==1){
		gl_FragColor=vec4(1.0,0.0,0.0,1.0);
		return;
	}

	vec4 color=texture2D(texture,vTexCoord.st);
	if(color.a<0.1)
		discard;

	gl_FragColor=fog(vec4(vLight*color.rgb,color.a));
}
