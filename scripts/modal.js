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
        speed: null,
        closers: '.closeWidget, .modal',
        inits: function (x) {
            $.reify(El);
            Df.speed = x || 999;
            El.message.prependTo(El.div);
        },
    };

    El = {
        div: '#Modal',
        message: '<aside class="modal closeMessage"></aside>',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _show() {
        var blocks = El.div.children().not('aside');

        El.div.children().trigger('show.' + name);
        El.div.fadeIn(Df.speed);
        blocks.hide().valign();

        _.delay(function () {
            El.div.children().trigger('refresh'); // scroller?
        });
    }

    function _hide() {
        $.PS_pub($.nameSpace('close', name), self);
        El.div.trigger('hide.' + name);
        El.div.slideUp(Df.speed);
    }

    function bind() {
        El.div.on('click touchstart', function (evt) {
            evt.stopPropagation();
            if ($(evt.target).is(Df.closers)) {
                _hide();
            }
        });

        $.PS_sub('refresh', _hide);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(speed) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits(speed);
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
