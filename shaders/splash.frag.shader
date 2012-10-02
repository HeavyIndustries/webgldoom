precision mediump float;

uniform sampler2D texture;
varying vec2 vTexCoord;

void main (void){
	gl_FragColor=texture2D(texture,vTexCoord.st);
}
