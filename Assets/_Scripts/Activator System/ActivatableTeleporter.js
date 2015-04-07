#pragma strict

// Anything with a position can be the destination for a teleporter,
// but if the destination is also a teleporter, upon recieving a hero it
// is disabled for X seconds, as defined in the variable 

var destination:GameObject;
var waitForSecondsBeforeExitBecomesEntrance:float = 1;

private var disabled:boolean = false;


function Update() {
	if (!_Debug.drawRays) return;
	Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(destination.collider.bounds.min.x, destination.collider.bounds.max.y, 0), Color.gray, Time.deltaTime);
}

function act() {
	if (disabled) return;
	
	if (destination.GetComponent("ActivatableTeleporter")) {
		var teleporterScript:ActivatableTeleporter = destination.GetComponent("ActivatableTeleporter");
		teleporterScript.recieve();
	}
	
	var destinationPosition = destination.transform.position;
	destinationPosition.z = _Model.heroRef.transform.position.z;
	_Model.heroRef.transform.position = destinationPosition;
		
	if (_Debug.logging) Debug.Log("TELEPORT!");
}


function recieve() {
	disabled = true;
	yield WaitForSeconds(waitForSecondsBeforeExitBecomesEntrance);
	disabled = false;
}




























