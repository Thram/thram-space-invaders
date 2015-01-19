/**
 * Created by thram on 17/12/14.
 */
var Game = (function () {
    var _stage, _preLoad,
        _canvasBBox, _defaultSpreadSheetUrl = 'img/sprites_sheet.png', _spriteSheetUrl = undefined, _spriteSheet,
        _space, _ship, _gameOver = false;

    function _renderEnemy() {
        var time = Game.Tools.randRange(0, 5) * 1000;
        setTimeout(
            function () {
                Game.Enemies.addEnemy();
                _renderEnemy();
            }, time);
    }

    function _preLoadAssets() {
        var assetsLoaded = 0;

        var assets = [
            {id: "gameSpriteSheet", src: Game.getSpriteSheet()},
            {id: "gameSpriteSheetData", src: "img/sprites_data.json"}
        ];

        function _onLoadQueueComplete(ev) {
            var loadingProgress = document.querySelector("#loading-progress");
            loadingProgress.innerHTML = '100';
            _initSpriteSheet();
            _space = new Game.Space();
            _ship = new Game.Spaceship();
            _initSapceShip();
            _renderEnemy();

            createjs.Ticker.framerate = 30;
            createjs.Ticker.addEventListener("tick", _tick);

            window.onkeydown = Keyboard.onKeyDown;
            window.onkeyup = Keyboard.onKeyUp;
            var loading = document.querySelector("#loading-wrapper");
            loading.style.display = "none";
        }

        function _onLoadingProgress(ev) {
            assetsLoaded++;
            var loadingProgress = document.querySelector("#loading-progress");
            loadingProgress.innerHTML = (ev.progress * 100).toFixed(0);
        }

        _preLoad = new createjs.LoadQueue(); // new createjs.LoadQueue(false) if local
        _preLoad.addEventListener("complete", _onLoadQueueComplete);
        _preLoad.addEventListener("progress", _onLoadingProgress);
        _preLoad.loadManifest(assets);
    }

    function _initSapceShip() {
        _ship.reset();
        Game.Enemies.reset();
        Keyboard.setKeyUpAction(32, _ship.shoot);
    }

    function initialize() {
        _canvasBBox = document.getElementById("canvas").getBoundingClientRect();
        _stage = new createjs.Stage("canvas");
        _preLoadAssets();
    }

    function _initSpriteSheet() {
        var data = _preLoad.getResult("gameSpriteSheetData");
        data['images'] = [_preLoad.getResult("gameSpriteSheet")];
        _spriteSheet = new createjs.SpriteSheet(data);
    }


    function _tick() {
        _space.update();
        _ship.update();
        Game.Enemies.update();
        _stage.update();
    }

    function reset() {
        Game.initialize();
        Score.reset()
    }

    function getBBox() {
        return _canvasBBox;
    }

    function addItem(item) {
        _stage.removeChild(item);
    }

    function removeItem(item) {
        _stage.removeChild(item);
    }

    function getSpriteSheet() {
        return _spriteSheetUrl || _defaultSpreadSheetUrl;
    }

    function setSpriteSheet(url) {
        _spriteSheetUrl = url;
    }

    function getPreLoadItem(id) {
        return _preLoad.getResult(id);
    }


    function checkShipCollision(obj, number) {
        var intersection = ndgmr.checkRectCollision(obj, _ship);
        return (intersection !== null);
    }

    function gameOver() {
        _ship.explode();
        _gameOver = true;
        var ev = new Event("game-over");
        ev.data = {
            final_score: Score.getPoints()
        };
        document.dispatchEvent(ev);
    }

    return {
        getBBox: getBBox,
        gameOver: gameOver,
        checkShipCollision: checkShipCollision,
        getSpriteSheet: getSpriteSheet,
        setSpriteSheet: setSpriteSheet,
        getPreLoadItem: getPreLoadItem,
        addItem: addItem,
        removeItem: removeItem,
        reset: reset,
        initialize: initialize
    }
})();