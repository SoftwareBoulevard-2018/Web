import { InstantProject } from './instantProject';

export class BiddingProject extends InstantProject{
  time: number;
  cost: number;
  required_K: number;
  required_analyst_level: number;
  required_developer_level: number;
  required_tester_level: number;
  constructor(project_name: string, rewarded_k: number, numberOfDevelopingQuestionsPerAnalyst:number,
              numberOfDevelopingQuestionsPerDeveloper:number, numberOfDevelopingQuestionsPerTester:number, time: number, cost: number, required_k: number,
              required_analyst_level: number, required_developer_level: number, required_tester_level: number) {
    super(project_name, rewarded_k, numberOfDevelopingQuestionsPerAnalyst, numberOfDevelopingQuestionsPerDeveloper, numberOfDevelopingQuestionsPerTester);
    this.time = time;
    this.cost = cost;
    this.required_K = required_k;
    this.required_analyst_level = required_analyst_level;
    this.required_developer_level = required_developer_level;
    this.required_tester_level = required_tester_level;
  }
}
