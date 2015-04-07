#pragma strict

var debugLogging:boolean = false;

var newSpeed:float = 0.5;
var tweenTime:float = 1;
var returnAfter:float = 1;
var returnTo:float = 1;

function act() {
	if (debugLogging) Debug.Log("scale time");
	
	iTween.ValueTo(gameObject, {
		"from": Time.timeScale,
		"to": newSpeed,
		"time": tweenTime,
		"onupdate": "changeTimeSpeed",
		"ignoretimescale": true
	});
	if (returnAfter) {
		yield WaitForSeconds(tweenTime+returnAfter);
		returnToNormal();
	}
}


function changeTimeSpeed(value) {
	
	Time.timeScale = value;

}


function returnToNormal() {
	
	iTween.ValueTo(gameObject, {
		"from": Time.timeScale,
		"to": returnTo,
		"time": tweenTime,
		"onupdate": "changeTimeSpeed",
		"ignoretimescale": true
	});

}



















