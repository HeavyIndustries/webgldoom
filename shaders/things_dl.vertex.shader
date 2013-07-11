attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aTexCoord;

uniform mat3 uNMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform int uFlip;
uniform float lighttimers[5];
uniform float lightType;
uniform float lightLevel;

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vTexCoord;
varying float vLight;

void main(void){
	if (uFlip == 1)
		vTexCoord = aTexCoord.zy;
	else
		vTexCoord = aTexCoord.xy;
	
	vLight = lightLevel * lighttimers[int(lightType)];

	vNormal = uNMatrix * aNormal;
	vPos = vec3(uMVMatrix * vec4(aPosition, 1.0)).xyz;

	gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
}
