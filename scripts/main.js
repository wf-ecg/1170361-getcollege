/*jslint es5:true, white:false */
/*globals _, Control, Decache, Global, Include,
          IScroll, Modal, Quiz, Respond, Reveal, Util, Stats,
          jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W, $) {
    'use strict';
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        delay: 333,
        reveals: ['section._fellows', 'section._credit', 'section._spending'],
        iscroll1: null,
        iscroll2: null,
        iscroll3: null,
        iscroll4: null,
        isbars: {
            defaultScrollbars: W.isIE,
            interactiveScrollbars: !W.isIE,
            mouseWheel: 1,
            scrollbars: !W.isIE ? 'custom' : true,
            scrollX: 0,
            scrollY: 1,
        },
        inits: function () {
            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        read_scroll: '.articles.is-port',
        quiz_scroll: '.answers.is-port',
        body: $('body'),
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _pubsubs() {
        $.PS_sub('change', function () {
            Control.reset();
        });
        $.PS_sub('refresh', function () {
            Df.iscroll1 && Df.iscroll1.refresh();
            Df.iscroll2 && Df.iscroll2.refresh();
            Df.iscroll3 && Df.iscroll3.refresh();
            Df.iscroll4 && Df.iscroll4.refresh();
        });
        $(W).bind('resize orientationchange', _.throttle(function () {
            $.PS_pub('refresh');
            if (U.debug(0)) {
                C.debug(name, '_refresh');
            }
        }, 333));
    }

    function isfreshen() {
        this.refresh();
        this.scrollTo(0, 0);
    }

    function _reader() {
        El.read_scroll = $(El.read_scroll);
        Df.iscroll1 = new IScroll(El.read_scroll.get(0), Df.isbars);

        // store on wrapper
        El.read_scroll.data('iscroll', Df.iscroll1);
        El.read_scroll.on('mouseenter', function () {
            isfreshen.apply(Df.iscroll1);
        });
    }

    function _quizzer() {
        El.quiz_scroll = $(El.quiz_scroll);
        W.iss = Df.iscroll2 = new IScroll(El.quiz_scroll.get(0), Df.isbars);

        // store on wrapper
        El.quiz_scroll.data('iscroll', Df.iscroll2);
        El.quiz_scroll.on('refresh', function () {
            isfreshen.apply(Df.iscroll2);
        });
        Quiz.init();
    }

    function _embedVid(stub) {
        var vid, ifr, mod;
        //
        vid = $('#Video');
        ifr = vid.find('iframe');
        mod = $('div#Modal');
        //
        ifr.attr({
            src: '//www.youtube.com/embed/' + stub + '?rel=0',
        });
        mod.one('hide.Modal', function () {
            ifr.attr('src', 'about:blank');
            vid.children().hide();
        });
        vid.show().children().show();
    }

    function _showArt(id) {
        C.warn(id);

        El.read_scroll.show().find('article').hide();
        El.read_scroll.find(id).show();
    }

    function watchInputDevice() {
        var htm = $('html');
        htm.on('keydown', function (evt) { // key action
            htm.removeClass('mouse');
            htm.addClass('keyboard');
        }).on('mousedown', function (evt) { // mouse action
            htm.removeClass('keyboard');
            htm.addClass('mouse');
        }).addClass('mouse');
    }

    function _loadCaro(sel) {
        var wrap, indi, obj;

        wrap = $(sel);
        indi = wrap.find('.is-proxy').on('click', function (evt) {
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
            indicators: {
                el: indi.get(0),
                resize: false,
                interactive: true,
            },
            keyBindings: true,
            momentum: false,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: 400,
        });
        // store on wrapper
        wrap.data('iscroll', obj);
        return obj;
    }

    function _expander() {
        Reveal.init(Df.delay);
        //Decache.init('.desktop');
        Reveal.attach('_fellows');
        Reveal.attach('_credit');
        Reveal.attach('_spending');

        Df.iscroll3 = _loadCaro('.x5 .is-wrap');
        Df.iscroll4 = _loadCaro('.x3 .is-wrap');
    }

    function bind() {
        watchInputDevice();
        $('a, .control, .shiny, .closeWidget').not('[tabindex]').attr('tabindex', 9);
        $('a').not('[href]').attr('href', '#');

        Control.init(Df.delay);
        Modal.init(Df.delay);
        Respond.init();
        Stats.init();

        El.body.on('touchmove', '.is-view', function (e) {
            e.preventDefault();
        });
        $('.show_article').on('click', function () {
            Modal.show();
            _showArt('#' + $(this).data('id'));
        });
        $('.show_quiz').on('click', function () {
            Modal.show();
            $('.quiz').show();
        });
        $('.video > a').on('click', function () {
            Modal.show();
            $('#Video').show();
            _embedVid($(this).data('src'));
        });
        $('.masthead').on('click', function () {
            Respond.change(); // eventless arg
        });

        _pubsubs();
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);

        Include.graft('data_quiz.html', ['.quiz'], _quizzer);
        Include.graft('data_articles.html', ['.articles.is-port'], _reader);
        Include.graft('data_reveals.html', Df.reveals, _expander);

        $('#Top').scrollTo();

        Include.later(bind);
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        delay: Df.delay,
        init: _init,
        mode: eval(U.testrict),
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

    auto hide reveals

 */
