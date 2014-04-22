/*jslint es5:true, white:false */
/*globals Global, IScroll, Util, jsView, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Carousel = (function (W, $) { //IIFE
    'use strict';
    var name = 'Carousel',
    self = new Global(name, '(rotation scroller)'),
    C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        all: [],
        speed: null,
        current: null,
        inits: function (ms) {
            $.reify(El);
            Df.speed = ms || 999;
            Df.inited = true;
        },
    };
    El = {
        reveals: 'section.reveal', // unused
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function _gotoNext(me) {
        var ln = me.pages.length - (jsView.mobile.agent() ? 0 : 1);
        var pg = (1 + me.currentPage.pageX) % ln;
        me.goToPage(pg, 0);
    }

    function _setAuto(me) {
        var tm, indi;

        if (!me.pages) return;

        tm = W.setInterval(function () {
            _gotoNext(me);
        }, 5555);

        indi = W.isIE ? me.indicator1 : me.indicators[0];

        $(indi.wrapper).parent() //
        .one('click keypress touchend', function () {
            W.clearInterval(tm);
        });

        return tm;
    }

    function _attach(sel) {
        var me, peg, dat;

        me = $(sel);
        peg = me.find('.is-proxy');

        peg.on('click touchend', function (evt) {
            var cds = {
                x: evt.offsetX,
                y: evt.offsetY,
                w: $(this).width(),
                l: dat.pages.length - 1,
                calc: function () {
                    return ((this.x / this.w * this.l) | 0);
                },
            };

            if (!cds.x) { // touch device has no offsetX?
                evt.preventDefault();
                peg.trigger('advance.' + name);
            } else {
                dat.goToPage(cds.calc(), 0);
            }
        });

        peg.on('advance.' + name, function () {
            _gotoNext(dat);
        });

        dat = new IScroll(me.get(0), {
            indicators: {
                el: peg.get(0),
                resize: false,
                interactive: true,
            },
            keyBindings: true,
            eventPassthrough: true,
            momentum: false,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: Df.speed,
        });
        // store on wrapper
        me.data('carousel', dat);
        return dat;
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
        attach: _attach,
        auto: _setAuto,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
