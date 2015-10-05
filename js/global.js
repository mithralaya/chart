'use strict';

/**
 * Created By Karthik Vasudevan
 * On 04/10/2015
 * Global JS which will load on index.html
 */

var options = {
    "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",
    "title": {
        "text": "Mergermarket Companies",
        "fontSize": 28
    },
    "xAxis": {
        "name": "Incorporation Date (Year)",
        "key": "incopDate",
        "type": "date",
        "grid": false
    },
    "yAxis": {
        "name": "Revenue ($M)",
        "key": "rev",
        "type": "number",
        "grid": true
    },
    "legend": {
        "name": "Sector",
        "key": "sect",
        "refType": "roundRect"  //roundRect, circle, rect
    },
    data: data
};
function init()
{
    new KVBubbleChart(options, document.getElementById("bubbleChart"));
}


window.onresize = function(){init()};