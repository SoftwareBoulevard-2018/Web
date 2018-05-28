export class PuzzleTile {
  real_placement: number;
  current_placement: number;
  image = 'https://dondelaviste.cl/public/images/species/1/delfin_austral.png';
  isEmpty: boolean;
/*
  constructor(real_placement: number, current_placement: number, image, isEmpty: boolean) {
    this.real_placement = real_placement;
    this.current_placement = current_placement;
    this.image = image;
    this.isEmpty = isEmpty;
  }
*/
  constructor(real_placement: number, current_placement: number, isEmpty: boolean, image: string) {
    this.real_placement = real_placement;
    this.current_placement = current_placement;
    this.isEmpty = isEmpty;
    this.image = image;

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
