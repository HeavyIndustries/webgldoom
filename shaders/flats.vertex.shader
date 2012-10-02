attribute vec3 aPosition;
attribute vec2 aTexId;
attribute float aLight;
attribute float aType;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vPos;
varying vec2 vTexId;
varying float vLight;
varying float vType;

void main(void){
	vTexId=aTexId;
	vLight=aLight;
	vType=aType;
	vPos=aPosition;
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition, 1.0);
	gl_PointSize=5.0;
}
