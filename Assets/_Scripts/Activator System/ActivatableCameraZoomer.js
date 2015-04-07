#pragma strict


var zoomInFactor:float = 0.6;
var tweenTime:float = 0.2;
var returnAfterTime:float = 0.2;



private var originalZ:float;

function Start() {
	originalZ = _Model.cameraRef.transform.position.z;
}


function act() {
	if (_Debug.logging)  Debug.Log("camera zoom");
	
	iTween.ValueTo(gameObject, {
		"from": originalZ,
		"to": originalZ * zoomInFactor,
		"time": tweenTime,
		"onupdate": "changeCameraZ",
		"ignoretimescale": true,
		"easetype": "easeInOutBack"
	});
	if (returnAfterTime) {
		yield WaitForSeconds(tweenTime+returnAfterTime);
		returnToNormal();
	}
}

function returnToNormal() {
	iTween.ValueTo(gameObject, {
		"from": _Model.cameraRef.transform.position.z,
		"to": originalZ,
		"time": tweenTime,
		"onupdate": "changeCameraZ",
		"ignoretimescale": true,
		"easetype": "easeInOutBack"
	});
}

function changeCameraZ(value) {
	
	_Model.cameraRef.transform.position.z = value;

}










