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
        speed: 333,
        reveals: ['section._fellows', 'section._credit', 'section._spending'],
        iscroll1: null,
        iscroll2: null,
        carousel1: null,
        carousel2: null,
        isbars: {
            defaultScrollbars: W.isIE,
            interactiveScrollbars: !W.isIE,
            mouseWheel: 1,
            scrollbars: 'custom',
            scrollX: 0,
            scrollY: 1,
        },
        inits: function () {
            $.reify(El);
            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        read_scroll: '.articles.is-port',
        quiz_scroll: '.answers.is-port',
        body: $('body'),
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function pubsubs() {
        $.PS_sub('change', function () {
            Control.reset();
        });

        $.PS_sub('refresh.iScroll', function () {
            Df.iscroll1 && Df.iscroll1.refresh();
            Df.iscroll2 && Df.iscroll2.refresh();
            Df.carousel1 && Df.carousel1.refresh();
            Df.carousel2 && Df.carousel2.refresh();
        });

        $(W).bind('resize orientationchange', _.throttle(function () {
            $.PS_pub('refresh');
        }, 333));

        if (!Respond.mobile()) {
            Decache.init('.desktop');
        }
    }

    function isfreshen() {
        this.refresh();
        this.scrollTo(0, 0);
    }

    function reader() {
        Df.iscroll1 = new IScroll(El.read_scroll.get(0), Df.isbars);

        // store on wrapper
        El.read_scroll.data('iscroll', Df.iscroll1);
        El.read_scroll.on('refresh', function () {
            isfreshen.apply(Df.iscroll1);
        });
    }

    function quizzer() {
        W.iss = Df.iscroll2 = new IScroll(El.quiz_scroll.get(0), Df.isbars);

        // store on wrapper
        El.quiz_scroll.data('iscroll', Df.iscroll2);
        El.quiz_scroll.on('refresh', function () {
            isfreshen.apply(Df.iscroll2);
        });
        Quiz.init();
    }

    function linkVid(evt) {
        var me, stub;

        me = $(evt.currentTarget);
        stub = me.data('src');

        me.attr({
            href: '//www.youtube.com/embed/' + stub + '?rel=0&html5=1',
            target: '_blank',
        });
        return true;
    }

    function embedVid(evt) {
        var me, stub, vid, ifr, mod, tmp;
        evt.preventDefault();

        me = $(evt.currentTarget);
        stub = me.data('src');
        vid = $('#Video');
        ifr = vid.find('iframe');
        mod = $('div#Modal');

        Modal.show();
        vid.show();

        ifr.attr({
            src: '//www.youtube.com/embed/' + stub + '?rel=0&html5=1',
        });
        mod.one('hide.Modal', function () {
            ifr.attr('src', 'about:blank');
            vid.children().hide();
        });
        vid.show().children().show();

        // hack Sure Pay to show transcript
        if (stub === 'j-A19zzzzq4') {
            tmp = 'https://www.getbankingdone.com/files/WF_SurePay_DemoTranscript.pdf';
            tmp = hackTranscript(vid, tmp);

            mod.one('hide.Modal', function () {
                tmp.remove();
            });
        }
    }

    function hackTranscript(ele, href) {
        var wrap, link;
        wrap = $('<aside class="modal linkMessage"></aside>');
        link = $('<a>Transcript</a>').attr({
            href: href,
            target: '_blank',
        });
        wrap.append(link);
        ele.append(wrap);
        return wrap;
    }

    function showArt(id) {
        El.read_scroll.show().find('article').hide();
        El.read_scroll.find(id).show();
    }

    function loaded() {
        El.body.addClass('loaded');
        _.delay(function () {
            El.body.removeClass('loading')
        }, 999);
        _.delay(function () {
            El.body.removeClass('loaded');
        }, 9999);
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

    function expander() {
        Df.carousel1 = Carousel.attach('.x5.is-port');
        Df.carousel2 = Carousel.attach('.x3.is-port');

        Reveal.attach('_fellows');
        Reveal.attach('_credit');
        Reveal.attach('_spending');
    }

    function bind() {
        watchInputDevice(); // detect mouse or keys for highlighting

        $('a, .control, .shiny, .closeWidget').not('[tabindex]').attr('tabindex', 9);
        $('a').not('[href]').attr('href', 'javascript:void(0)');
        $('a').not('.control, .shiny, .closeWidget').each(function () {
            var me = $(this);
            me.attr('title', me.attr('href').replace(/(\S*?\/\/\S+?)\/.*/, '$1'));
        });

        Carousel.init(Df.speed);
        Control.init(Df.speed);
        Modal.init(Df.speed);
        Reveal.init(Df.speed);
        Respond.init();
        Stats.init();

        $('.show_article').on('click touchend', function (evt) {
            evt.preventDefault();
            Modal.show();
            showArt('#' + $(this).data('id'));
        });

        $('.show_quiz').on('click touchend', function (evt) {
            evt.preventDefault();
            $('.quiz').trigger('show');
        });

        $('.video > a').on('click touchend', function (evt) {
            return jsView.mobile.agent() ? linkVid(evt) : embedVid(evt); // linkVid is used since mobile.agent returns for ipads
        });

        $('.masthead').on('dblclick', function (evt) {
            evt.preventDefault();
            if (!W.isIE) {
                Respond.toggle();
            }
        });

        pubsubs();
        $.PS_pub('refresh');
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);

        reader();
        quizzer();
        expander();

        Include.init();
        $('#Top').scrollTo();
        Include.later(bind);
        loaded();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        speed: Df.speed,
        init: _init,
        mode: eval(U.testrict),
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
