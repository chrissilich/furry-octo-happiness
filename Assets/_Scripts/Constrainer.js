#pragma strict

var constrainX:boolean = false;
var constrainY:boolean = false;
var constrainZ:boolean = false;

var bounceX:boolean = true;
var bounceY:boolean = true;
var bounceZ:boolean = true;

var constrainXMin:Number;
var constrainXMax:Number;
var constrainYMin:Number;
var constrainYMax:Number;
var constrainZMin:Number;
var constrainZMax:Number;


function Update () {
	
	if (!rigidbody) return;
	
	if (constrainX && constrainXMin < constrainXMax) {
		if (rigidbody.position.x < constrainXMin) {
			rigidbody.position.x = constrainXMin;
			if (bounceX) {
				rigidbody.velocity.x = -rigidbody.velocity.x;
			} else {
				rigidbody.velocity.x = 0;
			}
		}
		if (rigidbody.position.x > constrainXMax) {
			rigidbody.position.x = constrainXMax;
			if (bounceX) {
				rigidbody.velocity.x = -rigidbody.velocity.x;
			} else {
				rigidbody.velocity.x = 0;
			}
		}
	}
	if (constrainY && constrainYMin < constrainYMax) {
		if (rigidbody.position.y < constrainYMin) {
			rigidbody.position.y = constrainYMin;
			if (bounceY) {
				rigidbody.velocity.y = -rigidbody.velocity.y;
			} else {
				rigidbody.velocity.y = 0;
			}
		}
		if (rigidbody.position.y > constrainYMax) {
			rigidbody.position.y = constrainYMax;
			if (bounceY) {
				rigidbody.velocity.y = -rigidbody.velocity.y;
			} else {
				rigidbody.velocity.y = 0;
			}
		}
	}
	if (constrainZ && constrainZMin < constrainZMax) {
		if (rigidbody.position.z < constrainZMin) {
			rigidbody.position.z = constrainZMin;
			if (bounceZ) {
				rigidbody.velocity.z = -rigidbody.velocity.z;
			} else {
				rigidbody.velocity.z = 0;
			}
		}
		if (rigidbody.position.z > constrainZMax) {
			rigidbody.position.z = constrainZMax;
			if (bounceZ) {
				rigidbody.velocity.z = -rigidbody.velocity.z;
			} else {
				rigidbody.velocity.z = 0;
			}
		}
	}
}