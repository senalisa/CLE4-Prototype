//IMPORT
import * as PIXI from "pixi.js";
import { Game } from "./game";

//ENEMY CLASS
export class Enemy extends PIXI.Sprite {

  //GLOBALS
  private game: Game;
  private speed: number = 0;

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;

    this.speed = 4;
    this.x = Math.random() * game.pixi.screen.right;
    this.y = Math.random() * game.pixi.screen.bottom;

    this.scale.set(1, 1);

  }

  //ANIMATION
  public update(delta: number) {
    this.x -= this.speed * delta;
    this.y -= Math.sin(this.x * 0.02) * 2;

    this.keepInScreen();
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = -this.getBounds().width;
    }
  }
}
