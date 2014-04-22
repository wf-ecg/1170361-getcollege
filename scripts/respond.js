/*jslint es5:true, white:false */
/*globals Global, Modernizr, Util, jQuery, jsView, window */
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

    function swaps() {
        var p, f, l;
        p = $('section article._fellows').parent()
        f = p.children().first();
        l = p.children().last();
        p.prepend(l).append(f);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _recolumn(num) {
        $('.filler, .reveal').attr({
            colspan: num,
        });
    }

    function _setSize(str) {
        Df.current = str;
        $('html').removeClass('desktop mobile').addClass(str);
    }

    function _isMobile() {
        return (Df.current === 'mobile');
    }

    function _toggle() {
        if (_isMobile()) {
            _change('desktop');
        } else {
            _change('mobile');
        }
    }

    function _change(str) {
        if (Df.current === str) {
            str = '';
        }
        if (str === 'desktop') {
            _setSize('desktop');
            _recolumn(6);
            swaps();
        } else if (str === 'mobile') {
            _setSize('mobile');
            _recolumn(3);
        }
        $.PS_pub('refresh.iScroll');
    }

    function _detect() {
        var r = Modernizr.highres,
            d = Df.current,
            w = W.document.documentElement.clientWidth;
        // $('html').is('.retina'),

        // good god -- the only way to get width in IE?
        if ((w <= 640 && !r) || (w <= 1200 && r)) {
            d = 'mobile';
        } else if ((w > 640 && !r) || (w > 1200 && r)) {
            d = 'desktop';
        }

        var mob = jsView.mobile.agent();

        if (mob && mob.match('iPad')) {
            d = 'desktop';
            $('html').addClass('ipad');
        }

        if (U.debug(1)){
            C.debug(name, '_detect', d);
        }
        if (d !== Df.current) {
            if (Df.current === 'desktop' || Df.current === 'mobile') {
                W.location.reload();
            } else {
                _change(d); // initial run ... no current set
            }
        }
        return Df.current;
    }

    function bind() {
        $.PS_sub('change', _change);
        $.PS_sub('refresh', _detect);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _detect();
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
        mobile: _isMobile,
        toggle: _toggle,
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
