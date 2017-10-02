#pragma strict

//Option for Mouseover Tet Label

var newTextMesh : TextMesh;	//textmesh to instantiate
internal var myLabel : TextMesh;	//name of instantiated text
internal var myText : String = "Hello";	//the text that will be displayed

//Other visual feedback on mouseover
//var scaleChange : float = 0.5;	//increase size of marker on mouseover
//var rotationSpeed : float = 120;	//Rotate marker on mouseover
//var highlightColor : Vector4 = Vector4(1, .8, .8, 1);	//change RGBA

//By finding the Main Cam we can make the text always point at it to be readable
internal var target : Transform;	//create transform var
target = GameObject.Find("Main Camera").transform;	// assign the main cam to do it

//Vars to keep track of old color/scale/etc to reset on mouse out
//var oldColor : Color;
//internal var oldOri : Vector3;

//OnMouseEnter events trigger ONCE
function OnPointerEnter(){
	//Instantiate new 3D text obj
	myLabel = Instantiate( newTextMesh,  new Vector3(transform.position.x+1, transform.position.y+1, transform.position.z+1), Quaternion.identity );
	
	myLabel.text = myText;	//change the text of the message
	myLabel.transform.LookAt(target);	//rotate text to face camera
	myLabel.transform.Rotate( Vector3(0,180,0));	//flip it 180 degrees
	
	//Add addtl visual feedback
	//gameObject.transform.localScale += Vector3(scaleChange,scaleChange,scaleChange);	//make obj bigger
	//oldColor = transform.GetComponent.<Renderer>().material.GetColor("Color");	//Store original color
	//transform.GetComponent.<Renderer>().material.color = Vector4(10, .8, .8,1);	//change color
	//transform.renderer.material.color = Color.white; //alt color change
	//oldOri = transform.eulerAngles;
}

//OnMouseOver triggered everyfram while mouse hovers datapoint
function OnMouseOver(){
	
	//more visual feedback
	//transform.Rotate(Vector3( 0, rotationSpeed*Time.deltaTime, 0)); //rotate 3d marker

}//end OnMOuseOver

//OnMOuseExit triggered once
function OnMouseExit(){
	//Reset label
	Destroy(myLabel);	//Delete the label when the mouse leaves
	//reset scale,color,etc
	//gameObject.transform.localScale -= Vector3(scaleChange, scaleChange, scaleChange);
	//transform.GetComponent.<Renderer>().material.color = Vector4(0,1,1,1);
	//transform.eulerAngles = oldOri;
	
	}//end OnMouseExit
	
	
//Other scripts can call this function to change the label text
function SetText( txt : String ){
	myText = txt;
}


