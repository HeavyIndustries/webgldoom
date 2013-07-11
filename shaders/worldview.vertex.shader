attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uPMatrix;
varying vec2 vTexCoord;

void main(void){
	vTexCoord=aTexCoord;
	gl_Position=uPMatrix*vec4(aPosition, 1.0);
}
