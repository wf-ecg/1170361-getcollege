/*jslint es5:true, white:false */
/*globals Global, Respond, Reveal, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Handlers = (function (W, $) { //IIFE
    var name = 'Handlers',
        self = new Global(name, '(event goodies)'),
        C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
    };

    var actionMap = {
        _quiz: function () {},
        _fellows: function () {},
        _steps: function () {},
        _credit: function () {},
        _car: function () {},
        _spending: function () {},
        _paying: function () {},
        _calc: function () {},
        _cover: function () {},
        _manage: function () {},
        _talk: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
