/**
 * Created by thram on 5/01/15.
 */

Game.Enemies = (function () {
    var _enemies = [];

    var ENEMIES_INFO = [];

    function addEnemy(quantity, level) {
        var enemy = new createjs.Bitmap(Game.getPreLoadItem(
            ENEMIES_INFO[Game.Tools.randRange(0, ENEMIES_INFO.length - 1)].id));
        enemy.regX = enemy.image.width * 0.5;
        enemy.regY = enemy.image.height * 0.5;
        var bBox = Game.getBBox();
        var x = Game.Tools.randRange(50, bBox.width - 50);
        var y = -100;
        enemy.x = x;
        enemy.y = y;
        enemy.setBounds(x, y, enemy.image.width, enemy.image.height);
        _enemies.push(enemy);
        Game.addItem(enemy);
    }

    function _updateCharacters() {
        var limit = _enemies.length;
        for (var i = 0; i < limit; ++i) {
            var enemy = _enemies[i];
            enemy.y += 4;
            var bBox = Game.getBBox();
            if (enemy.y > bBox.height) {
                enemy.x = Game.Tools.randRange(10, bBox.width - 10);
                enemy.y = -Game.Tools.randRange(20, bBox.height - 30);
            }
            if (Game.checkShipCollision(enemy)) {
                killEnemy(enemy);
                Game.gameOver();
            }
        }
    }

    function killEnemy(enemy) {
        Game.FX.explode(enemy);
        Game.removeItem(enemy);
        _enemies.splice(_enemies.indexOf(enemy), 1);
        Score.addPoints();
    }

    function setEnemiesInfo(info) {
        ENEMIES_INFO = info;
    }

    function checkEnemyCollision(obj) {
        var limit = _enemies.length;
        for (var i = 0; i < limit; ++i) {
            var enemy = _enemies[i];
            var intersection = ndgmr.checkRectCollision(obj, enemy);
            if (intersection !== null) {
                return enemy;
            }
        }
    }

    function update() {
        _updateCharacters();
    }

    function reset() {
        _enemies = [];
    }

    return {
        checkEnemyCollision: checkEnemyCollision,
        setEnemiesInfo: setEnemiesInfo,
        addEnemy: addEnemy,
        killEnemy: killEnemy,
        reset: reset,
        update: update
    }

})();
