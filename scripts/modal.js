/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal;

(function (W, $) { //IIFE
    var name = 'Modal', self, C, Df, U;
    self = new Global(name, '(enable modal selections)');

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        all: '.modal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _binding() {
        Df.all.each(function () {
            var me = $(this)
            .on('show.Modal', _show) //
            .on('hide.Modal', _hide) //
            .on('click', function () {
                me.trigger('hide.Modal');
            });

            U.debug(1) && C.debug(name + '_binding', '\n', me);
        });
    }

    function _show() {
        var me = $(this),
            blocks = me.children().not('aside'),
            button = $('aside.icon').hide();

        me.fadeIn(Main.delay, function () {
            button.fadeIn(Main.delay) //
            .cornerOf(blocks.filter(':visible').first());
        });
        blocks.hide().valign();
    }

    function _hide() {
        var me = $(this);

        me.slideUp(Main.delay);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.all = $(Df.all);
        _binding();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        hide: function () {
            Df.all.trigger('hide.Modal');
        },
    });

}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
