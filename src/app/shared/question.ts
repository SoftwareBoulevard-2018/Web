export class question {
	question_id: number;
	description: string;
	category: string;
	level: number;
	constructor(question_id?: number, description?: string, category?: string, level?: number) {
		this.question_id = question_id;
		this.description = description;
		this.category = category;
		this.level = level;
	}
}
