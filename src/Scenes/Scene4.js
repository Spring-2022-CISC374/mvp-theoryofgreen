class Scene4 extends Phaser.Scene {
	constructor() {
		super("endGame");
	}

    init(data){
        this.enviroMeter = data.enviroMeter;
        this.player_health = data.player_health;
    }

    create() {
        this.back = this.add.rectangle(400, 350, 450, 450, 0x3B3A39, 1);

        if(this.enviroMeter > 0 && this.player_health > 0) {
            this.congratsText = this.add.text(220, 200, "Congratulations!\nYou survived without taking too\nmuch from the environment!");
            this.congratsText.setAlign("center");
            this.congratsText.setFontSize(20);
            this.congratsText.setDepth(100);
            this.congratsText2 = this.add.text(220, 300, "Make sure to always be\nmindful of the resources you're\nusing, even in real life!");
            this.congratsText2.setAlign("center");
            this.congratsText2.setFontSize(20);
            this.congratsText2.setDepth(100);
        }
        else if(this.enviroMeter <= 0) {
            this.gameOverText = this.add.text(330, 150, "Game Over");
            this.gameOverText.setDepth(100);
            this.gameOverText.setFontSize(25);
            this.enviroDeathText = this.add.text(255, 230, "Oh no! You took too many\nresources from the\nenvironment!");
            this.enviroDeathText.setDepth(100);
            this.enviroDeathText.setFontSize(20);
            this.enviroDeathText.setAlign("center");
            this.enviroDeathText2 = this.add.text(185, 310, "You have to pay attention to the\neffects that your actions are having\non the environment. If you're\n not careful, you could do\nsome real damage!");
            this.enviroDeathText2.setDepth(100);
            this.enviroDeathText2.setFontSize(20);
            this.enviroDeathText2.setAlign("center");
        }
        else if(this.player_health <= 0) {
            this.gameOverText = this.add.text(330, 150, "Game Over");
            this.gameOverText.setDepth(100);
            this.gameOverText.setFontSize(25);
            this.playerDeathText = this.add.text(255, 230, "Oh no! You didn't survive\nuntil the timer ran out!");
            this.playerDeathText.setDepth(100);
            this.playerDeathText.setFontSize(20);
            this.playerDeathText.setAlign("center");
            this.playerDeathText2 = this.add.text(200, 310, "Though you still need to protect\nthe environment, you can't neglect\nyour own health! Make sure\nyou pay attention to your food,\nwater, nand health bars!");
            this.playerDeathText2.setDepth(100);
            this.playerDeathText2.setFontSize(20);
            this.playerDeathText2.setAlign("center");
        }
        
        this.replay = this.add.text(260, 445, "Click here to play again!");
        this.replay.setFontSize(20);
        this.replay.setDepth(100);
        this.replayButton = this.add.rectangle(410, 455, 330, 25, 0x2A7A16, 1);
		this.replayButton.setDepth(99);
		this.replayButton.setInteractive();
        this.input.on("gameobjectdown", this.click, this);
        this.replay.setInteractive();
    }

    click(pointer, gameObject) {
        this.scene.start("bootGame");
    }
}

// export default Scene4;