attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aTexCoord;

uniform int uFlip;
uniform mat3 uNMatrix;
uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;

varying vec3 vNormal;
varying vec2 vTexCoord;

void main (void) {
	if (uFlip == 1)
		vTexCoord = aTexCoord.zy;
	else
		vTexCoord = aTexCoord.xy;
	vNormal 	= uNMatrix * aNormal;
	gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
}
