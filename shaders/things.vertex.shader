attribute vec3 aPosition;
attribute vec3 aTexCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform int flip;
uniform float lighttimers[5];
uniform float lightType;
uniform float lightLevel;

varying vec2 vTexCoord;
varying float vLight;

void main(void){
	if(flip==1) vTexCoord=aTexCoord.zy;
	else 		vTexCoord=aTexCoord.xy;
	
	vLight=lightLevel*lighttimers[int(lightType)];
	
	// Mmm billboardy, spherical though =( 
	gl_Position=uPMatrix*(uMVMatrix*vec4(0.0,0.0,0.0,1.0)+vec4(aPosition.x,aPosition.y,0.0,0.0));
}
