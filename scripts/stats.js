/*jslint es5:true, white:false */
/*globals Global, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Stats = (function (W, $) { //IIFE
    'use strict';
    var name = 'Stats',
        self = new Global(name, '(update Google Analytics)'),
        C, Df;

    C = W.console;

    Df = { // DEFAULTS
        lastAction: null,
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _dump(tag) {
        C.info(name, '_dump', tag);
    }

    function _send(tag) {
        W.ga('send', 'event', 'GCR', tag, {
            'nonInteraction': true
        });
    }

    function _update(tag) {
        (W.ga ? _send : _dump)(tag);
    }

    function _getActive() {
        if (W.lastAction !== Df.lastAction) {
            Df.lastAction = W.lastAction;
            _update('view: ' + Df.lastAction);
        }
    }

    function bind() {
        $('body').on('mouseup', 'a, .control, .shiny', function (evt) {
            W.lastAction = evt.currentTarget.parentNode.className;
        });
    }

    function _init() {
        bind();
        W.setInterval(_getActive, 1500);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _.once(_init),
        update: _.throttle(_update, 1500),
    });

    return self.init();
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
