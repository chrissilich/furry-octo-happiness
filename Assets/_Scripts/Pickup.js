#pragma strict

private var parentRef:GameObject;
private var particlesRef:ParticleEmitter;
private var animationRef:PackedSprite;
private var originalScale:float;

private var destroying:boolean = false;


function Start() {
	parentRef = transform.parent.gameObject;
	if (parentRef.transform.Find("Particles")) particlesRef = parentRef.transform.Find("Particles").GetComponent(ParticleEmitter);
	animationRef = parentRef.transform.Find("Animation").GetComponent(PackedSprite);
	originalScale = animationRef.transform.localScale.x;
	
	animationRef.PlayAnim("Wordball", Random.Range(1,30));
}


function OnTriggerEnter(col:Collider) {
	
	if (col.tag != "hero") return;
	destroying = true;
	
	yield WaitForSeconds(4);
	Destroy(parentRef.gameObject);
}

private var growing:boolean = true; 

function Update() {
	
	if (!destroying) return;
	
	if (parentRef.transform.Find("Particles")) particlesRef.emit = false;
	
	
	if (animationRef.transform.localScale.x > 0) {
		if (growing) {
			animationRef.transform.localScale += Vector3(originalScale/10, originalScale/10, 0);
			if (animationRef.transform.localScale.x > (originalScale*1.2)) growing = false;
		} else {
			animationRef.transform.localScale -= Vector3(originalScale/10, originalScale/10, 0);
		}
	} else {
		animationRef.transform.localScale = Vector3(0, 0, 0);
	}
}