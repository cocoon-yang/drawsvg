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
	this._STACK = [];
	this._fd;
}

SVGDrawer.prototype.setFileName = function( fileName )
{
	var self = this;
	if( undefined == fileName )
	{
		console.log("SVGDrawer::setFileName: file name is undefined, please set valid file name.");
		return;
	}
	self._fileName = fileName;

	try {
	  if (  self._fd !== undefined){
	      fs.closeSync(self._fd);
	  }

 	  self._fd = fs.openSync(self._fileName, 'w'); 
	} catch (err) {
 	 /* Handle the error */
		console.log("SVGDrawer::setFileName: open file with the name failed.");
		return;
	}   
}

SVGDrawer.prototype.getFileName = function( )
{
	return this._fileName;
}



SVGDrawer.prototype.pushData = function( theData )
{
    this._STACK.push( theData );
}


// 
// Pop one data from stack and append it to the target file synonmously
//
SVGDrawer.prototype.popData = function( )
{
     var self = this;
	if ( typeof(self._fd) == undefined ){		
		console.log("SVGDrawer::popData: file descriptor is invalid.");
	      return;
	}
	try {
    		var theData =  this._STACK.pop();     
    		fs.appendFileSync( self._fileName, theData ); 
	} catch (err) {
 	 /* Handle the error */
		console.log("SVGDrawer::popData: appending data failed.");
		console.log("SVGDrawer::popData:  ", err );
		return;
	} 
}

SVGDrawer.prototype.close = function( )
{
	var self = this;
    var len = self._STACK.length;
    for( var i = 0; i < len; i++ )
    {
         self.popData();
    }

	  if ( self._fd !== undefined){
	      fs.closeSync(self._fd);
	  }
}

SVGDrawer.prototype.element = function( name, attribute, indent  )
{
     var self = this;

     if( undefined == indent )
     {
          indent = '  ';
     }

     var content = attribute['content']
     if( undefined !== content )
     {
          delete attribute['content'];
     }
	
     var str = String(indent) + '</' + name + '> \n';
     self.pushData( str );

     str = String(indent) + '<' + name;
     for( var id in attribute )
     {
          str += ' ' + id + '=\"' + attribute[id] +'\"';
     }
    str += '>\n'
    fs.appendFileSync( this._fileName, str );  

     if( undefined !== content )
     {
          fs.appendFileSync( this._fileName, String(indent) + '  ' + content + '\n'  ); 
     }     
}

