import { Answer } from '../shared/answer';
export class Question {
  role: string;
  description: string;
  answers: Answer[] = [];
  constructor(role?: string, description?: string, answer1?: Answer, answer2?: Answer, answer3?: Answer, answer4?: Answer) {
		this.role = role;
		this.description = description;
		this.answers.push(answer1, answer2, answer3, answer4);
  }
}
