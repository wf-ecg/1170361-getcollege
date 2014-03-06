/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W, $) {
    var O = $({});

    window.PS = O;

    $.PS_off = O.off.bind(O);
    $.PS_pub = O.trigger.bind(O);
    $.PS_sub = O.on.bind(O);

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    var _addClass = $.fn.addClass;
    var _removeClass = $.fn.removeClass;

    $.fn.addClass = function () {
        this.trigger('classadd', arguments[0]);
        return _addClass.apply(this, arguments);
    };

    $.fn.removeClass = function () {
        this.trigger('classremove', arguments[0]);
        return _removeClass.apply(this, arguments);
    };
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