SVGDrawer.prototype.header = function( )
{
	fs.appendFileSync( this._fileName, "<?xml version=\"1.0\" standalone=\"no\"?> \r\n");
	fs.appendFileSync( this._fileName, "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \r\n ");
	fs.appendFileSync( this._fileName, "   \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"> \r\n"); 
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
}

SVGDrawer.prototype.writeEnd = function( )
{
	fs.appendFileSync( this._fileName, " </g>   \r\n");
	fs.appendFileSync( this._fileName, "</svg>   \r\n");
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

SVGDrawer.prototype.defineHardDisk = function( )
{
      var self = this;
      var theAttr={};
      self.element('defs', theAttr )

      theAttr={};
      theAttr['id'] = 'Harddisk';
      theAttr['viewBox'] = '0 0 50 110';
      theAttr['refX'] = '0';
      theAttr['refY'] = '0'; 
      theAttr['markerUnits'] = 'strokeWidth';
      theAttr['markerWidth'] = '40'; 
      theAttr['markerHeight'] = '100'; 
      // theAttr['style'] = 'fill-rule:evenodd;stroke:none'
      theAttr['orient'] = 'auto'; 
      self.element('marker', theAttr, '    ' )

      theAttr={};
      theAttr['cx'] = '24';
      theAttr['cy'] = '24';
      theAttr['rx'] = '23';
      theAttr['ry'] = '10';
      theAttr['stroke'] = 'black';
      theAttr['stroke-width'] = 2;
      theAttr['fill'] = 'white';
      self.element('ellipse', theAttr, '      ' )
      self.popData();

      theAttr={};
      theAttr['cx'] = '24';
      theAttr['cy'] = '64';
      theAttr['rx'] = '23';
      theAttr['ry'] = '10';
      theAttr['stroke'] = 'black';
      theAttr['stroke-width'] = 2;
      theAttr['fill'] = 'white';
      self.element('ellipse', theAttr, '      ' )
      self.popData();

      theAttr={};
      theAttr['x1'] = '47';
      theAttr['y1'] = '24';
      theAttr['x2'] = '47';
      theAttr['y2'] = '64';
      theAttr['stroke'] = 'black';
      theAttr['stroke-width'] = 1;
      self.element('line', theAttr, '      ' )
      self.popData();

      theAttr={};
      theAttr['x1'] = '1';
      theAttr['y1'] = '24';
      theAttr['x2'] = '1';
      theAttr['y2'] = '64';
      theAttr['stroke'] = 'black';
      theAttr['stroke-width'] = 1;
      self.element('line', theAttr, '      ' )
      self.popData();

      self.popData();  // Markers
      self.popData();  // defs   
}


SVGDrawer.prototype.defineBigArrow = function( )
{
      var self = this;
      var theAttr={};
      self.element('defs', theAttr )

      theAttr={};
      theAttr['id'] = 'BigArrow';
      theAttr['viewBox'] = '0 0 100 100';
      theAttr['refX'] = '0';
      theAttr['refY'] = '0'; 
      theAttr['markerUnits'] = 'strokeWidth';
      theAttr['markerWidth'] = '200'; 
      theAttr['markerHeight'] = '200'; 
      theAttr['orient'] = 'auto';
      self.element('marker', theAttr )


      theAttr={};
      theAttr['d'] = 'm22.502 9.5398l19.004 16.506-19.004 16.423v-7.87h-14.996l0.0004-17.055h14.996v-8.0042z';
      theAttr['style'] = 'color:black'
      theAttr['stroke'] = '#204a87'
      theAttr['fill'] = '#3465a4'
      self.element('path', theAttr, '      '  )
      self.popData();


      theAttr={};
      theAttr['d'] = 'm8 18.048v7.952l32.769-0.024-17.615-15.345v7.417h-15.154z';
      theAttr['style'] = 'color:black'
      theAttr['stroke'] = '#204a87'
      theAttr['fill'] = '#3465a4'
      self.element('path', theAttr, '      '  )
      self.popData();


      theAttr={};
      theAttr['d'] = 'm23.573 11.681l16.517 14.386-16.517 14.199v-6.738h-15.067l0.0004-14.978h15.067v-6.869z';
      theAttr['style'] = 'color:black'
      //theAttr['stroke'] = '#204a87'
      theAttr['fill'] = '#729fcf'
      theAttr['opacity'] = '.35393'
      self.element('path', theAttr, '      '  )
      self.popData();
      self.popData();  // Markers
      self.popData();  // defs   
}




SVGDrawer.prototype.coordinateaxis= function( parameterArray )
{
	var self = this;

	var x1 = parameterArray['x1'];
	var x2 = parameterArray['x2'];
	var y1 = parameterArray['y1'];
	var y2 = parameterArray['y2'];

	var end_x = x2;
	var end_y = y2;

	var x_range = x2 - x1;
	var y_range = y2 - y1;

	var step = parameterArray['step']; 
        delete parameterArray['step']; 

	for( var i = 1; i < step; i++ )
	{
		var x_scale = x_range / step;
		var y_scale = y_range / step;

		var x = x1 + x_scale * i ;
		var y = y1 + y_scale * i ;

		var x_scale_length = 0 ;
		var y_scale_length = 0 ; 

		if( y_range != 0 )
		{
			x_scale_length = 10 ;
		}

		if( x_range != 0 )
		{
			y_scale_length = 10 ;
		}
		var x_scale = x + x_scale_length  ;
		var y_scale = y + y_scale_length  ; 

                var theAttr ={};
                theAttr['x1'] =  x ;
                theAttr['y1'] =  y ;
                theAttr['x2'] =  x_scale ;
                theAttr['y2'] =  y_scale ;
                theAttr['style'] = parameterArray['style'] ;
                self.element('line', theAttr, '      ' )
                self.popData();
	}

        var theAttr ={};
        theAttr['x1'] =  x1 ;
        theAttr['y1'] =  y1 ;
        theAttr['x2'] =  end_x  ;
        theAttr['y2'] =  end_y  ;
        theAttr['style'] = parameterArray['style']  
        theAttr['marker-end'] = 'url(#Triangle)';
        self.element('line', theAttr, '    ' )
        self.popData();
}



// (x,y)                 (x + dx -0.4dy, y)
//  *---------------------*
//   \                     \
//    \                     \
//     *                     *
//    /                     /
//   /                     /
//  *---------------------*
SVGDrawer.prototype.processIcon = function( parameterArray, prefix )
{
        var self = this;

	var x = parameterArray['x'];
	var y = parameterArray['y'];
	var dx = parameterArray['width'];
	var dy = parameterArray['height'];

	delete parameterArray['x'];
	delete parameterArray['y'];
	delete parameterArray['width'];
	delete parameterArray['height'];

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

        parameterArray['points'] = points;

        self.element('polyline', parameterArray, prefix );
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
SVGDrawer.prototype.bigArrow = function( parameterArray, prefix )
{
	var x1 = parameterArray['x1'];
	var x2 = parameterArray['x2'];
	var y1 = parameterArray['y1'];
	var y2 = parameterArray['y2'];
	var arrow_height = parameterArray['arrow_height'];
	var space_width = parameterArray['space_width'];

	delete parameterArray['x1'];
	delete parameterArray['x2'];
	delete parameterArray['y1'];
	delete parameterArray['y2'];
	delete parameterArray['arrow_height'];
	delete parameterArray['space_width'];

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


        parameterArray['points'] = points;

        self.element('polyline', parameterArray, prefix );
 
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


//
//  Triangle LOGO
//
//  There is some brilliant svg logo libraries, such as:
//  https://github.com/gilbarbara/logos
//
SVGDrawer.prototype.defineTriangle = function()
{
      var self = this;
      var theAttr={};
      self.element('defs', theAttr )

      theAttr={};
      theAttr['id'] = 'Triangle';
      theAttr['viewBox'] = '0 0 12 10';
      theAttr['refX'] = '0';
      theAttr['refY'] = '5'; 
      theAttr['markerUnits'] = 'strokeWidth';
      theAttr['markerWidth'] = '12'; 
      theAttr['markerHeight'] = '8'; 
      theAttr['style'] = 'fill-rule:evenodd;stroke:none'
      theAttr['orient'] = 'auto'; 
      self.element('marker', theAttr, '    ' )

      theAttr={};
      theAttr['d'] = 'M 0 0 L 12 5 L 0 10 L 3 5';
      self.element('path', theAttr, '      ' )
      self.popData();

      theAttr={};
      theAttr['d'] = 'M 0 5 L 3 5';
      theAttr['style'] = 'fill:none;stroke:#000000;stroke-width:1.5';
      self.element('path', theAttr, '      '  )
      self.popData();
      self.popData();  // Markers
      self.popData();  // defs   
}

SVGDrawer.prototype.writeComment = function( theText )
{
	fs.appendFileSync( this._fileName, "   \r\n");
	fs.appendFileSync( this._fileName, "   <desc>------------------------------------------------------</desc>  \r\n");
	fs.appendFileSync( this._fileName, "   <desc>" + theText + "</desc>  \r\n");
	fs.appendFileSync( this._fileName, "   \r\n");
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

SVGDrawer.prototype.linkwitharrowline = function ( theSourceParameterArray, theTargetParameterArray , type )
{
	console.log(" ");
	console.log("linkwitharrowline ---------- ");
	console.log("theSourceParameterArray  "  );
	console.log(theSourceParameterArray);

	console.log("theTargetParameterArray  " );
	console.log(theTargetParameterArray  );

	console.log("link line type:  " + type );

	var self = this;

	var arrowline_root_x ;
	var arrowline_root_y ;

	var arrowline_head_x ;
	var arrowline_head_y ;

	var sourceRectangleWidth = theSourceParameterArray['width']  ;
	var sourceRectangleHeight = theSourceParameterArray['height']  ;
	var sourceRectangle_L_U_Cornor_x = theSourceParameterArray['x'];
        var sourceRectangle_L_U_Cornor_y = theSourceParameterArray['y'];
	var sourceRectangle_R_D_Cornor_x = theSourceParameterArray['x'] + sourceRectangleWidth;
        var sourceRectangle_R_D_Cornor_y = theSourceParameterArray['y'] + sourceRectangleHeight;

	var targetRectangleWidth = theTargetParameterArray['width']  ;
	var targetRectangleHeight = theTargetParameterArray['height']  ;
	var targetRectangle_L_U_Cornor_x = theTargetParameterArray['x'];
        var targetRectangle_L_U_Cornor_y = theTargetParameterArray['y'];
	var targetRectangle_R_D_Cornor_x = theTargetParameterArray['x'] + targetRectangleWidth;
        var targetRectangle_R_D_Cornor_y = theTargetParameterArray['y'] + targetRectangleHeight;

	var parameterArray = new Array();

	parameterArray['x1'] =  150;
	parameterArray['y1'] =  50;
	parameterArray['x2'] =  150;
	parameterArray['y2'] =  50;

	console.log("sourceRectangle_L_U_Cornor_x:  " + sourceRectangle_L_U_Cornor_x );
	console.log("targetRectangle_R_D_Cornor_x:  " + targetRectangle_R_D_Cornor_x );

    if( parseInt( sourceRectangle_L_U_Cornor_x, 10 ) > parseInt( targetRectangle_R_D_Cornor_x, 10 ) )
    {

	console.log( "sourceRectangle_L_U_Cornor_x > targetRectangle_R_D_Cornor_x" );

	if( sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y )
	{
	        console.log( "sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y" );
		arrowline_root_x = sourceRectangle_L_U_Cornor_x + sourceRectangleWidth / 2 ;
		arrowline_root_y = sourceRectangle_L_U_Cornor_y ;
		arrowline_head_x = targetRectangle_R_D_Cornor_x - sourceRectangleWidth / 2;
		arrowline_head_y = targetRectangle_R_D_Cornor_y + 10  ;




		if( type == 2 )
		{
			console.log( "type == 2" );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  arrowline_root_y;
			parameterArray['x2'] =  arrowline_root_x;
			parameterArray['y2'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );


			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;
			parameterArray['x2'] =  targetRectangle_R_D_Cornor_x + 10;  
			parameterArray['y2'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );
			//console.log( "line" );

			return;
		}  

		if( type == 7 )
		{
			console.log( "type == 7"  );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  arrowline_root_y;
			parameterArray['x2'] =  arrowline_root_x;
			parameterArray['y2'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['x1'] =  arrowline_head_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			self.line( parameterArray );



			parameterArray['x1'] =  arrowline_head_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['x2'] =  arrowline_head_x;  
			parameterArray['y2'] =  arrowline_head_y;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );
			//console.log( "line" );

			return;
		}  

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, 
					arrowline_head_x, arrowline_head_y );
		return;
	}

	if( sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y )
	{
		console.log( "sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y" );
		arrowline_root_x = sourceRectangle_R_D_Cornor_x - sourceRectangleWidth / 2 ;
		arrowline_root_y = sourceRectangle_R_D_Cornor_y ;
		arrowline_head_x = targetRectangle_L_U_Cornor_x + sourceRectangleWidth / 2;
		arrowline_head_y = targetRectangle_L_U_Cornor_y - 10  ;

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, 
					arrowline_head_x, arrowline_head_y );
		return;
	}

	arrowline_root_x = sourceRectangle_L_U_Cornor_x;
	arrowline_root_y = sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;

	arrowline_head_x = targetRectangle_R_D_Cornor_x + 10;
	arrowline_head_y = targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, arrowline_head_x, arrowline_head_y );
	return;
    }


    if( sourceRectangle_R_D_Cornor_x < targetRectangle_L_U_Cornor_x )
    {
	console.log( "sourceRectangle_R_D_Cornor_x < targetRectangle_L_U_Cornor_x" );



	if( sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y )
	{
		console.log( "sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y" );
		arrowline_root_x = sourceRectangle_L_U_Cornor_x + sourceRectangleWidth / 2 ;
		arrowline_root_y = sourceRectangle_L_U_Cornor_y ;
		arrowline_head_x = targetRectangle_R_D_Cornor_x - targetRectangleWidth / 2;
		arrowline_head_y = targetRectangle_R_D_Cornor_y + 10  ;

		if( type == 2 )
		{
			console.log( "type == 2" );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  arrowline_root_y;
			parameterArray['x2'] =  arrowline_root_x;
			parameterArray['y2'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;
			parameterArray['x2'] =  targetRectangle_L_U_Cornor_x - 10;  
			parameterArray['y2'] =  targetRectangle_R_D_Cornor_y - targetRectangleHeight / 2;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );
			//console.log( "line" );

			return;
		}  



		if( type == 'z' )
		{
			console.log( "type == z"  );

			parameterArray['x1'] =  sourceRectangle_R_D_Cornor_x;
			parameterArray['y1'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y2'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );
			parameterArray['x1'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y1'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y2'] =  targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );


			parameterArray['x1'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y1'] =  targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  targetRectangle_L_U_Cornor_x - 10;  
			parameterArray['y2'] =   targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );
			return;
		}  

		if( type == 7 )
		{
			console.log( "type == 7"  );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  arrowline_root_y;
			parameterArray['x2'] =  arrowline_root_x;
			parameterArray['y2'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );

			parameterArray['x1'] =  arrowline_root_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['x1'] =  arrowline_head_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			self.line( parameterArray );



			parameterArray['x1'] =  arrowline_head_x;
			parameterArray['y1'] =  (targetRectangle_R_D_Cornor_y + sourceRectangle_L_U_Cornor_y) / 2;
			parameterArray['x2'] =  arrowline_head_x;  
			parameterArray['y2'] =  arrowline_head_y;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );
			//console.log( "line" );

			return;
		}  

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, arrowline_head_x, arrowline_head_y );		
		return;
	}

	if( sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y )
	{
		console.log( "sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y" );
		arrowline_root_x = sourceRectangle_R_D_Cornor_x - sourceRectangleWidth / 2 ;
		arrowline_root_y = sourceRectangle_R_D_Cornor_y ;
		arrowline_head_x = targetRectangle_L_U_Cornor_x + sourceRectangleWidth / 2;
		arrowline_head_y = targetRectangle_L_U_Cornor_y - 10  ;
		if( type == 'z' )
		{
			console.log( "type == z"  );

			parameterArray['x1'] =  sourceRectangle_R_D_Cornor_x;
			parameterArray['y1'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y2'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );
			
			parameterArray['x1'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y1'] =  sourceRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y2'] =  targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['marker-end'] = '';
			parameterArray['stroke'] = "black";
			parameterArray['stroke-width'] = 1;
			self.line( parameterArray );

			parameterArray['x1'] =  (targetRectangle_R_D_Cornor_x + sourceRectangle_L_U_Cornor_x ) / 2;
			parameterArray['y1'] =  targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;
			parameterArray['x2'] =  targetRectangle_L_U_Cornor_x - 10;  
			parameterArray['y2'] =   targetRectangle_L_U_Cornor_y + sourceRectangleHeight / 2;  
			parameterArray['marker-end'] = 'url(#Triangle)';
			self.line( parameterArray );

			return;
		}

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, 
					arrowline_head_x, arrowline_head_y );
		return;
	}

	arrowline_root_x = sourceRectangle_R_D_Cornor_x;
	arrowline_root_y = sourceRectangle_R_D_Cornor_y - sourceRectangleHeight / 2;

	arrowline_head_x = targetRectangle_L_U_Cornor_x - 10;
	arrowline_head_y = targetRectangle_L_U_Cornor_y + targetRectangleHeight / 2;

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, arrowline_head_x, arrowline_head_y );
	return;
    }

    if( sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y )
    {
	console.log( "sourceRectangle_L_U_Cornor_y > targetRectangle_R_D_Cornor_y" );


	arrowline_root_x = sourceRectangle_L_U_Cornor_x + sourceRectangleWidth / 2 ;
	arrowline_root_y = sourceRectangle_L_U_Cornor_y ;
	arrowline_head_x = targetRectangle_R_D_Cornor_x - sourceRectangleWidth / 2;
	arrowline_head_y = targetRectangle_R_D_Cornor_y + 10  ;

		self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, 
					arrowline_head_x, arrowline_head_y );
	return;
    }
    if( sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y )
    {
	console.log( "sourceRectangle_R_D_Cornor_y < targetRectangle_L_U_Cornor_y" );
	arrowline_root_x = sourceRectangle_R_D_Cornor_x - sourceRectangleWidth / 2 ;
	arrowline_root_y = sourceRectangle_R_D_Cornor_y ;
	arrowline_head_x = targetRectangle_L_U_Cornor_x + sourceRectangleWidth / 2;
	arrowline_head_y = targetRectangle_L_U_Cornor_y - 10  ;
	self.drawLineWithArrow(  arrowline_root_x, arrowline_root_y, arrowline_head_x, arrowline_head_y );
	return;
    }

}

