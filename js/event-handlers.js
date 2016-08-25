$(document).on('ready', function() {

    $(window).resize(function() {
        $.scalePaper();
    });

    $('.chartItem')

        .on('mouseover', function(e) {
            $.displayInfoAndStyle($(this));
            $.displayToolTip($('#tooltip'), e.pageX, e.pageY);
        })

        .on('mouseout', function() {
            $.hideInfoAndStyle($(this));
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
