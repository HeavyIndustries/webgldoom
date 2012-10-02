attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute float aLight;
attribute float aType;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTexCoord;
varying float vLight;
varying float vType;

void main(void){
	vTexCoord=aTexCoord;
	vLight=aLight;
	vType=aType;
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition, 1.0);
}
