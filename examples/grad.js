var fs = require('fs');
var sys = require("util");
var path = require('path');
var assert = require('assert');

var SVGDrawer = require('svgdrawer');



var drawer = new SVGDrawer(); 

function draw( fileName )
{
	// File name
	
	drawer.setFileName( fileName ); 
	var theAttr={};


	//var fdw = fs.openSync( fileName, 'w');
	//assert.ok( fdw, "open target input data file failed." );

	try{
		drawer.header();
                theAttr['width'] = '100%';
                theAttr['height'] = '100%';
                theAttr['xmlns']="http://www.w3.org/2000/svg"
                theAttr['version'] = '1.1'; 
                theAttr['xmlns:xlink']="http://www.w3.org/1999/xlink" 
                drawer.element('svg', theAttr, '' )



		drawer.defineTriangle();


		var origin_x = 300;
		var origin_y = 300;
 
                drawer.writeComment("x coordinate axis"); 

		// line
                theAttr={};
                theAttr['x1'] = origin_x;
                theAttr['y1'] = origin_y;
                theAttr['x2'] = parseInt( origin_x ) + 200;
                theAttr['y2'] = origin_y;
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = parseInt( origin_x ) + 200;
                theAttr['y'] = parseInt( origin_y ) + 20;
                theAttr['fill'] = 'black';
                theAttr['content'] = 'x';
                drawer.element('text', theAttr )
                drawer.popData();

                drawer.writeComment("y coordinate axis"); 

		// line
                theAttr={};
                theAttr['x1'] = origin_x;
                theAttr['y1'] = origin_y;
                theAttr['x2'] = parseInt( origin_x ) ;
                theAttr['y2'] = parseInt( origin_y ) - 200;
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = parseInt( origin_x ) - 20;
                theAttr['y'] = parseInt( origin_y ) - 200;
                theAttr['fill'] = 'black';
                theAttr['content'] = 'y';
                drawer.element('text', theAttr )
                drawer.popData();


           
                drawer.writeComment("f(x)"); 

		var path = 'M ' 



		// path
                theAttr={};
                theAttr['id'] = 'f(x)';
                theAttr['d'] = 'M 310 250 Q 470 330,  510 110  ';
                theAttr['fill'] = 'none';
                theAttr['style'] = 'stroke-width:1;stroke:black; stroke-width: 3;';
                drawer.element('path', theAttr )
                drawer.popData(); 


                theAttr={};
                theAttr['x'] = '500';
                theAttr['y'] = '100';
                theAttr['fill'] = 'black';
                theAttr['content'] = ' y = f(x) ';
                drawer.element('text', theAttr )
                drawer.popData(); 

// t = 0.5 
// the middle point of the curve f(x) 
// (440, 255)
//  The tangent of the curve is 
//  (390, 290)  -- ( 490, 220)
// 
                drawer.writeComment("different of f(x)"); 
		// line
                theAttr={};
                theAttr['x1'] = 390;
                theAttr['y1'] = 290;
                theAttr['x2'] = 490 ;
                theAttr['y2'] = 220;
                theAttr['style'] = 'stroke-width:1;stroke:red';
                //theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); // gradient line





                drawer.writeComment("dx coordinate axis"); 

		// line
                theAttr={};
                theAttr['x1'] = 440;
                theAttr['y1'] = 255;
                theAttr['x2'] = parseInt( 440 ) + 100;
                theAttr['y2'] = 255;
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = '530';
                theAttr['y'] = '270';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'dx';
                drawer.element('text', theAttr )
                drawer.popData();


                drawer.writeComment("dy coordinate axis"); 
		// line
                theAttr={};
                theAttr['x1'] = 440;
                theAttr['y1'] = 255;
                theAttr['x2'] = parseInt( 440 ) ;
                theAttr['y2'] = parseInt( 255 ) - 100;
                theAttr['style'] = 'stroke-width:1;stroke:rgb(0,0,0)';
                theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = '410';
                theAttr['y'] = '165';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'dy';
                drawer.element('text', theAttr )
                drawer.popData();

                theAttr={};
                theAttr['x'] = '500';
                theAttr['y'] = '230';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'dy = A(x)dx';
                drawer.element('text', theAttr )
                drawer.popData(); 


                theAttr={};
                theAttr['x'] = '630';
                theAttr['y'] = '200';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'dx = x - x0';
                drawer.element('text', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = '630';
                theAttr['y'] = '220';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'dy = y - y0';
                drawer.element('text', theAttr )
                drawer.popData(); 

                theAttr={};
                theAttr['x'] = '630';
                theAttr['y'] = '240';
                theAttr['fill'] = 'black';
                theAttr['content'] = 'A(x) = f\'(x)';
                drawer.element('text', theAttr )
                drawer.popData(); 



		// line  x0
                theAttr={};
                theAttr['x1'] = 440;
                theAttr['y1'] = 255;
                theAttr['x2'] = 440;
                theAttr['y2'] = origin_y;
                theAttr['stroke-dasharray'] = "5, 5"; 
                theAttr['style'] = 'stroke-width:1;stroke:black';
                //theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData();

                theAttr={};
                theAttr['x'] = 430;
                theAttr['y'] = parseInt( origin_x ) + 20;
                theAttr['fill'] = 'black';
                theAttr['content'] = 'x0';
                drawer.element('text', theAttr )
                drawer.popData();

		// line  y0
                theAttr={};
                theAttr['x1'] = 440;
                theAttr['y1'] = 255;
                theAttr['x2'] = origin_x;
                theAttr['y2'] = 255;
                theAttr['stroke-dasharray'] = "5, 5"; 
                theAttr['style'] = 'stroke-width:1;stroke:black';
                //theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )
                drawer.popData();

                theAttr={};
                theAttr['x'] = parseInt( origin_x ) - 20;
                theAttr['y'] = 255;
                theAttr['fill'] = 'black';
                theAttr['content'] = 'y0';
                drawer.element('text', theAttr )
                drawer.popData();


/*********************** 
                drawer.writeComment("different of f(x)"); 
		// line
                theAttr={};
                theAttr['x1'] = -70;
                theAttr['y1'] = 0;
                theAttr['x2'] = 70 ;
                theAttr['y2'] = 0;
                theAttr['style'] = 'stroke-width:1;stroke:red';
                //theAttr['marker-end'] = 'url(#Triangle)';
                drawer.element('line', theAttr )

                drawer.writeComment("Define the motion path animation"); 
		// animation
                theAttr={};
                theAttr['dur'] = '6s';
                theAttr['repeatCount'] = "indefinite";
                theAttr['rotate'] = "auto";
                drawer.element('animateMotion', theAttr )

		// mpath
                theAttr={};
                theAttr['xlink:href'] = "#f(x)";
                drawer.element('mpath', theAttr, '    ' )
                drawer.popData(); // mpath

                drawer.popData(); // animation
                drawer.popData(); // gradient line
*************************/



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
	//fs.closeSync( fdw );
}

var fileName = "grad.svg";
draw(fileName);