SVGDrawer.prototype.defineCloud = function( ) 
{
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "  <defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "    <marker id=\"Cloud\"    \r\n");   
		fs.appendFileSync(  this._fileName, "      viewBox=\"0 0 950 500\" refX=\"0\" refY=\"5\"    \r\n");    
		fs.appendFileSync(  this._fileName, "      markerUnits=\"strokeWidth\"    \r\n");   
		fs.appendFileSync(  this._fileName, "      markerWidth=\"520\" markerHeight=\"580\"    \r\n");   
		fs.appendFileSync(  this._fileName, "      transform=\"translate(-204.16628,-180.95788)\" >    \r\n");     
		fs.appendFileSync(  this._fileName, "    <path   \r\n"); 
		fs.appendFileSync(  this._fileName, "       d=\"M 410.67959,194.3815 C 392.37515,189.47681 373.85117,195.08975 361.06312,207.28351 C 354.38189,199.25271 345.33513,193.05458 334.48394,190.1472 C 306.55725,182.66441 277.78779,199.27435 270.3048,227.20111 C 269.75493,229.25318 269.61017,231.31674 269.31528,233.36915 C 244.16592,230.75487 220.10196,246.49902 213.35064,271.69554 C 206.66103,296.6615 219.28468,322.19 241.97368,332.68633 C 240.74035,335.36078 239.59041,338.11603 238.80258,341.05587 C 231.31972,368.98263 247.94629,397.69032 275.87305,405.17311 C 289.55164,408.83877 303.37499,406.6863 314.85002,400.29682 C 321.17421,413.82629 332.96537,424.71545 348.50905,428.8801 C 370.68656,434.82265 393.19111,425.40916 405.34082,407.36649 C 410.26235,410.85061 415.73285,413.73264 421.89508,415.3841 C 449.82177,422.86689 478.52936,406.24005 486.01235,378.31329 C 489.77522,364.2703 487.44688,350.05895 480.65432,338.41184 C 487.37673,332.00174 492.63872,323.88203 495.21692,314.25995 C 502.69988,286.33286 486.07327,257.62517 458.14659,250.14238 C 455.20678,249.35502 452.26201,248.91147 449.32995,248.64237 C 451.06775,224.11827 435.30606,200.98024 410.67959,194.3815 z\"    \r\n"); 
		fs.appendFileSync(  this._fileName, "       style=\"opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:14.79046059;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1\" />      \r\n"); 
		fs.appendFileSync(  this._fileName, "    </marker>     \r\n");  
		fs.appendFileSync(  this._fileName, "  </defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}




SVGDrawer.prototype.defineHuman = function( )
{
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "  <defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "    <marker id=\"Human\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      viewBox=\"0 0 50 110\" refX=\"0\" refY=\"0\"    \r\n"); 
		fs.appendFileSync(  this._fileName, "      markerUnits=\"strokeWidth\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      markerWidth=\"40\" markerHeight=\"100\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      orient=\"auto\">   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <circle cx=\"24\" cy=\"24\" r=\"18\" stroke=\"black\"    \r\n");
		fs.appendFileSync(  this._fileName, "         stroke-width=\"4\" fill=\"white\"   />   \r\n");

		fs.appendFileSync(  this._fileName, "      <line x1=\"24\" y1=\"44\" x2=\"24\" y2=\"80\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"stroke:black;stroke-width:4\"/>   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <line x1=\"4\" y1=\"60\" x2=\"44\" y2=\"60\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"stroke:black;stroke-width:4\"/>   \r\n");

		fs.appendFileSync(  this._fileName, "      <line x1=\"24\" y1=\"80\" x2=\"44\" y2=\"100\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"stroke:black;stroke-width:4\"/>   \r\n");

		fs.appendFileSync(  this._fileName, "      <line x1=\"24\" y1=\"80\" x2=\"4\" y2=\"100\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"stroke:black;stroke-width:4\"/>   \r\n");

		fs.appendFileSync(  this._fileName, "    </marker>   \r\n"); 
		fs.appendFileSync(  this._fileName, "  </defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}

SVGDrawer.prototype.defineComputer = function( )
{

		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "  <defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "    <marker id=\"Computer\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      viewBox=\"0 0 80 150\" refX=\"0\" refY=\"5\"    \r\n"); 
		fs.appendFileSync(  this._fileName, "      markerUnits=\"strokeWidth\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      markerWidth=\"80\" markerHeight=\"150\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "      orient=\"auto\">   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <rect x=\"0\" y=\"0\" rx=\"10\" ry=\"10\" width=\"80\" height=\"150\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"fill:white;stroke:black;stroke-width:3 ;opacity:0.9\"/>   \r\n"); 

          
	for( var i = 10; i < 60; i+= 20 )
	{
		fs.appendFileSync(  this._fileName, "      <rect x=\"10\" y=\"" + i + "\" rx=\"3\" ry=\"3\" width=\"60\" height=\"20\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"fill:white;stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n"); 

	}

		fs.appendFileSync(  this._fileName, "      <rect x=\"10\" y=\"80\" rx=\"3\" ry=\"3\" width=\"60\" height=\"10\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"fill:white;stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <line x1=\"15\" y1=\"85\" x2=\"65\" y2=\"85\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <rect x=\"20\" y=\"130\" rx=\"4\" ry=\"3\" width=\"40\" height=\"6\"   \r\n"); 
		fs.appendFileSync(  this._fileName, "        style=\"fill:black;stroke:black;stroke-width:2;opacity:0.5\"/>   \r\n"); 

		fs.appendFileSync(  this._fileName, "      <circle cx=\"40\" cy=\"131\" r=\"10\" stroke=\"black\"    \r\n");
		fs.appendFileSync(  this._fileName, "         stroke-width=\"4\" fill=\"white\"   />   \r\n");

		fs.appendFileSync(  this._fileName, "    </marker>   \r\n"); 
		fs.appendFileSync(  this._fileName, "  </defs>   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}





SVGDrawer.prototype.defineBigArrow = function( )
{
		fs.appendFileSync(  this._fileName, "  <defs>  \r\n");   
		fs.appendFileSync(  this._fileName, "    <marker id=\"BigArrow\"  \r\n");   
		fs.appendFileSync(  this._fileName, "      viewBox=\"0 0 100 100\" refX=\"0\" refY=\"0\"   \r\n");   
		fs.appendFileSync(  this._fileName, "      markerUnits=\"strokeWidth\"  \r\n");   
		fs.appendFileSync(  this._fileName, "      markerWidth=\"200\" markerHeight=\"200\"   \r\n");  
		fs.appendFileSync(  this._fileName, "      orient=\"auto\">   \r\n");  
		fs.appendFileSync(  this._fileName, "  <path id=\"path4348\" style=\"color:black\" d=\"m22.502 9.5398l19.004 16.506-19.004 16.423v-7.87h-14.996l0.0004-17.055h14.996v-8.0042z\" stroke=\"#204a87\" fill=\"#3465a4\"/>  \r\n");
		fs.appendFileSync(  this._fileName, "  <path id=\"path4352\" opacity=\".35393\" style=\"color:black\" d=\"m8 18.048v7.952l32.769-0.024-17.615-15.345v7.417h-15.154z\" fill=\"#729fcf\"/>  \r\n");
		fs.appendFileSync(  this._fileName, "  <path id=\"path4360\" opacity=\"0.354\" style=\"color:black\" d=\"m23.573 11.681l16.517 14.386-16.517 14.199v-6.738h-15.067l0.0004-14.978h15.067v-6.869z\" stroke=\"url(#linearGradient5315)\" fill=\"none\"/>  \r\n");
		fs.appendFileSync(  this._fileName, "    </marker>   \r\n"); 
		fs.appendFileSync(  this._fileName, "  </defs>   \r\n");
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}



SVGDrawer.prototype.drawLineWithArrow = function(  x1, y1, x2, y2 )
{
		fs.appendFileSync(  this._fileName, "  <line   x1=\"" + x1 + "\" y1= \"" + y1 + "\"   x2=\""  + x2 + "\" y2= \"" + y2 + "\" style = \"stroke: Black;\"  marker-end=\"url(#Triangle)\" />  \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}




SVGDrawer.prototype.drawHuman = function( x1, y1 )
{
		fs.appendFileSync(  this._fileName, "  <line   x1=\"" + x1 + "\" y1= \"" + y1 + "\"   x2=\""  + x1 + "\" y2= \"" + y1 + "\" style = \"stroke: Black;\"  marker-end=\"url(#Human)\" />  \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}



SVGDrawer.prototype.drawComputer = function( x1, y1 )
{
		fs.appendFileSync(  this._fileName, "  <line   x1=\"" + x1 + "\" y1= \"" + y1 + "\"   x2=\""  + x1 + "\" y2= \"" + y1 + "\" style = \"stroke: Black;\"  marker-end=\"url(#Computer)\" />  \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}

SVGDrawer.prototype.drawHardDisk = function( x1, y1 )
{
		fs.appendFileSync(  this._fileName, "  <line   x1=\"" + x1 + "\" y1= \"" + y1 + "\"   x2=\""  + x1 + "\" y2= \"" + y1 + "\" style = \"stroke: Black;\"  marker-end=\"url(#Harddisk)\" />  \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}

SVGDrawer.prototype.drawCloud = function(  x , y  )
{
		fs.appendFileSync(  this._fileName, "   \r\n"); 
		fs.appendFileSync(  this._fileName, "  <line   x1=\"" + x + "\" y1= \"" + y + "\"   x2=\""  + x + "\" y2= \"" + y + "\" style = \"stroke: Black;\"  marker-end=\"url(#Cloud)\" />  \r\n"); 
		fs.appendFileSync(  this._fileName, "   \r\n"); 
}

module.exports = SVGDrawer;
