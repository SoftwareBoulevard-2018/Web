import { Answer } from '../shared/answer';
export class Question {
  role: string;
  description: string;
  questions: Answer[] = [];
  constructor(role: string, description: string, answer1: Answer, answer2: Answer, answer3: Answer, answer4: Answer) {
		this.role = role;
		this.description = description;
		this.questions.push(answer1, answer2, answer3, answer4);
  }
}
