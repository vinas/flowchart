$(document).on('ready', function() {

    // Var declarations
    var proc1, proc2, proc3, proc4, proc5, link1, link2, link3, link4;
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: '100%',
        height: '100%',
        model: graph,
        gridSize: 1,
        interactive: false
    });

    // Set Up Methods
    $.startFlowChart = function()
    {
        graph.addCells([proc1, proc2, proc3, proc4, proc5, link1, link2, link3, link4]);

    };

    $.setAllProcessBoxes = function()
    {
        proc1 = $.setProcessBox('Process 1', 'blue', 1, 1, 1);
        proc2 = $.setProcessBox('Process 2', '#CCC',  1, 2, 1);
        proc3 = $.setProcessBox('Process 3', '#CCC',  1, 3, 1);
        proc4 = $.setProcessBox('Process 4', '#CCC',  2, 1, 3);
        proc5 = $.setProcessBox('Process 5', '#CCC',  3, 2, 1);
    };

    $.setAllLinks = function()
    {
        link1 = $.setLink(proc1, proc4);
        link2 = $.setLink(proc2, proc4);
        link3 = $.setLink(proc3, proc4);
        link4 = $.setLink(proc4, proc5);
    };

    $.setProcessBox = function(label, color, row, order, size)
    {
        leftPos = 250 * (row - 1) + 50;
        topPos = 110 * (order - 1) + 50;
        height = 80 * size + 30 * (size - 1);
        return new joint.shapes.basic.Rect({
            position: { x: leftPos, y: topPos },
            size: { width: 150, height: height },
            attrs: { rect: { fill: color }, text: { text: label, fill: 'white' } }
        });
    };

    $.setLink = function(source, target)
    {
        return new joint.dia.Link({
            source: { id: source.id },
            target: { id: target.id },
            connector: { name: 'rounded' },
            attrs: {
                '.marker-target': {
                    fill: '#333333',
                    d: 'M 10 0 L 0 5 L 10 10 z'
                }
            }
        });
    };

    // star up calls
    $.setAllProcessBoxes();
    $.setAllLinks();
    $.startFlowChart();

});
