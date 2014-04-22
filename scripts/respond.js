/*jslint es5:true, white:false */
/*globals Global, Modernizr, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Respond = (function (W, $) { //IIFE
    'use strict';
    var name = 'Respond',
        self = new Global(name, '(detect and insert verbiage)'),
        C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        current: '',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _recolumn(num) {
        $('.filler, .reveal').attr({
            colspan: num,
        });
    }

    function _setSize(str) {
        Df.current = str;
        $('body').removeClass('desktop mobile').addClass(str);
    }

    function _change(str) {
        $.PS_pub('change');

        if (str === 'desktop' || (!str && Df.current === 'mobile')) {
            _setSize('desktop');
            _recolumn(6);
        } else if (str === 'mobile' || (!str && Df.current === 'desktop')) {
            _setSize('mobile');
            _recolumn(3);
        }
    }

    function _detect() {
        var r = Modernizr.highres,
            d = Df.current,
            w = W.document.documentElement.clientWidth;
        // $('html').is('.retina'),

        // good god -- the only way to get width in IE?
        if ((w <= 600 && !r) || (w <= 1200 && r)) {
            d = 'mobile';
        } else if ((w > 600 && !r) || (w > 1200 && r)) {
            d = 'desktop';
        }

        if (d !== Df.current) {
            if (U.debug(1)){
                C.debug(name, '_detect', d);
            }
            if (W.isIE && d === 'mobile' && Df.current === 'desktop') {
                W.location.reload(); // refresh to respond to shrinking
            } else {
                _change(d);
            }
        }
        return Df.current;
    }

    function bind() {
        _detect();
        $.PS_sub('change', _change);
        $.PS_sub('refresh', _detect);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        bind();
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        change: _change,
        check: _detect,
        mobile: function () {
            return (Df.current === 'mobile');
        },
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

Track current device
    - current
    + fill(ele, clas)
            uses current lang (seeks class of ele)
    + set (lang)
    + toggle button (on copyright)
    + findAll()
        - what is eligible
        - get all classes/data
        - make data entries with true
        - remove certain classes (desktop)

    don`t expect classes to stay orderly!

 */
