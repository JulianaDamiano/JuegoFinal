var nave;
var balas;
var tiempoEntreBalas=400;
var tiempo=0;
var malos;
var timer;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var fondo;

var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;

var Juego3={
	preload: function () {
		juego.load.image('nave','img/muñeco.png');
		juego.load.image('laser','img/estrella.png');
		juego.load.image('malo','img/flag.png');
		juego.load.image('bg','img/bosque.png');

		juego.load.audio('laser', 'audio/pop.mp3');

	},

	create: function(){
		fondo=juego.add.tileSprite(0,0,400,540,'bg');
		laser = juego.add.audio('laser');

		teclaDerecha=juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda=juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba=juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo=juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        
		juego.physics.startSystem(Phaser.Physics.ARCADE);


         //coordenadas de la nave
		nave=juego.add.sprite(juego.width/2,485,'nave');
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave,true);

		//balas
		balas=juego.add.group();
		balas.enableBody=true;
		balas.setBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(50,'laser');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',0.5);
		balas.setAll('checkWorldBounds',true);
		balas.setAll('outOfBoundsKill',true);

		malos=juego.add.group();
		malos.enableBody=true;
		malos.setBodyType=Phaser.Physics.ARCADE;
		malos.createMultiple(50,'malo');
		malos.setAll('anchor.x',0.5);
		malos.setAll('anchor.y',0.5);
		malos.setAll('checkWorldBounds',true);
		malos.setAll('outOfBoundsKill',true);

		timer=juego.time.events.loop(2000,this.crearEnemigo,this);

		//Definiendo el puntaje en pantalla

		puntos=0;
		juego.add.text(20,20,"Puntos: ",{font:"14px Arial", fill:"#FFF"});
		txtPuntos=juego.add.text(80,20,"0",{font:"14px Arial", fill:"#FFF"});

		//Definiendo contador  de vidas

		vidas=3;
		juego.add.text(310,20,"Vidas: ",{font:"14px Arial", fill:"#FFF"});
		txtVidas=juego.add.text(360,20,"3",{font:"14px Arial", fill:"#FFF"});


	},
	update: function(){

		fondo.tilePosition.y+=1;

		nave.rotation=juego.physics.arcade.angleToPointer(nave)+Math.PI/2;

		if(juego.input.activePointer.isDown)
		{
			this.disparar();
		}

		//agregando colision

		juego.physics.arcade.overlap(balas,malos,this.colision,null,this);

		//Definiendo el contador de vidas

		malos.forEachAlive(function(m){
			if(m.position.y>520 && m.position.y<521)
			{
				
				vidas -=1;
				txtVidas.text=vidas;
			}
		});

		if(vidas==0)
		{
			juego.state.start('Terminado');
		}

        //Definiendo niveles

		if(puntos==10)
		{
			juego.state.start('Ganaste');
		}

		//Direcciones

		if(teclaDerecha.isDown){
		
			nave.position.x+=2;
			nave.animations.play('derecha');
		 }else if(teclaIzquierda.isDown){
			
			 nave.position.x-=2;
			nave.animations.play('izquierda');
		 }else if(teclaArriba.isDown){
			
 
			 nave.position.y-=2;
			 nave.animations.play('arriba');
 
		 }else if(teclaAbajo.isDown){
			 nave.position.y+=2;
			nave.animations.play('abajo');
		 }


	},

	disparar: function(){

		

		if(juego.time.now>tiempo && balas.countDead()>0)
		{
			tiempo=juego.time.now + tiempoEntreBalas;
			var bala=balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x,nave.y);
			bala.rotation=juego.physics.arcade.angleToPointer(bala)+Math.PI/2;
			juego.physics.arcade.moveToPointer(bala,200);
			laser.play();
		}
		

	},

	crearEnemigo: function (){
		var enem=malos.getFirstDead();
		var num=Math.floor(Math.random()*10+1);
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y=140;
		enem.checkWorldBounds=true;
		enem.outOfBoundsKill=true;
	},

	colision: function(b,m){
		b.kill();
		m.kill();
		puntos++;
		txtPuntos.text=puntos;
	}


};