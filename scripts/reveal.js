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
        all: [],
        speed: null,
        current: null,
        revealpx: 268,
        reveals: 'section.reveal',
        inits: function (ms) {
            $.reify(El);
            Df.speed = ms || 999;
            Df.inited = true;
        },
    };
    El = {
        body: 'body',
        reveals: 'section.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function mobile() {
        return El.body.is('.mobile');
    }

    function scroller(dat) {
        if (!dat.carousel) {
            return;
        } else if (dat.status === 'active') {
            dat.carousel.tm = Carousel.auto(dat.carousel);
        } else {
            W.clearInterval(dat.carousel.tm);
        }
    }

    function fader(dat) {
        var div, mob;

        div = dat.wrap;
        mob = Respond.mobile();

        if (dat.status === 'active') {
            div.addClass('animate').show().css({
                display: 'block',
                height: Df.revealpx * (mob ? 1.2 : 1),
            });
            div.children().fadeIn(Df.speed * 2, function () {
                div.removeClass('animate');
                dat.carousel && dat.carousel.refresh();
            });
        } else {
            div.addClass('animate').css({
                height: '1px',
            });
            div.children().fadeOut(Df.speed, function () {
                div.removeClass('animate');
                div.is('.is-port') || div.hide();
            });
        }
    }

    function datify(me) {
        var cbs, dat, wrap, wrapped;

        cbs = $.Callbacks();

        wrap = me.parent().parent();
        wrapped = wrap.data('carousel') || false;
        wrap = wrapped ? wrap : me;

        dat = {
            wrap: wrap,
            carousel: wrapped,
            status: 'active',
            actuate: function (fn) {
                if (fn) {
                    cbs.add(fn);
                } else {
                    if (Df.current) {
                        Df.current.deactivate();
                    }
                    cbs.fire(dat);
                }
            },
            reset: function (stat) {
                dat.wrap.removeClass(dat.status);
                if (stat) {
                    dat.status = stat;
                    dat.wrap.addClass(dat.status);
                }
            },
            activate: function () {
                if (dat.status !== 'active') {
                    dat.reset('active');
                    dat.actuate();
                    Df.current = dat;
                    return true;
                }
                return false;
            },
            deactivate: function () {
                if (dat.status !== 'normal') {
                    dat.reset('normal');
                    Df.current = null;
                    dat.actuate();
                    return true;
                }
                return false;
            },
        };

        Df.all.push(dat);
        me.data(name, dat);

        dat.actuate(fader);
        dat.actuate(scroller);
        dat.deactivate();

        return dat;
    }

    function _setHandle(sel) {
        var sect, btn, dat;

        sect = $('section.' + sel);
        btn = $('article.' + sel + ' .control');
        dat = datify(sect.first());

        btn.click(function () {
            if ($(this).is('.active')) {
                dat.deactivate();
            } else {
                dat.activate();
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(speed) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits(speed);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        attach: _setHandle,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
