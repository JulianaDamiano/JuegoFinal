var Ganaste ={
	preload: function () {
		juego.load.image('ganar','img/ganaste.jpg');


	},

	create: function(){

		juego.add.tileSprite(0,0,400,540,'ganar');
	}

};