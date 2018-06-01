import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from "@angular/router";
import { Answer } from "../shared/answer";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from '../http.service';
import { Question } from '../shared/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // These variables are used to create the forms and validate the data input on them
  categories = ["Analyst", "Developer", "Tester"];
  levels = [1, 2, 3, 4, 5];
  veracities = [true, false];
  formdata;
  invalid;
  success;
  invalid_name;
  current_question;

  form() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      description: new FormControl(''),
      category: new FormControl(''),
      level: new FormControl(''),
      answer1: new FormControl(''),
      veracity1: new FormControl(''),
      answer2: new FormControl(''),
      veracity2: new FormControl(''),
      answer3: new FormControl(''),
      veracity3: new FormControl(''),
      answer4: new FormControl(''),
      veracity4: new FormControl('')
    });
    console.log(this.service.question_to_be_updated);
    this.getQuestionById(this.service.questionId);
  }

  getQuestionById(questionId) {
    return this.httpService.getQuestionsById(questionId).subscribe(data => {
      console.log(data);
    });
  }


  ngOnInit() {
    // Checks User permissions and establishes the form in the default state
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member') {
      this.router.navigate(['restricted']);
    } else {
      this.form();
    }
  }

  onClickSubmit(data) {
    if(!(data.description)){}

  }
}
