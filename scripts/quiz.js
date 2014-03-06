/*jslint es5:true, white:false */
/*globals Global, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Quiz = (function (W, $) { //IIFE
    var name = 'Quiz',
    self = new Global(name, '(show a series of questions and results)'),
    C, Df, El, U;

    C = W.console;
    U = Util;

    Df = { // DEFAULTS
        dat: {},
        current: 0,
        good: 0,
        answers: ['answers', 'D', 'F', 'T', 'T', 'F'],
        choices: ['choices'],
        results: ['results'],
        inits: function () {
            El.div = $(El.div).hide().fadeIn();
            El.currNum = El.div.find('span.current');
            El.questions = El.div.find('div.questions > div').hide();
            El.corrNum = El.div.find('span.correct');
            El.resultdiv = El.div.find('div.results').hide();
            El.answers = El.div.find('div.answers').hide();
        },
    };
    El = { // ELEMENTS
        div: '#Qwrapper',
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _showScore() {
        El.currNum.parent().fadeOut();
        if (1 + Df.good === Df.answers.length) {
            Df.good = 'all';
            El.resultdiv.find('h4').show();
        } else {
            El.resultdiv.find('h4').hide();
        }
        El.corrNum.text(Df.good) //
        .parent().fadeIn();
    }

    function _revealAnswers() {
        _showScore();
        El.answers.children().hide();
        El.answers = El.answers.show().children();
        El.resultdiv.fadeIn();

        _.each(Df.results, function (e, i) {
            if (Df.results[i] === false) {
                // show if answer not true
                El.answers.eq(i - 1).slideDown();
            }
        });
        U.debug(1) && C.debug(name, '_revealAnswers');
    }

    function _checkAnswer(n) {
        var rez = Df.answers[n] === Df.choices[n];
        if (rez) {
            Df.good++;
        }
        Df.results[n] = rez;
        U.debug(2) && C.debug(name, '_checkAnswer', Df.results);
    }

    function _saveChoice(q, a) {
        Df.choices[q] = a;
        U.debug(2) && C.debug(name, '_saveChoice', Df.choices);
        _checkAnswer(q);
    }

    function _nextQuestion() {
        Df.current++;
        El.questions //
        .eq(Df.current - 2).hide().end() // first time is always a miss
        .eq(Df.current - 1).fadeIn();
        El.currNum.text(Df.current);
    }

    function _binding() {
        // on click take data from target
        El.questions.on('click', function (evt) {
            evt.stopPropagation();

            var me = $(this),
            q_num, a_str;
            //
            q_num = me.data('question');
            a_str = $(evt.target).data('answer');
            U.debug(1) && C.debug(name, '_bindings [q#, a#]', q_num, a_str);
            //
            if (Df.current === q_num && a_str) {
                _saveChoice(q_num, a_str);
                _nextQuestion();
            }
            if (Df.current > 5) {
                El.questions.off('click');
                _revealAnswers();
            }
        }).hide();

        _nextQuestion(); // kick off
    }

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _binding();
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
