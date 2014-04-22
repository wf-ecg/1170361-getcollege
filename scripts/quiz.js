/*jslint es5:true, white:false */
/*globals Global, Stats, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Quiz = (function (W, $) { //IIFE
    'use strict';
    var name = 'Quiz',
        self = new Global(name, '(show a series of questions and results)'),
        C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        current: 0,
        good: 0,
        answers: ['answers', 'E', 'F', 'T', 'T', 'F'],
        choices: ['choices'],
        results: ['results'],
        inits: function () {
            $.reify(El);
            Df.total = Df.answers.length - 1;
            El.div.hide().fadeIn();
            El.questions.hide();
            El.resultdiv.hide();
            El.answers.hide();
        },
    };
    El = { // ELEMENTS
        div: '.quiz',
        html: 'html',
        currNum: 'span.current',
        questions: 'div.questions > div',
        corrNum: 'span.correct',
        resultdiv: 'div.results',
        answers: 'div.answers',
    };

    function _ns(str) {
        return $.nameSpace(str, name);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function showScore() {
        El.currNum.parent().fadeOut();

        if (Df.good === Df.total) {
            Df.good = 'all';
            El.resultdiv.find('h4').show();
            El.resultdiv.find('.missed').hide();
            El.answers.hide();
        } else {
            El.resultdiv.find('h4').hide();
            El.answers.show();
        }

        El.corrNum.text(Df.good) //
        .parent().fadeIn();

        El.div.addClass('done');
        Stats.update('Quiz score: ' + Df.good + ' of 5');
    }

    function revealAnswers() {
        var kids = El.answers.show().children('blockquote').hide();

        showScore();
        El.resultdiv.fadeIn();

        _.each(Df.results, function (e, i) {
            if (Df.results[i] === false) {
                // show if answer not true
                kids.eq(i - 1).slideDown();
            }
        });
        El.resultdiv.children().trigger('refresh'); // scroller?
    }

    function checkAnswer(n) {
        var rez = (Df.answers[n] === Df.choices[n]);
        if (rez) {
            Df.good++;
        }
        Df.results[n] = rez;
    }

    function saveChoice(q, a) {
        Df.choices[q] = a;
        checkAnswer(q);
    }

    function nextQuestion() {
        Df.current++;
        El.questions //
        .eq(Df.current - 2).hide().end() // first time is always a miss
        .eq(Df.current - 1).fadeIn();

        if (Df.current <= Df.total) {
            El.currNum.text(Df.current);
        }
    }

    function open() {
        Modal.show();

        if ($.support.orientation && W.orientation !== 0 && !El.html.is('.ipad')) {
            W.alert('Portrait orientation required. \nTurn your device vertically.');
            return;
        }
        El.div.show();

        if (Df.current === 0) {
            nextQuestion(); // kick off
        }
    }

    function bind() {
        // on click take data from target
        El.questions.on('click keypress', function (evt) {
            evt.stopPropagation();

            var me = $(this),
                q_num, a_str;
            //
            q_num = me.data('question');
            a_str = $(evt.target).data('answer');

            if (Df.current === q_num && a_str) {
                saveChoice(q_num, a_str);
                nextQuestion();
            }
            if (Df.current > Df.total) {
                El.questions.off('click');
                revealAnswers();
            }
        }).hide();

        El.div.on('show', open);

        $.PS_sub('close.Modal', function (evt) {
            if (evt.namespace === 'Modal' && El.div.is('.done')) {
               W.location = '.';
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        bind();
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
