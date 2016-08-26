var boxStyle, graph, paper;
var procs = [];
var links = [];
var procsInput = [];
var linksInput = [];

$(document).on('ready', function() {

	$.getChartInputData = function()
	{
		procsInput = $.getProcessesInput();
		linksInput = $.getLinksInput();
	};

	/* Get input for process boxes
	 *
	 * @return array = [ [process label, column, row, height*] ]
     * *height: basic unit is 1. 2 means it has the height of two proces boxes.
     */
	$.getProcessesInput = function()
	{
	    // *** MOCK ***
	    return [
	    	['Process 1', 1, 1, 1],
	    	['Process 2', 1, 2, 1],
	    	['Process 3', 1, 3, 1],
	    	['Process 4', 2, 1, 3],
	    	['Process 5', 3, 1, 1]
	    ];

	};

    /* Get input for links between process boxes
     *
     * @return array = [
     *		[
     *			processInput array's index as source,
     *			processInput array's index as target
     *		]
     *	]
     */
	$.getLinksInput = function()
	{
	    // *** MOCK ***
	    return [
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 4]
	    ];
	};

	// *** Star up flowchart ***
    $.getChartInputData();
    $.setAllProcessBoxes();
    $.setAllLinks();
    $.startFlowChart();

});
