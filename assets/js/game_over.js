const Game_Over = {

  preload: function() {
  },

  create: function() {
    game.stage.backgroundColor = '#fff';
    let style = { font: 'normal 16px "Press Start 2P"'};
    let xOffset = score > 99 ? 125 : 120;
    xOffset = score === 0 ? 110 : xOffset;

    let titleText = game.add.text(game.world.centerX - xOffset, game.world.centerY - 40, `FINAL SCORE: ${score}`, style);
    let startText = game.add.text(game.world.centerX - 90, game.world.centerY, 'try again ?', style);

    game.time.events.loop(750, () => this.blink(startText), this);
  },

  update: function() {
    if (game.input.activePointer.isDown) {
      this.startGame();
    }
  },

  blink: function(text) {
    text.visible = !text.visible;
  },

  startGame: function() {
    score = 0;
    this.state.start('Game');
  },

};
