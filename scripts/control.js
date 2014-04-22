/*jslint es5:true, white:false */
/*globals Global, Main, Reveal, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Control = (function (W, $) { //IIFE
    var name = 'Control',
        self = new Global(name, '(control operations)'),
        C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        cnom: {
            active: 'tilted',
            normal: 'tilt',
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset(not) {
        $('.control').not(not) //
        .removeClass(Df.cnom.active) //
        .addClass(Df.cnom.normal) //
        .attr('title', 'Reveal');

        if (not) {
            not.addClass(Df.cnom.active) //
            .removeClass(Df.cnom.normal) //
            .attr('title', 'Close');
        }
    }

    function _soonScrollTo(ele) {
        ele = $(ele).get(0);
        U.debug(0) && C.debug(name, '_soonScrollTo', ele);
        // delay scroll
        W.setTimeout(function () {
            Main.scroll(ele);
        }, Main.delay * 2);
    }

    function _getSect(ctrl) { // who am i (TODO fragile...popping class)
        var str = ctrl.closest('article').attr('class');
        return str ? str.split(' ').pop() : 'x';
    }

    function _isActive(ele) {
        return $(ele).is('.' + Df.cnom.active);
    }

    function _tilter(ctrl) {
        var sect = _getSect(ctrl),
            reveal = '(closed)';

        if (_isActive(ctrl)) {
            Main.scroll('#Top'); // scroll to top
            _reset();
        } else {
            _soonScrollTo(ctrl); // scroll to tile
            _reset(ctrl);
        }
        U.debug(0) && C.debug(name, '_tilter', sect, ctrl.get(0));
    }

    function _binding() {
        $('.control').each(function () {
            var ctrl = $(this);

            ctrl.on('click', function () {
                _tilter(ctrl);
            });

            _reset();
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _binding();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        reset: _reset,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
