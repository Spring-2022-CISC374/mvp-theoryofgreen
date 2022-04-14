import  Scene1 from './Scenes/Scene1';
import  Scene2 from './Scenes/Scene2';
import  Scene3 from './Scenes/Scene3';
import  Scene4 from './Scenes/Scene4';

export const gameSettings = {
	playerSpeed: 200
}	

export const config = {
	width: 800,
	height: 700,
    type: Phaser.AUTO,
	backgroundColor: 0x4AA04A,
	scene: [Scene1, Scene2, Scene3, Scene4],
    title: "Theory of Green",
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}

var game = new Phaser.Game(config);