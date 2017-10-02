#pragma strict


var theSourceFile : TextAsset;	//var to set which txt file
var marker : Transform;			//what 3D object will mark a datapoints pos
var xColumn : float;
var yColumn : float;
var zColumn : float;
var labelColumn : float;		//data column that displays on mouseover
var windDir : float;
var arrowRotation = Quaternion.identity;  //rotation from wind direction column
var arrowScale : float;		//size of arrow from mean wind speed


//Rescale data values to match a desired range of space
var xMinMax : Vector2 = Vector2(0,100);	//smallest / largest values for x in dataset
var yMinMax : Vector2 = Vector2(0,100);	//smallest / largest values for y in dataset
var zMinMax : Vector2 = Vector2(0,100);	//smallest / largest values for z in dataset

var windMinMax : Vector2 = Vector2(0,360); //smallest / largest values for windDir in dataset

var axesMinMax : Vector2 = Vector2(0,100);	//smallest/largest virtual units for display



function Start () {

	var myText = theSourceFile.text;	//read all text from file into one long string
	var myList = myText.Split("#"[0]);	//split text into lines
	for (var i=1; i<myList.length; i++) {		//cycle thru each line, skip first myList.length
		var dataList = myList[i].Split("\t"[0]);	//split each line into columns
		
		//for (var j=0; j<dataList.Length; j++){
		//	print (dataList(j));
		//	}
		//print (myList[i].ToString() );		//all of this for debugging purposes

		if (dataList.Length > 1){		//only process lines with content
		var x = parseFloat( dataList[xColumn] );		//read out x - MeanTemp
		var y = parseFloat( dataList[yColumn] );		//read out y - MeanDewPoint
		var z = parseFloat( dataList[zColumn] );		//read out z - MeanHumdity
		
		var w = parseFloat( dataList[windDir] );		//read out Win Direction
		var s = parseFloat( dataList[arrowScale] );		//read out Mean Wind Speed
		
		var myLabel : String = dataList[labelColumn];	//read out label text
		
		//scale variables to fit the desired range of virtual space
		var xPct : float = (x-xMinMax[0] / (xMinMax[1] - xMinMax[0]));	//value-min / range = %
		x = (xPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];	//x * %, + min
		print(y); print (yMinMax[1] - yMinMax[0]);
		var yPct : float = (y-yMinMax[0] / (yMinMax[1] - yMinMax[0]));	//value-min / range = %
		y = (yPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];	//y * %, + min
		print (yPct);
		var zPct : float = (z-zMinMax[0] / (zMinMax[1] - zMinMax[0]));	//value-min / range = %
		z = (zPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];	//w * %, + min
		//var wPct : float = (w-windMinMax[0] / (windMinMax[1] - windMinMax[0]));	//value-min / range = %
		//w = (wPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];	//w * %, + min
		
		
		//set arrow rotation
		arrowRotation.eulerAngles = Vector3(90,w,0);
		 
		//Use Instantiate to make a copy of the 3D marker at the desired location
		var myMarker : Transform = Instantiate( marker, Vector3(x,y,z), arrowRotation); //
		myMarker.transform.localScale = new Vector3(s*20,s*20,s*20);		//change Scale of instantiated prefab
		
		
		//Send a message to the marker's LabelItems script, calling the SetText function 
		myMarker.SendMessage("SetText", myLabel, SendMessageOptions.DontRequireReceiver );
		
		}	//end if statement
	}	//end for loop

}	//end of Start

