/*
 * Create simply svg file in Node.js context.
 */

var fs = require('fs');
var sys = require("util");
var path = require('path');
var assert = require('assert');

var SVGDrawer = function()
{
	this.PI = 3.14159;
	this._fileName = '';
}

SVGDrawer.prototype.setFileName = function( fileName )
{
	this._fileName = fileName;
}

SVGDrawer.prototype.getFileName = function( )
{
	return this._fileName;
}

// Deep clone an object.
// This method is a copy of https://davidwalsh.name/javascript-clone
//  There are other approaches for cloning objects in JavaScribe context
// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
//
SVGDrawer.prototype.clone = function(src)
{
	var self = this;

	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for(name in source){
			// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
			// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
			// don't overwrite it with the toString() method that source inherited from Object.prototype
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
		// null, undefined, any non-object, or function
		return src;	// anything
	}
	if(src.nodeType && "cloneNode" in src){
		// DOM Node
		return src.cloneNode(true); // Node
	}
	if(src instanceof Date){
		// Date
		return new Date(src.getTime());	// Date
	}
	if(src instanceof RegExp){
		// RegExp
		return new RegExp(src);   // RegExp
	}
	var r, i, l;
	if(src instanceof Array){
		// array
		r = [];
		for(i = 0, l = src.length; i < l; ++i){
			if(i in src){
				r.push(clone(src[i]));
			}
		}
		// we don't clone functions for performance reasons
		//		}else if(d.isFunction(src)){
		//			// function
		//			r = function(){ return src.apply(this, arguments); };
	}else{
		// generic objects
		r = src.constructor ? new src.constructor() : {};
	}
	return mixin(r, src, self.clone);

}

SVGDrawer.prototype.drawFan = function( x, y, radius )
{
	var self = this;

	var x_m = x - radius;
	var y_m = y;

	var x_end = x;
	var y_end = y - radius;

	var duct_length = radius / 2;

	var x_L = x_m - duct_length;
	var y_L = y;

	var v = -radius;
	var h = 1.5 * radius;

	var circle_radius = radius *2/3;

	fs.appendFileSync( self._fileName, "  <path d= \"M " + x_m + ", " + y_m );
	fs.appendFileSync( self._fileName, " A " + radius + " " + radius + " 0 1,0  " + x_end + ", " + y_end );
	fs.appendFileSync( self._fileName, "  M " + x_m + ", " + y_m );
	fs.appendFileSync( self._fileName, "  L " + x_L + ", " + y_L );
	fs.appendFileSync( self._fileName, "  v " + v );
	fs.appendFileSync( self._fileName, "  h " + h + " \" \r\n");
	fs.appendFileSync( self._fileName, "  fill=\"none\" stroke=\"black\" stroke-width=\"3\" /> \r\n");
	fs.appendFileSync( self._fileName, "  <circle cx= \"" + x + "\"");
	fs.appendFileSync( self._fileName, "  cy = \"" + y + "\"" );
	fs.appendFileSync( self._fileName, "  r = \"" + circle_radius + "\"" );
	fs.appendFileSync( self._fileName, "  stroke=\"black\" stroke-width=\"3\" fill=\"none\" />  \r\n");
}

SVGDrawer.prototype.drawHorizontalGridArray = function( x, y, array )
{

	var self = this

	var length = array.length;

	console.log('drawGeneticArray length = ' + length);

	var width = 30;
	var height = 30;

	for( var i = 0; i < length; i++ )
	{
		var theX = x + i * width;
		var theY = y //+ i * height;

		fs.appendFileSync( self._fileName, "      <rect x=\"" + theX + "\" y=\"" + theY + "\"  width=\"" + width + "\" height=\""+ height +"\"   \r\n");
		fs.appendFileSync( self._fileName, "        style=\"fill:white;stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n");

		self.drawText ( (theX + 8 ), ( theY +23), 20, array[i] );
	}

}

SVGDrawer.prototype.drawGeneticArray = function( x, y, array )
{

	var self = this

	var length = array.length;

	console.log('drawGeneticArray length = ' + length);

	var width = 30;
	var height = 30;

	for( var i = 0; i < length; i++ )
	{
		var theX = x //+ i * width;
		var theY = y + i * height;

		fs.appendFileSync( self._fileName, "      <rect x=\"" + theX + "\" y=\"" + theY + "\"  width=\"" + width + "\" height=\""+ height +"\"   \r\n");
		fs.appendFileSync( self._fileName, "        style=\"fill:white;stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n");

		self.drawText ( (theX + 8 ), ( theY +23), 20, array[i] );
	}

}

