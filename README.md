# drawsvg
Generating svg file in Node.js context.

## Examples
<pre>
var fs = require('fs');
var sys = require("util");
var path = require('path');
var assert = require('assert');


var SVGDrawer = require('../src/drawsvg.js');

var drawer = new SVGDrawer(); 

function draw()
{
	// File name

	var fileName = "sipesc_windows.svg";
	drawer.setFileName( fileName ); 

	var fdw = fs.openSync( fileName, 'w');
	assert.ok( fdw, "open target input data file failed." );

	try{
		drawer.writeHeater();
		drawer.defineBigArrow();

		var CoordinateRoot_x = 0;
		var CoordinateRoot_y = 0;

		drawer.writeComment (  "GUI" )

		var imagineArray = new Array();

		imagineArray['x']  =  CoordinateRoot_x + 300 ;
		imagineArray['y']  =  CoordinateRoot_y + 150;
		imagineArray['width']  =   500;
		imagineArray['height']  =  400 ;
		imagineArray['href']  =   './mainwindow.JPG';

		drawer.imagine(imagineArray);

		// ...                 

		drawer.writeEnd();
 
	}
	catch(err)
	{
			console.log("[Error]: " + err);
			return false;
	}

	//------------------------------------
	// close file handler
	//------------------------------------
	fs.closeSync( fdw );
}

draw();
</pre>
