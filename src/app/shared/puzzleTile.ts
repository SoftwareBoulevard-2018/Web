export class PuzzleTile {
  real_placement: number;
  current_placement: number;
  image;
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

    if (isEmpty) {
      this.image = 'https://dondelaviste.cl/public/images/species/1/delfin_austral.png';  // dolphin
    }
    else {
      this.image = 'https://orig00.deviantart.net/7678/f/2012/237/5/f/mar_attack_av__by_vomitoxic-d5cfz3b.png'; // placeholder
    }
  }


  getReal_placement(): number {
    return this.real_placement;
  }

  setReal_placement(value: number) {
    this.real_placement = value;
  }

  getCurrent_placement(): number {
    return this.current_placement;
  }

  setCurrent_placement(value: number) {
    this.current_placement = value;
  }
}
