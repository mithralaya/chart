/**
 * Created by karthikvasudevan on 05/10/15.
 */
/**
 * Created by karthikvasudevan on 07/09/15.
 */
//test begins
describe("Axis Data Points", function() {
    beforeAll(function() {
        element = document.getElementById("bubbleChart");
    });
    it("should return object for yaxis", function() {

        var chart = new KVBubbleChart(options, element);

        var output  = '{"diff":1130,"floor":8,"ceil":142,"points":[40,142,284,426,568,710,852,994,1136],"min":40}';

        expect(JSON.stringify(chart.axisData(options.yAxis, 600))).toBe(output);
    });
    it("should return object for xaxis which is date format", function() {

        var chart = new KVBubbleChart(options, element);

        var output  = '{"diff":31,"floor":17,"ceil":2,"points":[1984,1986,1988,1990,1992,1994,1996,1998,2000,2002,2004,2006,2008,2010,2012,2014,2016],"min":1984}';

        expect(JSON.stringify(chart.axisData(options.xAxis, 1300))).toBe(output);
    });
    it("should return object for xaxis which is date format", function() {

        options.data = {};
        var chart = new KVBubbleChart(options, element);

        var output  = '{}';

        expect(JSON.stringify(chart.axisData(options.xAxis, 1300))).toBe(output);
    });
});