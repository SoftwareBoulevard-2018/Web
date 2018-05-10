import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";
import { Question } from "../shared/question";
import { Answer } from "../shared/answer";

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
      level: new FormControl('',
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

  new_description(description){
	  // Defines if the description has already been taken
    for(let question of this.service.questions){
      if(description === question.description){
        return false;
      }
    }
    return true;
  }

  constructor(public service: GeneralServiceService, public router: Router) { }
	// These variables are used to create the forms and validate the data input on them
  formdata;
  categories = [ "Analyst", "Developer", "Tester"];
  levels = [ 1, 2, 3, 4, 5];
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

  onClickSubmit(data) {
	// Validates the data input on the form and if it's correct then creates the question
    this.auxiliary = this.new_description(data.description);
	if (data.veracity1 === true && data.veracity2 === true && data.veracity3 === true && data.veracity4 === true){
		this.repeated_description = false;
		this.no_false = true;
		this.success = false;
	}
	
    else if (this.auxiliary) {
	  this.firstAnswer = new Answer(data.answer1, data.veracity1);
	  this.secondAnswer = new Answer(data.answer2, data.veracity2);
	  this.thirdAnswer = new Answer(data.answer3, data.veracity3);
	  this.fourthAnswer = new Answer(data.answer4, data.veracity4);
      this.question = new Question(Object.keys(this.service.questions).length ,data.description, data.category, data.level, this.firstAnswer, this.secondAnswer, this.thirdAnswer, this.fourthAnswer);
      this.service.questions.push(this.question);
      console.log(this.service.questions);
      this.form();
	  this.repeated_description = false;
	  this.no_false = false;
	  this.success = true;
    }
	
	else if(!(this.auxiliary)){
		this.repeated_description = true;
		this.no_false = false;
		this.success = false;
    }
	
	else{
		this.repeated_description = false;
		this.no_false = false;
		this.success = false;
	}
  }
  
}  
