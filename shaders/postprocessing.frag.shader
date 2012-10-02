precision mediump float;

#define FILTER_BRIGHTNESSANDCONTRAST false
#define FILTER_SCANLINES false
#define FILTER_VIGNETTE true
#define FILTER_PIXELATE false

#define FXAA_REDUCE_MIN   (1.0/128.0)
#define FXAA_REDUCE_MUL   (1.0/8.0)
#define FXAA_SPAN_MAX     8.0

uniform sampler2D texture;
uniform vec2 uSize;

uniform float damage;
uniform bool paused;
uniform float vignette;

uniform sampler2D blurTexture;

uniform bool opt_fxaa;
uniform bool opt_blur;

varying vec2 vTextureCoord;

void main (void) {
	vec4 color=texture2D(texture,vTextureCoord.st);

	if(opt_fxaa){
		vec3 rgbNW=texture2D(texture,(gl_FragCoord.xy+vec2(-1.0,-1.0))*uSize).xyz;
		vec3 rgbNE=texture2D(texture,(gl_FragCoord.xy+vec2(1.0,-1.0))*uSize).xyz;
		vec3 rgbSW=texture2D(texture,(gl_FragCoord.xy+vec2(-1.0,1.0))*uSize).xyz;
		vec3 rgbSE=texture2D(texture,(gl_FragCoord.xy+vec2(1.0,1.0))*uSize).xyz;
		vec3 rgbM=texture2D(texture,gl_FragCoord.xy*uSize).xyz;
		vec3 luma=vec3(0.299,0.587,0.114);
		float lumaNW=dot(rgbNW,luma);
		float lumaNE=dot(rgbNE,luma);
		float lumaSW=dot(rgbSW,luma);
		float lumaSE=dot(rgbSE,luma);
		float lumaM=dot(rgbM,luma);
		float lumaMin=min(lumaM,min(min(lumaNW,lumaNE),min(lumaSW,lumaSE)));
		float lumaMax=max(lumaM,max(max(lumaNW,lumaNE),max(lumaSW,lumaSE)));
		
		vec2 dir;
		dir.x=-((lumaNW+lumaNE)-(lumaSW+lumaSE));
		dir.y= ((lumaNW+lumaSW)-(lumaNE+lumaSE));
		
		float dirReduce=max((lumaNW+lumaNE+lumaSW+lumaSE)*
			(0.25*FXAA_REDUCE_MUL),FXAA_REDUCE_MIN);
		
		float rcpDirMin=1.0/(min(abs(dir.x),abs(dir.y))+dirReduce);
		dir=min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
			max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
			dir*rcpDirMin))*uSize;
		  
		vec3 rgbA=0.5*(
			texture2D(texture,gl_FragCoord.xy*uSize+dir*(1.0/3.0-0.5)).xyz+
			texture2D(texture,gl_FragCoord.xy*uSize+dir*(2.0/3.0-0.5)).xyz
		);
		
		vec3 rgbB=rgbA*0.5+0.25*(
			texture2D(texture,gl_FragCoord.xy*uSize+dir*-0.5).xyz+
			texture2D(texture,gl_FragCoord.xy*uSize+dir*0.5).xyz
		);
	
		float lumaB=dot(rgbB,luma);
		if((lumaB<lumaMin)||(lumaB>lumaMax))
			color=vec4(rgbA,1.0);
		else
			color=vec4(rgbB,1.0);
	}

	if(opt_blur)
		color+=0.8*texture2D(blurTexture,vTextureCoord.st);


/*
	// Gets pixel coordinate from 4 to the right, and 2 above
//	vec2 otherPixelCoord=vTextureCoord+vec2(uSize.x*4.0, uSize.y*2.0);
//	vec4 otherPixelColor=texture2D(texture,otherPixelCoord.st);

	// Pixelate 
	if(FILTER_PIXELATE){
		float pixelsize=15.0;
		vec2 uv=vTextureCoord.xy;
		float dx=pixelsize*(1./uSize[0]);
		float dy=pixelsize*(1./uSize[1]);
		vec2 coord=vec2(dx*floor(uv.x/dx),dy*floor(uv.y/dy));
		color=vec4(texture2D(texture,coord).rgb,1.0);
	}

	// RGB Scan Lines
	if(FILTER_SCANLINES){
		float vlines=360.0;
		vec2 scanlines=vec2(sin(vTextureCoord.y*vlines),cos(vTextureCoord.y*vlines));
		color.rgb*=scanlines.xyx;
	}
*/
	// Vignette
	if(FILTER_VIGNETTE&&vignette>0.0){
		float dist=distance(vTextureCoord,vec2(0.5,0.5));
		float amount=max(0.5,vignette);
		color.rgb*=smoothstep(0.8,0.5*0.799,dist*(amount+0.5));

		// Bloody Screen! SO REAL!
		if(damage>50.0)
			color.r+=min(1.0,(damage/100.0)*dist);
	}
/*
	// Brightness and Contrast
	if(FILTER_BRIGHTNESSANDCONTRAST){
		float brightness=-0.05;
		float contrast=0.1;
		color.rgb+=brightness;
		color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;
	}
*/
	if(paused){
		float average=(color.r+color.g+color.b)/3.0;
		color.rgb+=(average - color.rgb);
		color.rgb-=0.15;
	}

	gl_FragColor=color;
}
