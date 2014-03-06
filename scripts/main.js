/*jslint es5:true, white:false */
/*globals $, Control, Decache, Extract, Handlers, Global, Modal, Respond, Reveal, videojs */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main', self, C, Df, U;
    self = new Global(name, '(kicker and binder)');

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        delay: 333,
        flip: '.fliplang',
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function (cb) {
            Extract.init(Df, cb);
            Decache.init('.desktop');
            Control.init(Df);
            Modal.init();
            Df.inited = true;
        },
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

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _binding() {
        if (W.Translate) {
            W.Translate.init();
        }
        Respond.init();
        Reveal.init();
        Handlers.init();

    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        C.info('init @ ' + Date() + ' debug:', W.debug, self.mode);

        Df.inits(_binding);
        _scroll('#Top');
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        delay: Df.delay,
        scroll: _scroll,
        sectStr: function () {
            return Df.sects;
        },
        sectArr: function () {
            return Df.sects.split(' ');
        },
        init: _init,
        mode: eval(U.tstrict),
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
