export class Record {
  createdAt: number;
  finishDate: Date;
  company: string;
  project: string;


  constructor(createdAt: number, finishDate: Date, company: string, project: string) {
    this.createdAt = createdAt;
    this.finishDate = finishDate;
    this.company = company;
    this.project = project;
  }
}
