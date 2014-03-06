/*jslint es5:true, white:false */
/*globals $, Control, Decache, Extract, Global, Modal, Respond, Reveal, Translate, videojs */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        delay: 333,
        flip: '.fliplang',
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function (cb) {
            Extract.init(Df, cb);
            Decache.init('.desktop');
            Control.init(Df);
            Modal.init();
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _refresh() {
        Respond.check();
        Modal.hide();
    }

    function _timer() {
        var str = new Date().toLocaleString() + ' ';
        return (str += ($.now().toString().match(/^\d{6}/)));
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

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _binding() {
        Translate.init();
        Respond.init();
        Reveal.init();

        if ($.browser.mozilla) {
            $('td').drt_cellophy();
        }

        $('.disclose').on('click', function () {
            $('.modal').trigger('show.Modal');
            $('#Legal').show();
        });

        $('img.purple').on('click', function (evt) {
            var vid = $(this).data('vid'),
                vidjs = videojs(vid);

            $('#Video').children().hide();
            $('#' + vid).show().click(function (evt) {
                evt.stopPropagation();
            });

            $('.modal').trigger('show.Modal') //
            .on('hide.Modal', function () {
                vidjs.pause();
            });

            vidjs.currentTime(0).play();
            $('#Video').show();
        });

        $('.aturitmo').on('click', function () {
            Respond.change(); // eventless arg
        });

        $('.reveal.upper').on('click', 'button', function (evt) {
            C.error(evt)
            evt.preventDefault();
            evt.stopImmediatePropagation();
            $('.disclose').click();
            W.setTimeout(function () {
                W.open($(evt.target).parent().attr('href'));
            }, 3333);
        });

        $(W).bind('resize orientationchange', _.throttle(_refresh, 333));
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + _timer() + ' debug:', W.debug);

        if (self.inited(true)) {
            return null;
        }
        Df.inits(_binding);
        _scroll('#Top');
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        delay: Df.delay,
        scroll: _scroll,
        sectStr: function () {
            return Df.sects;
        },
        sectArr: function () {
            return Df.sects.split(' ');
        },
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
