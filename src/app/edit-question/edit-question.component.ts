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
  invalid = false;
  veracitynull = false;

  form() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      description: new FormControl(''),
      category: new FormControl(''),
      answer1: new FormControl(''),
      veracity1: new FormControl(''),
      answer2: new FormControl(''),
      veracity2: new FormControl(''),
      answer3: new FormControl(''),
      veracity3: new FormControl(''),
      answer4: new FormControl(''),
      veracity4: new FormControl('')
    });
    this.getQuestionById(this.service.questionId);
  }

  getQuestionById(questionId) {
    return this.httpService.getQuestionsById(questionId).subscribe(data => {
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
    if (data.description === '' && data.category === '' && data.answer1 === '' && data.veracity1 === '' &&
      data.answer2 === '' && data.veracity2 === '' && data.answer3 === '' && data.veracity3 === '' &&
      data.answer4 === '' && data.veracity4 === '') {
      this.invalid = true;
      this.veracitynull = false;
    }
    else {
      if (!(data.description === '')) {
        this.service.question_to_be_updated.description = data.description;
      }
      if (!(data.category === '')) {
        this.service.question_to_be_updated.role = data.category;
      }
      if (!(data.answer1 === '')) {
        this.service.question_to_be_updated.answers[0].description = data.answer1;
      }
      if (!(data.veracity1 === '')) {
        this.service.question_to_be_updated.answers[0].veracity = data.veracity1;
      }
      if (!(data.answer2 === '')) {
        this.service.question_to_be_updated.answers[1].description = data.answer2;
      }
      if (!(data.veracity2 === '')) {
        this.service.question_to_be_updated.answers[1].veracity = data.veracity2;
      }
      if (!(data.answer3 === '')) {
        this.service.question_to_be_updated.answers[2].description = data.answer3;
      }
      if (!(data.veracity3 === '')) {
        this.service.question_to_be_updated.answers[2].veracity = data.veracity3;
      }
      if (!(data.answer4 === '')) {
        this.service.question_to_be_updated.answers[3].description = data.answer4;
      }
      if (!(data.veracity4 === '')) {
        this.service.question_to_be_updated.answers[3].description = data.veracity4;
      }
      this.httpService.updateQuestionById(this.service.question_to_be_updated, this.service.questionId).subscribe(data => console.log(data));
      
      if (this.service.user_type === "Game Administrator") {
        this.router.navigate(['home/set-up/update-question']);
      }
    }
  }
}
