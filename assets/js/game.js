const Game = {

  preload: function() {
    game.load.image('snake', './assets/images/snake.png');
    game.load.image('food', './assets/images/food.png');
    game.load.image('wall', './assets/images/wall.png');
  },

  create: function() {
    // initialize game
    this.cursors = game.input.keyboard.createCursorKeys();
    this.tileSize = 15;
    this.updateDelay = 0;
    game.stage.backgroundColor = '#fff';

    // initialize game properties
    this.snake = [];
    this.speed = 0;
    this.food = {};
    this.direction = 'right';
    this.obstacles = [];

    // show score
    let style = { font: 'normal 16px "Press Start 2P"'};
    this.scoreText = game.add.text(15, 15, score.toString(), style);

    // make snake
    for (let i = 0; i < 8; i++) {
      this.snake[i] = game.add.sprite(105+i*this.tileSize, 150, 'snake');
    }

    // make snake food
    this.generateFood();
  },

  update: function() {
    // handle keypresses
    if (this.cursors.right.isDown && this.direction !== 'left') {
      this.new_direction = 'right';
    } else if (this.cursors.left.isDown && this.direction !== 'right') {
      this.new_direction = 'left';
    } else if (this.cursors.up.isDown && this.direction !== 'down') {
      this.new_direction = 'up';
    } else if (this.cursors.down.isDown && this.direction !== 'up') {
      this.new_direction = 'down';
    }

    // calculate game speed
    this.speed = Math.min(10, Math.floor(score/50));

    // game timer
    this.updateDelay++;

    // move snake
    if (this.updateDelay % (10 - this.speed) === 0) {
      let firstCell = this.snake[this.snake.length - 1],
          lastCell = this.snake.shift(),
          oldLastCellx = lastCell.x,
          oldLastCelly = lastCell.y;

      if (this.new_direction) {
        this.direction = this.new_direction;
        this.new_direction = null;
      }

      // change last cell's coords relative to the snake's head
      if (this.direction === 'right') {
        lastCell.x = firstCell.x + this.tileSize;
        lastCell.y = firstCell.y;
      } else if (this.direction === 'left') {
        lastCell.x = firstCell.x - this.tileSize;
        lastCell.y = firstCell.y;
      } else if (this.direction === 'up') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - this.tileSize;
      } else if (this.direction === 'down') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + this.tileSize;
      }

      this.snake.push(lastCell);
      firstCell = lastCell;

      if (this.shouldLongify) {
        this.snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
        this.shouldLongify = false;
      }

      this.collideFood();

      this.collideSelf(firstCell);

      this.collideWall(firstCell);

      this.collideObstacles(firstCell);
    }
  },

  generateFood: function() {
    // choose random spot on the grid
    let x = Math.floor(Math.random() * (GAME_WIDTH / this.tileSize)) * this.tileSize;
    let y = Math.floor(Math.random() * (GAME_HEIGHT / this.tileSize)) * this.tileSize;

    this.obstacles.forEach(obs => {
      if (obs && x === obs.x && y == obs.y) {
        obs.destroy();
      }
    })

    // Add food
    this.food = game.add.sprite(x, y, 'food');
  },

  generateObstacle: function() {
    let x = Math.floor(Math.random() * (GAME_WIDTH / this.tileSize)) * this.tileSize;
    let y = Math.floor(Math.random() * (GAME_HEIGHT / this.tileSize)) * this.tileSize;

    this.obstacles.push(game.add.sprite(x, y, 'wall'));
  },

  collideFood: function() {
    this.snake.forEach(cell => {
      if (cell.x === this.food.x && cell.y === this.food.y) {
        this.shouldLongify = true;

        this.food.destroy();
        this.generateFood();

        score += 10;
        this.scoreText.setText(score.toString());

        if (score > 100) {
          this.generateObstacle();
        } else if (score % 30 === 0) {
          this.generateObstacle();
        }
      }
    });
  },

  collideSelf: function(head) {
    for (let i = 0; i < this.snake.length - 1; i++) {
      if (head.x == this.snake[i].x && head.y === this.snake[i].y) {
        game.state.start('Game_Over');
      }
    }
  },

  collideWall: function(head) {
    if (head.x >= GAME_WIDTH || head.x < 0 || head.y >= GAME_HEIGHT || head.y < 0) {
      game.state.start('Game_Over');
    }
  },

  collideObstacles: function(head) {
    this.obstacles.forEach(obs => {
      if (obs && head.x === obs.x && head.y === obs.y) {
        game.state.start('Game_Over');
      }
    });
  },

}
