attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute float aLight;	// This should be a vec3 (min,sectorlevel,max) for pulsating
attribute float aType;
attribute float aSector;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float lighttimers[5];

varying vec2 vTexCoord;
varying float vLight;
varying float vSector;

void main(void){
	vSector=aSector+0.01;
	vTexCoord=aTexCoord;
	vLight=aLight*lighttimers[int(aType)];
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition,1.0);
}
