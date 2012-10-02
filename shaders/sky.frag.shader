precision mediump float;

uniform samplerCube texture;
varying vec3 vNormal;

void main (void){
	gl_FragColor=textureCube(texture,vNormal);
}
