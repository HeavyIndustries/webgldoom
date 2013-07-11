precision highp float;

uniform sampler2D texture;
varying vec2 vTexCoord;

uniform float health;

void main (void){
	gl_FragColor = texture2D(texture, vTexCoord.st);
	gl_FragColor.gb *= min(vec2(1.0, 1.0), vec2(health / 100.0));
}
