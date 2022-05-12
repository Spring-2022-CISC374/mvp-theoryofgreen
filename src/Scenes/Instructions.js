class Instructions extends Phaser.Scene {
	constructor() {
		super("infoScreen");
	}

    init(data){
        this.wood = data.wood;
        this.stone = data.stone;
        this.weeds = data.weeds;
        this.bandages = data.bandages;
        this.isShelter = data.isShelter;
        this.isFire = data.isFire;
        this.fireCheck = data.fireCheck;
        this.shelterCheck = data.shelterCheck;
        this.timerDelay = data.timerDelay;
        this.enviro_Meter = data.enviroMeter;
        this.player_health = data.player_health;
		this.player_food = data.player_food;
		this.player_water = data.player_water;
        this.collected_water = data.collected_water;
		this.collected_food = data.collected_food;
        this.isNight = data.isNight;
		this.isWater = data.isWater;
        this.pondradius = data.pondradius;
        this.canClickShelter = data.canClickShelter;
        this.shelterTimerDelay = data.shelterTimerDelay;
    }

    create() {
        this.borderup = this.add.rectangle(0, 0, 300, 10, 'black', 1);
		this.borderup.setScale(10);
		this.borderup.setDepth(99);

        this.play = this.add.text(25, 17, "To Game");
        this.play.setDepth(100);
        this.input.on("gameobjectdown", this.click, this);
        this.play.setInteractive();
    }

    click(pointer, gameObject) {
        this.scene.start("playGame", {
            "wood": this.wood,
            "stone": this.stone,
            "weeds": this.weeds,
            "bandages": this.bandages,
            "isShelter": this.isShelter,
            "isFire": this.isFire,
            "fireCheck": this.fireCheck,
            "shelterCheck": this.shelterCheck,
            "timerDelay": this.timerDelay,
            "enviroMeter": this.enviro_Meter,
            "berry-bush": this.berryBush,
            "berry-bush-text": this.berryBushText,
            "poisonous-mushroom": this.poisonMushroom,
            "poisonous-mushroom-text": this.poisonMushroomText,
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
          });
    }
}