import {Component, OnInit, ɵdevModeEqual} from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {Answer} from '../shared/answer';
import {Question} from '../shared/question';
import {InstantProject} from '../shared/instantProject';
import {EmailComponent} from '../email/email.component';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {User} from '../shared/user';
import {Company} from '../shared/company';
import {HttpService} from '../http.service';
import {TrainingAttempt} from '../shared/trainingAttempt';

@Component({
  selector: 'app-play-skill',
  templateUrl: './play-skill.component.html',
  styleUrls: ['./play-skill.component.css']
})
export class PlaySkillComponent implements OnInit {
  correct;
  control: Answer;
  quest;
  user_s: User;
  user: User;
  company: Company;
  analyst: number;
  developer: number;
  tester: number;
  project: InstantProject;
  question: Question;

  resour: number;
  mem: number;
  error: string;
  left: number = 0;

  questionnumber: number = 0;

  qid: string = 'holiwis2';
  qd: string = 'esto es una pregunta muy larga para ver como se dibuja?';
  a1: string = 'esto es lo mismo de arriba pero para las respuestas';
  a2: string = 'holiwis2';
  a3: string = 'holiwis2';
  a4: string = 'holiwis2';

  //Actual code
  answer1temp: boolean = false;
  answer2temp: boolean = false;
  answer3temp: boolean = false;
  answer4temp: boolean = false;

  textNoHid: boolean = true;
  textHid: boolean = false;
  ans1hid: boolean = false;
  ans2hid: boolean = false;
  ans3hid: boolean = false;
  ans4hid: boolean = false;
  sendhid: boolean = false;

  constructor(public service: GeneralServiceService, public httpService: HttpService, public router: Router) {
  }

  ngOnInit() {
    this.work();
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
  }

  // Shows the questions and it's options in case there is a question available
  showOptions() {
    this.textHid = false;
    this.ans1hid = false;
    this.ans2hid = false;
    this.ans3hid = false;
    this.ans4hid = false;
    this.sendhid = false;
    this.textNoHid = true;
  }

  // Hides the questions and it's options, shows only a message. In case there is no questions available
  hideOptions() {
    this.textHid = true;
    this.ans1hid = true;
    this.ans2hid = true;
    this.ans3hid = true;
    this.ans4hid = true;
    this.sendhid = true;
    this.textNoHid = false;
  }

  // Wrong answer alert
  showWrongAnswer() {
    alert('Wrong answer');
  }

  // Correct answer alert, but there are more questions remaining
  showCorrectAnswer() {
    alert('Correct answer');
    this.answer1temp = false;
    this.answer2temp = false;
    this.answer3temp = false;
    this.answer4temp = false;
  }

  // Correct answer alert, in the last available question
  showLastAnswer() {
    alert('Correct answer, ' +
      'Congratulations! This was your last question, you have just leveled up');
  }

  //Alert to be used when user tries to send an answer but his team has no resources left
  showNoResour() {
    alert(`You have no resources left!
      Please wait until your Project Manager generates more resources`);
  }

  checkAnswers() {

    var next_question = false;

    if (this.resour <= 0) {

      this.showNoResour();

    } else if (this.answer1temp == this.question.answers[0].veracity && this.answer2temp == this.question.answers[1].veracity && this.answer3temp == this.question.answers[2].veracity && this.answer4temp == this.question.answers[3].veracity) {

      var suma: number = 0;
      this.user_s = this.service.user;

      this.httpService.getUserById(this.user_s['id']).subscribe((user) => {
        this.httpService.getCertification().subscribe((certifications) => {
          for (var i = 0; i < certifications.length; ++i) {
            if (suma + certifications[i].questions.length > user.correctTrainingQuestions) {
              suma = suma + certifications[i].questions.length;

              if (suma == user.correctTrainingQuestions + 1) {
                this.showLastAnswer();
                this.hideOptions();
                this.increaseCompetencyLevel();
              } else {
                this.showCorrectAnswer();
                next_question = true;
              }
              break;
            }
            suma = suma + certifications[i].questions.length;
          }
        });
      });


      this.questionnumber = this.questionnumber + 1;
      this.resour = this.resour - 1;
      //this.sendDevelopingAttempt('right', this.questions[this.questionnumber].qtext, answers, this.user.id);
      this.increaseCorrectTrainingQuestions();
      this.increaseSpentResources();
      this.decreaseResources();

    } else {

      this.decreaseResources();
      this.increaseSpentResources();
      //this.sendDevelopingAttempt('right', this.questions[this.questionnumber].qtext, answers, this.user.id);
      this.showWrongAnswer();
      this.resour = this.resour - 1;
    }

    setTimeout(() => {
      this.updateUserAndCompany(next_question);
    }, 500);
  }


