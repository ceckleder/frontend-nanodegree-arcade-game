var Engine = (function(global) {
    var SPRITES = {
    'boy' : 'images/char-boy.png',
    'cat-girl': 'images/char-cat-girl.png',
    'water': 'images/water-block.png',
    'stone': 'images/stone-block.png',
    'block': 'images/stone-block.png',
    'grass': 'images/grass-block.png',
    'bug': 'images/enemy-bug.png',
    'heart': 'images/Heart.png'
    };
    var background = ['water', 'stone', 'stone', 'stone', 'grass', 'grass']


    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /**
     * Main function, sets game parameters and calls the rendering function as long
     * as the game-state is true.
     */
    function main() {
        if (gameState == true) {
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
            update(dt);
            render();
            lastTime = now;
        }
        win.requestAnimationFrame(main);
    }

    /**
     * Init function, is used to start the game.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /**
     * Update function. Calls functions to update entities (player, enemy, etc), check for collisions,
     * and to check for the background (water).
     * @param dt
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkBackground();
    }

    /**
     * Updates all enemies and the player.
     * @param dt
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /**
     * Checks for collisions between enemies and player.
     */
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if (enemy.x + 80 > player.x && enemy.x < (player.x + 101)) {
                if ((enemy.y + 20) == (player.y + 10)) {
                    player.reduceLife();
                    checkGameState();
                }
            }
        });
    }

    /**
     * Checks if the player hit an unallowed tile (water).
     */
    function checkBackground() {
        var playerRow = (player.y + 10) / 83,
        currentBackground = background[playerRow];
        if (currentBackground == 'water') {
            player.reduceLife();
            checkGameState();
        }

    }

    /**
     * This function checks the game state
     * and sets the game-state variable accordingly
     */
    function checkGameState() {
        if (player.lives > 0) {
            reset();
        }
        else {
            gameState = false;
        }
    }

    /**
     * Renders the background tiles and calls functions to render entities if the game is running
     * or the split screen if the player lost.
     */
    function render() {
            var numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(SPRITES[background[row]]), col * 101, row * 83);
            }
        }
        if (gameState == true) {
            renderEntities();
        }
        else {
            renderSplitscreen();
        }
    }

    /**
     * Function that renders the entities.
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /**
     * Function that renders the split screen.
     */
    function renderSplitscreen() {
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "green";
        ctx.fillStyle = "white";
        ctx.rect(103, 130, 303, 250);
        ctx.stroke();
        ctx.fill();
        console.log(player.lives);
        if (player.lives < 1) {
            ctx.font="20px Georgia";
            ctx.fillStyle = "green";
            ctx.fillText("Game Over", 220, 220);
            ctx.fillText("Press space to restart", 140, 240);
       }
    }

    /**
     * Function that resets the players coordinates and resets the enemies array.
     */
    function reset() {
        player.x = 2 * 101;
        player.y = 5 * 83 - 10;
        allEnemies = [];
        for (i = 0; i < randomNumber(1,10); i++) {
            var enemy = new Enemy();
        allEnemies.push(enemy);
        }
    }

    Resources.load([
        SPRITES['stone'],
        SPRITES['water'],
        SPRITES['grass'],
        SPRITES['bug'],
        SPRITES['boy'],
        SPRITES['cat-girl'],
        SPRITES['heart']
    ]);
    Resources.onReady(init);

    global.canvas = canvas;
    global.ctx = ctx;
    global.background = background;
    global.SPRITES = SPRITES;
})(this);
