#pragma strict

var debugLogging:boolean = false;
var debugDrawRays:boolean = true;

var time:float = 3;
var activatables:GameObject[];


function Update() {
	if (!debugDrawRays) return;
	for (var a in activatables) {
		Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
	}
}


function act() {
	if (debugLogging) Debug.Log("thaw");
	
	yield WaitForSeconds(time);
	delayed();
}

function delayed() {
	if (debugLogging) Debug.Log("delayed");
	for (var a in activatables) a.GetComponent(Activatable).activate();
}

