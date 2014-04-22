/*jslint es5:true, white:false */
/*globals Global, Main, Util, jQuery, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function (W, $) { //IIFE
    'use strict';
    var name = 'Modal',
        self = new Global(name, '(enable modal selections)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        delay: null,
        closers: '.closeWidget',
        inits: function (x) {
            Df.delay = x || 999;
            El.div = $(El.div);
            El.message = $(El.message).prependTo(El.div);

            El.div.attr('title', 'Double-click to close');
        },
    };

    El = {
        div: '#Modal',
        message: '<aside class="modal message"></aside>',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    var valign = _.once(function () {
        El.div.children().not('aside').hide().valign();
    });

    function _show() {
        El.div.children().trigger('show.' + name);
        El.div.fadeIn(Main.delay);
        valign();
        El.div.trigger('refresh'); // scroller?
    }

    function _hide() {
        El.div.trigger('hide.' + name);
        El.div.slideUp(Main.delay);
    }

    function bind() {
        El.div //
        .on('click', Df.closers, function () {
            _hide();
        }).on('dblclick', function (evt) {
            if ($(evt.target).is('.modal')) {
                _hide();
            }
        });

        $.PS_sub('refresh', _hide);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(delay) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits(delay);
        bind();

        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        hide: _hide,
        show: _show,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
