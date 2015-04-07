#pragma strict

var bodyObject:GameObject;
var feetObject:GameObject;
var animationObject:GameObject;

var moveSpeed:float = 15;
var jumpSpeed:float = 20;

var runAnimationSpeed:float = 10;

var supplementalGravity:float = 10;

var reductionInControllWhileAirbourne:float = 0.5;

var groundRayLength:float = 0.1;
var groundRaySpread:float = 0.75;

var frozen = false;

private var sprite:PackedSprite;
private var jumpKeyDown:boolean = false;


function Start() {
	sprite = animationObject.GetComponent(PackedSprite);
}

function FixedUpdate() {
	
	if (frozen) return;
	
	
	
	
	// animation
		
	if (rigidbody.velocity.x > 0.1) {
		animationObject.transform.rotation.y = 0;
	} else if (rigidbody.velocity.x < -0.1) {
		animationObject.transform.rotation.y = 180;
	}
	
	if (grounded()) {
		if (Mathf.Abs(rigidbody.velocity.x) > runAnimationSpeed) {
			sprite.DoAnim("Run");
		} else if (Mathf.Abs(rigidbody.velocity.x) > 0.1) {
			sprite.DoAnim("Walk");
		} else {
			sprite.DoAnim("Rest");	
		}
	} else {
		if (rigidbody.velocity.y > 0.1) {
			sprite.DoAnim("Jump Up");
		} else if (rigidbody.velocity.y < -0.1) {
			//sprite.DoAnim("Jump Down");
		}
	}
	
	
	
	
	// physics
	
	var v = Input.GetAxisRaw("Vertical");
	var h = Input.GetAxisRaw("Horizontal");
	
	var touching:boolean = false;
	for (var i = 0; i < Input.touchCount; ++i) {
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
            touching = true;
        } else if (Input.GetTouch(i).phase == TouchPhase.Moved) {
            touching = true;
        } else if (Input.GetTouch(i).phase == TouchPhase.Stationary) {
            touching = true;
        }
        if (touching) {
			if (Input.GetTouch(i).position.y < 215) {
				if (Input.GetTouch(i).position.x > 735) {
					// jump button
					v = 1;
				} else if (Input.GetTouch(i).position.x < 200) {
					// left button
					h = -1;
				} else if (Input.GetTouch(i).position.x > 200 && Input.GetTouch(i).position.x < 395) {
					// right button
					h = 1;
				}
			} 
	    }
    }
    
    






		
	if (grounded()) { // grounded
		if (h) {
			// player is using left or right key
			var newV = rigidbody.velocity.x + (moveSpeed * 0.1 * h);
			if (Mathf.Abs(newV) > moveSpeed) newV = moveSpeed * h;
			rigidbody.velocity.x = newV;
		} else {
			// player not using left or right key, apply friction?
			rigidbody.velocity.x = rigidbody.velocity.x * 0.9;
			if (rigidbody.velocity.x > -0.1 && rigidbody.velocity.x < 0.1) rigidbody.velocity.x = 0; // if it's close to zero, zero it.
		}
		if (v && v > 0) {
			// player hit jump key
			if (!jumpKeyDown) {
				rigidbody.velocity.y = jumpSpeed;
				jumpKeyDown = true;
			} else {
				//Debug.Log("would be jumping, but the jump key is still down from the last jump");
			}
		} else {
			// player not hitting jump key
			jumpKeyDown = false;
		}
	} else { // in the air
		if (h) {
			// player is using left or right key
			var newVa = rigidbody.velocity.x + (moveSpeed * 0.1 * h * reductionInControllWhileAirbourne);
			if (Mathf.Abs(newVa) > moveSpeed) newVa = moveSpeed * h;
			rigidbody.velocity.x = newVa;
		} else {
			// player is not using left or right key, apply air friction?
		}
		
		// supplement gravity
		// we supplement it while in the air because the character is too floaty, but we dont want to add 
		// gravity while grounded because it screws up friction and physics games
		rigidbody.AddForce(Vector3.down * supplementalGravity);
	}	
}



function freeze() {
	frozen = true;
	rigidbody.isKinematic = true;
}

function thaw() {
	frozen = false;
	rigidbody.isKinematic = false;
}





function grounded() {
	
	var groundHit = false;
	
	var left = Vector3(feetObject.transform.position.x - groundRaySpread, feetObject.transform.position.y-(feetObject.collider.bounds.size.y/4), feetObject.transform.position.z);
	var middle = Vector3(feetObject.transform.position.x, feetObject.transform.position.y-(feetObject.collider.bounds.size.y/4), feetObject.transform.position.z);
	var right = Vector3(feetObject.transform.position.x + groundRaySpread, feetObject.transform.position.y-(feetObject.collider.bounds.size.y/4), feetObject.transform.position.z);
	
	Debug.DrawRay(left, Vector3.down*(groundRayLength+(feetObject.collider.bounds.size.y/4)), Color.blue);
	Debug.DrawRay(middle, Vector3.down*(groundRayLength+(feetObject.collider.bounds.size.y/4)), Color.blue);
	Debug.DrawRay(right, Vector3.down*(groundRayLength+(feetObject.collider.bounds.size.y/4)), Color.blue);
	
	if (!groundHit && Physics.Raycast(middle, Vector3.down, groundRayLength+(feetObject.collider.bounds.size.y/4))) groundHit = true;
    if (!groundHit && Physics.Raycast(left, Vector3.down, groundRayLength+(feetObject.collider.bounds.size.y/4))) groundHit = true;
   	if (!groundHit && Physics.Raycast(right, Vector3.down, groundRayLength+(feetObject.collider.bounds.size.y/4))) groundHit = true;
    
    return groundHit;

}











