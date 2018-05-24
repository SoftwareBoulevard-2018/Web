export class User {
    name: string;
    username: string;
    password: string;
    createdAt: string;
    role: string;
    companyId: string;
    competencyLevel: number;
    correctTrainingQuestions: number;
    correctProjectQuestions: number;
    resourcesSpent: number;
    // incorrectTrainingQuestions: number;
    // incorrectTrainingQuestions: number;
    constructor(name?: string, username?: string, password?: string, role?: string, companyId?: string,
                competencyLevel?: number, correctTrainingQuestions?: number, correctProjectQuestions?: number,
                resourcesSpent?: number, createdAt?: string) {
      this.name = name;
      this.username = username;
      this.password = password;
      this.createdAt = createdAt;
      this.role = role;
      this.companyId = companyId;
      if (competencyLevel === undefined) {
        this.competencyLevel = 0;
      } else {
        this.competencyLevel = competencyLevel;
      }
      if (correctTrainingQuestions === undefined) {
        this.correctTrainingQuestions = 0;
      } else {
        this.correctTrainingQuestions = correctTrainingQuestions;
      }
      if (correctProjectQuestions === undefined) {
        this.correctProjectQuestions = 0;
      } else {
        this.correctProjectQuestions = correctProjectQuestions;
      }
      if (resourcesSpent === undefined) {
        this.resourcesSpent = 0;
      } else {
        this.resourcesSpent = resourcesSpent;
      }
    }
}
