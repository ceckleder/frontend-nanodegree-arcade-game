/**
 * Helper function that returns a random number in a given range
 * @param lowerBound
 * @param upperBound
 * @returns {integer} random number
 */
var randomNumber = function(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
// Global gabe state variable
var gameState = true;

/**
 * Enemies our player must avoid
 * @constructor
 */
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -200;
    this.y = (randomNumber(1, 3) * 83) - 20;
    this.speed = randomNumber(20, 150);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

/**
 * Update the enemy's position, required method for game
 * @param dt a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > canvas.width){
        this.x = - Resources.get(this.sprite).width;
    }

    this.x = this.x + this.speed * dt;
}

/**
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2 * 101;
    this.y = 5 * 83 - 10;
    this.lives = 3;
    this.score = 0;
    this.sprite = 'images/char-cat-girl.png';
}
/***
 * Rendering method for the player, draws the player and the life-icons.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var heartX = canvas.width - 30;
    for (i = 0; i < player.lives; i++) {
        ctx.drawImage(Resources.get(SPRITES['heart']), heartX, canvas.height - 60, 30, 40);
        heartX -= 35;

    }
}

/**
 * Method to reduce the players lives
 */
Player.prototype.reduceLife = function() {
    this.lives -= 1;
    console.log(this.lives);
}
/**
 * Method to reset the players lives and position
 */
Player.prototype.reset = function() {
    player.lives = 3;
    this.x = 2 * 101;
    this.y = 5 * 83 - 10;

}

/**
 * This method handles the users input and sets the new coordinates for the player
 * @param direction
 */
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x >= 101) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < canvas.width - 101) {
                this.x += 101
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < (83 * 5 - 10)) {
                this.y += 83;
            }
            break;
        case 'space':
            if (gameState == false) {
                player.reset();
                gameState = true;
            }
            console.log(gameState);
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 2; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();


/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
