attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute float aLight;
attribute float aType;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float lighttimers[5];

varying vec2 vTexCoord;
varying float vLight;

void main(void){
	vTexCoord=aTexCoord;
	vLight=aLight*lighttimers[int(aType)];
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition,1.0);
}
