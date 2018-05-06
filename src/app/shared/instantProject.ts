export class InstantProject {
  project_id: number;
  project_name: string;
  rewarded_k: number;
  amount_developer_question:number;
  amount_tester_question:number;
  amount_analyst_question:number;
  constructor(project_id?: number, project_name?: string, rewarded_k?: number,
  amount_tester_question?:number, amount_analyst_question?:number, amount_developer_question?:number) {
    this.project_id = project_id;
    this.project_name = project_name;
    this.rewarded_k = rewarded_k;
    this.amount_tester_question = amount_tester_question;
    this.amount_analyst_question = amount_analyst_question;
    this.amount_developer_question = amount_developer_question;
  }
}
