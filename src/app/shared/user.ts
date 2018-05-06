export class User {
    name: string;
    username: string;
    password: string;
    creation_date: Date;
    role: string;
    company_name: string;
    // The following are dummy values,
    // that means they are not going to be in the final models but still they are necessary to show some content
    questions_answered_right: number;
    questions_answered_wrong: number;
    constructor(name?:string, username?:string, password?:string, role?:string, company_name?:string,
                questions_answered_right?: number, questions_answered_wrong?: number) {
      this.name = name;
      this.username = username;
      this.password = password;
      this.creation_date = new Date();
      this.role = role;
      this.company_name = company_name;
      this.questions_answered_right = questions_answered_right;
      this.questions_answered_wrong = questions_answered_wrong
    }
}
