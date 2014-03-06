/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($) {
    // EASY ELEMENT IDENTITY
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jQuery:[' + (out.join(', ') || '(empty)') + ']');
    };

    // VERTICALLY ALIGN FN
    $.fn.valign = function() {
        return this.each(function(i,e){
            var me = $(this),
                px = (me.parent().height() - me.height()) / 2;

            me.css('margin-top', px);
        });
    };

    // CALC CLOSE BUTTON
    $.fn.cornerOf = function(ele) {
        var me = $(this),
            box = $(ele),
            pos = box.children(':visible').first().offset();

        pos.left = pos.left - me.width() / 2;
        pos.position = 'absolute';
        // uses the top margin as set by valign
        pos.top = parseInt(box.css('margin-top')) - me.height() / 2;

        me.css(pos);
    };
}(jQuery));
