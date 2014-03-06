/*jslint es5:true, white:false */
/*globals $, Global, Main, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Handlers = (function (W, $) { //IIFE
    var name = 'Handlers', self, C, Df, U;
    self = new Global(name, '(event goodies)');

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _refresh() {
        Respond.check();
        Modal.hide();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

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

        $('.masthead').on('click', function () {
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

        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
