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

        //chart title class name
        CHART_TITLE_CLASS                       = "chartTitle";



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
            var html = this.chartTitle();
            this.element.innerHTML = this.svg.drawSVG(DEFAULT_FONT_FAMILY, html);
        }
    };

    return KVBubbleChart;

})(window, document);