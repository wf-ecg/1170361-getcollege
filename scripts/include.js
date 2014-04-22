/*jslint es5:true, white:false */
/*globals Global, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Include = (function (W, $) { // IIFE
    'use strict';
    var name = 'Include',
        self = new Global(name, '(access and attach selected regions)'),
        C, Df, G, U, cached;

    G = Global;
    U = Util;
    C = W.console;

    cached = $();

    Df = G['+' + name] = { // DEFAULTS
        cache: cached,
        promise: $.Deferred(),
        inits: function () {
            if (W.debug > 0) {
                W['_' + name] = this;
                C.debug(this);
            }
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _later(fn) {
        if (fn) {
            Df.promise.done(fn);
        }
    }

    function _copyCache(sel) {
        return cached.filter(sel).clone();
    }

    function _xsrCache(sel) {
        if (sel) {
            return _copyCache(sel);
        } else {
            return cached;
        }
    }

    function _addParts(arr) {
        if (U.debug(0)) {
            C.debug(name, '_addParts', arr);
        }

        _.each(arr, function (e) {
            var tmp = self.cache(e);

            if (tmp.length) {
                var stub = $('body ' + e);
                stub.replaceWith(tmp.hide()); // if found
            }
        });
    }

    function _graft(url, arr, cb) {
        Df.promise = $.ajax({
            cache: false,
            //TODO (W.location.hostname !== '10.89.101.100'),
            dataType: 'html',
            type: 'GET',
            url: url,
            success: function (str) {
                cached = $(str);
                if (U.debug(2)){
                    C.debug(name, '_promise', this);
                }
                _addParts(arr);
                _later(cb);
            },
        }).promise();
        return Df.promise;
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        Df.promise.resolve();
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        cache: _xsrCache,
        graft: _graft,
        later: _later,
        swap: _addParts,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
