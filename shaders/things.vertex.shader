attribute vec3 aPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void){
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition, 1.0);
	gl_PointSize=25.0;
}
