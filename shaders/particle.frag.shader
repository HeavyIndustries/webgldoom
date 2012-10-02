precision mediump float;

varying float vSize;
varying vec4 vColor;
uniform float fogDensity;
uniform bool thunder;

uniform bool uBlurPass;
uniform bool uBlur;

//
// Fog Stuff
//
vec4 fog (vec4 fragmentColor){
	float depth=gl_FragCoord.z/gl_FragCoord.w;
	const float LOG2=1.442695;
	vec3 fogColor=vec3(0.1,0.1,0.1);
	if(thunder)
		fogColor=vec3(0.9,0.9,0.9);
	float fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2);

	fogFactor=1.0-clamp(fogFactor,0.0,1.0);
	return mix(fragmentColor,vec4(fogColor,gl_FragColor.w),fogFactor);
}

void main(void){
	if(uBlurPass&&!uBlur){
		gl_FragColor=vec4(0.0,0.0,0.0,1.0);
		return;
	}
	gl_FragColor=clamp(fog(vColor),0.0,1.0);
}

