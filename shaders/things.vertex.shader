attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTexCoord;

void main(void){
	vTexCoord=aTexCoord;
	// Mmm billboardy, spherical though =( 
	gl_Position=uPMatrix*(uMVMatrix*vec4(0.0,0.0, 0.0, 1.0)+vec4(aPosition.x,aPosition.y,0.0,0.0));
}
