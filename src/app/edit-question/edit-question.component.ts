import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { InstantProject } from "../shared/instantProject";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }
  
    form(){
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
  }
  
  categories = [ "Analyst", "Developer", "Tester"];
  levels = [ 1, 2, 3, 4, 5];
  veracities = [ true, false];
  formdata;
  invalid;
  success;
  invalid_name;

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
}
