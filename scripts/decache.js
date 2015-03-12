/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Decache:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Decache = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Decache',
        self = new G.constructor(name, '(load images from data-src after doc)'),
        Df;

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
        if (self.isInited(true)) {
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
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

load images after ready

*/
