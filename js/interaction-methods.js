$(document).on('ready', function() {

    $.addPercentToBar = function(obj, value)
    {
        if (obj.hasClass('running')) {
            barWidth = parseInt(obj.find('#bar').css('width').replace(new RegExp("px", 'g'), ""));
            progressWidth = parseInt(obj.find('.progress').css('width').replace(new RegExp("px", 'g'), ""));
            newBarWidth = barWidth + progressWidth * (value / 100);
            if (newBarWidth < progressWidth) {
                obj.find('#bar').css('width', newBarWidth);
            } else {
                obj.find('#bar').css('width', progressWidth);
                $.setProcessAsFinished(obj);
            }
            
        }
    };

    $.handleChartItemClass = function(obj)
    {
        if (obj.hasClass('notRunning')) {
            obj.removeClass('notRunning');
            obj.addClass('running');
        }
    };

    $.displayMouseoverMsg = function(obj, left, top)
    {
        obj.css('left', left + 15);
        obj.css('top', top + 15);
        obj.show();
    };

    $.hideMouseoverMsg = function(obj)
    {
        obj.hide();
    };

    $.setProcessAsFinished = function(obj)
    {
        obj.removeClass('running');
        obj.removeClass('notRunning');
        obj.addClass('runned');
    };

    $.isThisClickable = function(obj)
    {
        if (obj.hasClass('runned')) {
            return false;
        }
        return true;
    };

});
