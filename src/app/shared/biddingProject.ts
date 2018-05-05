import { InstantProject } from './instantProject';

export class BiddingProject extends InstantProject{
  time: number;
  cost: number;
  required_k: number;
  required_analyst_level: number;
  required_developer_level: number;
  required_tester_level: number;
  constructor(project_id: number, project_name: string, rewarded_k: number, amount_tester_question:number,
              amount_analyst_question:number, amount_developer_question:number, time: number, cost: number, required_k: number,
              required_analyst_level: number, required_developer_level: number, required_tester_level: number) {
    super(project_id, project_name, rewarded_k, amount_tester_question, amount_analyst_question, amount_developer_question);
    this.time = time;
    this.cost = cost;
    this.required_k = required_k;
    this.required_analyst_level = required_analyst_level;
    this.required_developer_level = required_developer_level;
    this.required_tester_level = required_tester_level;
  }
}
