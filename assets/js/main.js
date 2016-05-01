let game;
let score = 0;

const GAME_HEIGHT = 375;
const GAME_WIDTH = 375;

// Google Font madness
WebFontConfig = {
    active: function() { init(); },
    google: { families: [ 'Press+Start+2P::latin' ] }
  };

(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

// initaroo
function init() {
  game = new Phaser.Game(GAME_HEIGHT, GAME_WIDTH, Phaser.AUTO, 'game');

  // GAME STATES
  game.state.add('Menu', Menu);
  game.state.add('Game', Game);
  game.state.add('Game_Over', Game_Over);

  game.state.start('Menu');
}