SVGDrawer.prototype.writeHeater = function( )
{
	fs.appendFileSync( this._fileName, "<?xml version=\"1.0\"?>  \r\n");
	fs.appendFileSync( this._fileName, "<svg width=\"512mm\" height=\"200mm\" viewBox=\"0 0   2048   1000\"  \r\n");
	fs.appendFileSync( this._fileName, "     xmlns=\"http://www.w3.org/2000/svg\"  \r\n");
	fs.appendFileSync( this._fileName, "     xmlns:xlink=\"http://www.w3.org/1999/xlink\"   \r\n");
	fs.appendFileSync( this._fileName, "     xmlns:ev=\"http://www.w3.org/2001/xml-events\">   \r\n");
	fs.appendFileSync( this._fileName, " <g font-family=\"Verdana\" font-size=\"12\" >   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "  <defs>   \r\n");
	fs.appendFileSync( this._fileName, "    <marker id=\"Triangle\"   \r\n");
	fs.appendFileSync( this._fileName, "      viewBox=\"0 0 12 10\" refX=\"0\" refY=\"5\"    \r\n");
	fs.appendFileSync( this._fileName, "      markerUnits=\"strokeWidth\"   \r\n");
	fs.appendFileSync( this._fileName, "      markerWidth=\"12\" markerHeight=\"8\"   \r\n");
	fs.appendFileSync( this._fileName, "      style=\"fill-rule:evenodd;stroke:none\"    \r\n");
	fs.appendFileSync( this._fileName, "      orient=\"auto\">   \r\n");
	fs.appendFileSync( this._fileName, "      <path d=\"M 0 0 L 12 5 L 0 10 L 3 5\" />   \r\n");
	fs.appendFileSync( this._fileName, "    <path d=\"M 0 5 L 3 5 \"   \r\n");
	fs.appendFileSync( this._fileName, "       style=\"fill:none;stroke:#000000;stroke-width:1.5\" />    \r\n");
	fs.appendFileSync( this._fileName, "    </marker>   \r\n");
	fs.appendFileSync( this._fileName, "  </defs>   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

//
//  Triangle LOGO
//
//  There is some brilliant svg logo libraries, such as:
//  https://github.com/gilbarbara/logos
//
SVGDrawer.prototype.defineTriangle = function( parameterArray )
{
	var text = parameterArray['text'];

	var defName = parameterArray['defName'];
	var y = parameterArray['y'];
	var dx = parameterArray['dx'];
	var dy = parameterArray['dy'];

	// style
	var style = "style = \"";

	//fill:none;stroke:#000000;stroke-width:1.5


	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		style = style + " stroke-width: " + stroke_width + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		style = style + ' fill: ' + fill + ";";
	}

	style = style + "\"";

	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "  <defs>   \r\n");
	fs.appendFileSync( this._fileName, "    <marker id=\"" + defName + "\"   \r\n");
	fs.appendFileSync( this._fileName, "      viewBox=\"0 0 12 10\" refX=\"0\" refY=\"5\"    \r\n");
	fs.appendFileSync( this._fileName, "      markerUnits=\"strokeWidth\"   \r\n");
	fs.appendFileSync( this._fileName, "      markerWidth=\"12\" markerHeight=\"8\"   \r\n");
	fs.appendFileSync( this._fileName, "      style=\"fill-rule:evenodd;stroke:none\"    \r\n");
	fs.appendFileSync( this._fileName, "      orient=\"auto\">   \r\n");
	fs.appendFileSync( this._fileName, "      <path d=\"M 0 0 L 12 5 L 0 10 L 3 5\"  \r\n");
	fs.appendFileSync( this._fileName, "       " + style + "/>    \r\n");
	fs.appendFileSync( this._fileName, "    <path d=\"M 0 5 L 3 5 \"   \r\n");
	fs.appendFileSync( this._fileName, "       " + style + "/>    \r\n");
	fs.appendFileSync( this._fileName, "    </marker>   \r\n");
	fs.appendFileSync( this._fileName, "  </defs>   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");

}

SVGDrawer.prototype.writeEnd = function( )
{
	fs.appendFileSync( this._fileName, " </g>   \r\n");
	fs.appendFileSync( this._fileName, "</svg>   \r\n");
}

SVGDrawer.prototype.writeComment = function( theText )
{
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   <desc>------------------------------------------------------</desc>  \r\n");
	fs.appendFileSync( this._fileName, "   <desc>" + theText + "</desc>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

SVGDrawer.prototype.drawText = function( x, y, font_size, theText )
{
	fs.appendFileSync( this._fileName, "   <text x=\"" + x + "\" y=\"" + y + "\" font-size=\"" + font_size + "\"   fill=\"black\" >" + theText + "</text>  \r\n");
}

SVGDrawer.prototype.drawLine = function( x1, y1, x2, y2 )
{
	fs.appendFileSync( this._fileName, "  <line   x1=\"" + x1 + "\" y1= \"" + y1 + "\"   x2=\"" + x2 + "\" y2= \"" + y2 + "\" style = \"stroke: Black \" />  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

// (x,y)                 (x + dx -0.4dy, y)
//  *---------------------*
//   \                     \
//    \                     \
//     *                     *
//    /                     /
//   /                     /
//  *---------------------*
SVGDrawer.prototype.processIcon = function( parameterArray )
{

	var x = parameterArray['x'];
	var y = parameterArray['y'];
	var dx = parameterArray['width'];
	var dy = parameterArray['height'];

	var arrowWidth = 0.3;

	var x1 = x + dx - arrowWidth * dy;
	var y1 = y;

	var x2 = x + dx;
	var y2 = y + 0.5 * dy;

	var x3 = x + dx - arrowWidth * dy;
	var y3 = y + dy;

	var x4 = x;
	var y4 = y + dy;

	var x5 = x + arrowWidth * dy;
	var y5 = y + 0.5 * dy;

	var points = x + ' ' + y + ', ';
	points += x1 + ' ' + y1 + ', ';
	points += x2 + ' ' + y2 + ', ';
	points += x3 + ' ' + y3 + ', ';
	points += x4 + ' ' + y4 + ', ';
	points += x5 + ' ' + y5 + ', ';
	points += x + ' ' + y;

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke_dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	style = style + "\""

	fs.appendFileSync( this._fileName, "   <polyline points=\"" + points + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");

}

SVGDrawer.prototype.text = function( parameterArray )
{

	var text = parameterArray['text'];

	var x = parameterArray['x'];
	var y = parameterArray['y'];
	var dx = parameterArray['dx'];
	var dy = parameterArray['dy'];

	// style
	var style = "style = \"";

	var rotate = parameterArray['rotate'];
	if (typeof rotate === "undefined")
	{
		console.log("rotate is undefined");
	}
	else
	{
		var style = style + ' rotate:' + rotate + ";";
	}

	var textLength = parameterArray['textLength'];
	if (typeof textLength === "undefined")
	{
		console.log("textLength is undefined");
	}
	else
	{
		var style = style + ' textLength:' + textLength + ";";
	}

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	var lengthAdjust = parameterArray['lengthAdjust'];
	if (typeof lengthAdjust === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' lengthAdjust:' + lengthAdjust + ";";
	}

	var writing_mode = parameterArray['writing-mode'];
	if (typeof writing_mode === "undefined")
	{
		console.log("writing_mode is undefined");
	}
	else
	{
		var style = style + ' writing-mode:' + writing_mode + ";";
	}

	var textclass = parameterArray['class'];
	if (typeof textclass === "undefined")
	{
		console.log("class is undefined");
	}
	else
	{
		var style = style + ' class:' + textclass + ";";
	}

	var font_size = parameterArray['font-size'];
	if (typeof font_size === "undefined")
	{
		console.log("font_size is undefined");
	}
	else
	{
		var style = style + ' font-size:' + font_size + ";";
	}

	var font_weight = parameterArray['font-weight'];
	if (typeof font_weight === "undefined")
	{
		console.log("font_weight is undefined");
	}
	else
	{
		var style = style + ' font-weight:' + font_weight + ";";
	}

	var font_style = parameterArray['font-style'];
	if (typeof font_style === "undefined")
	{
		console.log("font_style is undefined");
	}
	else
	{
		var style = style + ' font-style:' + font_style + ";";
	}

	var font_family = parameterArray['font-family'];
	if (typeof font_family === "undefined")
	{
		console.log("font_family is undefined");
	}
	else
	{
		var style = style + ' font-family:' + font_family + ";";
	}

	var text_decoration = parameterArray['text-decoration'];
	if (typeof text_decoration === "undefined")
	{
		console.log("text_decoration is undefined");
	}
	else
	{
		var style = style + ' text-decoration:' + text_decoration + ";";
	}

	var transform = parameterArray['transform'];
	if (typeof transform === "undefined")
	{
		console.log("transform is undefined");
	}
	else
	{
		//var style  = style + ' transform:' + transform + ";";
	}

	var text_anchor = parameterArray['text-anchor'];
	if (typeof text_anchor === "undefined")
	{
		console.log("text-anchor is undefined");
	}
	else
	{
		var style = style + ' text-anchor:' + text_anchor + ";";
	}

	var dominant_baselin = parameterArray['dominant-baselin'];
	if (typeof dominant_baselin === "undefined")
	{
		console.log("dominant-baselin is undefined");
	}
	else
	{
		var style = style + ' dominant-baselin:' + dominant_baselin + ";";
	}

	style = style + "\"";

	fs.appendFileSync( this._fileName, "   <text x=\"" + x + "\" y= \"" + y + "\" " + "transform = \"" + transform + "\" " );
	fs.appendFileSync( this._fileName, style + ">  \r\n");
	fs.appendFileSync( this._fileName, "     " + text + "  \r\n");
	fs.appendFileSync( this._fileName, "   </text>   \r\n");
}

SVGDrawer.prototype.rect = function( parameterArray )
{
	var x = parameterArray['x'];
	var y = parameterArray['y'];

	var rx = parameterArray['rx'];
	if (typeof rx === "undefined")
	{
		console.log("rx is undefined");
		rx = 0;
	}

	var ry = parameterArray['ry'];
	if (typeof ry === "undefined")
	{
		console.log("ry is undefined");
		ry = 0;
	}

	var width = parameterArray['width'];
	var height = parameterArray['height'];

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke-dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	var fill_opacity = parameterArray['fill_opacity'];
	if (typeof fill_opacity === "undefined")
	{
		console.log("fill_opacity is undefined");
	}
	else
	{
		var style = style + ' fill-opacity: ' + fill_opacity + ";";
	}

	var opacity = parameterArray['opacity'];
	if (typeof opacity === "undefined")
	{
		console.log("opacity is undefined");
	}
	else
	{
		var style = style + ' opacity: ' + opacity + ";";
	}

	style = style + "\"";

	/********
	 var transform = parameterArray['transform'];
	 if (typeof transform === "undefined") {
	 console.log("transform is undefined");
	 }else
	 {
	 var style = style + " transform = \"" + transform + "\"";
	 }

	 style  = style + "\"";
	 **********/

	fs.appendFileSync( this._fileName, "   <rect x=\"" + x + "\" y= \"" + y + "\" rx = \"" + rx + "\" " + " ry = \"" + ry + "\" width=\"" + width + "\" height= \"" + height + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");

}

SVGDrawer.prototype.ellipse = function( parameterArray )
{
	var cx = parameterArray['cx'];
	var cy = parameterArray['cy'];

	var rx = parameterArray['rx'];
	var ry = parameterArray['ry'];

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke-dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	var fill_opacity = parameterArray['fill_opacity'];
	if (typeof fill_opacity === "undefined")
	{
		console.log("fill_opacity is undefined");
	}
	else
	{
		var style = style + ' fill-opacity: ' + fill_opacity + ";";
	}

	style = style + "\"";

	var transform = parameterArray['transform'];
	if (typeof transform === "undefined")
	{
		console.log("transform is undefined");
	}
	else
	{
		var style = style + " transform = \"" + transform + "\"";
	}

	fs.appendFileSync( this._fileName, "   <ellipse cx=\"" + cx + "\" cy= \"" + cy + "\" rx=\"" + rx + "\" ry= \"" + ry + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");

}

SVGDrawer.prototype.path = function( parameterArray )
{
	if( parameterArray['d'] === undefined)
	{
		console.log( "parameterArray['d'] undefine " );
		return;
	}

	var d = parameterArray['d'];

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	style = style + "\""

	fs.appendFileSync( this._fileName, "   <path d=\"" + d + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

SVGDrawer.prototype.polyline = function( parameterArray )
{
	var points = parameterArray['points'];
	if (typeof points === "undefined")
	{
		console.log("points is undefined");
		return;
	}

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke_dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	style = style + "\""

	fs.appendFileSync( this._fileName, "   <polyline points=\"" + points + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

/***************
              (1)
-------------------------------------------------------
   (x1,y1)    /\          |
             /  \      arrow_height
            /    \        |
           /__  __\ (2)___|_
              | |
              | |
              ---   (x2,y2)
           |--|
         space_width

-------------------------------------------------------

************/
SVGDrawer.prototype.bigArrow = function( parameterArray )
{
	var x1 = parameterArray['x1'];
	var x2 = parameterArray['x2'];
	var y1 = parameterArray['y1'];
	var y2 = parameterArray['y2'];
	var arrow_height = parameterArray['arrow_height'];
	var space_width = parameterArray['space_width'];

	var width = x2 - x1;
	var height = y2 - y1;

	var x_1 = x1 + width / 2;
	var y_1 = y1;

	var x_2 = x2;
	var y_2 = y1 + arrow_height;

	var x_3 = x2 - space_width;
	var y_3 = y1 + arrow_height;

	var x_4 = x2 - space_width;
	var y_4 = y2;

	var x_5 = x1 + space_width;
	var y_5 = y2;

	var x_6 = x1 + space_width;
	var y_6 = y1 + arrow_height;

	var x_7 = x1;
	var y_7 = y1 + arrow_height;

	//var points = parameterArray['points'];
	//if (typeof points === "undefined") {
	//    console.log("points is undefined");
	//    return;
	//}


	var points = x_1 + " " + y_1 + ",";
	points = points + x_2 + " " + y_2 + ",";
	points = points + x_3 + " " + y_3 + ",";
	points = points + x_4 + " " + y_4 + ",";
	points = points + x_5 + " " + y_5 + ",";
	points = points + x_6 + " " + y_6 + ",";
	points = points + x_7 + " " + y_7 + ",";
	points = points + x_1 + " " + y_1 + ",";

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke_dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var fill = parameterArray['fill'];
	if (typeof fill === "undefined")
	{
		console.log("fill is undefined");
	}
	else
	{
		var style = style + ' fill: ' + fill + ";";
	}

	var transform = parameterArray['transform'];
	if (typeof fill === "undefined")
	{
		console.log("transform is undefined");
	}
	else
	{
		transform = ' transform = \"' + transform + "\" ";
	}

	style = style + "\""

	fs.appendFileSync( this._fileName, "   <polyline points=\"" + points + "\" " );
	fs.appendFileSync( this._fileName, style + transform + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");

}

SVGDrawer.prototype.line = function( parameterArray )
{
	var x1 = parameterArray['x1'];
	var x2 = parameterArray['x2'];
	var y1 = parameterArray['y1'];
	var y2 = parameterArray['y2'];

	var style = "style = \"";

	var stroke = parameterArray['stroke'];
	if (typeof stroke === "undefined")
	{
		console.log("stroke is undefined");
	}
	else
	{
		var style = style + ' stroke:' + stroke + ";";
	}

	var stroke_width = parameterArray['stroke-width'];
	if (typeof stroke_width === "undefined")
	{
		console.log("stroke_width is undefined");
	}
	else
	{
		var style = style + " stroke-width: " + stroke_width + ";";
	}

	var stroke_dasharray = parameterArray['stroke-dasharray'];
	if (typeof stroke_dasharray === "undefined")
	{
		console.log("stroke_dasharray is undefined");
	}
	else
	{
		var style = style + ' stroke-dasharray: ' + stroke_dasharray + ";";
	}

	var marker_end = parameterArray['marker-end'];
	if (typeof marker_end === "undefined")
	{
		console.log("marker_end is undefined");
	}
	else
	{
		var style = style + ' marker-end: ' + marker_end + ";";
	}

	style = style + "\""

	fs.appendFileSync( this._fileName, "   <line x1=\"" + x1 + "\" y1= \"" + y1 + "\" x2=\"" + x2 + "\" y2= \"" + y2 + "\" " );
	fs.appendFileSync( this._fileName, style + "/>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}

SVGDrawer.prototype.imagine = function( parameterArray )
{
	var x = parameterArray['x'];
	var y = parameterArray['y'];
	var width = parameterArray['width'];
	var height = parameterArray['height'];
	var href = parameterArray['href'];
	if (typeof href === "undefined")
	{
		console.log("href is undefined");
		return;
	}

	var title = parameterArray['title'];

	fs.appendFileSync( this._fileName, "   <image x=\"" + x + "\" y= \"" + y + "\" width=\"" + width + "\" height= \"" + height + "\" " );
	fs.appendFileSync( this._fileName, " xlink:href = " + "\"" + href + "\" >  \r\n");

	if (typeof title !== "undefined")
	{
		fs.appendFileSync( this._fileName, "       <title>" + title + "</title>   \r\n");
	}

	fs.appendFileSync( this._fileName, "   </image>   \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
}


module.exports = SVGDrawer;