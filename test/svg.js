/**
 * Created by karthikvasudevan on 07/09/15.
 */

var svg = require('../KVCharts/KVSVG');
var svgClass = new svg();

//test begins
describe("SVG", function() {

    describe("SVG tag", function(){
        beforeAll(function() {
            font = "Arial";
        });
        it("undefined content should return empty string", function() {

            var output  = '';

            expect(svgClass.drawSVG(font)).toBe(output);
        });

        it("null content should return empty string", function() {

            var output  = '';

            expect(svgClass.drawSVG(font, null)).toBe(output);
        });
        it("string should return the svg element", function() {

            var content = "test";
            var output  = '<svg version="1.1" style="font-family: '+font+'; font-size: 12px; font-weight: 300;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">' + content + '</svg>';

            expect(svgClass.drawSVG(font, content)).toBe(output);
        });


    });

    describe("Text tag", function(){
        beforeAll(function() {
            classx = "test";
            colour = "#ffffff";
            fontSize = 19;
            text = "Awesome";
        });
        it("x & y null should plot at 0, 0", function() {

            var output  = '<text class="'+classx+'" style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+text+' </text>';

            expect(svgClass.drawText(classx, null, null, colour, fontSize, text)).toBe(output);
        });

        it("should be empty string if text is null", function() {

            var output  = '';

            expect(svgClass.drawText(classx, null, null, colour, fontSize, null)).toBe(output);
        });
        it("should be empty string if text is not string", function() {

            var output  = '';

            expect(svgClass.drawText(classx, null, null, colour, fontSize, NaN)).toBe(output);
        });

        it("should return the text element and x & y as integer positions if we pass float value", function() {
            var x = 50.55;
            var y = 50.55;
            var output  = '<text class="'+classx+'" x="50" y="50" style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+text+' </text>';

            expect(svgClass.drawText(classx, x, y, colour, fontSize, text)).toBe(output);
        });


    });
});