export class PuzzleTile {
  real_placement: number;
  current_placement: number;
  image = 'https://orig00.deviantart.net/7678/f/2012/237/5/f/mar_attack_av__by_vomitoxic-d5cfz3b.png';
  isEmpty: boolean;
/*
  constructor(real_placement: number, current_placement: number, image, isEmpty: boolean) {
    this.real_placement = real_placement;
    this.current_placement = current_placement;
    this.image = image;
    this.isEmpty = isEmpty;
  }
*/
  constructor(real_placement: number, current_placement: number, isEmpty: boolean) {
    this.real_placement = real_placement;
    this.current_placement = current_placement;
    this.isEmpty = isEmpty;
  }
}
