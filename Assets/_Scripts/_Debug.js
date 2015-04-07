#pragma strict

static var logging:boolean;
static var drawRays:boolean;
static var showActivators:boolean;
static var showActivatables:boolean;

public var debugLogging:boolean = false;
public var debugDrawRays:boolean = false;
public var debugShowActivators:boolean = false;
public var debugShowActivatables:boolean = false;

function Awake() {
	DontDestroyOnLoad(this);
	
	logging = debugLogging;
	drawRays = debugDrawRays;
	showActivators = debugShowActivators;
	showActivatables = debugShowActivatables;
}