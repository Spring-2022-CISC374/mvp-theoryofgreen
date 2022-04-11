import  Scene1 from './Scenes/Scene1';
import  Scene2 from './Scenes/Scene2';

export const gameSettings = {
	playerSpeed: 200
}	

export const config = {
	width: 800,
	height: 700,
    type: Phaser.AUTO,
	backgroundColor: 0x4AA04A,
	scene: [Scene1, Scene2],
	physics: {
		default: "arcade",
		arcade:{
			debug: true
		}
	}
}

var game = new Phaser.Game(config);