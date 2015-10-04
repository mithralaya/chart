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
    });
});