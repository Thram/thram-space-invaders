/**
 * Created by thram on 5/01/15.
 */

Game.Tools = (function () {
    function randRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        randRange: randRange
    };
})();
