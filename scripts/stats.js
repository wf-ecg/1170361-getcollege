/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Stats:true */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Stats = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Stats',
        self = new G.constructor(name, '(update Google Analytics)'),
        Df;

    Df = { // DEFAULTS
        lastAction: null,
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function dump(msg) {
        if (msg) {
            C.info(name, msg);
        }
    }

    function send(msg) {
        W.ga('send', 'event', 'GCR', msg, {
            'nonInteraction': true
        });
    }

    // SYNTAX 1                     // Value     Type     Required   Description
    //  ga('send', 'event',
    //      'category',             // Category  String   Yes        Typically the object that was interacted with (e.g. button)
    //      'action',               // Action    String   Yes        The type of interaction (e.g. click)
    //          'opt_label',        // Label     String   No         Useful for categorizing events (e.g. nav buttons)
    //          opt_value,          // Value     Number   No         Values must be non-negative. Useful to pass counts (e.g. 4 times)
    //      {'nonInteraction': 1}   // EvtCf?    Field    No         Key/Value pairs define specific field names and values accepted by analytics.js
    //  );

    // SYNTAX 2 (send by passing a configuration field)
    //  ga('send', {
    //      'hitType': 'event',          // Required.
    //      'eventCategory': 'button',   // Required.
    //      'eventAction': 'click',      // Required.
    //      'eventLabel': 'nav buttons',
    //      'eventValue': 4
    //  });
    // Read the Field Reference document for a complete list of all the fields that can be used in the configuration field object.
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference

    function _update(msg) {
        (W.ga ? send : dump)(msg);
    }

    function getActive() {
        if (W.lastAction !== Df.lastAction) {
            Df.lastAction = W.lastAction;
            _update(Df.lastAction);
        }
    }

    function makeMessage(evt) {
        var me, msg, str, type;

        me = $(evt.currentTarget);
        msg = me.data('stat') || '';
        str = me.get(0).innerText;
        type = evt.type;

        if (!msg && me.prop('tagName') === 'A') {
            msg = ('Link:' + str);
        }
        if (!msg) {
            msg = me.parent().get(0).className;
        }
        if (msg) {
            msg = msg + ':' + type;
        }
        return msg;
    }

    function bind() {
        $('body').on('click keypress', 'a, .control, .shiny', function (evt) {
            W.lastAction = makeMessage(evt);
        });
    }

    function _init() {
        bind();
        W.setInterval(getActive, 1500);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _.once(_init),
        update: _.throttle(_update, 1500),
    });
    self.init();

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    TODO: Why self init?

*/
