import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {Question} from '../shared/question';
import {HttpService} from '../http.service';
import { Answer } from "../shared/answer";
import { Id } from '../shared/id';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }
  
  question;
	questions = [];
  question1: MatTableDataSource<Question>;
  firstAnswer;
  secondAnswer;
  thirdAnswer;
  fourthAnswer;
	
	table_titles = ["description", "update"];

  ngOnInit() {
    // When the component is created, it defines the variables to create the material table
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.question1 = new MatTableDataSource(this.questions);
      this.getAllQuestions();
    }
  }

  getAllQuestions(){
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data){
    console.log(data);
    this.questions = [];
    for (const question of Object.values(data.data)) {
      this.questions.push(question);
      this.question1.data = this.questions;
      console.log(this.question1);
     }
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.question1.filter = filterValue;
  }
  
  redirect(event, element) {
  // Redirects to edit question and sends the necessary variables
    this.firstAnswer = new Answer(element['answers'][0]['description'], element['answers'][0]['veracity']);
	  this.secondAnswer = new Answer(element['answers'][1]['description'], element['answers'][1]['veracity']);
	  this.thirdAnswer = new Answer(element['answers'][2]['description'], element['answers'][2]['veracity']);
	  this.fourthAnswer = new Answer(element['answers'][3]['description'], element['answers'][3]['veracity']);
    this.question = new Question(element['role'], element['description'], this.firstAnswer, this.secondAnswer, this.thirdAnswer, this.fourthAnswer);
    console.log(element['_id']);
    this.service.questionId = element['_id'];
    this.service.question_to_be_updated = this.question;
    this.router.navigate(['home/set-up/update-question/edit-question']);
  }

}
