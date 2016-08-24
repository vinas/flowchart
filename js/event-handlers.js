$(document).on('ready', function() {

    $('.chartItem')

        .on('mouseover', function(e) {
            $.chartItemMouseOver($(this));
            $.displayToolTip($('#tooltip'), e.pageX, e.pageY);
        })

        .on('mouseout', function() {
            $.chartItemMouseOut($(this));
            $.hideToolTip($('#tooltip'));
        })

        .on('click', function() {
            chartItem = $(this);
            if ($.isThisClickable(chartItem)) {
                $.addPercentToBar(chartItem, 10);
                $.handleChartItemClass(chartItem);
            }
        });

});
