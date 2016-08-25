var graph, paper;
var procs = [];
var links = [];
var boxStyle;
var procsInput = [];
var linksInput = [];

$(document).on('ready', function() {

    // *** MOCK ***
    procsInput[0] = ['Process 1', 1, 1, 1];
    procsInput[1] = ['Process 2', 1, 2, 1];
    procsInput[2] = ['Process 3', 1, 3, 1];
    procsInput[3] = ['Process 4', 2, 1, 3];
    procsInput[4] = ['Process 5', 3, 1, 1];

    linksInput[0] = [0, 3];
    linksInput[1] = [1, 3];
    linksInput[2] = [2, 3];
    linksInput[3] = [3, 4];
    // *** FIM DO MOCK ***

    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: $(window).width(),
        height: $(window).height(),
        model: graph,
        gridSize: 1,
        interactive: false
    });

    $.startFlowChart = function()
    {
        var chartElements = [];
        for (i = 0; i < procs.length; i++) {
            chartElements.push(procs[i]);
        }
        for (i = 0; i < links.length; i++) {
            chartElements.push(links[i]);
        }
        graph.addCells(chartElements);
    };

    $.setAllProcessBoxes = function()
    {
        boxStyle = $.calcBasicBoxValues();
        for (i = 0; i < procsInput.length; i++) {
            procs[i] = $.setProcessBox(
                    procsInput[i][0],
                    procsInput[i][1],
                    procsInput[i][2],
                    procsInput[i][3]
                );
        }
    };

    $.setAllLinks = function()
    {
        for (i = 0; i < linksInput.length; i++) {
            links[i] = $.setLink(linksInput[i][0], linksInput[i][1])
        }
    };

    $.setProcessBox = function(label, col, row, size)
    {
        var boxPosition = $.calcProcessBoxPosition(col, row, size);
        return new joint.shapes.html.Element({
            position: {
                x: boxPosition.left,
                y: boxPosition.top
            },
            size: {
                width: boxStyle.width,
                height: $.calcProcessBoxHeight(size)
            },
            label: label
        });
    };

    $.setLink = function(sourceId, targetId)
    {
        var source = procs[sourceId].attributes;
        var target = procs[targetId].attributes;
        var positions = $.setLinksPositions(
            source.position,
            source.size,
            target.position,
            target.size
        );
        return new joint.dia.Link({
            source: { x: positions.sourceX, y: positions.sourceY },
            target: { x: positions.targetX, y: positions.targetY },
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
        return {
            sourceX: srcX,
            sourceY: srcY,
            targetX: targetX,
            targetY: targetY
        };
    };

    $.calcProcessBoxPosition = function(col, row)
    {
        return {
            left: (boxStyle.width + boxStyle.rightMargin) * (col - 1) + boxStyle.bottomMargin,
            top: (boxStyle.height + boxStyle.bottomMargin) * (row - 1) + boxStyle.bottomMargin
        };
    };

    $.calcProcessBoxHeight = function(size)
    {
        return boxStyle.height * size + boxStyle.bottomMargin * (size - 1);
    };

    $.calcBasicBoxValues = function()
    {
        var totalWidth = $(window).width();
        var totalHeight = $(window).height();
        return {
            width: Math.round(totalWidth * .2),
            height: Math.round(totalHeight * .2),
            bottomMargin: Math.round(totalHeight * .1),
            rightMargin: Math.round(totalWidth * .1),
        };
    };

});
