/*jslint es5:true, white:false */
/*globals Global, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Control = (function (W, $) { //IIFE
    'use strict';
    var name = 'Control',
        self = new Global(name, '(control operations)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        all: [],
        current: null,
        speed: null,
        timeout: 0,
        inits: function (ms) {
            $.reify(El);
            Df.speed = ms || 999;
        },
    };
    El = {
        all: '.control',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _soonScrollTo(ele) {
        ele = $(ele);

        W.clearTimeout(Df.timeout);

        Df.timeout = W.setTimeout(function () { // delay scroll
            ele.scrollTo();
        }, Df.speed * 2);
    }

    function _isActive(ele) {
        return $(ele).is('.active');
    }

    function scroller(dat) {
        if (dat.status === 'active') {
            _soonScrollTo(dat.jq);
        } else {
            _soonScrollTo('#Top');
        }
    }

    function titler(dat) {
        if (dat.status === 'active') {
            dat.jq.attr('title', 'Close section');
        } else {
            dat.jq.attr('title', 'Reveal more');
        }
    }

    function datify() {
        var me, cbs, dat;
        // debugger
        me = $(this);
        cbs = $.Callbacks();
        dat = {
            jq: me,
            status: 'normal',
            actuate: function (fn) {
                if (fn) {
                    cbs.add(fn);
                } else {
                    if (Df.current) {
                        Df.current.deactivate();
                    }
                    cbs.fire(this);
                }
            },
            reset: function (stat) {
                this.jq.removeClass(this.status);
                if (stat) {
                    this.status = stat;
                    this.jq.addClass(this.status);
                }
            },
            activate: function () {
                if (this.status === 'normal') {
                    this.reset('active');
                    this.actuate();
                    Df.current = this;
                    return true;
                }
                return false;
            },
            deactivate: function () {
                if (this.status === 'active') {
                    this.reset('normal');
                    Df.current = null;
                    this.actuate();
                    return true;
                }
                return false;
            },
        };

        Df.all.push(dat);
        dat.actuate(scroller);
        dat.actuate(titler);

        me.data(name, dat);
    }

    function bind() {
        El.all //
        .each(datify) //
        .on('click', function (evt) {
            evt.preventDefault();

            var dat = $(this).data(name);

            if (_isActive(dat.jq)) {
                dat.deactivate();
            } else {
                dat.activate();
            }
        });
        self.reset();
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
        ':': Df,
        init: _init,
        reset: function () {
            _.each(Df.all, function (x) {
                x.reset('normal');
            });
        },
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
