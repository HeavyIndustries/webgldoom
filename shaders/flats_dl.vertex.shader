attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexId;
attribute float aFrames;
attribute float aLight;
attribute float aType;
attribute float aSector;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float lighttimers[5];
uniform float aniFrame[2];

varying vec3 vNormal;
varying vec3 vPos;
varying vec2 vTexId;
varying float vLight;
varying float vFrame;
varying float vSector;

void main(void){
	vSector = aSector + 0.01;

	// Animated Flats
	vFrame = 0.0;
	if (floor(aFrames) == 3.0)
		vFrame = aniFrame[0] + 0.1;
	else if (floor(aFrames) == 4.0)
		vFrame = aniFrame[1] + 0.1;
		
	vLight		= aLight * lighttimers[int(aType)];
	vNormal		= aNormal;
	vPos		= aPosition;
	vTexId 		= aTexId;
	gl_Position	= uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
}
