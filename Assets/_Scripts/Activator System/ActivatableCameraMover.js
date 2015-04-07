#pragma strict

var destinations:GameObject[];
var timeAtDestinations:float[];

var newSmoothXTime:float = 1;
var newSmoothYTime:float = 1;


var returnToHero:boolean = true;

private var focusIndex = 0;
private var currentlyMoving = false;


function Update() {
	if (!_Debug.drawRays) return;
	var i:int;
	for (i = -1; i <= destinations.length - 1; i++) {
		
		var thisD:GameObject;
		var nextD:GameObject;
		
		if (i == -1) {
			thisD = this.gameObject;
			nextD = destinations[0];
		} else if (i+1 == destinations.length && returnToHero) {
			thisD = destinations[i];
			nextD = this.gameObject;
		} else {
			thisD = destinations[i];
			nextD = destinations[i+1];
		}
				
		if (thisD && nextD) {
			Debug.DrawLine(
				Vector3(thisD.collider.bounds.center.x, thisD.collider.bounds.center.y, 0), 
				Vector3(nextD.collider.bounds.center.x, nextD.collider.bounds.center.y, 0), 
				Color.gray, 
				Time.deltaTime
			);
		}
	}
}

function act() {
	if (currentlyMoving) return;
	if (_Debug.logging)  Debug.Log("camera move");
	
	verifyDestinations();
}

function verifyDestinations() {
	for (var d in destinations) {
		if (!d.transform.position.x) {
			Debug.LogError("Your camera mover's destination list has a problem.");
			return;
		}
	}
	moveCamera();
}

function moveCamera() {
	if (_Debug.logging)  Debug.Log("moveCamera()");
	if (_Debug.logging)  Debug.Log("focusIndex: " + focusIndex);
	
	currentlyMoving = true;
	
	if (focusIndex < destinations.length) {
		if (_Debug.logging)  Debug.Log("Moving camera to: " + destinations[focusIndex]);
		_Model.cameraRef.GetComponent(SmoothFollow2DPlus).changeTarget(destinations[focusIndex], newSmoothXTime, newSmoothYTime);
		yield WaitForSeconds(timeAtDestinations[focusIndex]);
		focusIndex++;
		moveCameraAgain();
	} else if (returnToHero) {
		if (_Debug.logging)  Debug.Log("Camera moves complete, reverting to hero.");
		_Model.cameraRef.GetComponent(SmoothFollow2DPlus).revert();
		focusIndex = 0;
		currentlyMoving = false;
	}
}

function moveCameraAgain() {
	moveCamera();
}



















