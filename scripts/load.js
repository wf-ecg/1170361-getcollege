/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, CDN, W = (W || window);

W.debug = 1;

if ($.now() > 137780e7) {
    W.debug--;
}
if (W.isIE) {
    W.debug--;
}

CDN = {
    self: '/lib/',
    disk: 'file:///lib/',
    bithon: '../../../../lib/',
    webdev: 'http://10.89.101.100/lib/',
    mython: 'http://10.89.101.81:8000/lib/',
    python: 'http://localhost:8000/lib/',
    other0: 'http://cdnjs.cloudflare.com/ajax/libs/',
}.bithon;

var LOAD = {
    lib: {
        test: W.isIE,
        yep: [
        CDN + 'ie/split.js',
        CDN + 'ie/html5shiv.js',
        //CDN + 'ie/nwmatcher.min.js',
        //CDN + 'ie/selectivizr-min.js',
        ],
        both: [
        CDN + 'underscore/js-1.4.4/underscore.js',
        CDN + 'js/console.js',
        CDN + 'video-js/4.2.1/video-js.css',
        CDN + 'video-js/4.2.1/video.dev.js',
        './lib/drt-cellophy.js',
        './lib/jq-help.js',
        './lib/mzr-highres.js',
        ],
        complete: function () {
            Data = new Global('Data', '(catchall data fixture)');
        },
    },
    proj: {
        both: [
        './scripts/control.js',
        './scripts/decache.js',
        './scripts/extract.js',
        './scripts/main.js',
        './scripts/modal.js',
        './scripts/respond.js',
        './scripts/reveal.js',
        './scripts/translate.js',
        ],
        complete: function () {
            Main(W).init();
        },
    },
    stats: {
        test: !W.debug,
        yep: [
        CDN + 'js/ecg-ga.js',
        ],
    },
};

Modernizr.load([LOAD.lib, LOAD.proj, LOAD.stats]);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
