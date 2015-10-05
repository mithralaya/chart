'use strict';

/**
 * Created By Karthik Vasudevan
 * On 01/10/2015
 * A simple class to hold svg elements
 */

// closure to avoid external variable conflicts
var KVBubbleChart = (function(window, document){


    /**
     * Global constants declaration
     */
    var
        //default font family for the entire chart
        DEFAULT_FONT_FAMILY                     = "'HelveticaNeue-Light', Arial, sans-serif",
        //default font size if not set in option for chart title
        DEFAULT_CHART_TITLE_FONT_SIZE           = 28,
        //default text colour for chart title
        DEFAULT_TITLE_TEXT_COLOUR               = "#333333",
        //default starting x position of x axis
        X_AXIS_START_POINT                      = 75,
        //default starting x position of x axis
        Y_AXIS_START_POINT                      = X_AXIS_START_POINT,
        //point sepration distance
        DEFAULT_POINT_SEPARATION_PIXEL          = X_AXIS_START_POINT,
        DEFAULT_LEGEND_REF_SIZE                 = 30,

        DEFUALT_LEGEND_COLOURS                  = ["#FFB347", "#B19CD9", "#3a7bd5", "#D73E68", "#03C03C", "#C23B22", "#CB99C9", "#FFD1DC"],
        DEFAULT_AXIS_LINE_COLOUR                = "#aaaaaa",
        DEFAULT_AXIS_TEXT_COLOUR                = "#999999",
        DEFAULT_AXIS_NAME_COLOUR                = "#cccccc",
        DEFAULT_TITLE_TEXT_COLOUR               = "#333333",
        DEFAULT_AXIS_POINT_LINE_COLOUR          = "#bbbbbb",
        DEFAULT_AXIS_POINT_TEXT_COLOUR          = "#666666",
        DEFAULT_AXIS_GRID_LINE_COLOUR           = "#cccccc",


        //chart title class name
        CHART_TITLE_CLASS                       = "chartTitle",
        //xaxis
        CHART_XAXIS_LINE_CLASS                  = "xAxisLine",
        CHART_XAXIS_GROUP_CLASS                 = "xAxis",
        CHART_XAXIS_TITLE_CLASS                 = "xAxisTitle",
        CHART_XAXIS_NAME_CLASS                  = "xAxisName",
        CHART_XAXIS_POINT_LINES_CLASS           = "xAxisPointLines",
        CHART_XAXIS_POINT_TEXT_CLASS            = "xAxisPointText",
        CHART_XAXIS_GRID_LINE_CLASS             = "xAxisGridLine",
        //yaxis
        CHART_YAXIS_LINE_CLASS                  = "yAxisLine",
        CHART_YAXIS_GROUP_CLASS                 = "yAxis",
        CHART_YAXIS_NAME_CLASS                  = "yAxisName",
        CHART_YAXIS_TITLE_CLASS                 = "yAxisTitle",
        CHART_YAXIS_POINT_LINES_CLASS           = "yAxisPointLines",
        CHART_YAXIS_POINT_TEXT_CLASS            = "yAxisPointText",
        CHART_YAXIS_GRID_LINE_CLASS             = "yAxisGridLine",
        //legends
        CHART_LEGEND_GROUP_CLASS                = "legendRef",
        CHART_UNIQUE_LEGEND_GROUP_CLASS         = "uniqueLegendRef",
        CHART_LEGEND_REF_TEXT_CLASS             = "legendRefText",
        CHART_LEGEND_REF_COLOUR_CLASS           = "legendRefColour",
        //bubbles
        CHART_BUBBLE_CLASS                      = "bubble",
        CHART_BUBBLE_GROUP_CLASS                = "bubbleGrp",
        CHART_BUBBLE_ITEM_GROUP_CLASS           = "bubbleItemGrp",
        CHART_BUBBLE_TOOLTIP_GROUP_CLASS        = "bubbleTooltip",
        CHART_BUBBLE_TOOLTIP_TEXT_GROUP_CLASS   = "bubbleTooltipTextGrp",
        CHART_BUBBLE_TOOLTIP_RECT_CLASS         = "bubbleTooltipRect",
        CHART_BUBBLE_TOOLTIP_TEXT_CLASS         = "bubbleTooltipText";



    /**
     * @name KVBubbleChart
     * @description
     * Constructor to load public & private variables and default functions
     *
     * @param options {Object}
     * @returns void.
     */
    var KVBubbleChart = function(options, element)
    {

        this.svg            = new KVSVG();      //declare a global svg class
        this.title          = options.title;    //chart title options
        this.xAxis          = options.xAxis;    //xaxis options
        this.yAxis          = options.yAxis;    //yaxis options
        this.legend         = options.legend;   //legend options
        this.bubble         = options.bubble;   //bubble opions
        this.data           = options.data;     //user data
        this.element        = element;          //declaring element object where this chart gonna sit
        this.xAxisPoints    = [];
        this.yAxisPoints    = [];
        this.uniqueLegend   = this.uniqueLegend();


        this.build(); //build all svgs and
        this.align(); //align chart elements
    };

    /**
     * @description
     * KVBubbleChart prototypes public functions
     */
    KVBubbleChart.prototype =
    {
        /**
         * @name chartTite
         * @description
         * To draw a chart title
         *
         * @param none
         * @returns svg title text tag with properties and content.
         */
        chartTitle: function()
        {
            if(this.title !== undefined && typeof this.title.text === 'string' && this.title.text.length > 0)
            {
                //check if title colour is set in options if not use default text colour
                var textColour = (this.title.colour !== undefined)? this.title.colour : DEFAULT_TITLE_TEXT_COLOUR,
                    //check if font size is set in options if not user default
                    fontSize = (this.title.fontSize !== undefined
                    && this.title.fontSize === parseInt(this.title.fontSize, 10))?
                        this.title.fontSize: DEFAULT_CHART_TITLE_FONT_SIZE;
                //return svg text
                return this.svg.drawText(CHART_TITLE_CLASS, undefined, 35, textColour, fontSize, this.title.text);
            }
            return '';
        },

        /**
         * @name chartXAxis
         * @description
         * To draw all elements of x axis
         *
         * @param none
         * @returns svg elements of xaxis with properties and content.
         */
        chartXAxis: function()
        {
            var windowWidth = window.innerWidth,
                x1 = X_AXIS_START_POINT,
                //yaxis length should be 1/3 of xaxis length
                y1 = windowWidth * 0.3,
                //dynamic length of x axis
                x2 = window.innerWidth - Y_AXIS_START_POINT,
                y2 = y1,
                //pick default of user supplied line colour
                lineColour = (this.xAxis.lineColour !== undefined)? this.xAxis.lineColour: DEFAULT_AXIS_LINE_COLOUR;
            this.xAxisPoints = this.axisData(this.xAxis, x2 - x1);


            //draw xaxis line
            var html = this.svg.drawLine(CHART_XAXIS_LINE_CLASS, x1, y1, x2, y2, lineColour, 2);

            //plotting points
            for(var axisPointsKey in this.xAxisPoints["points"])
            {
                if(this.xAxisPoints["points"].hasOwnProperty(axisPointsKey))
                {
                    var incrementX = ((x1) * (parseInt(axisPointsKey)+1)) + DEFAULT_POINT_SEPARATION_PIXEL;
                    html += this.svg.drawLine(CHART_XAXIS_POINT_LINES_CLASS, incrementX, y1, incrementX, y2+8, DEFAULT_AXIS_POINT_LINE_COLOUR, 2);
                    html += this.svg.drawText(CHART_XAXIS_POINT_TEXT_CLASS, incrementX, (y1+40), DEFAULT_AXIS_POINT_TEXT_COLOUR, 14,
                        this.xAxisPoints["points"][axisPointsKey].toString(), "rotate(300 "+incrementX+","+(y1+50)+")");
                    if(this.xAxis.grid)
                    {
                        html += this.svg.drawLine(CHART_XAXIS_GRID_LINE_CLASS, incrementX, Y_AXIS_START_POINT, incrementX, y2, DEFAULT_AXIS_GRID_LINE_COLOUR, 1, true);
                    }
                }
            }
            //draw xaxis title
            html += this.svg.drawText(CHART_XAXIS_TITLE_CLASS, (x2-200), (y1-7), DEFAULT_AXIS_TEXT_COLOUR,
                16, this.xAxis.name.toUpperCase());
            //draw xaxis name
            html += this.svg.drawText(CHART_XAXIS_NAME_CLASS, (x2+20), (y1+5), DEFAULT_AXIS_NAME_COLOUR, 18, "x");
            //put them all in a group
            html = this.svg.drawGroup(CHART_XAXIS_GROUP_CLASS, 0, 0, html);

            return html;
        },

        /**
         * @name chartYAxis
         * @description
         * To draw all elements of y axis
         *
         * @param none
         * @returns svg elements of yaxis with properties and content.
         */

        chartYAxis: function()
        {
            var windowWidth = window.innerWidth,
                x1 = X_AXIS_START_POINT,
                y1 = Y_AXIS_START_POINT,
                x2 = X_AXIS_START_POINT,
                //yaxis should be 1/3 of x axis
                y2 = windowWidth * 0.3,
                lineColour = (this.yAxis.lineColour !== undefined)? this.yAxis.lineColour: DEFAULT_AXIS_LINE_COLOUR;
            this.yAxisPoints = this.axisData(this.yAxis, y2 - y1);


            //draw yaxis line
            var html = this.svg.drawLine(CHART_YAXIS_LINE_CLASS, x1, y1, x2, y2, lineColour, 2);
            //plotting points
            var decrementY = y2;
            for(var axisPointsKey in this.yAxisPoints["points"])
            {
                if(this.yAxisPoints["points"].hasOwnProperty(axisPointsKey))
                {
                    html += this.svg.drawLine(CHART_YAXIS_POINT_LINES_CLASS, x1-8, decrementY, x2, decrementY, DEFAULT_AXIS_POINT_LINE_COLOUR, 2);
                    html += this.svg.drawText(CHART_YAXIS_POINT_TEXT_CLASS, x1 - 35, decrementY+5, DEFAULT_AXIS_POINT_TEXT_COLOUR, 14,
                        this.yAxisPoints["points"][axisPointsKey].toString());
                    if(this.yAxis.grid)
                    {
                        html += this.svg.drawLine(CHART_YAXIS_GRID_LINE_CLASS, x1, decrementY, window.innerWidth - Y_AXIS_START_POINT, decrementY, DEFAULT_AXIS_GRID_LINE_COLOUR, 1, true);
                    }
                    decrementY = decrementY - DEFAULT_POINT_SEPARATION_PIXEL;
                }
            }

            //draw yaxis name
            html += this.svg.drawText(CHART_YAXIS_NAME_CLASS, (X_AXIS_START_POINT - 2), (y1-20), DEFAULT_AXIS_NAME_COLOUR, 18, "y");
            //draw yaxis title
            html += this.svg.drawText(CHART_YAXIS_TITLE_CLASS, (x2-70), (y1+20), DEFAULT_AXIS_TEXT_COLOUR, 16,
                    this.yAxis.name.toUpperCase(), "rotate(270 90,90)");

            //put all in a group
            html = this.svg.drawGroup(CHART_YAXIS_GROUP_CLASS, 0, 0, html);

            return html;
        },

        /**
         * @name chartLegend
         * @description
         * To draw all footer legend refs
         *
         * @param none
         * @returns svg elements of legend with properties and content.
         */
        chartLegend: function()
        {
            var html = '';

            for(var sector in this.uniqueLegend)
            {
                if(this.uniqueLegend.hasOwnProperty(sector))
                {
                    var tempHtml = '';
                    //check if the legend ref is roundRect rect or circle default is roundRect
                    switch(this.legend.refType)
                    {
                        case 'roundRect':
                            tempHtml += this.svg.drawRect(CHART_LEGEND_REF_COLOUR_CLASS, 0, 0, DEFAULT_LEGEND_REF_SIZE, DEFAULT_LEGEND_REF_SIZE, 8, 8, undefined, this.uniqueLegend[sector]);
                            break;
                        case 'rect':
                            tempHtml += this.svg.drawRect(CHART_LEGEND_REF_COLOUR_CLASS, 0, 0, DEFAULT_LEGEND_REF_SIZE, DEFAULT_LEGEND_REF_SIZE, 0, 0, undefined, this.uniqueLegend[sector]);
                            break;
                        case 'circle':
                            tempHtml += this.svg.drawCircle(CHART_LEGEND_REF_COLOUR_CLASS, 15, 15, DEFAULT_LEGEND_REF_SIZE/2, undefined, this.uniqueLegend[sector]);
                            break;
                        default:
                            tempHtml += this.svg.drawRect(CHART_LEGEND_REF_COLOUR_CLASS, 0, 0, DEFAULT_LEGEND_REF_SIZE, DEFAULT_LEGEND_REF_SIZE, 5, 5, undefined, this.uniqueLegend[sector]);
                            break;
                    }
                    tempHtml += this.svg.drawText(CHART_LEGEND_REF_TEXT_CLASS, DEFAULT_LEGEND_REF_SIZE + 10, 20, DEFAULT_AXIS_TEXT_COLOUR,
                        16, sector);

                    html += this.svg.drawSVGElement(CHART_UNIQUE_LEGEND_GROUP_CLASS, 0, 0, tempHtml);
                }
            }


            var x = X_AXIS_START_POINT,
                y = window.innerWidth * 0.3,
                html = this.svg.drawGroup(CHART_LEGEND_GROUP_CLASS, x, y+75, html);

            return html;
        },

        /**
         * @name chartBubble
         * @description
         * To
         *
         * @param none
         * @returns returns svg elements containing bubble and their tooltips to their exact position.
         */
        chartBubble: function()
        {

            var coord = this.bubbleCoordinates();
            var tempHtml = '';

            for(var coordKey in coord)
            {
                if(coord.hasOwnProperty(coordKey))
                {
                    //plot bubble
                    var circle = this.svg.drawCircle(CHART_BUBBLE_CLASS +" animate "+this.bubble.bubbleAnimation, 0, 0
                        , coord[coordKey].bubbleRadius, undefined, coord[coordKey].colour, 0.75);

                    //plot tooltip

                    var tooltipRect = this.svg.drawRect(CHART_BUBBLE_TOOLTIP_RECT_CLASS, 0, 0, 100, 200, 8, 8, '#333333', '#ffffff');
                    var xValue = (this.xAxis.type === "date")? new Date(coord[coordKey].tooltip[this.xAxis.key]).getFullYear() : coord[coordKey].tooltip[this.xAxis.key];
                    var tooltipText = this.svg.drawText(CHART_BUBBLE_TOOLTIP_TEXT_CLASS, 100, 120, '#333333', 12,  this.xAxis.name + ": " +xValue);
                    tooltipText += this.svg.drawText(CHART_BUBBLE_TOOLTIP_TEXT_CLASS, 100, 140, '#333333', 12,  this.yAxis.name + ": " +coord[coordKey].tooltip[this.yAxis.key]);
                    tooltipText += this.svg.drawText(CHART_BUBBLE_TOOLTIP_TEXT_CLASS, 100, 160, '#333333', 12,  this.bubble.name + ": " +coord[coordKey].tooltip[this.bubble.key]);
                    tooltipText += this.svg.drawText(CHART_BUBBLE_TOOLTIP_TEXT_CLASS, 100, 180, '#333333', 12,  this.legend.name + ": " +coord[coordKey].tooltip[this.legend.key]);

                    var tooltipTextGroup = this.svg.drawGroup(CHART_BUBBLE_TOOLTIP_TEXT_GROUP_CLASS, -85, -96, tooltipText);
                    var tooltip = this.svg.drawGroup(CHART_BUBBLE_TOOLTIP_GROUP_CLASS, -100, -120, tooltipRect + tooltipTextGroup);
                    tempHtml += this.svg.drawGroup(CHART_BUBBLE_ITEM_GROUP_CLASS, coord[coordKey].xCord, coord[coordKey].yCord, circle+tooltip);
                }
            }
            this.bubble.bubbleAnimation = "";
            var html = this.svg.drawGroup(CHART_BUBBLE_GROUP_CLASS, 0, 0, tempHtml);

            return html
        },
        /**
         * @name axisData
         * @description
         * To get exact coordinated for a bubble according to their x and y values
         *
         * @param none
         * @returns returns an array of objects containing bubble xy coord, radius, colour and tooltip.
         */
        bubbleCoordinates: function()
        {
            var bubbleCoordinates = [];

            if(Object.prototype.toString.call(this.data) === '[object Array]' && this.data.length > 0)
            {
                if(this.bubble.key !== undefined)
                {
                    for(var dataKey in this.data)
                    {
                        if(this.data.hasOwnProperty(dataKey))
                        {
                            var coord = {},
                                xAxixValue = this.data[dataKey][this.xAxis.key],
                                yAxixValue = this.data[dataKey][this.yAxis.key];

                            //if they are dates convert them to YYYY year
                            if(this.xAxis.type === "date")
                            {
                                xAxixValue = new Date(this.data[dataKey][this.xAxis.key]).getFullYear();
                            };
                            if(this.yAxis.type === "date")
                            {
                                yAxixValue = new Date(this.data[dataKey][this.yAxis.key]).getFullYear();
                            }

                            //deciding on xy coord and bubble radius
                            var bubbleRadius = (parseInt(this.data[dataKey][this.bubble.key]) / (DEFAULT_POINT_SEPARATION_PIXEL+50)),
                                xCord = (((DEFAULT_POINT_SEPARATION_PIXEL/this.xAxisPoints["ceil"])
                                * (xAxixValue - this.xAxisPoints["min"])) + DEFAULT_POINT_SEPARATION_PIXEL + X_AXIS_START_POINT),
                                yCord = ((window.innerWidth * 0.3) - ((DEFAULT_POINT_SEPARATION_PIXEL/this.yAxisPoints["ceil"])
                                * (yAxixValue - this.yAxisPoints["min"]))),
                                colour = this.uniqueLegend[this.data[dataKey][this.legend.key]];
                            coord = {
                                "bubbleRadius": (window.innerWidth * bubbleRadius) /6000,
                                "xCord": xCord,
                                "yCord": yCord,
                                "colour": colour,
                                "tooltip": this.data[dataKey]
                            };

                            bubbleCoordinates.push(coord);
                        }
                    }
                }
            }
            return bubbleCoordinates;
        },

        /**
         * @name axisData
         * @description
         * To get all axis points that can be plotted on axis
         *
         * @param axis {object}, availableSpace {float}
         * @returns none.
         */
        axisData: function(axis, availableSpace)
        {
            var newAxisPoints = {};
            //check if data exist and that its an arrays
            if(Object.prototype.toString.call(this.data) === '[object Array]' && this.data.length > 0)
            {
                if(axis.key !== undefined)
                {
                    var axisData = [];
                    for(var dataKey in this.data)
                    {
                        if(this.data.hasOwnProperty(dataKey))
                        {
                            //if the data format is a date convert the timestamp to human readable year
                            if(axis.type === "date")
                            {
                                var value = new Date(this.data[dataKey][axis.key]).getFullYear();
                            }
                            else
                            {
                                var value = this.data[dataKey][axis.key];
                            }
                            axisData.push(value);
                        }
                    }
                    //find min value
                    var min = Math.min.apply(null, axisData),
                        //find max value
                        max = Math.max.apply(null, axisData),
                        //difference it
                        diff = (max - min),
                        //find maximum plottable space using available space and default separation space
                        floor = Math.floor(availableSpace/DEFAULT_POINT_SEPARATION_PIXEL),
                        //this will give us the difference in each point
                        ceil = Math.ceil(diff/floor);

                    newAxisPoints["diff"] = diff;
                    newAxisPoints["floor"] = floor;
                    newAxisPoints["ceil"] = ceil;
                    newAxisPoints["points"] = [];
                    newAxisPoints["min"] = min;

                    for(var i = 0; i < floor; i++)
                    {
                        //add those points to the array
                        //if the higher point doesnt end at the max then we do multiply the ceil
                        if(ceil > min)
                        {
                            if(i === 0)
                            {
                                newAxisPoints["points"].push(min);
                            }
                            newAxisPoints["points"].push(ceil * (i+1));
                        }
                        else
                        {
                            newAxisPoints["points"].push(min);
                            min += ceil;
                        }
                    }
                }
            }
            return newAxisPoints;
        },

        /**
         * @name align
         * @description
         * To align all chart elements to its right positions
         *
         * @param none
         * @returns none.
         */
        align: function()
        {
            this.alignChartTitle();
            this.alignXAxisTitle();
            this.alignYAxisTitle();
            this.alignYAxisPointText();
            this.alignLegend();

            //align the hight of the element div to the content of the chart
            this.element.style.height = (window.innerWidth * 0.3) + 175 +"px";
        },

        /**
         * @name alignChartTitle
         * @description
         * To set title text the x attribute to centrally align to the page
         *
         * @param none
         * @returns none.
         */
        alignChartTitle: function()
        {
            var chartTitleElement = document.getElementsByClassName(CHART_TITLE_CLASS);
            if(chartTitleElement.length > 0)
            {
                chartTitleElement[0].setAttribute("x", this.getCentreForTitle(window, chartTitleElement[0]));
            }
        },

        /**
         * @name alignXAxisTitle
         * @description
         * To set xaxis title text to align with the end of xAxis line
         *
         * @param none
         * @returns none.
         */
        alignXAxisTitle: function()
        {
            var xAxisTitle = document.getElementsByClassName(CHART_XAXIS_TITLE_CLASS)[0],
                xAxisLength = parseInt(document.getElementsByClassName(CHART_XAXIS_LINE_CLASS)[0].getAttribute("x2")),
                xAxisTitleWidth = parseInt(xAxisTitle.offsetWidth);

            xAxisTitle.setAttribute("x", (xAxisLength - xAxisTitleWidth));
        },

        /**
         * @name alignXAxisTitle
         * @description
         * To set xaxis title text to align with the end of xAxis line
         *
         * @param none
         * @returns none.
         */
        alignYAxisTitle: function()
        {
            var yAxisTitle = document.getElementsByClassName(CHART_YAXIS_TITLE_CLASS)[0],
                yAxisTitleWidth = parseInt(yAxisTitle.offsetWidth);

            yAxisTitle.setAttribute("x", 106 - yAxisTitleWidth);
        },

        /**
         * @name alignLegend
         * @description
         * To set spacing for legend and should knock line if it reached end
         *
         * @param none
         * @returns none.
         */
        alignLegend:function()
        {
            var legend = document.getElementsByClassName(CHART_UNIQUE_LEGEND_GROUP_CLASS);

            var legendx = 0, legendy = 0, secondLine = false;
            for(var key in legend)
            {
                if(legend.hasOwnProperty(key) && typeof legend[key] === 'object')
                {
                    //legend[key].setAttribute("transform", "translate("+legendx+", "+legendy+")");
                    //set initial x and y coords
                    legend[key].setAttribute("x", legendx);
                    legend[key].setAttribute("y", legendy);
                    var colourWidth = DEFAULT_LEGEND_REF_SIZE;
                    //find text width
                    var textWidth = parseInt(document.getElementsByClassName(CHART_LEGEND_REF_TEXT_CLASS)[key].offsetWidth);

                    var margin = 20; // add 20 margin between legends
                    var spacing = 10; // add 10 spacing between legend colour and text
                    legendx += colourWidth + textWidth + margin + spacing; //add them all to gether

                    var maxWidth = window.innerWidth - Y_AXIS_START_POINT;

                    if(legendx > maxWidth)
                    {

                        //if secondline then the last legend will knock to second line
                        if(!secondLine){
                            legendx = 0;
                            secondLine=true;
                        }

                        legendy = DEFAULT_LEGEND_REF_SIZE + margin;
                        if(legend[key + 1] !== undefined)
                        {
                            //legend[key + 1].setAttribute("transform", "translate("+legendx+", "+legendy+")");
                            legend[key].setAttribute("x", legendx);
                            legend[key].setAttribute("y", legendy);
                        }

                    }
                }
            }
        },

        /**
         * @name alignYAxisPointText
         * @description
         * To right align all text on the y axis points
         *
         * @param none
         * @returns none.
         */
        alignYAxisPointText: function()
        {
            var yAxisPointsText = document.getElementsByClassName(CHART_YAXIS_POINT_TEXT_CLASS);

            //for each points
            for(var yAxisPointsTextIndex in yAxisPointsText)
            {
                if(yAxisPointsText.hasOwnProperty(yAxisPointsTextIndex))
                {
                    //right align all text
                    var yAxisPointTextWidth = parseInt(yAxisPointsText[yAxisPointsTextIndex].offsetWidth);
                    if(typeof yAxisPointsText[yAxisPointsTextIndex] === 'object')
                    {
                        yAxisPointsText[yAxisPointsTextIndex].setAttribute("x", X_AXIS_START_POINT - 15 - yAxisPointTextWidth);

                    }
                }
            }
        },

        /**
         * @name getCentreForTitle
         * @description
         * To find a centre aligned text x position using window width and element width
         *
         * @param win {object}, element {object}
         * @returns x position of any text to be centrally aligned to the page.
         */
        getCentreForTitle: function(win, element)
        {
            var windowWidth = win.innerWidth,
                elementWidth = element.offsetWidth,

                centre = (windowWidth/2) - (elementWidth/2);

            return centre;
        },
        /**
         * @name uniqueLegend
         * @description
         * Will bring only unique legends and its colours
         *
         * @param none
         * @returns object ofunique legends and its colours
         */
        uniqueLegend: function()
        {
            var uniqueLegend = {};
            if(Object.prototype.toString.call(this.data) === '[object Array]' && this.data.length > 0)
            {
                if(this.legend.key !== undefined)
                {
                    //check if there are user supplied colours
                    var colours = (this.legend.colours !== undefined
                    && Object.prototype.toString.call(this.legend.colours) === '[object Array]'
                    && this.legend.colours.length > 0)
                        ? this.legend.colours : DEFUALT_LEGEND_COLOURS;
                    var noOfColours = colours.length;
                    var incrementor = 0;

                    for (var dataKey in this.data)
                    {
                        if(this.data.hasOwnProperty(dataKey))
                        {
                            if(uniqueLegend[this.data[dataKey][this.legend.key]] === undefined)
                            {
                                //set unique sector and its colours
                                uniqueLegend[this.data[dataKey][this.legend.key]] = colours[incrementor];
                                //chech of we still hve colours if not reset to repeat
                                incrementor = (noOfColours === (incrementor+1))?  0 : incrementor+1;
                            }

                        }
                    }
                }
            }

            return uniqueLegend;
        },

        /**
         * @name build
         * @description
         * To draw the entire chart by combining the parts
         *
         * @param none
         * @returns svg chart with all its contents.
         */
        build: function()
        {
            //reset inner html of the element before plotting
            this.element.innerHTML   = "";
            var html = this.chartTitle() + this.chartXAxis()
                    + this.chartYAxis() + this.chartLegend()
                    + this.chartBubble();
            this.element.innerHTML = this.svg.drawSVG(DEFAULT_FONT_FAMILY, html);
        }
    };

    return KVBubbleChart;

})(window, document);