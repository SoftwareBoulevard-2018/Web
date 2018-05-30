export class Assignment {

    projectID: string;
    questionID: string;
    project: string;
    question: string;
    state: string;

    constructor(projectID?: string, questionID?: string, project?: string, question?: string){
        this.projectID = projectID;
        this.questionID = questionID;
        this.project = project;
        this.question = question;
        this.state ="Unassigned";
    }
}