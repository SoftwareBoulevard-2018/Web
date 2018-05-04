import {User} from "./user";

export class Company {
  name: string;
  creation_date: Date;
  project_manager: User;
  image: string;

  constructor(name?: string, project_manager?: User, image?: string) {
    this.name = name;
    this.creation_date = new Date();
    this.project_manager = project_manager;
    this.image = image;
  }
}
