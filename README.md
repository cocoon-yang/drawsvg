# drawsvg
Generating svg file in Node.js context.

## Examples
<pre>
var fs = require('fs');
var sys = require("util");
var path = require('path');
var assert = require('assert');

var SVGDrawer = require('./src/drawsvg.js');
var drawer = new SVGDrawer(); 

function draw()
{
	// File name
	var fileName = "foo.svg";
	drawer.setFileName( fileName ); 

	var fdw = fs.openSync( fileName, 'w');
	assert.ok( fdw, "open target input data file failed." );

	try{
		drawer.header();
                var theAttr={};
                theAttr['width'] = '100%';
                theAttr['height'] = '100%';
                theAttr['version'] = '1.1';
                theAttr['xmlns']="http://www.w3.org/2000/svg"
                drawer.element('svg', theAttr, '' )


                theAttr={};
                theAttr['font-family'] = 'Verdana';
                theAttr['font-size'] = '12';
                drawer.element('g', theAttr )

                theAttr={};
                theAttr['width'] = '300';
                theAttr['height'] = '100';
                theAttr['style'] = 'fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)';
                drawer.element('rect', theAttr )
                drawer.popData();
                drawer.popData();

                theAttr={};
                theAttr['x1'] = '250';
                theAttr['y1'] = '300';
                theAttr['x2'] = '250';
                theAttr['y2'] = '200';
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 

   	        // ...                 

		drawer.close();
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
