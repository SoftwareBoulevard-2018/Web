import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {Answer} from '../shared/answer';
import {HttpService} from '../http.service';
import {User} from '../shared/user'
import {Company} from '../shared/company'
import {Question} from '../shared/question'
import {InstantProject} from '../shared/instantProject'

@Component({
  selector: 'app-play-develop',
  templateUrl: './play-develop.component.html',
  styleUrls: ['./play-develop.component.css']
})
export class PlayDevelopComponent implements OnInit {
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
  instruction: string;

  questionnumber: number = 0;
  //questions: string[];

  qid: string ;
  qd: string ;
  a1: string ;
  a2: string ;
  a3: string ;
  a4: string ;

  //Actual code
  answer1temp: boolean = false;
  answer2temp: boolean = false;
  answer3temp: boolean = false;
  answer4temp: boolean = false;

  textNoHid: boolean = false;
  textHid: boolean = false;
  ans1hid: boolean = false;
  ans2hid: boolean = false;
  ans3hid: boolean = false;
  ans4hid: boolean = false;
  sendhid: boolean = false;


  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  //Shows the questions and it's options in case there is a question available
  showOptions(){
    this.textHid = false;
    this.ans1hid = false;
    this.ans2hid = false;
    this.ans3hid = false;
    this.ans4hid = false;
    this.sendhid = false;
    this.textNoHid = true;
  }
  //Hides the questions and it's options, shows only a message. In case there is no questions available
  hideOptions(){
    this.textHid = true;
    this.ans1hid = true;
    this.ans2hid = true;
    this.ans3hid = true;
    this.ans4hid = true;
    this.sendhid = true;
    this.textNoHid = false;
  }

  //Wrong answer alert
  showWrongAnswer() {
    alert("Wrong answer")
  }

  //Correct answer alert, but there are more questions remaining
  showCorrectAnswer() {
    alert("Correct answer")
    this.answer1temp = false;
    this.answer2temp = false;
    this.answer3temp = false;
    this.answer4temp = false;
  }

  //Correct answer alert, in the last available question
  showLastAnswer() {
    alert("Correct answer, that was the last question")
  }

  //Alert to be used when user tries to send an answer but his team has no resources left
  showNoResour() {
    alert("You have no resources left")
  }

  closeProject(){
    this.httpService.getRecordsByFinishDateAndCompany(undefined, this.company['id']).subscribe((record) => {
        record.finishDate = new Date();

        this.httpService.getInstantprojectById(record.project).subscribe((project) => {
          console.log(this.company.capacityK + " + " + project.rewarded_K);
          this.company.capacityK = this.company.capacityK + project.rewarded_K;
          this.company.numberOfCorrectDevelopingAttempsByAnalyst = 0;
          this.company.numberOfCorrectDevelopingAttempsByDeveloper = 0;
          this.company.numberOfCorrectDevelopingAttempsByTester = 0;

          setTimeout(() => {
            this.httpService.updateCompany(this.company, this.company['id']).subscribe(() => {
              this.httpService.updateRecord(record, record['0']).subscribe(() => {}, (error) => {console.log(error)});
            }, (error) => {console.log(error)});

          }, 2000);
        });
    });
  }

  updateUserAndCompany(next_question, end_project){
    this.httpService.updateUser(this.user, this.user['id']).subscribe(() => {
      this.httpService.updateCompany(this.company, this.company['id']).subscribe(() => {
        if (next_question) {
          this.work();
        }else if(end_project){
          this.closeProject();
        }
      }, (error) => {console.log(error)});
    }, (error) => {console.log(error)});
    return this.user;
  }

  updateUser(){
    this.httpService.updateUser(this.user, this.user['id']).subscribe(() => {}, (error) => {console.log(error)});
    return this.user;
  }

  updateCompany(){
    this.httpService.updateCompany(this.company, this.company['id']).subscribe(() => {}, (error) => {console.log(error)});
    return this.company;
  }

  decreaseResources(){
    this.company.companyResource = this.company.companyResource - 1;
    return this.user;
  }

  increaseSpentResources(){
    this.user.resourcesSpent = this.user.resourcesSpent + 1;
    return this.user;
  }

  increaseCorrectProjectQuestions(){
    this.user.correctProjectQuestions = this.user.correctProjectQuestions + 1;
    return this.user;
  }

  increaseAnalystQuestions(){
    this.company.numberOfCorrectDevelopingAttempsByAnalyst = this.company.numberOfCorrectDevelopingAttempsByAnalyst + 1;
    return this.company;
  }

  increaseDeveloperQuestions(){
    this.company.numberOfCorrectDevelopingAttempsByDeveloper = this.company.numberOfCorrectDevelopingAttempsByDeveloper + 1;
    return this.company;
  }

  increaseTesterQuestions(){
    this.company.numberOfCorrectDevelopingAttempsByTester = this.company.numberOfCorrectDevelopingAttempsByTester + 1;
    return this.company;
  }

  setResources(resources){
    this.resour = resources;
  }

  setMembers(members){
    this.mem = members;
  }

  setQuestionNumber(q_number){
    this.questionnumber = q_number;
  }

  setUser(user){
    this.user = user;
    return user;
  }

  setCompany(company){
    this.company = company;
    return company;
  }

  setProject(project){
    this.project = project;
    return project;
  }

  setQuestion(question){
    this.question = question;
    return question;
  }

