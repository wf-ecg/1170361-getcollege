/*jslint es5:true, white:false */
/*globals $, Global, Main, Respond, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Reveal;

(function (W, $) { //IIFE
    var name = 'Reveal', self, C, Df, U;
    self = new Global(name, '(expand or contract)');

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        open: '',
        sect: '',
        tile: '',
        revealpx: 257,
        reveals: '.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reexpand(jq) {
        var mobile = Respond.mobile();

        if (Df.finish) {
            Df.finish(jq); /// from Translate/retile
        } else {
            return true;
        }

        jq.closest('tr').show().end() //
        .animate({
            height: Df.revealpx * (mobile ? 1.5 : 1),
        }, Main.delay, function () {
            Df.open = jq;
        }).children() //
        .not(mobile ? '.desktop' : 'foo').fadeIn(Main.delay * 2);
    }

    function _expand(jq) {
        jq = $(jq);

        if (jq.length) {
            // remove sects and add sect
            jq.removeClass(Main.sectStr()).addClass(Df.sect);
            _reexpand(jq);
        }
    }

    function _closed() {
        Df.open = '';

        if (Df.tile) { //
            _expand(Df.tile);
        }
    }

    function _toggle(tile, sect, cb) {
        Df.tile = tile || Df.tile;

        if (!tile && !Df.open) {
            return; // nothing to do!
        }
        Df.sect = sect;
        Df.finish = cb;

        U.debug(1) && C.debug(name + '_toggle', '\n', Df);
        if (Df.open) {
            Df.open.children().fadeOut().end() //
            .animate({
                height: '1px',
            }, (Main.delay * 2), function () {
                $(this).closest('tr').hide();
                _closed();
            });
        } else {
            _closed(); // ALREADY
        }
    }

    function _contractAll() {
        var all = $(Df.reveals);
        U.debug(0) && C.debug(name + '_contract', '\n', [all.children()]);

        all.css({
            height: '1px',
        }).children().fadeTo(0.1).end() //
        .closest('tr').hide();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        _contractAll();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        expand: _toggle,
        contract: function (cb) {
            _toggle();
            cb && !Df.sect && cb();
        },
    });

}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
Reveal
    store props
        -amount
    track state
        -revealpx
    expose meths
        +expand

*/
