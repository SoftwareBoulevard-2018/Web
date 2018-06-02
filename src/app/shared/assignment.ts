export class Assignment {
    project: string;
    question: string;
    state: string;

    constructor(project?: string, question?: string){
        this.project = project;
        this.question = question;
        this.state ="Unassigned";
    }
}