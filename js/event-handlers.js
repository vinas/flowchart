$(document).on('ready', function() {

    $('.chartItem').on('mouseover', function(e) {
        $.displayMouseoverMsg($('#hint'), e.pageX, e.pageY)
    })

    .on('mouseout', function() {
        $.hideMouseoverMsg($('#hint'))
    })

    .on('click', function() {
        obj = $(this);
        if ($.isThisClickable(obj)) {
            $.addPercentToBar(obj, 10);
            $.handleChartItemClass(obj);
        }
    });

});
