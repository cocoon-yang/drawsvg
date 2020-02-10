# svgdrawer

Scalable Vector Graphics (SVG) is a language for describing two-dimensional graphics 
in XML. svgdrawer is a simple module that writes a vector graph with text commands, thus every piexl is under control.

 
The elements of a svg file constitute a tree data structure with a root node named as "svg". An element of the svg document can be divided into three parts: element head, content and element end. For example: 
```
<desc>Something</desc> 
```
The name of the element is "desc". 
The head of this desc element is "<desc>";
the end is "</desc>", and the content of it is "Something". A long list of attributions of the element would inserted into the element head. This module just put these attributions into a list and lay them at proper place.

# Main Methods
  - open( filePath ) 
  - close()
  - setFileName( filePath )
  - getFileName() 
  - pushData( theData ) 
  - popData() 
  - element( name, attribute, indent )
  - writeComment( theText ) 
  - defineTriangle() 
  - header( )

# Installation

readlinesyn requires [Node.js](https://nodejs.org/) v4+ to run.


```
$ npm install svgdrawer
```  


# Example

```
//
// Modules
var SVGDrawer = require('svgdrawer');
var drawer = new SVGDrawer(); 

// Global variables
var fileName = "reladisp.svg";
var theAttr={}; 

function draw()
{
    try{
        drawer.setFileName( fileName );
        drawer.header();
        theAttr={};
        theAttr['width'] = '100%';
        theAttr['height'] = '100%';
        theAttr['version'] = '1.1';
        theAttr['xmlns']="http://www.w3.org/2000/svg"
        drawer.element('svg', theAttr, '' )

        drawer.defineTriangle(); 

        var origin_x = 500;
        var origin_y = 500;

        var P_x = parseInt( origin_x )  ;
        var P_y = parseInt( origin_y )  ;
        var Q_x = parseInt( origin_x ) - 20;
        var Q_y = parseInt( origin_y ) - 100;

        var p_x = parseInt( origin_x ) + 100;
        var p_y = parseInt( origin_y ) + 20;
        var q_x = parseInt( origin_x ) + 110;
        var q_y = parseInt( origin_y ) - 120;
        drawer.writeComment("PQ"); 

        theAttr={};
        theAttr['style'] = 'stroke-width:2;stroke:gray';
        //theAttr['marker-end'] = 'url(#Triangle)';
        drawer.line( P_x, P_y, Q_x, Q_y, theAttr );
 
        drawer.writeComment("uP"); 

        theAttr={};
        theAttr['style'] = 'stroke-width:2;stroke:gray';
        theAttr['marker-end'] = 'url(#Triangle)';
        drawer.line( P_x, P_y, p_x, p_y, theAttr );
 
        drawer.writeComment("uQ"); 

        theAttr={};
        theAttr['style'] = 'stroke-width:2;stroke:gray';
        theAttr['marker-end'] = 'url(#Triangle)';
        drawer.line( Q_x, Q_y, q_x, q_y, theAttr );
 
        drawer.close();
    }
    catch(err)
    {
        console.log("[Error]: " + err);
        return false;
    }
}

draw();
```

## Run in Windows
Assummed that the node.js has been set up, and the svgdrawer module has been installed (or you can just copy svgdrawer.js into the node_modules folder of node.js environment folder). 
Save the above codes as rela-disp.js, and triggle cmd console, run the rela-disp.js as following: 
```
> node rela-disp.js
```


The reladisp.svg creade by the above process is as following:
```
<?xml version="1.0" standalone="no"?> 
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  
  <desc>------------------------------------------------------</desc>  
  <desc>Triangle</desc>  
  
  <defs >
    <marker id="Triangle" viewBox="0 0 12 10" refX="10" refY="5" markerUnits="strokeWidth" markerWidth="12" markerHeight="8" style="fill-rule:evenodd;stroke:none" orient="auto" >
      <path d="M 0 0 L 12 5 L 0 10 L 3 5" >
      </path> 
      <path d="M 0 5 L 3 5" style="fill:none;stroke:#000000;stroke-width:1.5" >
      </path> 
    </marker> 
  </defs> 
  
  <desc>------------------------------------------------------</desc>  
  <desc>PQ</desc>  
  
  <line x1="500" y1="500" x2="480" y2="400" style="stroke-width:2;stroke:gray" >
  </line> 
  
  <desc>------------------------------------------------------</desc>  
  <desc>uP</desc>  
  
  <line x1="500" y1="500" x2="600" y2="520" style="stroke-width:2;stroke:gray" marker-end="url(#Triangle)" >
  </line> 
  
  <desc>------------------------------------------------------</desc>  
  <desc>uQ</desc>  
  
  <line x1="480" y1="400" x2="610" y2="380" style="stroke-width:2;stroke:gray" marker-end="url(#Triangle)" >
  </line> 
</svg> 
```

# References

>[1] https://www.w3.org/TR/2011/REC-SVG11-20110816/
