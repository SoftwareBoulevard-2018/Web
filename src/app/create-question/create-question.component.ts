import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";
import { Question } from "../shared/question";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
	
  form(){
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
    });
  }

  new_projectname(username){
    for(let question of this.service.questions){
      if(description === question.description){
        return false;
      }
    }
    return true;
  }

  constructor(public service: GeneralServiceService, public router: Router) { }

  formdata;
  invalid = false;
  invalid_name = false;
  success = false;
  flawed_name = false;
  hide = true;
  project;
  auxiliar;
  categories = [ "Analyst", "Developer", "Tester"];

  ngOnInit() {
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
    this.auxiliar = this.new_description(data.description);
    if (!(/^[a-zA-Z ]+$/.test(data.description))) {
      this.invalid_name = true;
      this.invalid = false;
      this.success = false;
      this.flawed_name = false;
    }
    else if (data.level >= 1 && this.auxiliar) {
      this.project = new Question(Object.keys(this.service.questions).length ,data.description, data.category, data.level);
      this.service.questions.push(this.question);
      console.log(this.service.questions);
      this.form();
      this.invalid_name = false;
      this.invalid = false;
      this.success = true;
      this.flawed_name = false;
    }
    else if(!(this.auxiliar)){
      this.invalid_name = false;
      this.invalid = false;
      this.success = false;
      this.flawed_name = true;
    }
    else{
      this.invalid_name = false;
      this.invalid = true;
      this.success = false;
      this.flawed_name = false;
    }
  }
}
