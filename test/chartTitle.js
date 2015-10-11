/**
 * Created by karthikvasudevan on 07/09/15.
 */
//test begins
describe("Chart Title", function() {
    beforeAll(function() {
        element = document.getElementById("bubbleChart");
    });
    describe("SVG tag", function(){
        it("undefined content should return empty string", function() {
            var options = {
                "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",

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
            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("null content should return empty string", function() {

            var options = {
                "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",
                "title": {
                    "text":null
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
            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("non string content should return empty string", function() {
            var options = {
                "fontFamily": "'HelveticaNeue-Light', Arial, sans-serif",
                "title": {
                    "text":NaN
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

            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("should return the text element and x & y as integer positions if we pass float value", function() {

                var classx = "test",
                colour = "#ffffff",
                fontSize = 19,
                x = 50.55,
                y = 50.55;


            var chart = new KVBubbleChart(options, element);
            var output  = '<text class="'+classx+'" x = "50" y = "50"  style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+options.title.text+' </text>';

            expect(svgClass.drawText(classx, x, y, colour, fontSize, options.title.text)).toBe(output);
        });

        it("should return 450 for win 1000 and element 100 to centre align", function() {

            var elementx = {
                offsetWidth: 100
            };
            var win = {
                innerWidth: 1000
            };

            var chart = new KVBubbleChart(options, element);

            var output  = 450;

            expect(chart.getCentreForTitle(win, elementx)).toBe(output);
        });
    });
});