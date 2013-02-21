attribute vec3 aPosition;
attribute float aHit;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec3 vColor;

void main(void){
	vColor=vec3(0.0,1.0,0.0);
	if(aHit>1.1)
		vColor=vec3(0.0,0.0,1.0);
	else if(aHit>0.1)
		vColor=vec3(1.0,0.0,0.0);
	gl_Position=uPMatrix*uMVMatrix*vec4(aPosition, 1.0);
}
