export class Company {
    name:string;
    creation_date: Date;
    project_manager_username: string;
    image: string;
    active_project: number;
    constructor(name?:string, project_manager_username?:string, image?:string, active_project?:number){
      this.name = name;
      this.creation_date = new Date();
      this.project_manager_username = project_manager_username;
      this.image = image;
      this.active_project = active_project;
    }
}
