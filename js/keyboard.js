var Keyboard = (function () {

    var keyMap = {};

    var move = {
        'left': false,
        'right': false,
        'up': false,
        'down': false
    };

    function _initDefaultKeyMap() {
        keyMap = {
            down: {
                37: function () {
                    move['left'] = true;
                    move['right'] = false;
                },
                38: function () {
                    move['up'] = true;
                    move['down'] = false;
                },
                39: function () {
                    move['right'] = true;
                    move['left'] = false;
                },
                40: function () {
                    move['down'] = true;
                    move['up'] = false;
                }
            }, up: {
                37: function () {
                    move['left'] = false;
                },
                38: function () {
                    move['up'] = false;
                },
                39: function () {
                    move['right'] = false;
                },
                40: function () {
                    move['down'] = false;
                }
            }
        };
    }

    function _onKey(key, action) {
        switch (key) {
            // left
            case 37:
                action();
                break;
            // up
            case 38:
                action();
                break;
            // right
            case 39:
                action();
                break;
            // down
            case 40:
                action();
                break;
            // Space
            case 32:
                action();
                break;
        }
    }

    function setKeyUpAction(key, action) {
        keyMap['up'][key] = action;
    }

    function setKeyDownAction(key, action) {
        keyMap['down'][key] = action;
    }

    function onKeyDown(e) {
        e = e || window.event;
        _onKey(e.keyCode, keyMap['down'][e.keyCode]);
    }

    function onKeyUp(e) {
        e = e || window.event;
        _onKey(e.keyCode, keyMap['up'][e.keyCode]);
    }

    function getCurrentMove(direction) {
        _.forEach(move, function (value, key) {
            if (value) {
                return key;
            }
        });

    }

    _initDefaultKeyMap();

    return {
        getCurrentMove: getCurrentMove,
        setKeyUpAction: setKeyUpAction,
        setKeyDownAction: setKeyDownAction,
        onKeyUp: onKeyUp,
        onKeyDown: onKeyDown
    }

})();
