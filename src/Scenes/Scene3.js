import { config, gameSettings } from "../game.js";

class Scene3 extends Phaser.Scene {
	constructor() {
		super("craftScreen");
	}

    init(data){
        this.wood = data.wood;
        this.stone = data.stone;
        this.weeds = data.weeds;
    }

    create() {
        this.text = this.add.text(25, 25, "Click to return to game!");
        this.text.setColor("white");
        this.text.setInteractive();
        this.text.group = "return";
        this.input.on("gameobjectdown", this.click, this);

        this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
		this.woodText.depth = 100;
		this.woodText.setColor("white");

        this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
		this.stoneText.depth = 100;
		this.stoneText.setColor("white");

        this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
		this.weedsText.depth = 100;
		this.weedsText.setColor("white");
    }

    click(pointer, gameObject) {
        if(gameObject.group == "return") {
            this.scene.start("playGame", {
                "wood": this.wood,
                "stone": this.stone,
                "weeds": this.weeds
            });
        }
    }
}

export default Scene3;