  //Slide down refresher, works for the first deliverable demo's purpose, must be updated when theres connection to the server


  updateUserAndCompany(next_question) {
    this.httpService.updateUser(this.user, this.user['id']).subscribe(() => {
      this.httpService.updateCompany(this.company, this.company['id']).subscribe(() => {
        if (next_question) {
          this.work();
        }
      }, (error) => {
        console.log(error)
      });
    }, (error) => {
      console.log(error)
    });
    return this.user;
  }

  updateUser() {
    this.httpService.updateUser(this.user, this.user['id']).subscribe(() => {
    }, (error) => {
      console.log(error)
    });
    return this.user;
  }

  updateCompany() {
    this.httpService.updateCompany(this.company, this.company['id']).subscribe(() => {
    }, (error) => {
      console.log(error)
    });
    return this.company;
  }

  sendTrainingAttempt(state, question, answer, user) {
    var ta = new TrainingAttempt(0, state, question, answer, user);
    setTimeout(() => {
      this.httpService.createTrainingAttempt(ta).subscribe(() => {
      }, (error) => {
        console.log(error)
      });
    }, 2000);
  }

  decreaseResources() {
    this.company.companyResource = this.company.companyResource - 1;
    return this.user;
  }

  increaseSpentResources() {
    this.user.resourcesSpent = this.user.resourcesSpent + 1;
    return this.user;
  }

  increaseCompetencyLevel() {
    this.user.competencyLevel = this.user.competencyLevel + 1;
    return this.user;
  }

  increaseCorrectTrainingQuestions() {
    this.user.correctTrainingQuestions = this.user.correctTrainingQuestions + 1;
    return this.user;
  }

  setResources(resources) {
    this.resour = resources;
  }

  setMembers(members) {
    this.mem = members;
  }

  setQuestionNumber(q_number) {
    this.questionnumber = q_number;
  }

  setUser(user) {
    this.user = user;
    return user;
  }

  setCompany(company) {
    this.company = company;
    return company;
  }

  setProject(project) {
    this.project = project;
    return project;
  }

  setQuestion(question) {
    this.question = question;
    return question;
  }

  checkAvailability() {
    if (this.user.role == "Analyst") {
      return true;
    } else if (this.user.role == "Developer" &&
      this.project.numberOfDevelopingQuestionsPerAnalyst <= this.company.numberOfCorrectDevelopingAttempsByAnalyst) {
      return true;
    } else if (this.project.numberOfDevelopingQuestionsPerAnalyst <= this.company.numberOfCorrectDevelopingAttempsByAnalyst &&
      this.project.numberOfDevelopingQuestionsPerDeveloper <= this.company.numberOfCorrectDevelopingAttempsByDeveloper) {
      return true;
    }
    return false;
  }


  work() {
    this.user = this.service.user;

    this.httpService.getCompanyById(this.user.companyId).subscribe(company => {

      this.setCompany(company);
      this.setResources(company.companyResource);


      this.httpService.getUsersByCompany(company['id']).subscribe((users) => {
        this.setMembers(users.length);
      });

      this.httpService.getCertification().subscribe((certifications) => {

        var suma: number = 0;

        for (var i = 0; i < certifications.length; ++i) {
          if (suma + certifications[i].questions.length > this.user.correctTrainingQuestions) {
            //suma = suma + certifications[i].questions.length;
            this.setQuestionNumber(this.user.correctTrainingQuestions - suma);
            break;
          }
          suma = suma + certifications[i].questions.length;
        }

        for (var j = 0; j < certifications.length; ++j) {

          if (certifications[j].level == this.user.competencyLevel + 1) {

            this.httpService.getQuestionsById(certifications[i].questions[this.questionnumber]).subscribe((question) => {

              this.setQuestion(question);
              this.qd = question.description;
              this.a1 = question.answers[0].description;
              this.a2 = question.answers[1].description;
              this.a3 = question.answers[2].description;
              this.a4 = question.answers[3].description;
              this.showOptions();

            });

          }
        }

      });

    }, () => {
      this.hideOptions();
      this.error = "You are not part of a company so you can't develop a project";
    });
  }
}

