attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vNormal;

void main(void){
	vNormal=aNormal;
	vec4 pos=uPMatrix*uMVMatrix*vec4(aPosition,1.0);
	gl_Position=pos.xyzz;
}
