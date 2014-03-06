/*jslint es5:true, white:false */
/*globals $, Control, Global, Reveal, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Respond;

(function (W) { //IIFE
    var name = 'Respond',
        self = new Global(name, '(detect and insert verbiage)'),
        C = W.console,
        Df;

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
        Reveal.contract();
        Control.reset();

        if (str === 'desktop' || (!str && Df.current === 'mobile')) {
            _setSize('desktop')
            _recolumn(6)
        } else if (str === 'mobile' || (!str && Df.current === 'desktop')) {
            _setSize('mobile');
            _recolumn(3)
        }
    }

    function _detect() {
        var r = Modernizr.highres, // $('html').is('.retina'),
            d = Df.current,
            w = W.document.documentElement.clientWidth;
            // good god -- the only way to get width in IE?

        if ((w <= 600 && !r) || (w <= 1200 && r)) {
            d = 'mobile';
        } else if ((w > 600 && !r) || (w > 1200 && r)) {
            d = 'desktop';
        }

        if (d !== Df.current) {
            W.debug > 0 && C.debug(name + '_detect', '\n', d);

            if (W.isIE && d === 'mobile' && Df.current === 'desktop') {
                W.location.reload(); // refresh to respond to shrinking
            } else {
                _change(d);
            }
        }
        return Df.current;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _detect();

        return self;
    }

    W[name] = $.extend(true, self, {
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

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

Track current devide
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
