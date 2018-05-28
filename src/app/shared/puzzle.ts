export class Puzzle {
  rewarded_resources : number;
  slicedImage: string[];
  image: string;

  constructor(rewarded_resources?: number, slicedImage?: string[], image?: string) {
    this.rewarded_resources = rewarded_resources;
    this.slicedImage = slicedImage;
    this.image = image;

  }
}
