export class User {
    name:string;
    username: string;
    password: string;
    creation_date: Date;
    role: string;
    constructor(name?:string, username?:string, password?:string, role?:string){
      this.name = name;
      this.username = username;
      this.password = password;
      this.creation_date = new Date();
      this.role = role;
    }
}
