/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Decache;

(function (W) { //IIFE
    var name = 'Decache',
        self = new Global(name, '(load images from data-src after doc)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        auto: null, // add cache to these upon init
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _decache() {
        $('img.cache').each(function () {
            var me = $(this);
            me.attr({
                'src': me.data().src,
                'data-src': '',
            });
        });
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

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

load images after ready

*/
