/*jslint es5:true, white:false */
/*globals _, Control, Decache, Global, Handlers, Include,
          IScroll, Modal, Quiz, Respond, Reveal, Util,
          videojs, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
function Main(W, $) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C, Df, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        delay: 333,
        flip: '.fliplang',
        swaps: [
            '#ISwrapper',
            '#Legal',
            '#Qwrapper',
            'section._fellows',
            'section._credit',
            'section._car',
            'section._spending',
        ],
        iscroll: null,
        scrolld: '#ISwrapper',
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function () {
            Df.inited = true;
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _later(fn) {
        Df.promise.done(fn);
    }

    function _scroll(ele, mult) {
        var $me = $(ele);

        // look before leap
        if ($me.length) {
            $(W.isIE ? 'html' : 'body').stop().animate({
                scrollTop: $me.offset().top,
            }, Main.delay * (mult || 1));
        }
    }

    function _shrink(up) {
        var $me = $('.reveal');
        if (up) {
            $me.slideUp();
        } else {
            $me.slideDown();
        }
    }

    function _pubsubs() {
        $.PS_sub('change', function () {
            Reveal.contract();
            Control.reset();
        });
        $.PS_sub('refresh', function () {
            Respond.check();
            Modal.hide();
        });
        $(W).bind('resize orientationchange', _.throttle(function () {
            $.PS_pub('refresh');
            U.debug(2) && C.debug(name, '_refresh');
        }, 333));

    }

    function _scroller() {
        Df.scrolld = $(Df.scrolld);
        W.is = Df.iscroll = new IScroll(Df.scrolld.get(0), {
            interactiveScrollbars: 1,
            mouseWheel: 1,
            scrollX: 0,
            scrollbars: 'custom',
        });
        Df.scrolld.on('touchmove', function (e) {
            e.preventDefault();
        }, false).on('refresh', function () {
            W.setTimeout(function() {
                Df.iscroll.refresh();
            }, 99);
        }).children('div').on('click', function (e) {
            e.stopImmediatePropagation(); // prevent modal trigger
        });
    }

    function _bindings() {
        _scroller();

        $('.articles').on('click', function () {
            $('.modal').trigger('show');
            Df.scrolld.show();
        });
        $('.disclose').on('click', function () {
            $('.modal').trigger('show');
            $('#Legal').show();
        });
        $('.quizzy').on('click', function () {
            $('.modal').trigger('show');
            $('#Qwrapper').show();
        });
        $('.videos').on('click', function () {
            $('.modal').trigger('show');
            $('#Videos').show();
        });

        $('.masthead').on('click', function () {
            Respond.change(); // eventless arg
        });

        _pubsubs();

        Reveal.attach('_fellows');
        Reveal.attach('_credit');
        Reveal.attach('_car');
        Reveal.attach('_spending');

        //Decache.init('.desktop');

        Quiz.init();
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        C.info('init @ ' + Date() + ' debug:', W.debug, self.mode);
        var home = W.location.hostname !== '10.89.101.100';
        Df.promise = Include.graft(home ? 'data.html' : 'data.php', Df.swaps);

        Control.init(Df);
        Modal.init();
        Respond.init();
        Reveal.init();

        _scroll('#Top');
        _shrink(1);
        _later(_bindings);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        __: Df,
        delay: Df.delay,
        scroll: _scroll,
        sects: function () {
            return Df.sects;
        },
        init: _init,
        mode: eval(U.testrict),
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
