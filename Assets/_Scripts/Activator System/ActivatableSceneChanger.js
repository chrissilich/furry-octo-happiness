#pragma strict

var debugLogging:boolean = false;

var destinationScene:String;

var delay:float = 0;


function act() {
	if (debugLogging) Debug.Log("Waiting for "+delay+" seconds before changing scenes to: "+destinationScene);
	yield WaitForSeconds(delay);
	var keepInScene:Object;
	Application.LoadLevel(destinationScene);
}












