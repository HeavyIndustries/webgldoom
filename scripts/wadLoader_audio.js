//
// Audio Builder -----------------------------------------------------------------------------------
//

wadLoader.getAudioFiles=function(){
	var l,len,curl;
	var extracted;
	var soundfiles =200, musicfiles =0;
	var point1,point2,point3,point4,mu=0.2,mu2=(1-Math.cos(mu*Math.PI))/2;	
	this.wad.audio={
					chunk:				0,
					sound:				[],
					music:				[]
					};
	for(l=0;l<this.wad.directory.length;l++){
		switch(this.wad.directory[l].name.substr(0,2)){
			case 'DS':
				filename=this.wad.directory[l].name;
				match='sfx_'+filename.substr(2,9);
				match=match.toLowerCase();
				this.view.seek(this.wad.directory[l].filepos);
				sound={
						name:			filename,
						sfx:			match,
						items:			0,
						samplerate:		0,
						size:			0,
						blank:			0,
						data:			[]
					};	
				this.view.seek(this.wad.directory[l].filepos);
				sound.items=this.view.getInt16();
				sound.samplerate=this.view.getInt16();
				sound.size=this.view.getInt16();
				sound.blank=this.view.getInt16();
				sound.floatbuffer = new Float32Array(sound.size);
				for(var t=0;t<sound.size;t++)
				{
					j=this.view.getInt8();
					sound.data[t]=j;
					sound.floatbuffer[t]=(j>0)?j/127.0:j/-127.0;
				}

				sound.floatbuffer_upscale = new Float32Array(sound.size*4);

				bufferSize = sound.size;

				for(var i=0,j=0;i<bufferSize;i++){
					//index for dst buffer
					j=i*4;
				
					//the points to interpolate between
					point1=sound.floatbuffer[i];
					point2=(i<bufferSize-1)?sound.floatbuffer[i+1]:point1;
					point3=(i<bufferSize-2)?sound.floatbuffer[i+2]:point1;
					point4=(i<bufferSize-3)?sound.floatbuffer[i+3]:point1;


					//interpolate
					point2=(point1*(1-mu2)+point2*mu2);
					point3=(point2*(1-mu2)+point3*mu2);
					point4=(point3*(1-mu2)+point4*mu2);

					//put data into buffer
					sound.floatbuffer_upscale[j]=point1;
					sound.floatbuffer_upscale[j+1]=point2;
					sound.floatbuffer_upscale[j+2]=point3;
					sound.floatbuffer_upscale[j+3]=point4;
				}
				if(sfxenum_t[sound.sfx])
				this.wad.audio.sound[sfxenum_t[sound.sfx]]=sound;
				else
				this.wad.audio.sound[++soundfiles]=sound;

//				he3d.log("NOTICE","Processed MUSIC:",
//					JSON.stringify(this.wad.audio.sound[filename]));
			break;
			case 'D_':
				this.view.seek(this.wad.directory[l].filepos);
					filename=this.wad.directory[l].name;
					music={
						name:			this.wad.directory[l].name,
						id:				this.view.getString(4),
						scoreLen:		this.view.getInt16(),
						scoreStart:		this.view.getInt16(),
						channels:		this.view.getInt16(),
						sec_channels:	this.view.getInt16(),
						instrCnt:		this.view.getInt16(),
						dummy:			this.view.getInt16(),
						instruments:	[],
						data:			[]
					};
				for(var t=0;t<music.instrCnt;t++)
				{
					music.instruments[t]=this.view.getInt16();
				}
				this.view.seek(this.wad.directory[l].filepos+music.scoreStart)
				for(var t=0;t<music.scoreLen;t++)
				{
					music.data[t]=this.view.getInt8();
				}
				this.wad.audio.music[++musicfiles]=music;
//				he3d.log("NOTICE","Processed MUSIC:",
//					JSON.stringify(this.wad.audio.music[filename]));
			break;
		}
	}		
};
