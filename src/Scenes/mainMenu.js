class mainMenu extends Phaser.Scene {

    constructor() {
        super("main-menu");
    }

    preload(){
    }

    create(){

        this.add.text(config.width / 3.2, config.height / 3.5, "TEST TITLE", {
            font: "Bold 65px Arial",
            fontFamily: "PressStart2P-Regular",
            fill: "#ff0044",
            align: "center"
        });

        let playButton = this.add.text(config.width / 3.2, config.height / 3.5, "play_button", {
            font: "Bold 65px Arial",
            fontFamily: "PressStart2P-Regular",
            fill: "#ff0044",
            align: "center"
        }).setDepth(1);

        let tutorialButton = this.add.text(config.width / 3.2, config.height / 3.5, "tutorial_button", {
            font: "Bold 65px Arial",
            fontFamily: "PressStart2P-Regular",
            fill: "#ff0044",
            align: "center"
        }).setDepth(1);

        playButton.setInteractive();
        playButton.on('pointerover', () => { console.log('pointerover'); });
        playButton.on('pointerdown', () => this.scene.start("playGame"/*, {
            "wood": this.wood,
            "stone": this.stone,
            "weeds": this.weeds,
            "bandages": this.bandages,
            "isShelter": this.isShelter,
            "isFire": this.isFire,
            "fireCheck": this.fireCheck,
            "shelterCheck": this.shelterCheck,
            "timerDelay": this.timerDelay,
            "enviroMeter": this.enviro_meter_value,
            "player_health": this.player_health,
            "player_food": this.player_food,
            "player_water": this.player_water,
            "collected_water": this.collected_water,
            "collected_food": this.collected_food,
            "isNight": this.isNight,
            "isWater": this.isWater,
            "pondradius": this.pondradius,
            "canClickShelter": this.canClickShelter,
            "shelterTimerDelay": this.shelterTimerDelay
          }*/)); 

        tutorialButton.setInteractive();
        tutorialButton.on('pointerover', () => { console.log('pointerover'); });
        tutorialButton.on('pointerdown', () => {this.scene.start("tutorial-scene");
    });
    }


    update(){
       
    }
}