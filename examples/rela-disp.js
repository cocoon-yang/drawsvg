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