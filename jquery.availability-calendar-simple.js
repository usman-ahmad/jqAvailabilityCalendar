(function ($) {

    function availabilityCalendar(el, params) {

        var now = new Date();
        var settings = $.extend({
            month:now.getMonth(),
            year:(now.getYear() + 1900)
        }, params);

        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = parseInt(settings.month), year = parseInt(settings.year);

        var i = 0, j = 0;
        var prev_m = month == 0 ? 11 : month - 1;
        var prev_y = month == 0 ? year - 1 : year;
        var next_m = month == 11 ? 0 : month + 1;
        var next_y = month == 11 ? year + 1 : year;
        var prev_days = getDaysInMonth(prev_m, prev_y);
        var firstDayDate = new Date(year, month, 1);
        var firstDay = firstDayDate.getDay();
        firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

        var m3header = $('<div class="availability-calendar-header"></div>')
            .append($('<span class="availability-calendar-prev" title="Previous Month">prev</span>').click(function () {
            availabilityCalendar(el, {month:prev_m, year:prev_y});
        }))
            .append($('<span class="availability-calendar-next" title="Next Month">next</span>').click(function () {
            availabilityCalendar(el, {month:next_m, year:next_y});
        }))
            .append($('<span class="availability-calendar-title"><span class="availability-calendar-month">' + monthNames[month] + '' +
            '</span><span class="availability-calendar-year">' + year + '</span></span>'));

        var m3table = '<table cellspacing="0" cellpadding="0">';
        m3table += '<thead><tr>';
        for (i = 0; i < 7; i++) {
            m3table += '<th class="weekday">' + dayNames[i] + '</th>';
        }
        m3table += '</tr></thead>';
        m3table += ('<tbody><tr>');
        for (i = 0; i < 42; i++) {
            if (i < firstDay) {
                j = (prev_days - firstDay + i + 1);
                m3table += ('<td class="other-month"><span class="day">' + j + '</span></td>');
            } else if (i >= firstDay + getDaysInMonth(month, year)) {
                j = (i - firstDay - getDaysInMonth(month, year) + 1);
                m3table += ('<td class="other-month"><span class="day">' + j + '</span></td>');
            } else {
                j = (i - firstDay + 1);
                m3table += ('<td class="current-month day' + j + '">');
                m3table += ('<span class="day">' + j + '</span></td>');
            }
            if ((i % 7 == 6) && (i < 40))
                m3table += ('</tr><tr>');
        }
        m3table += ('</tr></tbody>');
        el.html($('<div class="availability-calendar-div">').html(m3table).prepend(m3header));
    }

    function getDaysInMonth(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
            return 29;
        } else {
            return daysInMonth[month];
        }
    }


    // jQuery plugin initialisation
    $.fn.availabilityCalendar = function (params) {
        availabilityCalendar(this, params);
        return this;
    };

})(jQuery);
