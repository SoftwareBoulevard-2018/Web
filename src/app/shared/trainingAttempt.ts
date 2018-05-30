import { User } from './user';

export class TrainingAttempt {
  number: number;
  state: string;
  createdAt: string;
  question: string;
  answer: [string];
  user: string;

  constructor(number?: number, state?: string,
              createdAt?: string, question?: string,
              answer?: [string],
              user?: string) {
    this.number = number;
    this.state = state;
    this.createdAt = createdAt;
    this.question = question;
    this.answer = answer;
    this.user = user;

  }
}
