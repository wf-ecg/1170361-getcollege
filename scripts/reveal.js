/*jslint es5:true, white:false */
/*globals Global, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Reveal = (function (W, $) { //IIFE
    'use strict';
    var name = 'Reveal',
        self = new Global(name, '(expand or contract)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        delay: null,
        open: '',
        sect: '',
        revealpx: 257,
        reveals: 'section.reveal',
        inits: function (ms) {
            Df.delay = ms || 999;
            El.reveals = $(El.reveals);
            Df.inited = true;
        },
    };
    El = {
        reveals: 'section.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function _contractAll() {
        return El.reveals.trigger('contract');
    }

    function setAutoAdvance(me) {
        var ln = me.pages.length - 1;

        me.tm = W.setInterval(function () {
            me.goToPage((1 + me.currentPage.pageX) % ln, 0);
        }, 5555);

        $(me.indicator1.wrapper).parent().one('click keypress', function () {
            W.clearInterval(me.tm);
        });
    }

    function _attachTo(sele) {
        var jq, data, handler, mobile, iscroll;

        jq = $(sele).closest('section');
        mobile = $('body').is('.mobile');
        iscroll = jq.parent().parent().data('iscroll');

        data = jq.data();
        if (!data) {
            if (U.debug(1)) {
                C.error('no data');
            }
            return;
        }
        data = data[name] = {
            status: true,
        };
        handler = {
            expand: function () {
                if (!data.status) {
                    jq.show().stop().animate({
                        height: Df.revealpx // * (mobile ? 1.5 : 1),
                    }, Df.delay, function () {
                        Df.open = jq;
                        data.status = true;
                    });

                    jq.children().not(mobile ? '.desktop' : 'foo').fadeIn(Df.delay * 2);
                    if (iscroll) {
                        setAutoAdvance(jq.parent().parent().data('iscroll'));
                    }
                }
                _contractAll();

                return this;
            },
            contract: function () {
                if (data.status) {
                    jq.children().fadeOut().end().animate({
                        height: '1px',
                    }, (Df.delay * 2), function () {
                        jq.hide();
                        data.status = false;
                    });
                    if (iscroll) {
                        W.clearInterval(iscroll.tm);
                    }
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
        var jq = _attachTo('section.' + sel).first();

        $('article.' + sel + ' .control').click(function () {
            jq.trigger('expand');
        });
    }

    function bind() {
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
        attach: _setHandle,
        contract: _contractAll,
        auto: setAutoAdvance,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
