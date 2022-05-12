class mainMenu extends Phaser.Scene {

    constructor() {
        super("main-menu");
    }

    preload(){
    }

    create(){

        this.add.text(config.width / 2, config.height / 2, "TEST TITLE", {
            font: "Bold 65px Arial",
            fontFamily: "PressStart2P-Regular",
            fill: "#fff",
            align: "center"
        });

        var playButton = this.add.text(100, 600, "play_button", {
            font: "Bold 65px Arial",
            color: "#fff",
            align: "center"
        });

        var tutorialButton = this.add.text(100, 500, "tutorial_button", {
            font: "Bold 65px Arial",
            color: '#fff',
            align: "center"
        });

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