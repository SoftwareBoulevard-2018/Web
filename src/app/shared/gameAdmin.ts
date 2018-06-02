import { User } from './user';
export class GameAdmin extends User  {
    threshold: number;
    // incorrectTrainingQuestions: number;
    // incorrectTrainingQuestions: number;
    constructor(name?: string, username?: string, password?: string, role?: string, companyId?: string,
        competencyLevel?: number, correctTrainingQuestions?: number, correctProjectQuestions?: number,
        resourcesSpent?: number, createdAt?: string, threshold?: number) {
      super(name, username, password, role, companyId, competencyLevel, correctTrainingQuestions, correctProjectQuestions, resourcesSpent)
      this.threshold = threshold;
    }
}
