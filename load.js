/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Data, Glob;

(function (W, $, M) {
    W.debug = 1;

    if (W.isIE) {
        $(function () {
            $('html').addClass('msie');
        });
    }
    if (($.now() > new Date('2014/04/09')) || W.isIE || //
        W.location.hostname == 'www.wellsfargomedia.com') {
        W.debug--;
    }
    if ($('html').is('.debug')) {
        W.debug++;
    }
    if (W.location.hostname === 'localhost') {
        W.debug++ > 1 && $('html').addClass('debug');
    }

    var G = { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    };

    M.load([{
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        G.loc + 'iscroll-ie.js',
        ],
        nope: [
        G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
        G.lib + 'jq/jq-pubsub.js',
        G.lib + 'underscore/js-1.4.4/lodash.underscore.js',
        G.lib + 'jquery/mobile/custom/jquery.mobile.min.css',
        G.lib + 'jquery/mobile/custom/jquery.mobile.min.js',
        /* */
        G.loc + 'jq-help.js',
        G.loc + 'js-view.js',
        G.loc + 'mzr-highres.js',
        ],
        complete: function () {
            ROOT.log();
            G = $.extend(true, Global, G);
            Data = new Global('Data', '(catchall data fixture)');
        },
    },{
        test: (ROOT.host === 'localhost:8000'),
        yep: [
        G.lib + 'fonts/archer.ssm.css',
        G.lib + 'fonts/archer.ssm.itl.css',
        ],
        nope: [
        /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
        '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
        both: [
        G.src + '_util.js',
        G.src + 'carousel.js',
        G.src + 'control.js',
        G.src + 'decache.js',
        G.src + 'include.js',
        G.src + 'modal.js',
        G.src + 'quiz.js',
        G.src + 'respond.js',
        G.src + 'reveal.js',
        G.src + 'stats.js',
        G.src + 'main.js',
        ],
        complete: function () {
            W.Main && W.Main(W, $).init();
        },
    },{
        test: (W.debug < 1),
//        yep: ['http://www.wellsfargomedia.com/lib/js/ecg-ga.js'],
        yep: ['lib/ecg-ga.js'],
    }]);

    Glob = G;
}(window, jQuery, Modernizr));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
