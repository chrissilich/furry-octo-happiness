#pragma strict

function OnTriggerEnter(col:Collider) {
	
	if (!col.GetComponent(CharacterController)) return;
	
    //make the parent platform ignore the jumper
	
    var platform = transform.parent;
    Physics.IgnoreCollision(col.GetComponent(CharacterController), platform.GetComponent(BoxCollider));
}

 

function OnTriggerExit(col:Collider) {
	
	if (!col.GetComponent(CharacterController)) return;
	
    //reset jumper's layer to something that the platform collides with
    //just in case we wanted to jump through this one

    col.gameObject.layer = 0;

    //re-enable collision between jumper and parent platform, so we can stand on top again

    var platform = transform.parent;
    Physics.IgnoreCollision(col.GetComponent(CharacterController), platform.GetComponent(BoxCollider), false);
}