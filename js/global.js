'use strict';

/**
 * Created By Karthik Vasudevan
 * On 04/10/2015
 * Global JS which will load on index.html
 */

//options initialisation
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

//init KVBubbleChart
function init()
{
    new KVBubbleChart(options, document.getElementById("bubbleChart"));
}

//add a random company button
function addCompany()
{
    document.getElementById("pleaseAdd").style.display = "none";
    var newCompany = {
        "incopDate": getRandomInt(465599466000, 1443820266000),// get random int between range
        "rev": Math.ceil((getRandomInt(40, 1100)+1)/10)*10, // get random int in multiples if 10s
        "val": Math.ceil((getRandomInt(1000, 30000)+1)/100)*100, // get random int in multiples if 100s
        "sect": sectors[Math.floor(Math.random()*sectors.length)] //get random sector from sector array
    };
    data.push(newCompany);
    init();
}


//get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//merge two companies
function mergeCompany()
{
    var indexBySector = dataIndexBySector();
    var keys = Object.keys(indexBySector);
    if(keys.length > 0)
    {
        document.getElementById("pleaseAdd").style.display = "none";
        //randomaly pick a sector to merge
        var randomObjectKey = keys[ keys.length * Math.random() << 0];
        if(indexBySector[randomObjectKey].length > 1)
        {
            var index1 = parseInt(indexBySector[randomObjectKey][0]);
            var index2 = parseInt(indexBySector[randomObjectKey][1]);
            var data1 = data[index1];
            var data2 = data[index2];
            //remove the data which are gonna merge
            data.splice(index1, 1);
            //get the new index for data2
            index2 = data.indexOf(data2);
            data.splice(index2, 1);


            //merge 2 data points and add it to data
            var newData = {
                "incopDate": data2.incopDate,
                "rev": data1.rev + data2.rev,
                "val": data1.val + data2.val,
                "sect": randomObjectKey
            };
            //make the oldest companies incorpdate as the new incopdate
            if(data1.incopDate < data2.incopDate)
            {
                newData["incopDate"] = data1.incopDate;
            }

            data.splice(index1, 0, newData);
            init();
        }

    }
    else
    {
        document.getElementById("pleaseAdd").style.display = "block";
    }
}

function dataIndexBySector()
{

    //group unique sector data
    var indexBySector = {};
    for(var dataIndex in data)
    {
        if(data.hasOwnProperty(dataIndex))
        {
            if(indexBySector[data[dataIndex].sect] === undefined)
            {
                indexBySector[data[dataIndex].sect] = [];
            }
            indexBySector[data[dataIndex].sect].push(dataIndex);
        }
    }
    //repopulate with new set of data by deleting the sector which doesnt have more than 1 company
    if(Object.keys(indexBySector).length > 0)
    {
        for(var indexBySectorKey in indexBySector)
        {
            if(indexBySector.hasOwnProperty(indexBySectorKey))
            {
                if(indexBySector[indexBySectorKey].length < 2)
                {
                    delete indexBySector[indexBySectorKey];
                }
            }
        }
    }
    return indexBySector;
}


window.onresize = function(){init()};