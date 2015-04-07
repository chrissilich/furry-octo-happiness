#pragma strict

private var platform:Transform;

function Start() {
	platform = transform.parent;
}


function OnTriggerStay(col:Collider) {
	
	var heroFootY = _Model.heroRef.GetComponent(HeavyHeroController).feetObject.collider.bounds.min.y;
    
    var platformX = platform.transform.position.x -2;
    var platformTopY = platform.transform.position.y;
    
    if (heroFootY > platformTopY) {
    	solid();
   		Debug.DrawRay(Vector3(platformX, platformTopY, 0), Vector3.left, Color.green);
    } else {
    	phase();
    	Debug.DrawRay(Vector3(platformX, platformTopY, 0), Vector3.left, Color.red);
    }
}


function solid() {
	Physics.IgnoreCollision(_Model.heroRef.GetComponent(HeavyHeroController).bodyObject.collider, platform.GetComponent(BoxCollider), false);
	Physics.IgnoreCollision(_Model.heroRef.GetComponent(HeavyHeroController).feetObject.collider, platform.GetComponent(BoxCollider), false);
}

function phase() {
	Physics.IgnoreCollision(_Model.heroRef.GetComponent(HeavyHeroController).bodyObject.collider, platform.GetComponent(BoxCollider));
	Physics.IgnoreCollision(_Model.heroRef.GetComponent(HeavyHeroController).feetObject.collider, platform.GetComponent(BoxCollider));
}
 






