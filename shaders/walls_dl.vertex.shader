attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute float aLight;	// This should be a vec3 (min,sectorlevel,max) for pulsating
attribute float aType;
attribute float aSector;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float lighttimers[5];

varying float vLight;
varying vec3 vNormal;
varying vec3 vPos;
varying vec2 vTexCoord;
varying float vSector;

void main(void){
	vLight 		= aLight * lighttimers[int(aType)];
	vNormal		= aNormal;
	vPos		= aPosition;
	vSector 	= aSector + 0.01;
	vTexCoord 	= aTexCoord;
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
}
