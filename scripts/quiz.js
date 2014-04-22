/*jslint es5:true, white:false */
/*globals Global, Util, _, jQuery, window */
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
            Df.total = Df.answers.length - 1;
            El.div = $(El.div).hide().fadeIn();
            El.currNum = El.div.find(El.currNum);
            El.questions = El.div.find(El.questions).hide();
            El.corrNum = El.div.find(El.corrNum);
            El.resultdiv = El.div.find(El.resultdiv).hide();
            El.answers = El.div.find(El.answers).hide();
        },
    };
    El = { // ELEMENTS
        div: '.quiz',
        currNum: 'span.current',
        questions: 'div.questions > div',
        corrNum: 'span.correct',
        resultdiv: 'div.results',
        answers: 'div.answers',
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _showScore() {
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
    }

    function _revealAnswers() {
        var kids = El.answers.show().children('blockquote').hide();

        _showScore();
        El.resultdiv.fadeIn();

        _.each(Df.results, function (e, i) {
            if (Df.results[i] === false) {
                // show if answer not true
                kids.eq(i - 1).slideDown();
            }
        });
        El.resultdiv.children().trigger('refresh'); // scroller?
    }

    function _checkAnswer(n) {
        var rez = (Df.answers[n] === Df.choices[n]);
        if (rez) {
            Df.good++;
        }
        Df.results[n] = rez;
    }

    function _saveChoice(q, a) {
        Df.choices[q] = a;
        _checkAnswer(q);
    }

    function _nextQuestion() {
        Df.current++;
        El.questions //
        .eq(Df.current - 2).hide().end() // first time is always a miss
        .eq(Df.current - 1).fadeIn();

        if (Df.current <= Df.total) {
            El.currNum.text(Df.current);
        }
    }

    function _bind() {
        // on click take data from target
        El.questions.on('click keypress', function (evt) {
            evt.stopPropagation();

            var me = $(this),
                q_num, a_str;
            //
            q_num = me.data('question');
            a_str = $(evt.target).data('answer');

            if (Df.current === q_num && a_str) {
                _saveChoice(q_num, a_str);
                _nextQuestion();
            }
            if (Df.current > Df.total) {
                El.questions.off('click');
                _revealAnswers();
            }
        }).hide();

        _nextQuestion(); // kick off
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _bind();
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
