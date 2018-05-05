export class BiddingProject {
  project_id: number;
  project_name: string;
  rewarded_k: number;
  time: number;
  cost: number;
  required_k: number;
  required_analyst_level: number;
  required_developer_level: number;
  required_tester_level: number;
  constructor(project_id: number, project_name: string, rewarded_k: number, time: number, cost: number, required_k: number,
              required_analyst_level: number, required_developer_level: number, required_tester_level: number) {
    this.project_id = project_id;
    this.project_name = project_name;
    this.rewarded_k = rewarded_k;
    this.time = time;
    this.cost = cost;
    this.required_k = required_k;
    this.required_analyst_level = required_analyst_level;
    this.required_developer_level = required_developer_level;
    this.required_tester_level = required_tester_level;
  }
}
