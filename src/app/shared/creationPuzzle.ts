export class creationPuzzle {
  rewarded_resources : number;
  imagen: any;
  filename: string; 
  constructor(rewarded_resources?: number, imagen?: any, filename?: string) {
    this.rewarded_resources = rewarded_resources;
    this.imagen = imagen;
	this.filename = filename;
  }
}
