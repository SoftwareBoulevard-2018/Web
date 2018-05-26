export class Email{
	sender: string;
	subject: string
	receivers: [string];
	content: string;
	constructor(sender?:  string, subject?: string, receivers?: [string], content?: string){
		this.receivers = receivers;
		this.subject = subject;
		this.sender = sender;
		this.content = content;
	}
}
