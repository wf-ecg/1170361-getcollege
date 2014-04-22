/*jslint es5:true, white:false */
/*globals Global, Main, Respond, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Reveal = (function (W, $) { //IIFE
    var name = 'Reveal',
    self = new Global(name, '(expand or contract)'),
    C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        open: '',
        sect: '',
        revealpx: 257,
        reveals: 'section.reveal',
        inits: function () {
            Df.reveals = $(Df.reveals);
            Df.inited = true;
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function _contractAll(not) {
        return Df.reveals.trigger('contract');
    }

    function _attachTo(sele) {
        var jq, data, handler, mobile;

        jq = $(sele).closest('section');
        mobile = Respond.mobile();

        data = jq.data();
        if (!data) {
            U.debug(2) && C.error('no data');
            return;
        }
        data = data[name] = {
            status: true,
        };

        U.debug(1) && C.debug(name, '_attachTo', sele, jq);
        handler = {
            expand: function () {
                _contractAll();

                if (!data.status) {
                    jq.show().stop().animate({
                        height: Df.revealpx * (mobile ? 1.5 : 1),
                    }, Main.delay, function () {
                        Df.open = jq;
                        data.status = true;
                    }) //
                    .children() //
                    .not(mobile ? '.desktop' : 'foo') //
                    .fadeIn(Main.delay * 2);
                }
                U.debug(2) && C.debug(name, 'handler.expand', '\n', Df);
                return this;
            },
            contract: function () {
                if (data.status) {
                    jq.children().fadeOut().end().animate({
                        height: '1px',
                    }, (Main.delay * 2), function () {
                        jq.hide();
                        data.status = false;
                    });
                }
                return this;
            },
            status: function () {
                C.warn(data.status);
                return data.status;
            },
        };

        jq.hide() //
        .on('expand.' + name, handler.expand) //
        .on('contract.' + name, handler.contract) //
        .on('status.' + name, handler.status);

        handler.contract();
        return jq;
    }

    function _setHandle(sel) {
        var jq = _attachTo('section.' + sel);

        U.debug(1) && C.debug(name, '_setHandle', sel, jq);

        $('article.' + sel + ' .control').click(function () {
            jq.trigger('expand');
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        attach: _setHandle,
        contract: _contractAll,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
