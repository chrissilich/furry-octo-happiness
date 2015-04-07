#pragma strict

static var heroRef:GameObject;
static var cameraRef:Camera;

var heroObject:GameObject;
var cameraObject:Camera;

function Awake() {
	DontDestroyOnLoad(this);
	
	heroRef = heroObject;
	cameraRef = cameraObject;
}
