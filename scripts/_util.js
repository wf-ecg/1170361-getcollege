/*jslint es5:true, white:false */
/*globals View, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 1170361-getcollege
var Util = (function (W, $) { // IIFE
    var name = 'Util',
        C, D, DE, self, easing;

    C = W.console;
    D = W.document;
    DE = D.documentElement;
    self = {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // CONSTANTS
    easing = {
        easeInBack: function (x, t, b, c, d, s) {
            s = s || 0.5;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
    };
    $.extend($.easing, easing);

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _flatcat(arr) {
        return arr.concat.apply([], arr);
    }

    function _reflect() {
        return arguments[0];
    }

    function _args() {
        return arguments;
    }

    function _echo() {
        C.log([name], arguments);
    }

    function _defined(x) {
        return !_undef(x);
    }

    function _dom() {
        var obj = _dom.Obj;
        //
        if (!obj) {
            obj = D.body; // default
            if (!$.browser.webkit) {
                obj = DE;
            }
            _dom.Obj = obj = $(obj);
        }
        return obj;
    }

    if (_undef(W.debug)) {
        W.debug = 1;
    }

    // reflect function takes number arg (def 1) (0 = *)
    // returns function that slices and returns args array
    // on num means gimme that arg number
    // two nums mean apply slice (the way splice numbers it)

    function _arg(n1, n2) {
        // n2 = _undef(n2) ? 99 : n2;
        if (_undef(n2)) {
            n2 = n1;
            n1 = 0;
        }
        return function () {
            var arr = Array.prototype.slice.apply(arguments);
            return arr.slice(n1, n2);
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _scroll(ele, add) {
        var nom, off, top;

        add = add || 0;
        if (typeof ele === 'number') {
            add = ele;
            ele = 'body';
        }
        ele = $(ele || 'body').first();
        nom = ((ele[0] && ele[0].id) || ele);

        if (ele.length) {
            top = ele.offset().top;
            off = Math.abs(_dom().scrollTop() - top);

            if (off - add > 25) {
                _debug(1) && C.debug(name, '_scroll start', nom, off + 'px', add);
                ele.addClass(':target');
                // W.location.hash = nom;
                off = (off > 1111 ? off / 5 : off / 2) + 250;

                _dom().stop().animate({
                    scrollTop: top + add,
                }, {
                    duration: off,
                    complete: function () { // 'easeInBack', 555
                        ele.removeClass(':target');
                        _debug(2) && C.debug(name, '_scroll done', nom, off + 'ms');
                    },
                    //step: function (now, fx) { var x = Math.abs(now - fx.end) | 0; C.warn(x, [fx]); }
                });
            }
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // JQUERY
    $.fn.exempt = function (bool) {
        var ret = $();
        if (!bool) {
            ret = $(this);
        }
        ret.prevObject = this;
        return ret;
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.extend(true, self, {
        arg: _arg,
        dom: _dom,
        flatten: _flatcat,
        isDef: _undef,
        I: _reflect,
        scroll: _scroll,
        mobile: View.mobile,
        viewport: View.port,
        undef: _undef,
        debug: _debug,
        tstrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
    });

    $.extend(true, W, {
        args: _args,
        echo: _echo,
        isDef: _defined,
    });

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
