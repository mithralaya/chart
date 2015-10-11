# KVCharts

A bubble chart implementation.

##Features

    * No External 3rd party libraries used

    * Pure javascript implementation

    * Customisation using options

    * Very small footprint

    * Responsive or auto resize & dynamic auto plot x & y axis

    * Tooltips for bubbles

##Design Decisions

 * Used SVG over Canvas. In terms of performance SVGs are good with larger area and smaller amount(<10k) DOM elements. SVGs are Vectors where as Canvas are rasterized.

 * No External Libraries to be used to minimise footprint

 * Customizations to some extend should be available with defaults

##Further Improvements

 * Toggle legends to focus on specific data points

 * TODO: Date format only does Year now, it should extend to full date.

 * Better design. Better colours and more colours to plot more than 8 sectors

 * Should have written more test cases. I had very limited time over the weekend

##How To Init
```
<body onload="init()">
    <div id="bubbleChart"></div>
    <script>
        function init()
        {
            new KVBubbleChart(options, document.getElementById("bubbleChart"));
        }
        window.onresize = function(){init()}; //for auto resize
    </script>
</body>
```

##Customisation Options
```
var options = {
    "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",
    "title": {
        "text": "Mergermarket Companies",
        "fontSize": 28 //in pixel
    },
    "xAxis": {
        "name": "Incorporation Date (Year)",
        "key": "incopDate",//let the chart know which key in the data to look for
        "type": "date", //can be number or date
        "grid": false // true or false to toggle grid
    },
    "yAxis": {
        "name": "Revenue ($M)",
        "key": "rev",//let the chart know which key in the data to look for
        "type": "number",
        "grid": true // true or false to toggle grid
    },
    "legend": {
        "name": "Sector",
        "key": "sect", //let the chart know which key in the data to look for
        "refType": "roundRect",  //roundRect, circle, rect. default is roundRect
        "colours": ["#FFB347", "#B19CD9", "#3a7bd5", "#C23B22"] //will repeat if it runs out
    },
    "bubble": {
        "name": "Valuation ($M)",
        "key": "val",//let the chart know which key in the data to look for
        "bubbleAnimation": "bounceIn" //zoomIn or bounceIn or emptyString for no animation
    },
    data: data
};
```

##Data Format
```
var data = [
    {
        "incopDate": 781132266000,
        "rev": 70,
        "val": 2020,
        "sect": "Services"
    },
    {
        "incopDate": 907362666000,
        "rev": 230,
        "val": 4400,
        "sect": "Commodities"
    }
]
```


