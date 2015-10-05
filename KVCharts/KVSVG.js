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
         * @name drawSVGElement
         * @description
         * To draw a svg scaffold to wrap all svg element
         *
         * @param classx {string}, x {float}, y {float}, content {string}
         * @returns svg tag with properties and content.
         */
        drawSVGElement: function(classx, x, y, content)
        {
            if(content !== undefined && typeof content === 'string' && content.length > 0) {
                x = (x !== undefined) ? 'x = "' + x + '"' : '';
                y = (y !== undefined) ? 'y = "' + y + '"' : '';
                return '<svg class="' + classx + '" ' + x + ' ' + y + '>' + content + '</svg>';
            }
            return '';
        },

        /**
         * @name drawText
         * @description
         * To draw a svg text tag with properties
         *
         * @param classx {string}, x {float}, y {float}, fontSize {int}, text {string}, transform {string}
         * @returns svg text tag with properties and content.
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
        },

        /**
         * @name drawLine
         * @description
         * To draw a svg line tag with properties
         *
         * @param classx {string}, x1 {float}, y1 {float}, x2 {float}, y2 {float}, lineColour {string}, strokeWidth {int}, dottedLines {bool}
         * @returns svg line tag with properties.
         */
        drawLine: function(classx, x1, y1, x2, y2, lineColour, strokeWidth, dottedLines)
        {
            //check if x1, x2, y1, y2 are defined and that they are numbers
            var x1t = (x1 !== undefined && !isNaN(parseFloat(x1)) && isFinite(x1))? 'x1 = "'+x1+'"': '';
            var y1t = (y1 !== undefined && !isNaN(parseFloat(y1)) && isFinite(y1))? 'y1 = "'+y1+'"': '';
            var x2t = (x2 !== undefined && !isNaN(parseFloat(x2)) && isFinite(x2))? 'x2 = "'+x2+'"': '';
            var y2t = (y2 !== undefined && !isNaN(parseFloat(y2)) && isFinite(y2))? 'y2 = "'+y2+'"': '';
            dottedLines = (dottedLines)? 'stroke-dasharray="3,3"': '';

            if(x1 > 0 || x2 > 0 || y1 > 0 || y2 > 0)
            {
                return '<line  class="'+classx+'" '+dottedLines+' '+x1t+'  '+y1t+' '+x2t+' '+y2t+' style="stroke:'+lineColour+';stroke-width:'+strokeWidth+'"></line>';
            }
            return '';

        },

        /**
         * @name drawRect
         * @description
         * To draw a svg rectangle tag with properties
         *
         * @param classx {string}, x {float}, y {float}, height {float}, width {float}, rx {int}, ry {int}, strokeColour {string}, fillColour {string}
         * @returns svg rect tag with properties.
         */
        drawRect: function(classx, x, y, height, width, rx, ry, strokeColour, fillColour)
        {
            x = (x !== undefined)? 'x = "'+x+'"': '';
            y = (y !== undefined)? 'y = "'+y+'"': '';
            height = (height !== undefined)? 'height = "'+height+'"': '';
            width = (width !== undefined)? 'width = "'+width+'"': '';
            rx = (rx !== undefined)? 'rx = "'+rx+'"': '';
            ry = (ry !== undefined)? 'rx = "'+ry+'"': '';
            strokeColour = (strokeColour !== undefined)? 'stroke: '+strokeColour+';' : '';
            fillColour = (fillColour !== undefined)? 'fill: '+fillColour+';' : '';
            return '<rect class="'+classx+'" '+x+' '+y+' '+height+' '+width+' '+rx+' '+ry+' style="'+strokeColour+' '+fillColour+'" />';
        },

        /**
         * @name drawCircle
         * @description
         * To draw a svg line tag with properties
         *
         * @param classx {string}, cx {float}, xy {float}, r {float}, strokeColour {string}, fillColour {string}, fillOpacity {float}
         * @returns svg line tag with properties.
         */
        drawCircle: function(classx, cx, cy, r, strokeColour, fillColour, fillOpacity)
        {
            cx = (cx !== undefined)? 'cx = "'+cx+'"': '';
            cy = (cy !== undefined)? 'cy = "'+cy+'"': '';
            strokeColour = (strokeColour !== undefined)? 'stroke: '+strokeColour+';' : '';
            fillColour = (fillColour !== undefined)? 'fill: '+fillColour+';' : '';
            fillOpacity = (fillOpacity !== undefined)? 'fill-opacity: '+fillOpacity+';' : '';
            return '<circle class="'+classx+'" '+cx+' '+cy+' r="'+r+'" style="'+strokeColour+' '+fillColour+' '+fillOpacity+'"/>';

        },

        /**
         * @name drawGroup
         * @description
         * To draw a svg group tag with properties that will hold many other svg tags
         *
         * @param classx {string}, tx {float}, ty {float}, content {string}
         * @returns a group svg tag with properties
         */
        drawGroup: function(classx, tx, ty, content)
        {
            if(content !== undefined && typeof content === 'string' && content.length > 0)
            {
                return '<g class="'+classx+'" transform="translate('+tx+' '+ty+')">'+ content +'</g>';
            }
            return '';
        }
    };

    return KVSVG;

})(window, document);