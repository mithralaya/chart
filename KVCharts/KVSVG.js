'use strict';

/**
 * Created By Karthik Vasudevan
 * On 04/10/2015
 * A simple class to hold svg elements
 */

// closure to avoid external variable conflicts
var KVSVG = (function(window, document){

    /**
     * @name KVSVG
     * @description
     * Constructor to load public & private variables and default functions
     *
     * @param none
     * @returns void.
     */
    var KVSVG = function()
    {

    };

    /**
     * @description
     * KVSVG prototypes public functions
     */
    KVSVG.prototype = {

        /**
         * @name drawSVG
         * @description
         * To draw a svg scaffold to wrap all svg element
         *
         * @param fontFamily {string}, content {string}
         * @returns svg tag with properties and content.
         */
        drawSVG: function(fontFamily, content)
        {
            if(content !== undefined && typeof content === 'string' && content.length > 0)
            {
                //draw svg wrapper
                return '<svg version="1.1" style="font-family: '+fontFamily+'; font-size: 12px; font-weight: 300;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">' + content + '</svg>';
            }
            return '';
        },

        /**
         * @name drawText
         * @description
         * To draw a svg text tag with properties
         *
         * @param none
         * @returns svg tag with properties and content.
         */
        drawText: function(classx, x, y, colour, fontSize, text, transform)
        {
            if(text !== undefined && typeof text === 'string' && text.length > 0)
            {
                //check if x and y are defined and that they are numbers
                x = (x !== undefined && !isNaN(parseFloat(x)) && isFinite(x))? 'x = "'+parseInt(x)+'"': '';
                y = (y !== undefined && !isNaN(parseFloat(y)) && isFinite(y))? 'y = "'+parseInt(y)+'"': '';
                transform = (transform !== undefined && transform !== null)? 'transform="'+transform+'"' : '';
                //draw text svg
                return '<text class="'+classx+'" '+x+' '+y+' '+transform+' style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+text+' </text>';
            }
            return '';
        }
    };

    return KVSVG;

})(window, document);