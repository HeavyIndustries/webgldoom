attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform vec2 uSize;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;

void main(void){
	vTextureCoord=aTexCoord;
	gl_Position=uPMatrix*vec4(aPosition,1.0);
}
