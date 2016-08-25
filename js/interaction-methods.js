$(document).on('ready', function() {

    var lastLabel;

    $.addPercentToBar = function(chartItem, value)
    {
        if (chartItem.hasClass('running')) {
            barInfo = $.getProgressBarInfo(chartItem);
            newProgress = barInfo.progress + barInfo.bar * (value / 100);
            if (newProgress >= barInfo.bar) {
                newProgress = barInfo.bar;
                $.setProcessAsFinished(chartItem);
            }
            chartItem.find('.progress').css('width', newProgress);
        }
        $.refreshChartItemLabel(chartItem);
    };

    $.handleChartItemClass = function(chartItem)
    {
        if (chartItem.hasClass('notRunning')) {
            chartItem.removeClass('notRunning');
            chartItem.addClass('running');
        }
    };

    $.displayToolTip = function(chartItem, left, top)
    {
        window.t = setTimeout(function () {
                chartItem.css('left', left + 15);
                chartItem.css('top', top + 15);
                chartItem.show();
            }, 1000);
    };

    $.hideToolTip = function(chartItem)
    {
        clearTimeout(window.t);
        chartItem.hide();
    };

    $.setProcessAsFinished = function(chartItem)
    {
        chartItem.removeClass('running');
        chartItem.removeClass('notRunning');
        chartItem.addClass('runned');
    };

    $.isThisClickable = function(chartItem)
    {
        if (chartItem.hasClass('runned')) {
            return false;
        }
        return true;
    };

    $.displayInfoAndStyle = function(chartItem)
    {
        var label;
        lastLabel = chartItem.find('label').html();
        chartItem.find('.bar').css('visibility', 'hidden');
        label = $.defineMouseOverLabel(chartItem);
        chartItem.find('label').html(label);
    };

    $.hideInfoAndStyle = function(chartItem)
    {
        chartItem.find('label').html(lastLabel);
        chartItem.find('.bar').css('visibility', '');
    };

    $.calcPorcentConcluded = function(chartItem)
    {
        barInfo = $.getProgressBarInfo(chartItem);
        if (barInfo.progress == 0) {
            return 0;
        }
        return Math.round(100 * (barInfo.progress / barInfo.bar));
    };

    $.getProgressBarInfo = function(chartItem)
    {
        return {
            bar: parseInt(chartItem.find('.bar').css('width').replace(new RegExp("px", 'g'), "")),
            progress: parseInt(chartItem.find('.progress').css('width').replace(new RegExp("px", 'g'), ""))
        };
    };

    $.refreshChartItemLabel = function(chartItem)
    {
        chartItem.find('label').html(
            lastLabel + '<br/><br/> Concluded: ' + $.calcPorcentConcluded(chartItem) + '%'
        );
    };

    $.defineMouseOverLabel = function(chartItem)
    {
        if (chartItem.hasClass('notRunning')) {
            return lastLabel + '<br/><br/> Not started';
        }
        return lastLabel + '<br/><br/> Concluded: ' + $.calcPorcentConcluded(chartItem) + '%';
    };

    $.scalePaper = function()
    {
        paper.setDimensions($('#myholder').width());
        paper.scaleContentToFit();
    };

});
