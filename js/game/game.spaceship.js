/**
 * Created by thram on 5/01/15.
 */

Game.Spaceship = function (number) {
    var _bullets = [], bulletGraphic, _ship, BULLET_SPEED = 15, SPEED = 8;
    number = number || 0;

    function _renderBullet() {
        bulletGraphic = new createjs.Graphics();
        bulletGraphic.setStrokeStyle(1);
        bulletGraphic.beginStroke(createjs.Graphics.getRGB(180, 0, 0));
        bulletGraphic.beginFill(createjs.Graphics.getRGB(200, 200, 0));
        bulletGraphic.drawCircle(0, 0, 3);
    }


    function _initPos() {
        var bBox = Game.getBBox();
        _ship.x = bBox.width / 2;
        _ship.y = bBox.height - 30;
    }

    function _renderShip() {
        _ship = new createjs.Bitmap(Game.getPreLoadItem("ship"));
        _ship.regX = _ship.image.width * 0.5;
        _ship.regY = _ship.image.height * 0.5;
        _initPos();
        Game.addItem(_ship);
    }

    function shoot() {
        var bullet = new createjs.Shape(bulletG);
        bullet.scaleY = 1.5;
        bullet.x = _ship.x;
        bullet.y = _ship.y - 30;
        bullet.setBounds(ship.x, ship.y - 30, 10, 10);
        _bullets.push(bullet);
        Game.FX.shoot();
        Game.addItem(bullet);
    }

    function _checkBulletCollision(bullet) {
        if (_bullets.length > 0) {
            var enemy = Game.Enemies.checkEnemyCollision(bullet);
            if (enemy) {
                Game.Enemies.killEnemy(enemy);
                _bulletHit(bullet);
            }
        }
    }

    function _updateBullets() {
        var bLimit = _bullets.length - 1;

        for (var i = bLimit; i >= 0; --i) {
            _bullets[i].y -= BULLET_SPEED;
            _checkBulletCollision(_bullets[i]);
            if (_bullets[i].y < -3) {
                Game.removeItem(_bullets[i]);
                _bullets.splice(i, 1);
            }

        }
    }

    function _checkMovement() {
        var direction = Keyboard.getCurrentMove();
        var bBox = Game.getBBox();
        switch (direction) {
            case 'left':
                _ship.x -= SPEED;
                if (_ship.x < 0) {
                    _ship.x = bBox.width;
                }
                break;
            case 'right':
                _ship.x += SPEED;
                if (_ship.x > bBox.width) {
                    _ship.x = 0;
                }
                break;
            case 'up':
                if (_ship.y - SPEED > 24) {
                    _ship.y -= SPEED;
                }
                break;
            case 'down':
                if (_ship.y + SPEED < bBox.height - 20) {
                    _ship.y += SPEED;
                }
                break;
        }
    }

    function update() {
        _updateBullets();
        _checkMovement();
        setTimeout(this.onUpdate, 1);

    }

    function _bulletHit(bullet) {
        _bullets.splice(_bullets.indexOf(bullet), 1);
        Game.removeItem(bullet);
    }

    function explode() {
        Game.FX.explode(_ship);
        Game.removeItem(_ship);
    }


    _renderShip();
    _renderBullet();

    return {
        explode: explode,
        shoot: shoot,
        update: update,
        reset: _initPos,
        onUpdate: function () {}
    }
};