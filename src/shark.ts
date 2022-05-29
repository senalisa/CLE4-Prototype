import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Hero extends PIXI.Sprite {

  //GLOBALS
  private speed: number = 0;
  private game: Game;

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {

    super(texture);
    this.game = game;

    this.x = 100
    this.y = 400
    this.scale.set(1, 1);

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

  }

  onKeyDown(e: KeyboardEvent): any {
    if (e.key === "ArrowUp") {
      this.speed = -5;
    }
    if (e.key === "ArrowDown") {
      this.speed = 5;
    }
  }
  onKeyUp(e: KeyboardEvent): any {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.speed = 0;
    }
  }

  public update() {
    this.y += this.speed;

    this.keepInScreen();
  }

  private keepInScreen() {
    if (this.getBounds().right < this.game.pixi.screen.left) {
      this.x = this.game.pixi.screen.right;
    }
  }
}
