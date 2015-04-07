#pragma strict

var activationLimit:int = 0;


private var activationCount:int = 0;



function Start() {
	if (!_Debug.showActivatables) {
		this.GetComponent(MeshRenderer).enabled = false;
	}
}

function Update() {
	if (_Debug.drawRays)  {
		//top
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Vector3(collider.bounds.max.x, collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		//bottom
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.min.y, 0), Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Color.white, Time.deltaTime);
		//left
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.min.y, 0), Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Color.white, Time.deltaTime);
		//right
		Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Vector3(collider.bounds.max.x, collider.bounds.max.y, 0), Color.white, Time.deltaTime);
	}
}


function showX() {
	if (_Debug.drawRays) {
		Debug.DrawLine(Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Color.red, 1);
		Debug.DrawLine(Vector3(collider.bounds.max.x, collider.bounds.min.y, 0), Vector3(collider.bounds.min.x, collider.bounds.max.y, 0), Color.red, 1);
	}
}

function activate() {
	if (activationLimit > 0 && activationCount >= activationLimit) {
		if (_Debug.logging) Debug.Log("Activation limit hit, ignoring activation.");
		return;
	}
	showX();
	if (_Debug.logging) Debug.Log("Activate");
	
	// list of possible activatables
	if (gameObject.GetComponent(ActivatableCameraMover)) {
		gameObject.GetComponent(ActivatableCameraMover).act();
	}
	if (gameObject.GetComponent(ActivatableDelayer)) {
		gameObject.GetComponent(ActivatableDelayer).act();
	}
	if (gameObject.GetComponent(ActivatableExample)) {
		gameObject.GetComponent(ActivatableExample).act();
	}
	if (gameObject.GetComponent(ActivatableFreezer)) {
		gameObject.GetComponent(ActivatableFreezer).act();
	}
	if (gameObject.GetComponent(ActivatableSceneChanger)) {
		gameObject.GetComponent(ActivatableSceneChanger).act();
	}
	if (gameObject.GetComponent(ActivatableTeleporter)) {
		gameObject.GetComponent(ActivatableTeleporter).act();
	}
	if (gameObject.GetComponent(ActivatableThawer)) {
		gameObject.GetComponent(ActivatableThawer).act();
	}
	if (gameObject.GetComponent(ActivatableTimeScaler)) {
		gameObject.GetComponent(ActivatableTimeScaler).act();
	}
	if (gameObject.GetComponent(ActivatableCameraZoomer)) {
		gameObject.GetComponent(ActivatableCameraZoomer).act();
	}


	

}





























