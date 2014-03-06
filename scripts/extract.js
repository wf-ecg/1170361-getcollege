/*jslint es5:true, white:false */
/*globals $, Global, Main, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) { //IIFE
    var name = 'Extract',
        self = new Global(name, '(extract verbiage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        glob: null,
        partsUrl: 'data.html',
        btnSel: '.orange',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _load(cb, notify) {
        W.debug > 0 && C.debug(name + '_load');
        Df.jqCache = $('<div>').load(Df.partsUrl, function (html, stat) {
            if (stat !== 'success') {
                throw new Error('Cannot load from parts.html');
            }
            cb($(html));
            notify();
        });
    }

    function _link2button() {
        var jq = $(this),
            neo = $('<button>').addClass(Df.btnSel.slice(1));

        neo.text(jq.text());
        jq.text('').append(neo);
    }

    function _opener(anc) {
        W.debug > 0 && C.debug(name + '_opener', '\n', anc);

        W.setTimeout(function () {
            anc.get(0).click();
        }, 333);
    }

    function _linkButtons(jq) {
        var refs = jq.find('a');

        $('#Layout').on('click', Df.btnSel, function (evt) {
            if (W.isIE) {
                evt.preventDefault();
                _opener($(evt.target).parent());
            }
        });

        refs.each(_link2button);
        refs.attr({
            target: '_blank',
        });

    }

    function _parse($load) {
        _linkButtons($load);

        // for each in keylist
        $.each(Main.sectArr(), function (i, sect) {
            var sectO = {},
                row$;

            // search new html for rows with that section key
            row$ = $load.find('.' + sect).removeClass(sect);

            row$.each(function () { // ie "red" section
                var $row = $(this),
                    kind = $.trim($row.attr('class')),
                    kindO = {};
                // new obj for remaining class name (ie "red tile" => tile)
                $row.find('td').each(function () {
                    var me = $(this),
                        lang = $.trim(me.attr('class'));
                    // prop: lang{string} takes html from that cell
                    kindO[lang] = me.html();
                });
                sectO[kind] = kindO;
            });
            Df.dat[sect] = sectO;
        });
    }

    function _split(str) {
        return (str = (str ? str.split(' ') : []));
    }

    function _classes(ele) {
        return _split($(ele).attr('class'));
    }

    function _listLook(arr, val) {
        return _.indexOf(arr, val) + 1;
    }

    function _lookSect(ele) {
        var cls = _classes(ele),
            arr = Main.sectArr(),
            str, num;

        while (cls.length) {
            str = cls.pop();
            num = _listLook(arr, str);

            if (num) {
                return str;
            }
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob, cb) {
        Df.glob = glob;
        if (self.inited(true)) {
            return null;
        }
        _load(_parse, cb);
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        data: function () {
            return Df.dat;
        },
        sect: _lookSect,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
