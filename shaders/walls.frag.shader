precision mediump float;

uniform sampler2D texture;
uniform int lines;
uniform vec4 lighttimers;

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
	float light=vLight;
		
	if(lines==1){
		gl_FragColor=vec4(1.0,0.0,0.0,1.0);
		return;
	}

	// Lighting Effects
	float lType=floor(vType);
	if(lType==1.0||lType==17.0)// Random Blink
		light*=lighttimers[0];
	else if(lType==2.0||lType==4.0||lType==12.0)// Blink 0.5
		light*=lighttimers[1];
	else if(lType==3.0||lType==13.0)// Blink 1.0
		light*=lighttimers[2];
	else if(lType==8.0)// Oscillate
		light*=lighttimers[3];
	
	vec4 color=texture2D(texture,vTexCoord.st);
	if(color.a<0.1)
		discard;
	gl_FragColor=fog(vec4(light*color.rgb,color.a));
}
