#pragma strict

var debugLogging:boolean = false;

function act() {
	if (debugLogging) Debug.Log("freeze");
	
	_Model.heroRef.GetComponent(HeavyHeroController).freeze();
}




















