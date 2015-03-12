/*jslint white:false */
/*globals jQuery, */
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
            pos = box.children(':visible').first().offset(),
            top;

        if (!pos) {
            return;
        }
        top = (parseInt(box.css('margin-top')) - me.height() / 2)|0;
        top = (top > 50) ? top : 50;
        C.error(top);
        pos = {
            left: (pos.left - me.width() / 2)|0,
            position: 'absolute',
            // uses the top margin as set by valign
            marginTop: top,
            top: top,
        };

        me.css(pos);
    };

    $.fn.scrollTo = function (speed) {
        var $me = $(this);
        // look before leap
        if ($me.length) {
            // Please use 'documentElement.scrollTop' if in strict mode
            // and 'body.scrollTop' only if in quirks mode.
            $(W.isIE ? 'html' : 'body').stop().animate({ // $(W.isIE ? 'html' : 'body')
                scrollTop: $me.offset().top,
            }, 333 * (speed || 1));
        }
    };
}(jQuery));
