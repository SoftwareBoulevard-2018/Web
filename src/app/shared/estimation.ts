export class Estimation {
  username: string;
  project_name: string;
  cost: number;
  time: number;

  constructor(username: string, project_name: string, cost: number, time: number) {
    this.username = username;
    this.project_name = project_name;
    this.cost = cost;
    this.time = time;
  }
}
