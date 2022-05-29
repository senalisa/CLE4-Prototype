//IMPORT
import * as PIXI from "pixi.js";

//IMAGES
import enemyImage from "./images/enemycloud.png";
import skyImage from "./images/sky.png";
import heroImage from "./images/superhero.png";
import letterImage from "./images/letterA.png"

import { Enemy } from "./fish";
import { Hero } from "./shark";
import { Letter } from "./letter";

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public fishes: Enemy[] = [];
  public loader: PIXI.Loader;
  public shark: Hero;
  public letter: Letter;

  //CONSTRUCTOR
  constructor() {

    //PIXI CANVAS 
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      forceCanvas: true
    });
    document.body.appendChild(this.pixi.view);

    //LOADER
    this.loader = new PIXI.Loader();
    this.loader
      .add("fishTexture", enemyImage)
      .add("waterTexture", skyImage)
      .add("sharkTexture", heroImage)
      .add("letterTexture", letterImage)
    this.loader.load(() => this.loadCompleted());

  }

  //LOAD COMPLETED
  loadCompleted() {

    //BACKGROUND
    let background = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!);
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);


    //ENEMIES
    for (let i = 0; i < 4; i++) {
      let fish = new Enemy(this.loader.resources["fishTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    //PLAYER HERO
    this.shark = new Hero(this.loader.resources["sharkTexture"].texture!, this);
    this.pixi.stage.addChild(this.shark);

    //LETTER A
    this.letter = new Letter(this.loader.resources["letterTexture"].texture!, this);
    this.pixi.stage.addChild(this.letter);

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {
    this.shark.update();

    for (const fish of this.fishes) {
      fish.update(delta);
      if (this.collision(this.shark, fish)) {
        // console.log("SHARK ATTACK!!!!");
        this.pixi.stage.removeChild(fish);
      }
    }
  }

  //COLLISION
  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}
