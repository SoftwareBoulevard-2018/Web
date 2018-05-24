export class Email{
	sender: string;
	receivers: [string];
	content: string;
	state: string;
	createdAt: string;
	acknowledgment: [string];
	constructor(sender?:  string, receivers?: [string], content?: string, state?: string, 
		createdAt?: string, acknowledgment?: [string]){
		this.receivers = receivers;
		this.sender = sender;
		this.content = content;
		this.state = state;
		this.createdAt = createdAt;
		this.acknowledgment = acknowledgment;
	}
}