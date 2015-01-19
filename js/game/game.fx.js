/**
 * Created by thram on 5/01/15.
 */

Game.FX = (function () {
    function explode(item) {
        var explosion = new createjs.SpriteSheet(
            {
                "images": [Game.getPreLoadItem("boom")],
                frames: {width: 100, height: 100, regX: 50, regY: 50},
                animations: {
                    explode: [0, 80]
                }
            });

        var animation = new createjs.Sprite(explosion, "explode");
        animation.x = item.x;
        animation.y = item.y;
        animation.addEventListener(
            "animationend", function () {
                Game.removeItem(animation);
            });

        Game.addItem(animation);
        var instance = createjs.Sound.play("sound-explosion");
        instance.volume = 0.5;
    }

    function shoot() {
        var instance = createjs.Sound.play("sound-shoot");
        instance.volume = 0.5;
    }

    return {
        shoot:shoot,
        explode: explode
    }
})();