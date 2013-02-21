attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uPMatrix;
uniform vec2 uOffset;
varying vec2 vTexCoord;

void main(void){
	vTexCoord=aTexCoord;
	gl_Position=uPMatrix*vec4(aPosition+vec3(uOffset.xy,0.0), 1.0);
}
