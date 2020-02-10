//
//
//
var assert = require('assert');
var SVGDrawer = require('svgdrawer');
var drawer = new SVGDrawer(); 

var fileName = "anim.svg";

function draw( theFileName )
{
	drawer.setFileName( theFileName ); 

	//var fdw = fs.openSync( theFileName, 'w');
	//assert.ok( fdw, "open target input data file failed." );
	var theAttr={};

	try{
		drawer.header();

                theAttr['width'] = '100%';
                theAttr['height'] = '100%';
                theAttr['xmlns']="http://www.w3.org/2000/svg"
                theAttr['version'] = '1.1';
                drawer.element('svg', theAttr, '' )

		drawer.defineTriangle();



                drawer.writeComment("Line"); 

		// line
                theAttr={};
                theAttr['x1'] = '250';
                theAttr['y1'] = '300';
                theAttr['x2'] = '250';
                theAttr['y2'] = '200';
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 


		// animate element
                drawer.writeComment("Animate element"); 

                theAttr={};
                theAttr['id'] = 'rectElement';
                theAttr['x'] = '250';
                theAttr['y'] = '300';
                theAttr['width'] = '250';
                theAttr['height'] = '200';
                theAttr['fill'] = 'rgb(255,255,0)';
                drawer.element('rect', theAttr );

                theAttr={};
                theAttr['attributeName'] = 'x';
                theAttr['attributeType'] = 'XML';
                theAttr['begin'] = '0s';
                theAttr['dur'] = '2s';
                theAttr['fill'] = 'freeze';
                theAttr['from'] = '250';
                theAttr['to'] = '0';
                drawer.element('animate', theAttr );
                drawer.popData();  // animate 

                drawer.popData();  // rect 


 


                drawer.writeComment("Path"); 

		// path
                theAttr={};
                theAttr['id'] = 'myBezier';
                theAttr['d'] = 'M 100 100 C 150 50,  200 50,  250 100 ';
                theAttr['fill'] = 'none';
                theAttr['style'] = 'stroke-width:1;stroke:black; stroke-width: 3;';
                drawer.element('path', theAttr )
                drawer.popData(); 




		drawer.close();
	}
	catch(err)
	{
		drawer.close();
		console.log("[Error]: " + err);
		return false;
	}
}

draw(fileName);

