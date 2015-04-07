#pragma strict

var target:GameObject;
var smoothTimeX:float = 0.1;
var smoothTimeY:float = 0.1;
var offsetX:float = 0;
var offsetY:float = 1;

private var currentTarget:Transform;
private var currentSmoothTimeX:float;
private var currentSmoothTimeY:float;


private var thisTransform: Transform;
private var velocity: Vector2;

function Start() {
	thisTransform = transform;
	currentTarget = target.transform;
	currentSmoothTimeX = smoothTimeX;
	currentSmoothTimeY = smoothTimeY;
}

function FixedUpdate() {
	thisTransform.position.x = Mathf.SmoothDamp(thisTransform.position.x, currentTarget.position.x + offsetX, velocity.x, currentSmoothTimeX);
	thisTransform.position.y = Mathf.SmoothDamp(thisTransform.position.y, currentTarget.position.y + offsetY, velocity.y, currentSmoothTimeY);
}


function changeTarget(newTarget:GameObject, newSmoothTimeX:float, newSmoothTimeY:float) {
	currentTarget = newTarget.transform;
	currentSmoothTimeX = newSmoothTimeX;
	currentSmoothTimeY = newSmoothTimeY;
}

function revert() {
	currentTarget = target.transform;
	yield WaitForSeconds(2);
	currentSmoothTimeX = smoothTimeX;
	currentSmoothTimeY = smoothTimeY;
}