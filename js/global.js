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
    "bubble": {
        "name": "Valuation ($M)",
        "key": "val",
        "bubbleAnimation": "bounceIn" //zoomIn or bounceIn
    },
    data: data
};
var sectors = ["Energy", "Automobile", "Services", "Agriculture", "Commodities"];

function init()
{
    new KVBubbleChart(options, document.getElementById("bubbleChart"));
}

function addCompany()
{
    var newCompany = {
        "incopDate": getRandomInt(465599466000, 1443820266000),
        "rev": Math.ceil((getRandomInt(40, 1100)+1)/10)*10,
        "val": Math.ceil((getRandomInt(1000, 30000)+1)/100)*100,
        "sect": sectors[Math.floor(Math.random()*sectors.length)]
    };
    data.push(newCompany);
    init();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



window.onresize = function(){init()};