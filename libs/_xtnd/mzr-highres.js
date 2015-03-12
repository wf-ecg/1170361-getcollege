
Modernizr.addTest('highres', function () {
    var ratio, num, mqs, isHighRes, i;

    // for opera
    ratio = '2.99/2';

    // for webkit
    num = '1.499';
    mqs = [
    'only screen and (-o-min-device-pixel-ratio:' + ratio + ')',
    'only screen and (min--moz-device-pixel-ratio:' + num + ')',
    'only screen and (-webkit-min-device-pixel-ratio:' + num + ')',
    'only screen and (min-device-pixel-ratio:' + num + ')'
    ];

    isHighRes = false;

    // loop through vendors, checking non-prefixed first
    for (i = mqs.length - 1; i >= 0; i--) {
        isHighRes = Modernizr.mq( mqs[i] );

        // if found one, return early
        if ( isHighRes ) {
            return isHighRes;
        }
    }
    // not highres
    return isHighRes;
});

function msieResizeFilter() {
    var currheight = true;

    if (!W.isIE) {
        return function () {
            return currheight;
        };
    } else {
        return function makeFilter() {
            var val = W.document.documentElement.clientHeight;

            if (currheight !== val) {
                currheight = val;
                return currheight;
            }
        };
    }
}
