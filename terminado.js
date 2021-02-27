var Terminado ={
	preload: function () {
		juego.load.image('over','img/gameover.jpg');


	},

	create: function(){

		juego.add.tileSprite(0,0,400,540,'over');
	}

};