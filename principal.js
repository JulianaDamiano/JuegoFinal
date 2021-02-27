

var juego = new Phaser.Game(400, 540, Phaser.CANVAS, 'bloque_juego');
window.PhaserGlobal = {
    disableWebAudio: true
  };

//Agregando los estados del juego
juego.state.add('Juego', Juego);
juego.state.add('Juego1', Juego1);
juego.state.add('Juego2', Juego2);
juego.state.add('Juego3', Juego3);
juego.state.add('Terminado', Terminado);
juego.state.add('Ganaste', Ganaste);

//Inicializamos juego en el estado Juego
juego.state.start('Juego');