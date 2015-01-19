/**
 * Created by thram on 5/01/15.
 */

Game.Space = function () {

    var _space = new createjs.Graphics(), _stars = [];

    function _renderStar() {
        var star = new createjs.Shape(_space);
        var bBox = Game.getBBox();
        _stars.push(star);
        star.x = Game.Tools.randRange(10, bBox.width - 10);
        star.y = Game.Tools.randRange(-10, bBox.height - 10);
        star.scaleY = star.scaleX = Game.Tools.randRange(0.5, 2);
        star.alpha = Math.random() + 0.2;
        Game.addItem(star);
    }

    function _renderSpace() {
        _space.setStrokeStyle(1);
        _space.beginStroke(createjs.Graphics.getRGB(255, 255, 255));
        _space.beginFill(createjs.Graphics.getRGB(255, 255, 255));
        _space.drawCircle(0, 0, 1);

        for (var i = 0; i < 100; ++i) {
            _renderStar();
        }
    }

    _renderSpace();

    function update() {
        var curStar;
        var bBox = Game.getBBox();
        var limit = _stars.length;
        for (var i = 0; i < limit; ++i) {
            curStar = _stars[i];
            curStar.y += 4;
            if (curStar.y > bBox.height) {
                curStar.x = Game.Tools.randRange(10, bBox.width - 10);
                curStar.y = -Game.Tools.randRange(20, bBox.height - 30);
            }
        }
        setTimeout(this.onUpdate, 1);
    }

    return {
        update: update,
        onUpdate: function () {}
    };

};
