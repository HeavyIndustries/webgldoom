precision mediump float;

uniform sampler2D texture;

varying vec2 vTexCoord;

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
	vec4 color=texture2D(texture,vTexCoord.st);
	if(color.rgb==vec3(0.0,1.0,0.0))
		discard;
	gl_FragColor=fog(color);
}
