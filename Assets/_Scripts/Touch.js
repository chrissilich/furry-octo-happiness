#pragma strict

var controlsTexture:Texture;

function OnGUI() {
    if (!controlsTexture) {
        Debug.LogError("Assign a Texture in the inspector.");
        return;
    }
    GUI.DrawTexture(Rect(0,0,960,640), controlsTexture, ScaleMode.StretchToFill, true);
}


function Update () {

}