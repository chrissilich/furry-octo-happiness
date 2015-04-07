#pragma strict

// Require a character controller to be attached to the same game object
@script RequireComponent(CharacterController)


var jumpHeight:float = 25;
var jumpDelay:float = 0.1;
var jumpRunCoefficient:float = 1.2;

var runAnimationSpeed:float = 10;

var groundedAcceleration:float = 1;
var airbourneAcceleration:float = 0.5;
var groundedDeceleration:float = 0.7;
var airbourneDeceleration:float = 0.3;

var minSpeed:float = 0.1;
var gravity:float = 1;
var moveSpeed:float = 1;
var groundRayLength:float = 0.1;
var groundRaySpread:float = 0.75;

var frozen = false;

var pushPower:float = 4.0;

private var grounded:boolean = false;
private var jumpKeyDown:boolean = false;

private var sprite:PackedSprite;
private var controller:CharacterController;


function FixedUpdate() {
	
	if (frozen) return;
	
	if (!controller) controller = GetComponent(CharacterController);
	if (!sprite) sprite = transform.Find("Animation").GetComponent(PackedSprite);
	
	var v = Input.GetAxisRaw("Vertical");
	var h = Input.GetAxisRaw("Horizontal");
	
	var horizontalVelocity = controller.velocity.x;
	var verticalVelocity = controller.velocity.y;
	
	checkGround(controller);
	
	
	// Character animation parts
	
	if (horizontalVelocity > 0.1) {
		sprite.transform.rotation.y = 0;
	} else if (horizontalVelocity < -0.1) {
		sprite.transform.rotation.y = 180;
	}
	
	if (grounded) {
		if (Mathf.Abs(horizontalVelocity) > runAnimationSpeed) {
			sprite.DoAnim("Run");
		} else if (Mathf.Abs(horizontalVelocity) > 0.1) {
			sprite.DoAnim("Walk");
		} else {
			sprite.DoAnim("Rest");	
		}
	} else {
		if (verticalVelocity > 0.1) {
			sprite.DoAnim("Jump Up");
		} else {
			//sprite.DoAnim("Jump Down");
		}
	}
	
	
	
	// Character movement parts
	
	if (grounded) { // grounded
		if (h) {
			// player is using left or right key
			horizontalVelocity += h*moveSpeed*groundedAcceleration;
		} else {
			// play is not using left or right key, slow them down
			if (horizontalVelocity > minSpeed) {
				horizontalVelocity -= groundedDeceleration;
			} else if (horizontalVelocity < -minSpeed) {
				horizontalVelocity += groundedDeceleration;
			} else {
				horizontalVelocity = 0;
			}
		}
		if (v && v > 0) {
			// player hit jump key
			//Debug.Log("jumpKeyDown");
			if (!jumpKeyDown) {
				jumpKeyDown = true;
				var augmentJumpHeight = (Mathf.Abs(horizontalVelocity)*0.75)/jumpRunCoefficient;
				//Debug.Log("                                                                   " + augmentJumpHeight);
				verticalVelocity = jumpHeight + augmentJumpHeight;
			}
		} else {
			// gravity, no jump key pressed
			if (jumpKeyDown) {
				//Debug.Log("jumpKeyUp");
				jumpKeyDown = false;
			}
			verticalVelocity -= gravity;
		}
	} else { // not grounded
		if (h) {
			// player is using left or right key
			horizontalVelocity += h*moveSpeed*airbourneAcceleration;
		} else {
			// play is not using left or right key, slow them down
			if (horizontalVelocity > minSpeed) {
				horizontalVelocity -= airbourneDeceleration;
			} else if (horizontalVelocity < -minSpeed) {
				horizontalVelocity += airbourneDeceleration;
			} else {
				horizontalVelocity = 0;			
			}
		}
		if (!v) {
			if (jumpKeyDown) {
				//Debug.Log("jumpKeyUp");
				jumpKeyDown = false;
			}
		}
		
		
		// in the air? gravity, no jumping
		verticalVelocity -= gravity;
	}
	
	
	//shows direction and velocity 
	//Debug.DrawRay(transform.position, Vector3(horizontalVelocity, verticalVelocity, 0), Color.blue);
	Debug.DrawRay(transform.position, Vector3(horizontalVelocity, 0, 0), Color.cyan);
	Debug.DrawRay(transform.position, Vector3(0, verticalVelocity, 0), Color.cyan);
	
	// do the actual movement
	var movement = Vector3(horizontalVelocity, verticalVelocity, 0) * Time.deltaTime;
	controller.Move(movement);
	
	
	// checkForFallThrough();
}



function checkGround(controller) {
	var groundHit = false;
	
	var left = Vector3(transform.position.x - groundRaySpread, transform.position.y-(collider.bounds.size.y/4), transform.position.z);
	var right = Vector3(transform.position.x + groundRaySpread, transform.position.y-(collider.bounds.size.y/4), transform.position.z);
	
	Debug.DrawRay(left, Vector3.down*(groundRayLength+(collider.bounds.size.y/4)), Color.blue);
	Debug.DrawRay(right, Vector3.down*(groundRayLength+(collider.bounds.size.y/4)), Color.blue);
	
	if (Physics.Raycast(left, Vector3.down, groundRayLength+(collider.bounds.size.y/4))) groundHit = true;
   	if (Physics.Raycast(right, Vector3.down, groundRayLength+(collider.bounds.size.y/4))) groundHit = true;
    
    grounded = groundHit;
}






function OnControllerColliderHit(hit:ControllerColliderHit) {
    
    var body:Rigidbody = hit.collider.attachedRigidbody;
    
    // no rigidbody
    if (body == null || body.isKinematic)
        return;
        
    // We dont want to push objects below us
    if (hit.moveDirection.y < -0.3) 
        return;
    
    // Calculate push direction from move direction, 
    // we only push objects to the sides never up and down
    var pushDir:Vector3 = Vector3(hit.moveDirection.x, 0, 0);

    // If you know how fast your character is trying to move,
    // then you can also multiply the push velocity by that.
    
    // Apply the push
    body.velocity = pushDir * pushPower;
}





function freeze() {
	frozen = true;
}

function thaw() {
	frozen = false;
}




/*
function checkForFallThrough() {
	//tracks if the button combo for falling through is pressed
	//usually in video games this is down + jump

    if(Input.GetAxis("Vertical") == -1){
		//the layer moving platforms cannot collide with
        gameObject.layer = 9;
    } else{
    	gameObject.layer = 0; //default layer
    }

}
*/






