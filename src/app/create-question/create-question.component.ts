import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";
import { Question } from "../shared/question";
import { Answer } from "../shared/answer";
import {HttpService} from '../http.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
	
  form(){
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      description: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      category: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  answer1: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  veracity1: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  answer2: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  veracity2: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  answer3: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  veracity3: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  answer4: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  veracity4: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
    });
  }


  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
	// These variables are used to create the forms and validate the data input on them
  formdata;
  categories = [ "Analyst", "Developer", "Tester"];
  veracities = [ true, false];
  repeated_description = false;
  no_false = false;
  success = false;
  hide = true;
  question;
  firstAnswer;
  secondAnswer;
  thirdAnswer;
  fourthAnswer;
  auxiliary;


  ngOnInit() {
	// Checks User permissions and establishes the form in the default state
   if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

   else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.form();
    }
  }
  
  createQuestion(question) {
		return this.httpService.createQuestion(question).subscribe(data => console.log(data), error => (console.log('hay algo mal')));
  }

  onClickSubmit(data) {
	// Validates the data input on the form and if it's correct then creates the question
	if ((data.veracity1 === true && data.veracity2 === true && data.veracity3 === true && data.veracity4 === true) || (data.veracity1 === false && data.veracity2 === false && data.veracity3 === false && data.veracity4 === false) ){
		this.repeated_description = false;
		this.no_false = true;
		this.success = false;
	}
	

	
    else {
	  this.firstAnswer = new Answer(data.answer1, data.veracity1);
	  this.secondAnswer = new Answer(data.answer2, data.veracity2);
	  this.thirdAnswer = new Answer(data.answer3, data.veracity3);
	  this.fourthAnswer = new Answer(data.answer4, data.veracity4);
      this.question = new Question(data.category, data.description, this.firstAnswer, this.secondAnswer, this.thirdAnswer, this.fourthAnswer);
      this.createQuestion(this.question);
      console.log(this.service.questions);
      this.form();
	  this.repeated_description = false;
	  this.no_false = false;
	  this.success = true;
    }
	
  }
  
}  
