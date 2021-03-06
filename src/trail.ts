import { alphabets, colorSets } from "./config";
import Color, { loadColorset } from "./color";

const alphabet = alphabets.katakanas + alphabets.alphanumeric;
const colorSet = loadColorset(colorSets.white);

export default class Trail {
  x: number;
  y: number;
  width: number;
  height: number;
  increment: number;
  minIncrement: number;
  maxIncrement: number;
  layerIndex: number;
  respawn: number;
  background: Color;
  chars: string[] = [alphabet.charAt(Math.floor(Math.random() * alphabet.length))];
  moved: boolean = true;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    minIncrement: number,
    maxIncrement: number,
    layerIndex: number,
    respawn: number,
    background: Color
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minIncrement = minIncrement;
    this.maxIncrement = maxIncrement;
    this.increment = Math.floor(
      Math.random() * (maxIncrement - minIncrement) + minIncrement
    );
    this.layerIndex = layerIndex;
    this.respawn = respawn;
    this.background = background;
  }

  reset() {
    this.y = 0;
    this.increment = Math.floor(
      Math.random() * (this.maxIncrement - this.minIncrement) +
        this.minIncrement
    );
    this.moved = false;
  }

  move() {
    if (this.y > this.height && Math.random() > this.respawn) this.reset();
    else this.y += this.increment;
    this.moved = true;

    // TODO: set move to false
  }

  write(ctx: CanvasRenderingContext2D ) {
    if (!this.moved) return;

    ctx.fillStyle = this.background.toString();
    ctx.fillRect(this.x, 0, this.width, this.height);

    const char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    this.chars.splice(0, 0, char);
    ctx.fillStyle = colorSet[0].toString();
    ctx.fillText(char, this.x, this.y);

    for (var i = 1; i < colorSet.length; i++) {
      if (this.chars.length > i - 1) {
        ctx.fillStyle = colorSet[i].toString();
        ctx.fillText(this.chars[i], this.x, this.y - this.increment * i);
      }
    }

    if (this.chars.length > colorSet.length - 1) this.chars.pop();
  }
}
