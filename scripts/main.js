/*jslint es5:true, white:false */
/*globals _, Control, Decache, Global, Include,
          IScroll, Modal, Quiz, Respond, Reveal, Util,
          videojs, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
function Main(W, $) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        delay: 333,
        reveals: ['section._fellows', 'section._credit', 'section._car', 'section._spending'],
        iscroll: null,
        inits: function () {
            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        scrolld: '#ISwrapper',
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
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
        El.scrolld = $(El.scrolld);

        Df.iscroll = new IScroll(El.scrolld.get(0), {
            interactiveScrollbars: 1,
            mouseWheel: 1,
            scrollX: 0,
            scrollbars: 'custom',
        });

        El.scrolld.on('touchmove', function (e) {
            e.preventDefault();
        }, false).on('refresh', function () {

            W.setTimeout(function() {
                Df.iscroll.refresh();
                Df.iscroll.scrollTo(0, 0);
            }, 99);

        }).children('div').on('click', function (e) {
            e.stopImmediatePropagation(); // prevent modal trigger
        });
        // store on wrapper
        El.scrolld.data('iscroll', Df.iscroll);
    }

    function _embedVid(stub) {
        var vid, ifr, mod;
        //
        vid = $('#Video');
        ifr = vid.find('iframe');
        mod = $('div.modal');
        //
        ifr.attr({
            src: '//www.youtube.com/embed/' + stub + '?rel=0',
        });
        mod.one('hide', function () {
            ifr.attr('src', '');
            vid.children().hide();
        });
        vid.show().children().show();
    }

    function _showArt(id) {
        C.warn(id);

        El.scrolld.show().find('article').hide();
        El.scrolld.find(id).show();
    }

    function _bindings() {
        $('.show_article').on('click', function () {
            var me = $(this);

            $('.modal').trigger('show');
            El.scrolld.show();

            _showArt('#' + me.data('id'));
        });
        $('.disclose').on('click', function () {
            $('.modal').trigger('show');
            $('#Legal').show();
        });
        $('.quizzy').on('click', function () {
            $('.modal').trigger('show');
            $('#Qwrapper').show();
        });
        $('.video > a').on('click', function () {
            var me = $(this);

            $('.modal').trigger('show');
            $('#Video').show();

            _embedVid(me.data('src'));
        });

        $('.masthead').on('click', function () {
            Respond.change(); // eventless arg
        });

        $('.modal .scrollerXwidget').click(Modal.hide);

        _pubsubs();
    }

    function _loadCaro(sel) {
        var wrap, indi, obj;

        wrap = $(sel);
        indi = wrap.find('.ISindicator').on('click', function (evt) {
            var cds = {
                x: evt.offsetX,
                y: evt.offsetY,
                w: $(this).width(),
                l: obj.pages.length - 1,
                calc: function () {
                    return this.x / this.w * this.l | 0;
                },
            };
            obj.goToPage(cds.calc(), 0);
        });

        wrap.on('touchmove', function (e) {
            e.preventDefault();
        }, false);

        obj = new IScroll(wrap.get(0), {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true,
            indicators: {
                el: indi.get(0),
                resize: false,
                interactive: true,
            }
        });
        // store on wrapper
        wrap.data('iscroll', obj);
        return obj;
    }

    function _expander() {
        Reveal.init();
        //Decache.init('.desktop');
        Reveal.attach('_fellows');
        Reveal.attach('_credit');
        Reveal.attach('_car');
        Reveal.attach('_spending');

        W.caro1 = _loadCaro('.x5 .ISwrapper');
        W.caro2 = _loadCaro('.x3 .ISwrapper');
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;
        C.info('init @ ' + Date() + ' debug:', W.debug, self.mode);

        Include.graft('data_quiz.html', ['#Qwrapper'], Quiz.init);
        Include.graft('data_articles.html', ['#ISwrapper'], _scroller);
        Include.graft('data_reveals.html', Df.reveals, _expander);
        Include.graft('data_misc.html', ['#Legal']);

        Control.init();
        Modal.init();
        Respond.init();

        _scroll('#Top');
        _shrink(1);

        Include.later(_bindings);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        __: Df,
        delay: Df.delay,
        scroll: _scroll,
        init: _init,
        mode: eval(U.testrict),
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

    auto hide reveals

 */
