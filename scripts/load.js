/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Data, G, W = (W || window);

W.debug = 0;
    lax_debug : {
        if ($.browser.msie) {
            W.isIE = true;
            $(function () {
                $('html').addClass('msie');
            });
        }
        if (($.now() > new Date('2014/3/19')) || W.isIE ||
            W.location.hostname == 'www.wellsfargomedia.com') {
            W.debug--;
        }
        if (W.location.hostname === 'localhost') {
            W.debug++;
        }
    }

G = { /// all stubs terminated
    dir: ROOT.dir + '/',
    lib: ROOT.lib + '/',
    loc: ROOT.dir + '/lib/',
    src: ROOT.dir + '/scripts/',
};

Modernizr.load([{
    test: W.isIE,
    yep: [
    G.lib + 'ie/split.js',
    G.lib + 'ie/html5shiv.js',
    //cloud.typography.com/6819872/620964/css/fonts.css', // Normal
    '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
    ],
    both: [
    G.lib + 'underscore/js-1.4.4/underscore.js',
    G.lib + 'video-js/4.2.1/video-js.css',
    G.lib + 'video-js/4.2.1/video.dev.js',
    //
    G.loc + 'drt-cellophy.js',
    G.loc + 'jq-help.js',
    G.loc + 'mzr-highres.js',
    G.loc + 'js-view.js',
    ],
    nope: [
    G.loc + 'archer.ssm.css',
    G.loc + 'archer.ssm.itl.css',
    ],
    complete: function () {
        G = $.extend(true, Global, G);
        Data = new Global('Data', '(catchall data fixture)');
    },
}, {
    both: [
    G.src + '_util.js',
    G.src + 'control.js',
    G.src + 'decache.js',
    G.src + 'extract.js',
    G.src + 'handlers.js',
    G.src + 'main.js',
    G.src + 'modal.js',
    G.src + 'respond.js',
    G.src + 'reveal.js',
    ],
    complete: function () {
        Main(W).init();
    },
}, {
    test: (W.debug < 1),
    yep: ['http://www.wellsfargomedia.com/lib/js/ecg-ga.js'],
}]);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
