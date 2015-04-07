#pragma strict

var debugLogging:boolean = false;

function act() {
	if (debugLogging) Debug.Log("thaw");
	
	_Model.heroRef.GetComponent(HeavyHeroController).thaw();
}

