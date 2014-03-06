/*jslint es5:true, white:false */
/*globals $, Global, Reveal, Translate, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Control;

(function (W, $) { //IIFE
    var name = 'Control', self, C, Df, U;
    self = new Global(name, '(load images after doc)');

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

    function _reset(jq, not) {
        $('.control').not(not).removeClass(Df.cnom.active) //
        .addClass(Df.cnom.normal) //
        .attr('title', 'Reveal');

        if (jq) {
            jq.addClass(Df.cnom.active) //
            .removeClass(Df.cnom.normal) //
            .attr('title', 'Close');
        }
    }

    function _soon(ele) {
        ele = $(ele).get(0);
        W.debug > 0 && C.debug(name + '_soon', '\n', ele);
        // delay scroll
        W.setTimeout(function () {
            Main.scroll(ele);
        }, Main.delay * 2);
    }

    function _getSect(ctrl) { // who am i (TODO fragile...popping class)
        return ctrl.closest('td').attr('class').split(' ').pop();
    }

    function _getLevel(ctrl) { // who am i (TODO fragile...popping class)
        return ctrl.closest('tr').attr('class').split(' ').pop();
    }

    function _getReveal(level) { // who am i
        return $('.reveal.' + level);
    }

    function _isActive(ele) {
        return $(ele).is('.'+ Df.cnom.active);
    }

    function _tilter(ctrl) {
        var sect = _getSect(ctrl),
            reveal = '(closed)';

        if (_isActive(ctrl)) {
            Reveal.contract(_reset); // open nothing
            Main.scroll('#Top'); // scroll to top
            _reset('', ctrl);
        } else {
            reveal = _getReveal(_getLevel(ctrl)); // td

            W.Translate && W.Translate.update(reveal, sect);
            _soon(ctrl); // scroll to tile
            _reset(ctrl);
        }
        W.debug > 0 && C.debug(name + '_tilter', '\n', sect, [ctrl, reveal]);
    }

    function _binding() {
        $('.control').each(function () {
            var ctrl = $(this);

            ctrl.parent().on('click', function () {
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
        soon: _soon,
    });

}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
