export class creationCertification{
	level: number;
	role: string
	questions: string[];
	constructor(level?:  number, role?: string, questions?: string[]){
		this.level = level;
		this.role = role;
		this.questions = questions;
	}
}