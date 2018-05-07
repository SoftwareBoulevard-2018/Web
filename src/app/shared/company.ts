import {User} from "./user";

export class Company {
  name: string;
  creation_date: Date;
  project_manager: User;
  image: string;
  active_project: number;
  capacity_k: number;
  resources: number;
  team_members: User[];
  // The following are dummy values,
  // that means they are not going to be in the final models but still they are necessary to show some content
  current_project_name: string;

  constructor(name?: string, project_manager?: User, image?: string,
              active_project?: number, capacity_k?: number, resources?: number, team_members?: User[], current_project_name?: string) {
    this.name = name;
    this.creation_date = new Date();
    this.project_manager = project_manager;
    this.image = image;
    this.active_project = active_project;
    if (!(capacity_k === undefined)){
      this.capacity_k = capacity_k;
    } else {
      this.capacity_k = 0;
    }
    if (!(resources === undefined)){
      this.resources = resources;
    } else {
      this.resources = 0;
    }
    if (!(team_members === undefined)){
      this.team_members = team_members;
    } else {
      this.team_members = [];
    }
    this.current_project_name = current_project_name;
  }
}
