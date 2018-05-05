export class InstantProject {
  project_id: number;
  project_name: string;
  rewarded_k: number;
  constructor(project_id?: number, project_name?: string, rewarded_k?: number) {
    this.project_id = project_id;
    this.project_name = project_name;
    this.rewarded_k = rewarded_k;
  }
}
