'use strict';

/**
 * Created By Karthik Vasudevan
 * On 01/10/2015
 * Global JS which will load on index.html
 */

var options = {
    "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",
    "title": {
        "text": "Mergermarket Companies",
        "fontSize": 28
    }
};
function init()
{
    new KVBubbleChart(options, document.getElementById("bubbleChart"));
}