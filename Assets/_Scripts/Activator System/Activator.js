#pragma strict

var activateOnContact:GameObject[];
var activateOnEndContact:GameObject[];
var activateOnDependenciesSatisfied:GameObject[];
var activateOnInterval:GameObject[];
var activateOnJumpKey:GameObject[];
var activateOnTimer:GameObject[];

var dependencies:GameObject[];
var preventsJumping:boolean = false;
var requiresAllDependencies:boolean = true;

private var heroCollider;
private var dependenciesSatisfied:GameObject[];
private var dependenciesUnsatisfied:GameObject[];


function Start() {
	if (_Debug.showActivators) {
		this.GetComponent(MeshRenderer).enabled = true;
	} else {
		this.GetComponent(MeshRenderer).enabled = false;
	}
}

function Update() {
	if (_Debug.drawRays) {
		//top
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Vector3(collider.bounds.max.x, collider.bounds.max.y, 0), Color.red, Time.deltaTime);
		//bottom
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.min.y, 0), Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Color.red, Time.deltaTime);
		//left
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.min.y, 0), Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Color.red, Time.deltaTime);
		//right
		Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Vector3(collider.bounds.max.x, collider.bounds.max.y, 0), Color.red, Time.deltaTime);
		
		for (var a in activateOnContact) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in activateOnEndContact) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in activateOnDependenciesSatisfied) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in activateOnInterval) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in activateOnJumpKey) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in activateOnTimer) {
			Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.min.x, a.collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		}
		for (var a in dependencies) {
			Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.center.y, 0), Vector3(a.collider.bounds.max.x, a.collider.bounds.center.y, 0), Color.white, Time.deltaTime);
		}
	}
}




function showX() {
	if (_Debug.drawRays) {
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Color.white, 1);
		Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Color.white, 1);
	}
}



private var touching = false;

function OnTriggerEnter(col:Collider) {
	if (col.tag != "hero") return;
	
	if (activateOnContact.length == 0) return;
	
	if (touching) return;
	touching = true;
	
	showX();
	if (_Debug.logging) Debug.Log("OnTriggerEnter");
	for (var a in activateOnContact) {
		var activatableScript:Activatable = a.GetComponent("Activatable");
		activatableScript.activate();
	}
}


function OnTriggerExit(col:Collider) {
	if (col.tag != "hero") return;
	touching = false;
	
	if (activateOnEndContact.length == 0) return;
	
	if (_Debug.logging) Debug.Log("OnTriggerExit");
	for (var a in activateOnContact) {
		var activatableScript:Activatable = a.GetComponent("Activatable");
		activatableScript.activate();
	}
}




























