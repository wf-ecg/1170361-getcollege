/*jslint es5:true, white:false */
/*globals $, Extract, Global, Reveal, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Translate;

(function (W, $) { //IIFE
    var name = 'Translate', self, C, Df, U;
    self = new Global(name, '(detect and insert verbiage)');

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: null,
        current: 'esp',
        flip: '.fliplang',
        partsUrl: 'data.html',
        tiles: '.head, .text',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    var body = $('body'),
        html = $('html');

    function _deref(arr) {
        var foo = Df.dat;

        $.each(arr, function (i, e) {
            // drill or stay put
            foo = (typeof foo === 'object' ? foo[e] : foo);
        });
        return foo;
    }

    function _classify(jq) {
        // constuct array for drilling path
        var par = jq.closest('footer, section, td'),
            sect = Extract.sect(par),
            kind, rtn;

        if (par.is('.tile')) {
            kind = 'tile'; // (.tile > .text)
        } else if (jq.is('.text')) {
            kind = 'text';
        } else if (jq.is('.head')) {
            kind = 'head';
        }

        rtn = [sect, kind, Df.current]; // include language tag
        U.debug(1) && C.debug(name + '_classify', '\n', '[jq:sect,kind,lang]', [jq].concat(rtn));

        return rtn;
    }

    function _trans(sel) {
        var tile = $(isNaN(sel) ? sel : this),
            text = _deref(_classify(tile));

        tile.html(text)
    }

    function _retile(jq) {
        var texts;

        Df.dat = (Df.dat || Extract.data());

        texts = $(jq || 'body').find(Df.tiles); // one or all
        U.debug(1) C.debug(name + '_retile', '\n', jq, texts);

        texts.each(_trans);
    }

    function _update(jq, sect) {
        U.debug(0) && C.debug(name + '_update', '\n', sect);
        Reveal.expand(jq, sect, _retile);
    }

    function _setLang(str) {
        Df.current = str;
        // rename toggle-link
        Df.flip.text(str === 'eng' ? 'Español' : 'English');

        body.removeClass('eng esp').addClass(str);

        if (str === 'eng') {
            html.attr('lang', 'en');
        } else if (str === 'esp') {
            html.attr('lang', 'es');
        }
        _retile();
    }

    function _toggle() {
        if (Df.current === 'eng') {
            _setLang('esp');
        } else {
            _setLang('eng');
        }
    }

    function _lookup(sect, kind) { // kind [text / tile / head]
        var str;

        try {
            str = Df.dat[sect][kind][Df.current];
            str = $(str).text();

            U.debug(0) && C.debug(name, '_lookup', str);
            return str;
        } catch (err) {
            C.error(err);
            return 'N/A';
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob) {
        Df.glob = glob;
        if (self.inited(true)) {
            return null;
        }
        Df.flip = $(Df.flip).on('click', _toggle);
        //_update();
        _retile();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        run: _retile,
        change: _toggle,
        update: _update,
        trans: _trans,
    });

}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
