export class Certification{
	level: number;
	role: string
	questions: [string];
	constructor(level?:  number, role?: string, questions?: [string], content?: string){
		this.level = level;
		this.role = role;
		this.questions = questions;
	}
}