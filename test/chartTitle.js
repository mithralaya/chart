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
            var options = {};
            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("null content should return empty string", function() {

            var options = {
                title: {
                    "text": null
                }
            };

            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("non string content should return empty string", function() {

            var options = {
                title: {
                    "text": 20
                }
            };
            var chart = new KVBubbleChart(options, element);

            var output  = '';

            expect(chart.chartTitle()).toBe(output);
        });

        it("should return the text element and x & y as integer positions if we pass float value", function() {

                classx = "test";
                colour = "#ffffff";
                fontSize = 19;
                x = 50.55;
                y = 50.55;

            var options = {
                title: {
                    "text": "Awesome"
                }
            };
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
            var options = {
                title: {
                    "text": 20
                }
            };
            var chart = new KVBubbleChart(options, element);

            var output  = 450;

            expect(chart.getCentreForTitle(win, elementx)).toBe(output);
        });
    });
});