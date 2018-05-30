export class Answer {
	description: string;
	veracity: boolean;
	constructor(description?: string, state?: boolean) {
		this.description = description;
		this.veracity = state;
	}
}
