#pragma strict

private var stillInContactWithExitTeleporter:boolean = false;
private var stillTimeoutWithExitTeleporter:boolean = false;
var waitForSecondsBeforeExitBecomesEntrance:float = 1;
var target:GameObject;


function OnTriggerEnter(col:Collider) {
	
	if (!col.GetComponent(CharacterController)) return;
	if (stillInContactWithExitTeleporter) return;
	if (stillTimeoutWithExitTeleporter) return;
	if (!target || !target.GetComponent("Teleporter")) return;
	
	var targetTeleporter:Teleporter = target.GetComponent("Teleporter");
	targetTeleporter.stillInContactWithExitTeleporter = true;
	targetTeleporter.stillTimeoutWithExitTeleporter = true;
	targetTeleporter.startTimeout();
	
	var targetPosition = target.transform.position;
	targetPosition.z = 0;
	col.transform.position = targetPosition;
	Debug.Log("TELEPORT!");
}


function startTimeout() {
	yield WaitForSeconds(waitForSecondsBeforeExitBecomesEntrance);
	stillTimeoutWithExitTeleporter = false;
}

function OnTriggerExit(col:Collider) {

	if (!col.GetComponent(CharacterController)) return;
	
	stillInContactWithExitTeleporter = false;
	
}