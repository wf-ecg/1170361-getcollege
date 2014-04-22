/*jslint es5:true, white:false */
/*globals Global, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Decache = (function (W, $) { //IIFE
    'use strict';
    var name = 'Decache',
        self = new Global(name, '(load images from data-src after doc)'),
        C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        auto: null,
    };
    // TODO: add cache to these upon init
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _decache() {
        $('img.cache').each(function () {
            var me = $(this);
            me.attr({
                'src': me.data().src,
                'data-src': '',
            });
        }).show();
    }

    function _auto(jq) {
        jq.find('img').addClass('cache');
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(sel) {
        if (self.inited(true)) {
            return null;
        }
        if (sel) {
            _auto($(sel || Df.auto));
        }
        _decache();
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

load images after ready

*/
