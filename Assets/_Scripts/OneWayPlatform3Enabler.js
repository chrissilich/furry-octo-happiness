#pragma strict

private var platformCol:Collider;

private var heroBodyCol:Collider;
private var heroFeetCol:Collider;

function Start() {
	platformCol = transform.parent.GetComponent(BoxCollider);
	heroBodyCol = _Model.heroRef.GetComponent(HeavyHeroController).bodyObject.collider;
	heroFeetCol = _Model.heroRef.GetComponent(HeavyHeroController).feetObject.collider;
}

function OnTriggerEnter(col:Collider) {
	if (col == heroFeetCol) solid(); 
	if (col == heroBodyCol) solid();
}

function solid() {
	Physics.IgnoreCollision(heroBodyCol, platformCol, false);
	Physics.IgnoreCollision(heroFeetCol, platformCol, false);
}

function phase() {
	Physics.IgnoreCollision(heroBodyCol, platformCol, true);
	Physics.IgnoreCollision(heroFeetCol, platformCol, true);
}
 






