attribute vec3 aPosition;
attribute vec4 aColor;
attribute float aSize;
attribute float aType;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform bool uShadowPass;

varying float vSize;
varying vec4 vColor;

void main(void){
	vec4 pPosition=uMVMatrix*vec4(aPosition,1.0);
	gl_Position=uPMatrix*pPosition;	

	vColor=aColor;
	vSize=aSize;

	// Clouds
	if(aType==2.0){
		if(uShadowPass){
			gl_PointSize=aSize*50.0;
			vColor.a=0.2;
		} else {
			gl_PointSize=aSize*(100.0-aPosition.x);
			vColor.rgb=1.0-vColor.rgb;
			vColor.a=0.5-(1.0/gl_Position.w);
		}

	} else {
		if(uShadowPass)
			gl_PointSize=1.0;
		else
			gl_PointSize=aSize/gl_Position.w;
	}
}