  checkAvailability(){

    if (this.user.role == "Analyst" &&
        this.company.numberOfCorrectDevelopingAttempsByAnalyst < this.project.numberOfDevelopingQuestionsPerAnalyst){
      this.questionnumber = this.company.numberOfCorrectDevelopingAttempsByAnalyst;
      return true;
    }else if (this.user.role == "Developer" &&
              this.project.numberOfDevelopingQuestionsPerAnalyst <= this.company.numberOfCorrectDevelopingAttempsByAnalyst &&
              this.company.numberOfCorrectDevelopingAttempsByDeveloper < this.project.numberOfDevelopingQuestionsPerDeveloper) {
      this.questionnumber = this.company.numberOfCorrectDevelopingAttempsByDeveloper;
      return true;
    }else if (this.user.role == "Tester" &&
              this.project.numberOfDevelopingQuestionsPerAnalyst <= this.company.numberOfCorrectDevelopingAttempsByAnalyst &&
              this.project.numberOfDevelopingQuestionsPerDeveloper <= this.company.numberOfCorrectDevelopingAttempsByDeveloper &&
              this.company.numberOfCorrectDevelopingAttempsByTester < this.project.numberOfDevelopingQuestionsPerTester){
      this.questionnumber = this.company.numberOfCorrectDevelopingAttempsByTester;
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.work()
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else {
      console.log('aca');
      //this.getCompanyById(this.service.company_to_be_updated);

    }
  }


  work(){
    this.user_s = this.service.user;
      this.httpService.getUserById(this.user_s['id']).subscribe((user) => {
        this.user = user;

        this.httpService.getCompanyById(user.companyId).subscribe(company => {

          this.setCompany(company);
          this.setResources(company.companyResource);

          this.httpService.getUsersByCompany(company['id']).subscribe((users) => {
            this.setMembers(users.length);
          });

          this.httpService.getRecordsByFinishDateAndCompany(undefined, company['id']).subscribe((record) => {

                  this.httpService.getInstantprojectById(record.project).subscribe((project) => {
                    this.setProject(project);
                  });

                  this.httpService.getAssignmentProjectById(record.project).subscribe((assignments) => {
                    console.log(assignments)

                    setTimeout(() => {

                      if (!this.checkAvailability()) {
                        this.hideOptions();
                        this.error = "You don't have any activities pending in this project"
                        this.instruction = "Slide down to refresh";

                      } else{
                        var count = 0;

                        for (var i = 0; i < assignments.length; ++i) {
                          this.httpService.getQuestionsById(assignments[i].questionId).subscribe((question) => {
                            console.log(question)
                            if (question.role == user.role) {

                              if (count == this.questionnumber) {
                                this.setQuestion(question);
                                this.qd = question.description;
                                this.a1 = question.answers[0].description;
                                this.a2 = question.answers[1].description;
                                this.a3 = question.answers[2].description;
                                this.a4 = question.answers[3].description;
                                this.showOptions();
                              }


                              count = count + 1;
                            }
                          });
                        }
                      }
                    }, 1000);

                  }, () => {
                    this.hideOptions();
                    this.error = "This project does not have any assigned questions right now";
                    this.instruction = "Slide down to refresh";
                  });

          }, () => {
            this.hideOptions();
            this.error = "Your company does not have any active project right now";
            this.instruction = "Slide down to refresh";
          });
        }, () => {
          this.hideOptions();
          this.error = "You are not part of a company so you can't develop a project";
          this.instruction = "Slide down to refresh";
        });


      });

    }

    //Function called with the SEND button, checks if the answers are correct and calls the alerts according to the result
  checkAnswers(){

    var next_question = false;
    var end_project = false;

    if(this.resour <= 0){

      this.showNoResour();

    }else if(this.answer1temp == this.question.answers[0].veracity && this.answer2temp == this.question.answers[1].veracity && this.answer3temp == this.question.answers[2].veracity && this.answer4temp == this.question.answers[3].veracity){

      var nun: number;
      if (this.user.role == "Analyst") {
        this.increaseAnalystQuestions();
        nun = this.project.numberOfDevelopingQuestionsPerAnalyst;
      }else if (this.user.role == "Developer") {
        this.increaseDeveloperQuestions();
        nun = this.project.numberOfDevelopingQuestionsPerDeveloper;
      }else{
        this.increaseTesterQuestions();
        nun = this.project.numberOfDevelopingQuestionsPerTester;
      }

      if(this.questionnumber < nun - 1){
        this.showCorrectAnswer();
        next_question = true;
      }else{
        this.showLastAnswer();
        this.hideOptions();


        if (this.user.role == "Tester") {
          end_project = true;
          this.error = "Your company does not have any active project right now";
          this.instruction = "Slide down to refresh";
        }else{
          this.error = "You don't have any activities pending in this project";
          this.instruction = "Slide down to refresh";
        }
      }

      this.questionnumber = this.questionnumber + 1;
      this.resour = this.resour - 1;
      //this.sendDevelopingAttempt('right', this.questions[this.questionnumber].qtext, answers, this.user.id);
      this.increaseCorrectProjectQuestions();
      this.increaseSpentResources();
      this.decreaseResources();

    }else{

      this.decreaseResources();
      this.increaseSpentResources();
      //this.sendDevelopingAttempt('right', this.questions[this.questionnumber].qtext, answers, this.user.id);
      this.showWrongAnswer();
      this.resour = this.resour-1;
    }

    setTimeout(() => {
      this.updateUserAndCompany(next_question, end_project);
    }, 500);
  }
  /*
  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      this.current_company = data;
      this.showcompany();
    });
  }

  showcompany() {
    console.log(this.current_company);
  }

}
function  obtain_correct(Quest_n) {
  for (const correct of Quest_n.questions) {
    if ( correct.state === true ) {
      return correct;
    }
  }*/
}
