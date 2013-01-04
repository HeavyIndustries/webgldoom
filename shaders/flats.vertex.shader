attribute vec3 aPosition;
attribute vec2 aTexId;
attribute float aLight;
attribute float aType;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float lighttimers[5];

varying vec3 vPos;
varying vec2 vTexId;
varying float vLight;

void main(void){
	vTexId=aTexId;
	vLight=aLight*lighttimers[int(aType)];
	vPos=aPosition;
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition, 1.0);
}
