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


        DEFUALT_LEGEND_COLOURS                  = ["#FFB347", "#B19CD9", "#3a7bd5", "#D73E68", "#03C03C", "#C23B22", "#CB99C9", "#FFD1DC"],
        DEFAULT_AXIS_LINE_COLOUR                = "#aaaaaa",
        DEFAULT_AXIS_TEXT_COLOUR                = "#999999",
        DEFAULT_AXIS_NAME_COLOUR                = "#cccccc",


        //chart title class name
        CHART_TITLE_CLASS                       = "chartTitle",
        //xaxis
        CHART_XAXIS_LINE_CLASS                  = "xAxisLine",
        CHART_XAXIS_GROUP_CLASS                 = "CHART_XAXIS_GROUP_CLASS",
        CHART_XAXIS_TITLE_CLASS                 = "xAxisTitle",
        CHART_XAXIS_NAME_CLASS                  = "xAxisName",
        //yaxis
        CHART_YAXIS_LINE_CLASS                  = "yAxisLine",
        CHART_YAXIS_GROUP_CLASS                 = "yAxis",
        CHART_YAXIS_NAME_CLASS                  = "yAxisName",
        CHART_YAXIS_TITLE_CLASS                 = "yAxisTitle";



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
        this.element        = element;          //declaring element object where this chart gonna sit

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


            //draw xaxis line
            var html = this.svg.drawLine(CHART_XAXIS_LINE_CLASS, x1, y1, x2, y2, lineColour, 2);
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


            //draw yaxis line
            var html = this.svg.drawLine(CHART_YAXIS_LINE_CLASS, x1, y1, x2, y2, lineColour, 2);
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
                    + this.chartYAxis();
            this.element.innerHTML = this.svg.drawSVG(DEFAULT_FONT_FAMILY, html);
        }
    };

    return KVBubbleChart;

})(window, document);