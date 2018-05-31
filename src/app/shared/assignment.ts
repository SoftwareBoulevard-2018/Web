export class Assignment {

    projectId: string;
    questionId: string;
    project: string;
    question: string;
    state: string;

    constructor(projectId?: string, questionId?: string, project?: string, question?: string){
        this.projectId = projectId;
        this.questionId = questionId;
        this.project = project;
        this.question = question;
        this.state ="Unassigned";
    }
}