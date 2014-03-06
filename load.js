/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Data, Glob;

(function (W, $) {
    W.debug = 0;

    if ($.browser.msie) {
        W.isIE = true;
        $(function () {
            $('html').addClass('msie');
        });
    }
    if (($.now() > new Date('2014/3/19')) || W.isIE || //
        W.location.hostname == 'www.wellsfargomedia.com') {
        W.debug--;
    }
    if ($('html').is('.debug')) {
        W.debug++;
    }
    if (W.location.hostname === 'localhost') {
        W.debug++;
    }

    var G = { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    };

    Modernizr.load([{
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
        '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
        both: [
        G.lib + 'underscore/js-1.4.4/lodash.underscore.js',
        G.lib + 'video-js/4.2.1/video-js.css',
        G.lib + 'video-js/4.2.1/video.dev.js',
        /* */
        G.loc + 'iscroll/build/iscroll.js',
        G.loc + 'jq-help.js',
        G.loc + 'jq-pubsub.js',
        G.loc + 'js-view.js',
        G.loc + 'mzr-highres.js',
        ],
        nope: [
        G.loc + 'archer.ssm.css',
        G.loc + 'archer.ssm.itl.css',
        ],
        complete: function () {
            G = $.extend(true, Global, G);
            Data = new Global('Data', '(catchall data fixture)');
        },
    },{
        both: [
        G.src + '_util.js',
        G.src + 'control.js',
        G.src + 'decache.js',
        G.src + 'handlers.js',
        G.src + 'include.js',
        G.src + 'modal.js',
        G.src + 'quiz.js',
        G.src + 'respond.js',
        G.src + 'reveal.js',
        G.src + 'main.js',
        ],
        complete: function () {
            W.Main && W.Main(W, $).init();
        },
    },{
        test: (W.debug < 1),
        yep: ['http://www.wellsfargomedia.com/lib/js/ecg-ga.js'],
    }]);

    Glob = G;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
