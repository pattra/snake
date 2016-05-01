const Menu = {

  preload: function() {
  },

  create: function() {
    game.stage.backgroundColor = '#fff';
    let style = { font: 'normal 16px "Press Start 2P"'};
    let startText = game.add.text(game.world.centerX - 50, game.world.centerY - 10, 'start !', style);

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
    this.state.start('Game');
  },

};
