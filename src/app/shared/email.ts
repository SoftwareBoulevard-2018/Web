export class Email{
	id: string;
	sender: string;
	receivers: [string];
	content: string;
	createdAt: string;
	acknowledgment: [string];
	constructor( id?: string, sender?:  string, receivers?: [string], content?: string, state?: string, 
		createdAt?: string, acknowledgment?: [string]){
		this.id = id;
		this.receivers = receivers;
		this.sender = sender;
		this.content = content;
		this.createdAt = createdAt;
		this.acknowledgment = acknowledgment;
	}
}
