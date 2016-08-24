var proc1, proc2, proc3, proc4, proc5, link1, link2, link3, link4, graph, paper;

$(document).on('ready', function() {

    var basicPadding = 30, boxWidth = 150, boxHeight = 80, basicColumnPadding = 100;
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: '100%',
        height: '100%',
        model: graph,
        gridSize: 1,
        interactive: false
    });

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
        proc5 = $.setProcessBox('Process 5', '#CCC',  3, 1, 1);
    };

    $.setAllLinks = function()
    {
        link1 = $.setLink(proc1, proc4);
        link2 = $.setLink(proc2, proc4);
        link3 = $.setLink(proc3, proc4);
        link4 = $.setLink(proc4, proc5);
    };

    $.setProcessBox = function(label, color, col, row, size)
    {
        var boxPosition = $.calcProcessBoxPosition(col, row, size);
        height = boxHeight * size + basicPadding * (size - 1);
        return new joint.shapes.html.Element({
            position: {
                x: boxPosition.left,
                y: boxPosition.top
            },
            size: {
                width: boxWidth,
                height: height
            },
            label: label
        });
    };

    $.setLink = function(source, target)
    {
        positions = $.setLinksPositions(
            source.attributes.position,
            source.attributes.size,
            target.attributes.position,
            target.attributes.size
        );
        return new joint.dia.Link({
            source: { x: positions[0], y: positions[1] },
            target: { x: positions[2], y: positions[3] },
            interactive: false,
            attrs: {
                '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
            }
        });
    };

    $.setLinksPositions = function(srcPos, srcSize, targetPos, targetSize)
    {
        srcX = srcPos.x + srcSize.width;
        srcY = srcPos.y + (srcSize.height / 2);
        targetX = targetPos.x;
        targetY = srcY;
        if (targetY > (targetPos.y + targetSize.height)) {
            targetY = targetPos.y + (targetSize.height / 2);
            srcY = targetY;
        }
        return [srcX, srcY, targetX, targetY];
    };

    $.calcProcessBoxPosition = function(col, row)
    {
        var position = {};
        position.left = (boxWidth + basicColumnPadding) * (col - 1) + basicPadding;
        position.top = (boxHeight + basicPadding) * (row - 1) + basicPadding;
        return position;
    };

});
