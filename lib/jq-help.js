/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($) {
    // VERTICALLY ALIGN FN
    $.fn.valign = function () {
        return this.each(function (i, e) {
            var me = $(this),
                px = (me.parent().height() - me.height()) / 3;

            me.css('margin-top', px|0);
        });
    };

    // ROLL-UP ANI
    $.extend($.easing, {
        pullShade: function (x, t, b, c, d, s) {
            s = s || 0.5;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
    });

    // CALC CLOSE BUTTON
    $.fn.cornerOf = function (ele) {
        var me = $(this),
            box = $(ele),
            pos = box.children(':visible').first().offset();
        if (!pos) {
            return;
        }
        pos = {
            left: (pos.left - me.width() / 2)|0,
            position: 'absolute',
            // uses the top margin as set by valign
            top: (parseInt(box.css('margin-top')) - me.height() / 2)|0,
        };

        me.css(pos);
    };
}(jQuery));
