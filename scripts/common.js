//
// Shared functions between loader and game
//
function getLightType(t){
	switch(t){
		// Random Blink
		case 1:
		case 17:
			return 1.0;
			break;
		// Blink 0.5
		case 2:
		case 4:
		case 12:
			return 2.0;
			break;
		// Blink 1.0
		case 3:
		case 11:
			return 3.0;
			break;
		// Oscillate
		case 8:
			return 4.0;
			break;
		// Full Light
		default:
			return 0.0;
	}
};
