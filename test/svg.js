/**
 * Created by karthikvasudevan on 07/09/15.
 */
var svgClass            = new KVSVG();

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

            var output  = '<text class="'+classx+'"    style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+text+' </text>';

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
            var output  = '<text class="'+classx+'" x = "50" y = "50"  style="fill: '+colour+'; font-size: '+fontSize+'px;"> '+text+' </text>';

            expect(svgClass.drawText(classx, x, y, colour, fontSize, text)).toBe(output);
        });


    });

    describe("Group tag", function(){
        beforeAll(function() {
            classx = "test",
            tx=10, ty=10;
        });
        it("should return empty string", function() {

            var content;
            var output  = '';

            expect(svgClass.drawGroup(classx, tx, ty, content)).toBe(output);
        });
        it("should return empty string", function() {

            var content = null;
            var output  = '';

            expect(svgClass.drawGroup(classx, tx, ty, content)).toBe(output);
        });
        it("should return empty string", function() {

            var content = "";
            var output  = '';

            expect(svgClass.drawGroup(classx, tx, ty, content)).toBe(output);
        });
        it("should return the group svg element", function() {

            var content = "test";
            var output  = '<g class="'+classx+'" transform="translate('+tx+' '+ty+')">'+ content +'</g>';

            expect(svgClass.drawGroup(classx, tx, ty, content)).toBe(output);
        });

    });

    describe("Line tag", function(){
        beforeAll(function() {
            classx = "test", lineColour = "#ff0000", strokeWidth=2,
                x1=10, x2=10, y1=10, y2=10;
        });
        it("should return empty string", function() {

            var output  = '';

            expect(svgClass.drawLine(classx, 0, 0, 0, 0, lineColour, strokeWidth)).toBe(output);
        });

        it("should return the group svg element", function() {

            var output  = '<line  class="'+classx+'"  x1 = "'+x1+'"  y1 = "'+y1+'" x2 = "'+x2+'" y2 = "'+y2+'" style="stroke:'+lineColour+';stroke-width:'+strokeWidth+'"></line>';

            expect(svgClass.drawLine(classx, x1, y1, x2, y2, lineColour, strokeWidth)).toBe(output);
        });

    });
});