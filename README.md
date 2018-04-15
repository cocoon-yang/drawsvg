# drawsvg
Generating svg file in Node.js context.

## Examples
<pre>
var SVGDrawer = require('./src/drawsvg.js');
var drawer = new SVGDrawer(); 

function draw(theFileName)
{
	drawer.setFileName( theFileName ); 

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
   	        // ...                 

		drawer.close();
	}
	catch(err)
	{
		drawer.close();
		console.log("[Error]: " + err);
		return false;
	}

}
var fileName = "foo.svg";
draw(fileName);
</pre>
