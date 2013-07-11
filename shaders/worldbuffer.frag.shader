precision highp float;

uniform sampler2D texture;
uniform int uMask;

varying vec3 vNormal;
varying vec2 vTexCoord;

void main (void) {
	if (uMask == 1 && texture2D(texture, vTexCoord.st).a < 0.1)
		discard;
	gl_FragColor = vec4(vNormal, 1.0);
}
