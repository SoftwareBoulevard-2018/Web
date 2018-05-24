import {User} from './user';

export class Company {
  name: string;
  createdAt: Date;
  image: string;
  capacityK: number;
  companyResource: number;
  numberOfCorrectDevelopingAttempsByAnalyst: number;
  numberOfCorrectDevelopingAttempsByDeveloper: number;
  numberOfCorrectDevelopingAttempsByTester: number;

  constructor(name?: string, image?: string,
              capacityK?: number, companyResource?: number,
              numberOfCorrectDevelopingAttempsByAnalyst?: number,
              numberOfCorrectDevelopingAttempsByDeveloper?: number,
              numberOfCorrectDevelopingAttempsByTester?: number) {
    this.name = name;
    this.createdAt = new Date();
    this.image = image;
    if (!(capacityK === undefined)) {
      this.capacityK = capacityK;
    } else {
      this.capacityK = 0;
    }
    if (!(companyResource === undefined)) {
      this.companyResource = companyResource;
    } else {
      this.companyResource = 0;
    }
    if (!(numberOfCorrectDevelopingAttempsByAnalyst === undefined)) {
      this.numberOfCorrectDevelopingAttempsByAnalyst = numberOfCorrectDevelopingAttempsByAnalyst;
    } else {
      this.numberOfCorrectDevelopingAttempsByAnalyst = 0;
    }
    if (!(numberOfCorrectDevelopingAttempsByDeveloper === undefined)) {
      this.numberOfCorrectDevelopingAttempsByDeveloper = numberOfCorrectDevelopingAttempsByDeveloper;
    } else {
      this.numberOfCorrectDevelopingAttempsByDeveloper = 0;
    }
    if (!(numberOfCorrectDevelopingAttempsByTester === undefined)) {
      this.numberOfCorrectDevelopingAttempsByTester = numberOfCorrectDevelopingAttempsByTester;
    } else {
      this.numberOfCorrectDevelopingAttempsByTester = 0;
    }
  }
}
