export class PuzzleTile {
  real_placement: number;
  current_placement: number;
  image;

  constructor(real_placement: number, current_placement: number, image) {
    this.real_placement = real_placement;
    this.current_placement = current_placement;
    this.image = image;
  }
}
