export class Record {
  startDate: Date;
  finishDate: Date;
  company: string;
  project: string;


  constructor(startDate: Date, finishDate: Date, company: string, project: string) {
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.company = company;
    this.project = project;
  }
}
