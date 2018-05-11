import { Answer } from '../shared/answer';
export class Question {
  question_id: number;
  description: string;
	category: string;
	level: number;
	questions: Answer[] = [];
	constructor(question_id: number, description: string, category: string, level: number, answer1: Answer, answer2: Answer, answer3: Answer, answer4: Answer) {
		this.question_id = question_id;
		this.description = description;
		this.category = category;
		this.level = level;
		this.questions.push(answer1, answer2, answer3, answer4);
	}
}
