export class InstantProject {
  name: string;
  rewarded_K: number;
  numberOfDevelopingQuestionsPerDeveloper:number;
  numberOfDevelopingQuestionsPerTester:number;
  numberOfDevelopingQuestionsPerAnalyst:number;
  constructor(project_name?: string, rewarded_k?: number,
  amount_tester_question?:number, amount_analyst_question?:number, amount_developer_question?:number) {
    this.name = project_name;
    this.rewarded_K = rewarded_k;
    this.numberOfDevelopingQuestionsPerTester = amount_tester_question;
    this.numberOfDevelopingQuestionsPerAnalyst = amount_analyst_question;
    this.numberOfDevelopingQuestionsPerDeveloper = amount_developer_question;
  }
}
